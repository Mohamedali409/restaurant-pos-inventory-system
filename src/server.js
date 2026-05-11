import "dotenv/config.js";
import app from "./app.js";
import connectDB from "./config/db.js";

// const PORT = process.env.PORT;
// console.log(PORT);
await connectDB();

export default app;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
