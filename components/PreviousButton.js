import Link from 'next/link'

export default function PreviousButton({ postId }) {
  return (
    <div>
      <Link href={`/posts/${postId}`}>
        <h2>Previous</h2>
      </Link>
    </div>
  )
}
