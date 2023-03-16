import Head from 'next/head'
import PreviousButton from '@/components/PreviousButton'
import NextButton from '@/components/NextButton'
import postStyles from '../styles/Post.module.scss'
import buttonsStyles from '../styles/Buttons.module.scss'
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
  const [videoKey, setVideoKey] = useState(Date.now())

  useEffect(() => {
    const newVideoUrl = getVideoUrlFromContent(post.content)
    setVideoUrl(newVideoUrl)
    setVideoKey(Date.now())
  }, [post])

  const currentIndex = allPosts.findIndex((p) => p.uri === post.uri)
  const previousPost = allPosts[currentIndex - 1]
  const nextPost = allPosts[currentIndex + 1]

  return (
    <div>
      <Head>
        <title>{post.title} - Bytemaps</title>
      </Head>
      <div className={postStyles['post-container']}>
        <h1 className={postStyles['post-title']}>{post.title}</h1>
        {videoUrl && (
          <video
            key={videoKey}
            className={postStyles['post-video']}
            autoPlay
            loop
          >
            <source src={videoUrl} />
          </video>
        )}
      </div>
      <div className={buttonsStyles['button-container']}>
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
  console.log('post: ', post)

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
