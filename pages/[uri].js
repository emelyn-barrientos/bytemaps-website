import Head from 'next/head'
import styles from '../styles/Post.module.scss'
import { client } from '../lib/apolloClient'
import { gql } from '@apollo/client'

export default function SlugPage({ post, postId }) {
  const getVideoUrlFromContent = (content) => {
    const regex = /<video.*?src="(.*?)"/
    const match = regex.exec(content)
    return match ? match[1] : null
  }

  const videoUrl = getVideoUrlFromContent(post.content)

  return (
    <>
      <Head>
        <title>{post.title} - Bytemaps</title>
      </Head>
      <div className={styles['post-container']}>
        <h1 className={styles['post-title']}>{post.title}</h1>
        {videoUrl && (
          <video className={styles['post-video']} autoPlay loop>
            <source src={videoUrl} />
          </video>
        )}
      </div>
    </>
  )
}

export async function getStaticProps({ params }) {
  const GET_POST_BY_URI = gql`
    query GetPostByUri($id: ID!) {
      post(id: $id, idType: URI) {
        title
        id
        date
        uri
        content
      }
    }
  `
  const res = await client.query({
    query: GET_POST_BY_URI,
    variables: {
      id: params.uri,
    },
  })

  const post = res?.data?.post
  const postId = post?.id

  const GET_PREVIOUS_POST_ID = gql`
    query GetPreviousPostId($id: ID!) {
      post(id: $id, idType: DATABASE_ID) {
        previous {
          node {
            databaseId
          }
        }
      }
    }
  `
  const GET_NEXT_POST_ID = gql`
    query GetNextPostId($id: ID!) {
      post(id: $id, idType: DATABASE_ID) {
        next {
          node {
            databaseId
          }
        }
      }
    }
  `
  const prevRes = await client.query({
    query: GET_PREVIOUS_POST_ID,
    variables: {
      id: postId,
    },
  })

  const prevPostId = prevRes?.data?.post?.previous?.node?.databaseId

  const nextRes = await client.query({
    query: GET_NEXT_POST_ID,
    variables: {
      id: postId,
    },
  })

  return {
    props: {
      post,
      title: post.title,
      postId: post.id,
    },
  }
}

export async function getStaticPaths() {
  const GET_ALL_POSTS_SLUGS = gql`
    query GetAllPostsSlugs {
      posts {
        nodes {
          uri
        }
      }
    }
  `
  const res = await client.query({
    query: GET_ALL_POSTS_SLUGS,
  })

  const posts = res?.data?.posts?.nodes || []

  const paths = posts.map((post) => ({
    params: { uri: post.uri },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
