const express = require('express')
const app = express()

app.use(express.json())
app.post(
  '/test',
  (req, res) => res.json(req.body)
)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
