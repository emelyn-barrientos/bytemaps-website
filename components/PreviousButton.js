import Link from 'next/link'
import styles from '../styles/Buttons.module.scss'

export default function PreviousButton({ previousPostUri }) {
  return (
    <div className={styles['button']}>
      {previousPostUri ? (
        <Link href={`${previousPostUri}`}>
          <h2>Previous</h2>
        </Link>
      ) : null}
    </div>
  )
}
