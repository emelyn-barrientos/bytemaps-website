import Link from 'next/link'
import styles from '../styles/Buttons.module.scss'

export default function RightButton({ previousPostUri }) {
  return (
    <div className={styles['button']}>
      {previousPostUri ? (
        <Link href={`${previousPostUri}`}>
          <h2>Next</h2>
        </Link>
      ) : null}
    </div>
  )
}
