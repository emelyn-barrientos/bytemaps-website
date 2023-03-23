import Head from 'next/head'
import NavBar from '@/components/NavBar'
import { DM_Mono } from 'next/font/google'
import { motion } from 'framer-motion'
import '../styles/globals.scss'

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
})

export default function App({ Component, pageProps, router }) {
  const { title } = pageProps

  return (
    <motion.div
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: {
          opacity: 0,
        },
        pageAnimate: {
          opacity: 1,
        },
      }}
    >
      <main className={dmMono.className}>
        <Head>
          <meta
            name="description"
            content="Digital artwork gallery by bytemaps."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href={dmMono.stylesheet} />
          <title>{title ? `${title} - bytemaps` : 'bytemaps'}</title>
        </Head>
        <NavBar />
        <Component {...pageProps} />
      </main>
    </motion.div>
  )
}
