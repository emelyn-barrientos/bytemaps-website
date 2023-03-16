import React from 'react'
import PostCard from './PostCard'
import styles from '../styles/Grid.module.scss'

export default function Grid({ posts }) {
  return (
    <div className={styles['grid-container']}>
      {posts &&
        posts.map((post) => (
          <div key={post.id} className={styles['grid-item']}>
            <PostCard post={post} />
          </div>
        ))}
    </div>
  )
}
