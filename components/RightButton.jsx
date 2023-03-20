import Link from 'next/link'
import styles from '../styles/Buttons.module.scss'

export default function RightButton({ previousPostUri }) {
  return (
    <Link className={styles['button']} href={`${previousPostUri}`}>
      {previousPostUri ? <h2>Next</h2> : null}
    </Link>
  )
}
