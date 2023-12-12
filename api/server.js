import express from "express";
import 'dotenv/config'
import cookieParser from "cookie-parser";

import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
// database connection
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.get('/', (req, res) => res.json('Welcome to the home page'))

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))