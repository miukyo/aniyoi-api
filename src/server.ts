import express from "express";
import cors from "cors";
import kuramanime from "./source/kuramanime/kuramanime";
import nanime from "./source/nanime/nanime";
import kuronime from "./source/kuronime/kuronime";



import axios from "axios";

const port = 3001;
export const app = express();
axios.defaults.validateStatus = () => true;
axios.defaults.headers.common["User-Agent"] = process.env.USER_AGENT;

app.use(cors());
app.get("/", async (req, res) => {
  res.send("ANIYOI API IS UP 🚀");
});
app.use("/kuramanime", kuramanime);
app.use("/nanime", nanime);
app.use("/kuronime", kuronime);



app.listen(port, () => {
  console.warn("\nReady 🚀");
});


