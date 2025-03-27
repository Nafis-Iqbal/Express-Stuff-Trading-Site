import app from "./app";

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, Express is working!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  setInterval(() => console.log("Server still alive..."), 30000);
});
