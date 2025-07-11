import "dotenv/config"
import { db } from "./db/db.js";
import { app } from "./app.js";

const port = process.env.PORT || 8080

db()
    .then(() => {
        console.log("MongoDB Connected !")
        app.listen(port , ()=>{
            console.log(`🚀 Server is running on port ${port}`)
        })
    })
    .catch((err) => {
        console.log("Database connection failed ❌ ", err);
        process.exit(1);
    });
