import Link from 'next/link'
import styles from '../styles/Buttons.module.scss'

export default function RightButton({ previousPostUri }) {
  return (
    <button className={styles['button']}>
      <Link href={`${previousPostUri}`}>
        {previousPostUri ? <h2>Next</h2> : null}
      </Link>
    </button>
  )
}
