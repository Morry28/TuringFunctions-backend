import fs from 'fs'
import express from 'express'
import systemRoutes from './routes/system.routes'
import TuringMaching from './utils/touringMachines/basic.turingmachine'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(systemRoutes)

app.listen(3000, () => { console.log('Server is running') })





