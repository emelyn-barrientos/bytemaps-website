import Grid from '@/components/Grid'
import { contentfulClient } from '@/lib/contentfulClient'
import { parseMedia } from '@/utils/parseMedia'

export default function Home({ posts }) {
  return <Grid posts={posts} />
}

export async function getStaticProps() {
  const entries = await contentfulClient.getEntries({
    content_type: 'post',
  })

  const posts = entries.items.map((item) => {
    return {
      title: item.fields.title,
      uri: item.fields.url,
      thumbnail: parseMedia(item.fields.thumbnail),
      id: item.sys.id,
    }
  })

  return {
    props: {
      posts: posts || [],
    },
  }
}
