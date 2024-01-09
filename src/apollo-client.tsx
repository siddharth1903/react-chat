import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition, offsetLimitPagination } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';


interface Props {
    children: React.ReactNode;
    token: string;
}

export const ApolloContext: React.FC<Props> = ({ token, children }) => {

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            }
        }
    });

    const httpLink = createHttpLink({
        uri: 'https://set-gorilla-83.hasura.app/v1/graphql'
    });

    const wsLink = new GraphQLWsLink(createClient({
        url: 'wss://set-gorilla-83.hasura.app/v1/graphql',
        connectionParams: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }));

    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        authLink.concat(httpLink)
    );

    const apolloClient = new ApolloClient({
        link: splitLink,
        connectToDevTools: !import.meta.env.PROD,
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        chat_app_messages: {

                            ...offsetLimitPagination(['$targetUser']),

                            read: (existing: object[], { args }) => {

                                let returnList;

                                if (existing) {

                                    const slicedList = existing.slice(args?.offset, args?.offset + args?.limit);

                                    //first time chat message
                                    const totalItemsInCache = slicedList.length === existing.length ? 'FULL' : 'NONE'

                                    if (totalItemsInCache === 'FULL') {

                                        returnList = slicedList;

                                    } else {

                                        const pageItemsInCache = slicedList.length > 0 && slicedList.length < args?.limit ? 'PARTIAL' :
                                            slicedList.length > 0 && slicedList.length === args?.limit ? 'FULL' : 'NONE';

                                        const emptyIndex = slicedList.findIndex((message) => !message);

                                        if ((emptyIndex === -1 && pageItemsInCache === 'FULL')) {

                                            returnList = slicedList;
                                        }
                                    }


                                }

                                return returnList;
                            }

                        }
                    }
                }
            }
        })
    });


    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    )

}




