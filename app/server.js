const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || "production";

app.get("/", (req, res) => {
    res.json({
        message: "Containerized web application is running",
        environment: APP_ENV,
        status: "healthy"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Application running on port ${PORT}`);
});
