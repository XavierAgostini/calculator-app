const express = require('express')
const path = require('path')

const port = process.env.PORT || 5000
const publicPath = path.join(__dirname, '../public')

const app = express()

app.use(express.static(publicPath))

app.listen(port, (err) => {
  if (err) throw err
  console.log('server started on port ${ports}')
})