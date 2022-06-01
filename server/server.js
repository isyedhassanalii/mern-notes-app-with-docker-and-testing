import express from "express"
import env from "dotenv"
import colors from "colors"
import notesRoutes from "./routes/notesRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { errorHandler } from "./middleware/errorMiddleware.js"
import { connectDb } from "./config/db.js"
import bodyParser from "body-parser"


const app = express();
env.config();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
connectDb()
const PORT= process.env.PORT ||5000


app.use("/api/v1",notesRoutes);
app.use("/api/v1",userRoutes);
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
});