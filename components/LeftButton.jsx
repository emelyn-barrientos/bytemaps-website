import Link from 'next/link'
import styles from '../styles/Buttons.module.scss'

export default function LeftButton({ nextPostUri }) {
  return (
    <div className={styles['button']}>
      {nextPostUri ? (
        <Link href={`${nextPostUri}`}>
          <h2>Previous</h2>
        </Link>
      ) : null}
    </div>
  )
}
