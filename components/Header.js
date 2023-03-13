import Head from 'next/head'
import NavBar from '@/components/NavBar'

export default function Header() {
  return (
    <>
      <Head>
        <title>Bytemaps</title>
        <meta
          name="description"
          content="Digital artwork gallery by Bytemaps."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
    </>
  )
}
