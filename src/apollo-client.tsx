import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition, offsetLimitPagination } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

import { FIELD_CHAT_APP_MESSAGES } from './apollo/fieldPolicy/chatAppMessages';

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
        cache: new InMemoryCache({
            typePolicies: {
                ...FIELD_CHAT_APP_MESSAGES,
                Query: {
                    fields: {
                        chat_app_messages: {

                            ...offsetLimitPagination(['$targetUser']),

                            read: (existing, { args }) => {

                                let returnList;

                                if (existing && existing.slice(args?.offset, args?.offset + args?.limit).length > 0) {

                                    returnList = existing.slice(args?.offset, args?.offset + args?.limit)
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




