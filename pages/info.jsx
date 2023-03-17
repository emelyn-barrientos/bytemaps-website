import Head from 'next/head'
import styles from '../styles/Info.module.scss'
import Link from 'next/link'
import { contentfulClient } from '@/lib/contentfulClient'

export default function Info({ page }) {
  return (
    <>
      <Head>
        <title>{page.title} - Bytemaps</title>
      </Head>
      <div className={styles['info-container']}>
        <p className={styles['info-text']}>
          {page.textBlock}
          <Link href="mailto:bytemaps@gmail.com">{page.emailAddress}</Link>
        </p>
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
    emailAddress: entry.fields.emailAddress,
  }

  return {
    props: {
      page: page || [],
    },
  }
}
