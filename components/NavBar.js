import React from 'react'
import Link from 'next/link'
import styles from './NavBar.module.scss'

export default function NavBar() {
  return (
    <div>
      <nav className={styles.navbarWrapper}>
        <Link href="/">
          <h1 className={styles.siteTitle}>Bytemaps</h1>
        </Link>
        <ul className={styles.navlinks}>
          <Link href="/">
            <li className={styles.navlistItem}>Home</li>
          </Link>
          <Link href="https://www.instagram.com/bytemaps/">
            <li className={styles.navlistItem}>Instagram</li>
          </Link>
          <Link href="/info">
            <li className={styles.navlistItem}>Info</li>
          </Link>
        </ul>
      </nav>
    </div>
  )
}
