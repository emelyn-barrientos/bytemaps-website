import Link from 'next/link'

export default function NextButton({ postId }) {
  return (
    <div>
      <Link href={`/posts/${postId}`}>
        <h2>Next</h2>
      </Link>
    </div>
  )
}
