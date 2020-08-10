import React from 'react'
import styles from './FilterToggle.module.css'

export function FilterToggle({ label, enabled, onChange }) {
  return (
    <button
      className={`${styles.filterToggle} ${enabled ? styles.enabled : ''}`}
      onClick={() => onChange(!enabled)}
    >
      {label}
    </button>
  )
}
