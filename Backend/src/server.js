const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});

const app = require("./app.js");
const connectDB = require("./config/database.js");
const invokeGeminiAI = require('./services/ai.service.js')

connectDB();
invokeGeminiAI()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
