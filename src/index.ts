import fs from 'fs'
import express from 'express'
import systemRoutes from './routes/system.routes'
import TuringMaching from './utils/touringMachines/basic.turingmachine'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(systemRoutes)


///home/century/OpenCV-backend/src/utils/ai/image.png
const file = fs.readFileSync('/home/century/OpenCV-backend/src/utils/ai/image.png')//
const payload = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 10000));
console.log(payload[0], typeof payload, payload)
const worker = new TuringMaching('kolko je neparnych cisel?',[payload[0],payload[1]], 'Array')
async function show(){
    console.log('result: ',await worker.run(payload))
}
show()


app.listen(3000, () => { console.log('Server is running') })





