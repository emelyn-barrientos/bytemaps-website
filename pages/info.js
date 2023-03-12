import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { client } from '../lib/apolloClient'
import { gql } from '@apollo/client'

const inter = Inter({ subsets: ['latin'] })

export default function Info({ page }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bytemaps | {page.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  )
}

export async function getStaticProps() {
  const GET_INFO_PAGE_BY_URI = gql`
    query GetInfoPageByUri($uri: String) {
      pageBy(uri: $uri) {
        title
        content
      }
    }
  `
  const { data } = await client.query({
    query: GET_INFO_PAGE_BY_URI,
    variables: {
      uri: '/info',
    },
  })

  return {
    props: {
      page: data.pageBy,
    },
  }
}
