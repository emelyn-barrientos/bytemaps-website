import React from 'react'
import PostCard from './PostCard'
import styles from '../styles/grid.module.scss'

export default function Grid({ posts }) {
  return (
    <div className={styles['grid-container']}>
      <PostCard posts={posts} />
    </div>
  )
}
