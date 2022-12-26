const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static('build'))

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('server started on port 3000')
})