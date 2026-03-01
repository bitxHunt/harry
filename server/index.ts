import app from "./src/app.js";
import { env } from "@/config/env.js";

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
