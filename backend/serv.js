import http from 'http'
import express from 'express'
import ip from 'ip'
import cors from 'cors'

let currentSide = "middle"
let isPressed = "no"

const app = express()
const server = http.createServer(app)
console.log(ip.address())
app.use(express.json())
app.use(cors())


app.get('/',(req, res) => {
    res.send({"msg":'Hello World!'})
})
app.post('/',(req, res) => {
    currentSide = req.body.side
    isPressed = req.body.isPressed
    console.log('post')
    console.log(req.body)
    res.send('post')
})
app.get('/side',(req, res) => {
    console.log('side', currentSide, isPressed)
    res.json({
        data: {
            side: currentSide,
            Pressed: isPressed
        }
    })
})
server.listen(3000, () => {
    console.log("F.D.plume")
})