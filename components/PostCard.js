import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/PostCard.module.scss'

export default function PostCard({ post }) {
  const getImageUrlFromContent = (content) => {
    const regex = /<img.*?src="(.*?)"/
    const match = regex.exec(content)
    return match ? match[1] : null
  }
  const imageUrl = getImageUrlFromContent(post.content)

  return (
    <div key={post.id} className={styles['post-card']}>
      <Link href={post.uri}>
        {imageUrl && (
          <div className={styles['post-image']}>
            <Image src={imageUrl} alt={post.title} width={500} height={500} />
          </div>
        )}
        <h2>{post.title}</h2>
      </Link>
    </div>
  )
}
