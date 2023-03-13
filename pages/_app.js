import '../styles/globals.scss'
import Header from '@/components/Header'
import { ApolloProvider } from '@apollo/client/react'
import { client } from '@/lib/apolloClient'

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
