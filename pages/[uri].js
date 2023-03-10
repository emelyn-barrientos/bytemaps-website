import Head from 'next/head'
import { client } from '../lib/apollo'
import { gql } from '@apollo/client'

export default function SlugPage({ post }) {
  const getVideoUrlFromContent = (content) => {
    const regex = /<video.*?src="(.*?)"/
    const match = regex.exec(content)
    return match ? match[1] : null
  }

  const videoUrl = getVideoUrlFromContent(post.content)

  return (
    <div>
      <Head>
        <title>Bytemaps | {post.title}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main>
        <div className="siteHeader">
          <h1 className="title">{post.title}</h1>
          {videoUrl && (
            <video autoPlay loop style={{ width: '400px', height: '600px' }}>
              <source src={videoUrl} />
            </video>
          )}
        </div>
      </main>
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
