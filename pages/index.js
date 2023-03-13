import Head from 'next/head'
import NavBar from '@/components/NavBar'
import Grid from '@/components/Grid'
import styles from '@/styles/Home.module.css'
import { client } from '../lib/apolloClient'
import { gql } from '@apollo/client'

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bytemaps</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <Grid posts={posts} />
    </div>
  )
}

export async function getStaticProps() {
  const GET_ALL_POSTS = gql`
    query GetAllPosts {
      posts {
        nodes {
          title
          id
          date
          uri
          content
        }
      }
    }
  `
  const res = await client.query({
    query: GET_ALL_POSTS,
  })

  console.log('res: ', res)

  const posts = res?.data?.posts?.nodes

  return {
    props: {
      posts: posts || [],
    },
  }
}
