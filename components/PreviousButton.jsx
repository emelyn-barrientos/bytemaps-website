import Link from 'next/link'
import styles from '../styles/Buttons.module.scss'

export default function PreviousButton() {
  return (
    <Link href={'/'}>
      <h2 className={styles['button']}>Post</h2>
    </Link>
  )
}
