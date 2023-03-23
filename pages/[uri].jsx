import Head from 'next/head'
import RightButton from '@/components/RightButton'
import LeftButton from '@/components/LeftButton'
import postStyles from '../styles/Post.module.scss'
import buttonStyles from '../styles/Buttons.module.scss'
import { contentfulClient } from '@/lib/contentfulClient'
import { parseMedia } from '@/utils/parseMedia'

export default function SlugPage({ currentPost, previousPost, nextPost }) {
  return (
    <div>
      <Head>
        <title>{currentPost.title} - bytemaps</title>
      </Head>

      <div className={postStyles['post-container']}>
        <h1 className={postStyles['post-title']}>{currentPost.title}</h1>
        <div className={postStyles['post-video-wrapper']}>
          <iframe
            className={postStyles['post-video']}
            width="100%"
            height="100%"
            src={`${currentPost.youTubeUrl}?&autoplay=1&modestbranding=1&rel=0&showinfo=0&vq=2160p&quality=highest`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
        <div className={buttonStyles['button-container']}>
          <div className={buttonStyles['button-left']}>
            {nextPost && (
              <LeftButton
                className={buttonStyles['button']}
                nextPostUri={nextPost && nextPost.uri}
              />
            )}
          </div>
          <div className={buttonStyles['button-right']}>
            {previousPost && (
              <RightButton
                className={buttonStyles['button']}
                previousPostUri={previousPost && previousPost.uri}
              />
            )}
          </div>
        </div>
      </div>
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

  const prevEntry = await contentfulClient.getEntries({
    content_type: 'post',
    order: '-sys.createdAt',
    'sys.createdAt[lt]': entry.sys.createdAt,
    limit: 1,
  })

  const previousPost = prevEntry.items.length
    ? {
        title: prevEntry.items[0].fields.title,
        uri: prevEntry.items[0].fields.url,
      }
    : null

  const nextEntry = await contentfulClient.getEntries({
    content_type: 'post',
    order: 'sys.createdAt',
    'sys.createdAt[gt]': entry.sys.createdAt,
    limit: 1,
  })

  const nextPost = nextEntry.items.length
    ? {
        title: nextEntry.items[0].fields.title,
        uri: nextEntry.items[0].fields.url,
      }
    : null

  return {
    props: {
      currentPost,
      previousPost,
      nextPost,
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
