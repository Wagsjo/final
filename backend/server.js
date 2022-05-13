const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 1337
const distPath = __dirname +'/../dist/'

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.static(distPath))


app.get('/', (req,res) => {
  console.log('asd')
  res.send('Hej')
})

app.listen(PORT, () => {
  console.log('App is running on ', PORT )
})
