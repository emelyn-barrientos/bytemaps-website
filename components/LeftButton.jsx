import Link from 'next/link'
import styles from '../styles/Buttons.module.scss'

export default function LeftButton({ nextPostUri }) {
  return (
    <button className={styles['button']}>
      <Link href={`${nextPostUri}`}>
        {nextPostUri ? <h2>Previous</h2> : null}
      </Link>
    </button>
  )
}
