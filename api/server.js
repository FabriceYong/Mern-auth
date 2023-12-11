import express from "express";
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.json('Welcome to the home page'))


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))