import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { client } from '../lib/apollo'
import { gql } from '@apollo/client'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ posts }) {
  const getImageUrlFromContent = (content) => {
    const regex = /<img.*?src="(.*?)"/
    const match = regex.exec(content)
    return match ? match[1] : null
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>bytemaps</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {posts.map((post) => {
          const imageUrl = getImageUrlFromContent(post.content)

          return (
            <div key={post.id}>
              <Link href={post.uri}>
                <h1>{post.title}</h1>
              </Link>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={post.title}
                  width={500}
                  height={500}
                />
              )}
            </div>
          )
        })}
      </div>
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

  const posts = res?.data?.posts?.nodes

  return {
    props: {
      posts,
    },
  }
}
