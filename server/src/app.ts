import express from "express"
import morgan from "morgan"
import cors from "cors";
import userRoutes from "./routes/user.routes";


const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/users" , userRoutes);

// Heath Check Route
app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});


export default app;