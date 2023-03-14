import Head from 'next/head'
import PreviousButton from '@/components/PreviousButton'
import NextButton from '@/components/NextButton'
import styles from '../styles/Post.module.scss'
import { useState, useEffect } from 'react'
import { client } from '../lib/apolloClient'
import { gql } from '@apollo/client'

export function getVideoUrlFromContent(content) {
  const regex = /<video.*?src="(.*?)"/
  const match = regex.exec(content)
  return match ? match[1] : null
}

export default function SlugPage({ post, allPosts }) {
  const [videoUrl, setVideoUrl] = useState(getVideoUrlFromContent(post.content))

  useEffect(() => {
    const newVideoUrl = getVideoUrlFromContent(post.content)
    setVideoUrl(newVideoUrl)
  }, [post])

  const currentIndex = allPosts.findIndex((p) => p.uri === post.uri)
  const previousPost = allPosts[currentIndex - 1]
  const nextPost = allPosts[currentIndex + 1]

  return (
    <div>
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
        {previousPost && <PreviousButton previousPostUri={previousPost?.uri} />}
        {nextPost && <NextButton nextPostUri={nextPost?.uri} />}
      </div>
    </div>
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

  const GET_ALL_POSTS_SLUGS = gql`
    query GetAllPostsSlugs {
      posts {
        nodes {
          uri
          title
        }
      }
    }
  `
  const allPostsRes = await client.query({
    query: GET_ALL_POSTS_SLUGS,
  })

  const allPosts = allPostsRes?.data?.posts?.nodes || []

  return {
    props: {
      post,
      allPosts,
      title: post.title,
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
