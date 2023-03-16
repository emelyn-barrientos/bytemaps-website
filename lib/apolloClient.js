import { ApolloClient, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/error'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('GraphQL errors:', graphQLErrors)
  }
  if (networkError) {
    console.log('Network error:', networkError)
  }
})

export const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,
  cache: new InMemoryCache(),
  link: errorLink.concat(httpLink),
})
