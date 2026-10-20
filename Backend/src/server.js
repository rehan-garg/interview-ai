const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});

const app = require("./app.js");
const connectDB = require("./config/database.js");
const generateInterviewReport = require('./services/ai.service.js')
const {resume, selfDescription, jobDescription} = require('./services/temp.js')

connectDB();
generateInterviewReport({resume, selfDescription, jobDescription})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
