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
        <p className={styles['info-text']}>{page.textBlock}</p>
      </div>
    </>
  )
}

export async function getStaticProps({ params }) {
  const entry = await contentfulClient.getEntry({
    content_type: 'page',
  })

  const page = {
    title: entry.fields.title,
    textBlock: entry.fields.textBlock,
    url: entry.fields.url,
  }

  return {
    props: {
      page: page || [],
    },
  }
}
