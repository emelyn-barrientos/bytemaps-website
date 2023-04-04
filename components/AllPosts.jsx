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
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className={styles['grid-item']}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
