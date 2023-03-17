import React from 'react'
import PostCard from './PostCard'
import styles from '../styles/AllPosts.module.scss'

export default function AllPosts({ posts }) {
  return (
    <div className={styles['grid-container']}>
      {posts.map((post) => (
        <div key={post.id} className={styles['grid-item']}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  )
}
