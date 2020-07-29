import React from 'react'
import styles from './Status.module.css'

export function Status({ status }) {
  return <span className={`${styles.status} ${styles[status]}`}>{status}</span>
}
