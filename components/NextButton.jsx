import Link from 'next/link'
import styles from '../styles/Buttons.module.scss'

export default function NextButton() {
  return (
    <Link href={'/'}>
      <h2 className={styles['button']}>Next</h2>
    </Link>
  )
}
