import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Grid() {
  return (
    <div>
      {posts.map((post) => {
        const imageUrl = getImageUrlFromContent(post.content)

        return (
          <div class={variables.title} key={post.id}>
            <Link href={post.uri}>
              <h1>{post.title}</h1>
            </Link>
            {imageUrl && (
              <Image src={imageUrl} alt={post.title} width={500} height={500} />
            )}
          </div>
        )
      })}
    </div>
  )
}
