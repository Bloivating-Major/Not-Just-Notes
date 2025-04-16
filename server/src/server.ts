import app from "./app";
import config from "./config/config";
import connect from "./db/db";

// Connected To Database
connect();

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});