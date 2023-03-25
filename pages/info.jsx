import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Info.module.scss'
import { contentfulClient } from '@/lib/contentfulClient'

export default function Info({ infoPage }) {
  return (
    <>
      <Head>
        <title>{infoPage.title} - Bytemaps</title>
      </Head>
      <div className={styles['info-container']}>
        <p className={styles['info-text']}>
          {infoPage.textBlock}{' '}
          <Link href="mailto:bytemaps@gmail.com">{infoPage.emailAddress}</Link>
        </p>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const entries = await contentfulClient.getEntries({
    content_type: 'page',
  })

  const infoPageEntry = entries.items.find(
    (entry) => entry.fields.title === 'Info'
  )

  const infoPage = {
    title: infoPageEntry.fields.title,
    textBlock: infoPageEntry.fields.textBlock,
    url: infoPageEntry.fields.url,
    emailAddress: infoPageEntry.fields.emailAddress,
  }

  return {
    props: {
      infoPage: infoPage || [],
    },
  }
}
