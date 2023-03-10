import React from 'react'
import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <Link href="/">
        <h1 className="site-title">Bytemaps</h1>
      </Link>
      <ul className="nav-list">
        <li className="navlist-item">Home</li>
        <li className="navlist-item">Instagram</li>
        <li className="navlist-item">Info</li>
      </ul>
    </nav>
  )
}
