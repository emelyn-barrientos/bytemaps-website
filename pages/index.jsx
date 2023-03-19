import AllPosts from '@/components/AllPosts'
import { contentfulClient } from '@/lib/contentfulClient'
import { parseMedia } from '@/utils/parseMedia'

export default function Home({ posts }) {
  return <AllPosts posts={posts} />
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
      createdAt: item.sys.createdAt,
    }
  })

  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return {
    props: {
      posts: posts || [],
    },
  }
}
