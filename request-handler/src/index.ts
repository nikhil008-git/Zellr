import express from "express";
import Subdomain from "./controllers/controller.js";

const app = express();

// Catch ALL requests and forward to S3
app.use("/",Subdomain);
//like id.zellr.app
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
