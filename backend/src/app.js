require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { clerkMiddleware, getAuth } = require("@clerk/express");

const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware());

app.get("/whoami", (req, res) => {
  const { userId, sessionId, sessionClaims } = getAuth(req);

  res.json({
    success: true,
    data: {
      userId,
      sessionId,
      hasClaims: !!sessionClaims,
      authOnReq: req.auth ?? null,
    },
  });
});

const davlatRoutes = require("./routes/davlat.routes");

app.get("/health", (req, res) => {
  res.json({
    success: true,
    data: {
      status: "ok",
      timestamp: new Date().toISOString(),
    },
  });
});

// Davlat routes
app.use("/davlat", davlatRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint topilmadi",
  });
});

module.exports = app;
