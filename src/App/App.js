import React, { Component } from 'react'
import styles from './App.module.css'
import { Header } from '../Header/Header'
import { TransactionsList } from '../TransactionsList/TransactionsList'

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.content}>
          <Header />
          <TransactionsList />
        </div>
      </div>
    )
  }
}

export default App
