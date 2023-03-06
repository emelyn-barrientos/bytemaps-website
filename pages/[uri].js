import Head from 'next/head'

export default function SlugPage({ post }) {
  return (
    <div>
      <Head>
        <title>Post Title Example</title>
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main>
        <div className="siteHeader">
          <h1 className="title">{post.title}</h1>
          <p>{}</p>
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const res = await getPostByUri(params.uri)
  const post = res?.data?.post
  return {
    props: {
      post,
    },
  }
}

export async function getStaticPat() {
  const paths = []
  return {
    paths,
    fallback: 'blocking',
  }
}
