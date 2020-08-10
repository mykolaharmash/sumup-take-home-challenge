import React, { Component } from 'react'
import styles from './App.module.css'
import { Header } from '../Header/Header'
import { Transactions } from '../Transactions/Transactions'

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.content}>
          <Header />
          <Transactions />
        </div>
      </div>
    )
  }
}

export default App
