import Head from 'next/head'
import PreviousButton from '@/components/PreviousButton'
import NextButton from '@/components/NextButton'
import postStyles from '../styles/Post.module.scss'
import buttonsStyles from '../styles/Buttons.module.scss'
import { useState, useEffect } from 'react'
import { contentfulClient } from '@/lib/contentfulClient'
import { parseMedia } from '@/utils/parseMedia'

export default function SlugPage({ post, allPosts }) {
  // const [videoUrl, setVideoUrl] = useState(getVideoUrlFromContent(post.content))
  // const [videoKey, setVideoKey] = useState(Date.now())

  // useEffect(() => {
  //   const newVideoUrl = getVideoUrlFromContent(post.content)
  //   setVideoUrl(newVideoUrl)
  //   setVideoKey(Date.now())
  // }, [post])

  // do below is getStaticProps!
  // const currentIndex = allPosts.findIndex((p) => p.uri === post.uri)
  // const previousPost = allPosts[currentIndex - 1]
  // const nextPost = allPosts[currentIndex + 1]

  return (
    <div>
      <Head>
        <title>{post.title} - Bytemaps</title>
      </Head>
      <div className={postStyles['post-container']}>
        <h1 className={postStyles['post-title']}>{post.title}</h1>
        {/* <iframe className={postStyles['post-video']} autoPlay loop> */}
        {/* <source src={post.youTubeUrl} />
        </iframe> */}
        <iframe
          width="560"
          height="315"
          src={post.youTubeUrl}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div className={buttonsStyles['button-container']}>
        {/* {previousPost && <PreviousButton previousPostUri={previousPost?.uri} />}
        {nextPost && <NextButton nextPostUri={nextPost?.uri} />} */}
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const entries = await contentfulClient.getEntries({
    content_type: 'post',
    'fields.url': params.uri,
    include: 1,
  })

  const entry = entries.items[0]

  const post = {
    title: entry.fields.title,
    uri: entry.fields.url,
    thumbnail: parseMedia(entry.fields.thumbnail),
    id: entry.sys.id,
    youTubeUrl: entry.fields.youTubeUrl,
  }

  return {
    props: {
      post: post || [],
    },
  }
}

// query postEntryQuery {
//   post(id: "4lBwWHKrql0lAeXYFxEm3j", preview: true) {
//     sys {
//       id
//     }
//     title
//     url
//     thumbnail {
//       description
//       width
//       height
//       url
//     }
//   }

export async function getStaticPaths() {
  const entries = await contentfulClient.getEntries({
    content_type: 'post',
  })

  const paths = entries.items.map((item) => ({
    params: { uri: item.fields.url },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

// export async function getStaticProps({ params }) {
//   const GET_POST_BY_URI = gql`
//     query GetPostByUri($id: ID!) {
//       post(id: $id, idType: URI) {
//         title
//         id
//         date
//         uri
//         content
//       }
//     }
//   `
//   const res = await client.query({
//     query: GET_POST_BY_URI,
//     variables: {
//       id: params.uri,
//     },
//   })

//   const post = res?.data?.post
//   console.log('post: ', post)

//   const GET_ALL_POSTS_SLUGS = gql`
//     query GetAllPostsSlugs {
//       posts {
//         nodes {
//           uri
//           title
//         }
//       }
//     }
//   `
//   const allPostsRes = await client.query({
//     query: GET_ALL_POSTS_SLUGS,
//   })

//   const allPosts = allPostsRes?.data?.posts?.nodes || []

//   return {
//     props: {
//       post,
//       allPosts,
//       title: post.title,
//     },
//   }
// }

// export async function getStaticPaths() {
//   const GET_ALL_POSTS_SLUGS = gql`
//     query GetAllPostsSlugs {
//       posts {
//         nodes {
//           uri
//         }
//       }
//     }
//   `
//   const res = await client.query({
//     query: GET_ALL_POSTS_SLUGS,
//   })

//   const posts = res?.data?.posts?.nodes || []

//   const paths = posts.map((post) => ({
//     params: { uri: post.uri },
//   }))

//   return {
//     paths,
//     fallback: 'blocking',
//   }
// }
