import React from 'react'
import Link from 'next/link'
import styles from '../styles/NavBar.module.scss'

export default function NavBar() {
  return (
    <div>
      <nav className={styles['nav-bar']}>
        <Link href="/">
          <h1 className={styles['site-title']}>bytemaps</h1>
        </Link>
        <ul className={styles['nav-links']}>
          <Link href="/">
            <li className={styles['nav-list-item']}>Home</li>
          </Link>
          <Link href="/info">
            <li className={styles['nav-list-item']}>Info</li>
          </Link>
          <Link href="https://www.instagram.com/bytemaps/">
            <li className={styles['nav-list-item']}>Instagram</li>
          </Link>
        </ul>
      </nav>
    </div>
  )
}
