import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import ConnectDB from './config/db.js';
import postRoutes from './routes/postRoutes.js';
import isLogin from './middlewares/isLogin.js';
import commentRoutes from './routes/commentRoutes.js';
import aiRoutes from "./routes/ai.js";

dotenv.config();
const app = express()
const PORT = process.env.PORT;
const frontendUrl = process.env.FRONTEND_URI;

ConnectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: frontendUrl,
    credentials: true,
}));

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/api/ai", aiRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/me", isLogin, (req, res) => {
  // console.log(req.user.id);
  res.json({
    success: true,
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})