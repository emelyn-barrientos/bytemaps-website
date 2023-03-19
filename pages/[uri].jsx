import Head from 'next/head'
import PreviousButton from '@/components/PreviousButton'
import NextButton from '@/components/NextButton'
import postStyles from '../styles/Post.module.scss'
import buttonsStyles from '../styles/Buttons.module.scss'
import { contentfulClient } from '@/lib/contentfulClient'
import { parseMedia } from '@/utils/parseMedia'

export default function SlugPage({ currentPost, previousPost, nextPost }) {
  return (
    <div>
      <Head>
        <title>{currentPost.title} - Bytemaps</title>
      </Head>
      <div className={postStyles['post-container']}>
        <h1 className={postStyles['post-title']}>{currentPost.title}</h1>
        <div className={postStyles['post-video-wrapper']}>
          <iframe
            className={postStyles['post-video']}
            width="100%"
            height="56.25%"
            src={`${currentPost.youTubeUrl}?&autoplay=1&modestbranding=1&rel=0&showinfo=0&vq=2160p&quality=highest`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
      </div>
      {/* <div className={buttonsStyles['button-container']}>
        <PreviousButton uri={previousPost.uri} />
        <NextButton uri={nextPost.uri} />
      </div> */}
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

  const currentPost = {
    title: entry.fields.title,
    uri: entry.fields.url,
    thumbnail: parseMedia(entry.fields.thumbnail),
    id: entry.sys.id,
    youTubeUrl: entry.fields.youTubeUrl,
  }

  // const prevEntry = await contentfulClient.getEntries({
  //   content_type: 'post',
  //   order: '-fields.date',
  //   'fields.date[lt]': entry.fields.date,
  //   limit: 1,
  // })

  // const previousPost = prevEntry.items.length
  //   ? {
  //       title: prevEntry.items[0].fields.title,
  //       uri: prevEntry.items[0].fields.url,
  //     }
  //   : null

  // const nextEntry = await contentfulClient.getEntries({
  //   content_type: 'post',
  //   order: 'fields.date',
  //   'fields.date[gt]': entry.fields.date,
  //   limit: 1,
  // })

  // const nextPost = nextEntry.items.length
  //   ? {
  //       title: nextEntry.items[0].fields.title,
  //       uri: nextEntry.items[0].fields.url,
  //     }
  //   : null

  return {
    props: {
      currentPost,
      // previousPost,
      // nextPost,
    },
  }
}

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
