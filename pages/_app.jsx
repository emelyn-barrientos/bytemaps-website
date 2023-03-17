import Head from 'next/head'
import NavBar from '@/components/NavBar'
import '../styles/globals.scss'

export default function App({ Component, pageProps }) {
  const { title } = pageProps

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Digital artwork gallery by Bytemaps."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>{title ? `${title} - Bytemaps` : 'Bytemaps'}</title>
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </>
  )
}
