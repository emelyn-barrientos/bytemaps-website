import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,
  cache: new InMemoryCache(),
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
})

console.log('client.uri: ', client.uri)
