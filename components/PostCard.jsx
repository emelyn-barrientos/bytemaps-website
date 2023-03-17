import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/PostCard.module.scss'

export default function PostCard({ post }) {
  return (
    <div key={post.id} className={styles['post-card']}>
      <Link href={post.uri}>
        <Image
          className={styles['post-image']}
          src={post.thumbnail.url}
          alt={post.thumbnail.alt}
          width={post.thumbnail.width}
          height={post.thumbnail.height}
        />
        <h2>{post.title}</h2>
      </Link>
    </div>
  )
}
