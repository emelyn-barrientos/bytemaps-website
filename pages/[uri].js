import Head from 'next/head'
import { client } from '../lib/apollo'
import { gql } from '@apollo/client'

export default function SlugPage({ post }) {
  console.log('post: ', post)
  return (
    <div>
      <Head>
        <title>Post Title Example</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main>
        <div className="siteHeader">
          <h1 className="title">{post.title}</h1>
          <p>{}</p>
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
        content
        date
        uri
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
