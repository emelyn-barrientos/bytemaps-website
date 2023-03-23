import Head from 'next/head'
import NavBar from '@/components/NavBar'
import '../styles/globals.scss'
import { DM_Mono } from 'next/font/google'
import { motion } from 'framer-motion'

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
})

export default function App({ Component, pageProps }) {
  const { title } = pageProps

  return (
    <main className={dmMono.className}>
      <Head>
        <meta
          name="description"
          content="Digital artwork gallery by bytemaps."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>{title ? `${title} - bytemaps` : 'bytemaps'}</title>
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </main>
  )
}
