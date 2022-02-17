import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { loadTransactions } from './loadTransactions'
import { transactionsRoute } from './routes/transactionsRoute'
import {parseQuery} from './lib/parseQueryMiddleware'

process.env.TZ = 'UTC'

const transactionsList = loadTransactions()

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(parseQuery)
app.use((req, res, next) => {
  req.transactions = transactionsList
  next()
})

app.get('/api/transactions', transactionsRoute)

app.use(function (err, req, res, next) {
  console.log(err)
  res
    .status(500)
    .json({ error: `Unexpected server-side error "${err.message}"` })

  next(err)
})

app.listen(port, () =>
  console.log(`Listening on port ${port} | http://localhost:${port}`)
)
