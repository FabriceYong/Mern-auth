import express from "express";
import 'dotenv/config'

import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

// database connection
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use('/api/users', userRoutes)
app.get('/', (req, res) => res.json('Welcome to the home page'))

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))