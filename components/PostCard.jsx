import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/PostCard.module.scss'

export default function PostCard({ post }) {
  console.log('post: ', post)
  return (
    <div key={post.id} className={styles['post-card']}>
      <Link href={post.uri}>
        <div className={styles['post-image']}>
          <Image
            src={post.thumbnail.url}
            alt={post.thumbnail.alt}
            width={post.thumbnail.width}
            height={post.thumbnail.height}
          />
        </div>
        <h2>{post.title}</h2>
      </Link>
    </div>
  )
}
