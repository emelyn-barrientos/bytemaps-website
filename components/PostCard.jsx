import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/PostCard.module.scss'
import { motion } from 'framer-motion'

export default function PostCard({ post }) {
  return (
    <div key={post.id} className={styles['post-card']}>
      <Link href={post.uri}>
        <motion.div
          className={styles['post-image']}
          whileHover={{ rotate: 5, scale: 1.1 }}
        >
          <Image
            src={post.thumbnail.url}
            alt={post.thumbnail.alt}
            width={post.thumbnail.width}
            height={post.thumbnail.height}
          />
        </motion.div>
        <h2>{post.title}</h2>
      </Link>
    </div>
  )
}
