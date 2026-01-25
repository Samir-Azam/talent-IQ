import express from 'express'
import { ENV } from './lib/env.js'
import { connectDB } from './lib/db.js'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

const startServer = async ()=>{
    try {
        await connectDB()
        app.listen(ENV.PORT, () => console.log(`Server running on port: ${ENV.PORT}`))
    } catch (error) {
        console.error(`❌ Error in starting server: ${error}`)
    }
}

startServer()