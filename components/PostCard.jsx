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
          whileHover={{
            scale: 1,
            opacity: 0.75,
            transition: {
              duration: 0.4,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
            },
          }}
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
