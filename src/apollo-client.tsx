import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    });

    const httpLink = createHttpLink({
        uri: 'https://set-gorilla-83.hasura.app/v1/graphql'
    });

    const apolloClient = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });


    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    )

}




