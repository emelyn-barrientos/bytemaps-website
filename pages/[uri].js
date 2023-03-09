import Head from 'next/head'
import { client } from '../lib/apollo'
import { gql } from '@apollo/client'
import Image from 'next/image'

export default function SlugPage({ post }) {
  console.log('post: ', post)

  const getVideoUrlFromContent = (content) => {
    const regex = /<iframe.*?src="(.*?)"/
    const match = regex.exec(content)
    return match ? match[1] : null
  }

  return (
    <div>
      <Head>
        <title>bytemaps | {post.title}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main>
        <div className="siteHeader">
          <h1 className="title">{post.title}</h1>
          {post.featuredImage && (
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText}
              width={post.featuredImage.node.mediaDetails.width}
              height={post.featuredImage.node.mediaDetails.height}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const GET_POST_BY_URI = gql`
    query getPostByUri($id: ID!) {
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

  return {
    props: {
      post,
    },
  }
}

export async function getStaticPaths() {
  const paths = []
  return {
    paths,
    fallback: 'blocking',
  }
}
