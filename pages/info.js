import Head from 'next/head'
import styles from '../styles/Post.module.scss'
import { client } from '../lib/apolloClient'
import { gql } from '@apollo/client'

export default function Info({ page }) {
  return (
    <>
      <Head>
        <title>{page.title} - Bytemaps</title>
      </Head>
      <div className={styles.container}>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const GET_INFO_PAGE_BY_URI = gql`
    query GetInfoPageByUri($uri: ID!) {
      page(idType: URI, id: $uri) {
        title
        content
      }
    }
  `
  try {
    const { data } = await client.query({
      query: GET_INFO_PAGE_BY_URI,
      variables: {
        uri: '/info',
      },
    })

    if (!data || !data.page) {
      throw new Error('No data found')
    }

    return {
      props: {
        page: data.page,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        page: {
          title: 'Error',
          content: '<p>An error occurred while loading the page</p>',
        },
      },
    }
  }
}
