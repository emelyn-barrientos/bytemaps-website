import React from 'react'
import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <Link href="/">
        <h1 className="site-title">Bytemaps</h1>
      </Link>
      <ul className="nav-list">
        <Link href="/">
          <li className="navlist-item">Home</li>
        </Link>
        <Link href="https://www.instagram.com/bytemaps/">
          <li className="navlist-item">Instagram</li>
        </Link>
        <Link href="/info">
          <li className="navlist-item">Info</li>
        </Link>
      </ul>
    </nav>
  )
}
