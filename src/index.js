import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import { router } from './routes/route.js'
import { join } from 'path'

const app = express()
// Set the view engine to ejs
app.set('view engine', 'ejs')
// Set the view directory
app.set('views', join('./src', 'views'))
// Serve static files from the 'public' folder
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})

export default app
