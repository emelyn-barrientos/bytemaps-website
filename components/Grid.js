import React from 'react'
import PostCard from './PostCard'

export default function Grid({ posts }) {
  return (
    <div className="grid-container">
      <PostCard posts={posts} />
    </div>
  )
}
