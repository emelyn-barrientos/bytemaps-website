import Grid from '@/components/Grid'
import { client } from '../lib/apolloClient'
import { gql } from '@apollo/client'

export default function Home({ posts }) {
  return <Grid posts={posts} />
}

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp/v2/posts`
  )
  const posts = []
  console.log('res: ', res)
  return {
    props: {
      posts: posts || [],
    },
  }
}

// export async function getStaticProps() {
//   const GET_ALL_POSTS = gql`
//     query GetAllPosts {
//       posts {
//         nodes {
//           title
//           id
//           date
//           uri
//           content
//         }
//       }
//     }
//   `
//   try {
//     const res = await client.query({
//       query: GET_ALL_POSTS,
//     })

//     const posts = res?.data?.posts?.nodes

//     return {
//       props: {
//         posts: posts || [],
//       },
//     }
//   } catch (error) {
//     console.error(error)
//     return {
//       props: {
//         posts: [],
//         error: 'An error occurred while fetching data',
//       },
//     }
//   }
// }
