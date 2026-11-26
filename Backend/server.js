import app from "./app.js";
import { db } from "./config/db.js";

const PORT = process.env.PORT || 5000;

const main = async () => {
  await db();
  app.listen(PORT, () => {
    console.log(`localhost running at port ${PORT}`);
  });
};

main().catch((err) => {
  console.error(`Backend startup failed: ${err.message}`);
  process.exit(1);
});