import Head from 'next/head'
import PreviousButton from '@/components/PreviousButton'
import NextButton from '@/components/NextButton'
import postStyles from '../styles/Post.module.scss'
import buttonsStyles from '../styles/Buttons.module.scss'
import { contentfulClient } from '@/lib/contentfulClient'
import { parseMedia } from '@/utils/parseMedia'

export default function SlugPage({
  currentPost,
  previousPostUri,
  nextPostUri,
}) {
  return (
    <div>
      <Head>
        <title>{currentPost.title} - Bytemaps</title>
      </Head>
      <div className={postStyles['post-container']}>
        <h1 className={postStyles['post-title']}>{currentPost.title}</h1>
        <iframe
          className={postStyles['post-video']}
          width="560"
          height="315"
          src={currentPost.youTubeUrl}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div className={buttonsStyles['button-container']}>
        <PreviousButton previousPostUri={previousPostUri} />
        <NextButton nextPostUri={nextPostUri} />
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

  const post = {
    title: entry.fields.title,
    uri: entry.fields.url,
    thumbnail: parseMedia(entry.fields.thumbnail),
    id: entry.sys.id,
    youTubeUrl: entry.fields.youTubeUrl,
  }

  const uris = entries.items.map((entry) => entry.fields.url)
  const currentIndex = uris.indexOf(post.uri)
  const previousPostUri = uris[currentIndex - 1] || null
  const nextPostUri = uris[currentIndex + 1] || null

  return {
    props: {
      currentPost: post,
      previousPostUri,
      nextPostUri,
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
