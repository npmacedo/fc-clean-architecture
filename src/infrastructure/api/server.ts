import "dotenv/config";
import { app } from "./express";

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
