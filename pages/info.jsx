import Head from 'next/head'
import styles from '../styles/Info.module.scss'
import { contentfulClient } from '@/lib/contentfulClient'

export default function Info({ page }) {
  return (
    <>
      <Head>
        <title>{page.title} - Bytemaps</title>
      </Head>
      <div className={styles['info-container']}>
        <div
          className={styles['info-content']}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </>
  )
}

export async function getStaticProps({ params }) {
  const entry = await contentfulClient.getEntry({
    content_type: 'page',
  })
}

// export async function getStaticProps() {
//   const GET_INFO_PAGE_BY_URI = gql`
//     query GetInfoPageByUri($uri: ID!) {
//       page(idType: URI, id: $uri) {
//         title
//         content
//       }
//     }
//   `
//   try {
//     const { data } = await client.query({
//       query: GET_INFO_PAGE_BY_URI,
//       variables: {
//         uri: '/info',
//       },
//     })

//     if (!data || !data.page) {
//       throw new Error('No data found')
//     }

//     return {
//       props: {
//         page: data.page,
//       },
//     }
//   } catch (error) {
//     console.error(error)
//     return {
//       props: {
//         page: {
//           title: 'Error',
//           content: '<p>An error occurred while loading the page</p>',
//         },
//       },
//     }
//   }
// }
