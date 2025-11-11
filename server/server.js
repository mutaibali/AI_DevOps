import express from "express";
import cors from "cors";

const app = express();

// ✅ Allow requests from your frontend
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.get("/api", (req, res) => {
  res.json({ users: ["Jami", "Alex", "Taylor"] });
});

app.listen(5001, () => console.log("✅ Server running on port 5001"));
