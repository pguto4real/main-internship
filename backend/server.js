import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors());

// Or configure CORS options for more control
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true 
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //parse data(url encoded)
app.use(cookieParser())

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // connetMongoDB()
});
