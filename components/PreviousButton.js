import Link from 'next/link'

export default function PreviousButton({ previousPostUri }) {
  return (
    <div>
      {previousPostUri ? (
        <Link href={`/posts/${previousPostUri}`}>
          <h2>Previous</h2>
        </Link>
      ) : null}
    </div>
  )
}
