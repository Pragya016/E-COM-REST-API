import app from "./index.js"
import {connectToMongodb} from "./src/config/mongodb.js";

// create server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}.`)
    connectToMongodb();
})