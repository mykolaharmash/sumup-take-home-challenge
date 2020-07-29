import React from 'react'
import styles from './ErrorMessage.module.css'

export function ErrorMessage({ title, message }) {
  return (
    <div className={styles.errorMessage}>
      <div className={styles.title}>{title}</div>
      <div className={styles.message}>{message}</div>
    </div>
  )
}
