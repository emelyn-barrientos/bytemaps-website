import PostCard from './PostCard'
import styles from '../styles/AllPosts.module.scss'
import { motion, AnimatePresence } from 'framer-motion'

export default function AllPosts({ posts }) {
  return (
    <AnimatePresence>
      <motion.div
        className={styles['grid-container']}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {posts.map((post) => (
          <div key={post.id} className={styles['grid-item']}>
            <PostCard post={post} />
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
