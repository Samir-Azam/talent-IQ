import express from 'express'
import { ENV } from './lib/env.js'
import { connectDB } from './lib/db.js'
import cors from "cors"
import { serve } from "inngest/express"
import { inngest, functions } from './lib/inngest.js'
import { clerkMiddleware, requireAuth } from "@clerk/express";
import path from "path"

const __dirname = path.resolve();

const app = express()

// middlewares

app.use(express.json())
app.use(clerkMiddleware()) // by using this we got access to req.auth()
app.use(
    cors(
        {
            origin: ENV.CLIENT_URL,
            credentials: true
        }
    )
)
app.use("/api/inngest", serve({client: inngest, functions}))

// routes
import chatRoutes from "./routes/chat.routes.js"
app.use("/api/chat",chatRoutes)


app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})


if (ENV.NODE_ENV=="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
    });
}

const startServer = async ()=>{
    try {
        await connectDB()
        app.listen(ENV.PORT, () => console.log(`Server running on port: ${ENV.PORT}`))
    } catch (error) {
        console.error(`❌ Error in starting server: ${error}`)
    }
}

startServer()