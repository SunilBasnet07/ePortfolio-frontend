import React from 'react'
import { motion } from 'framer-motion'

const Spinner = ({ size = '40px', color = '#3B82F6' }) => {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `4px solid rgba(0, 0, 0, 0.1)`,
          borderTopColor: color,
          display: 'inline-block',
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
    </div>
  )
}

export default Spinner