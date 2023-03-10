import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PostCard from './PostCard'
import variables from '@/styles/variables.module.scss'

export default function Grid({ posts }) {
  const getImageUrlFromContent = (content) => {
    const regex = /<img.*?src="(.*?)"/
    const match = regex.exec(content)
    return match ? match[1] : null
  }

  return (
    <div>
      <PostCard />
      {posts &&
        posts.map((post) => {
          const imageUrl = getImageUrlFromContent(post.content)

          return (
            <div className={variables.title} key={post.id}>
              <Link href={post.uri}>
                <h1>{post.title}</h1>
              </Link>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={post.title}
                  width={500}
                  height={500}
                />
              )}
            </div>
          )
        })}
    </div>
  )
}
