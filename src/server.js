const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "./.env")
});

console.log("Mongo URI loaded:", !!process.env.MONGO_URI);

const app = require("./app.js");
const connectDB = require("./config/database.js");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
