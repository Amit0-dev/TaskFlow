import "dotenv/config"
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
   origin: process.env.FRONTEND_URL,
   credentials: true
}));

// import routes
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/task.routes.js"
import dayRoutes from "./routes/day.routes.js"
import tagRoutes from "./routes/tag.routes.js"
import elementRoutes from "./routes/element.routes.js"


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/task", taskRoutes)
app.use("/api/v1/day", dayRoutes)
app.use("/api/v1/keep", tagRoutes)
app.use("/api/v1/keep/elem", elementRoutes)

export { app };
