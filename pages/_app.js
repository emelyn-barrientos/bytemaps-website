import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client/react'
import { client } from '@/lib/apollo'

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
