import Link from 'next/link'

export default function NextButton({ nextPostUri }) {
  return (
    <div>
      {nextPostUri ? (
        <Link href={`/posts${nextPostUri}`}>
          <h2>Next</h2>
        </Link>
      ) : null}
    </div>
  )
}
