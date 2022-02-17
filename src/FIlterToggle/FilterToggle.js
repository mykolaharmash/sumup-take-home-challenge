import React from 'react'
import styles from './FilterToggle.module.css'

export function FilterToggle({ label, toggled, onClick }) {
  const toggledClass = toggled ? styles.toggled : ''

  return (
    <button
      className={`${styles.filterToggle} ${toggledClass}`} 
      onClick={() => onClick(!toggled)}
    >{label}</button>
  )
}