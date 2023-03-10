import React from 'react'
import PostCard from './PostCard'

export default function Grid({ posts }) {
  return (
    <div>
      <PostCard posts={posts} />
    </div>
  )
}
