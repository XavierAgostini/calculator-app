const express = require('express')
const path = require('path')

const port = process.env.PORT || 5000
const publicPath = path.join(__dirname, '../public')

const app = express()

app.use(express.static(publicPath))

app.get('/beta', (req, res) => {
  res.json({temperature: 40})
})
app.listen(port, (err) => {
  if (err) throw err
  console.log('server started on port ${ports}')
})