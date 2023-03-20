import Link from 'next/link'
import styles from '../styles/Buttons.module.scss'

export default function LeftButton({ nextPostUri }) {
  return (
    <Link className={styles['button']} href={`${nextPostUri}`}>
      {nextPostUri ? <h2>Previous</h2> : null}
    </Link>
  )
}
