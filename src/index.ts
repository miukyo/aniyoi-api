import express from "express";
import cors from "cors";
import kuramanime from "./source/kuramanime/kuramanime";
import nanime from "./source/nanime/nanime";
import kuronime from "./source/kuronime/kuronime";
import otakudesu from "./source/otakudesu/otakudesu";

import axios from "axios";

export const app = express();
axios.defaults.validateStatus = () => true;
axios.defaults.headers.common["User-Agent"] =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.54";

app.use(cors());
app.get("/", async (req, res) => {
  res.send("ANIYOI API IS UP 🚀");
});
app.use("/kuramanime", kuramanime);
app.use("/nanime", nanime);
app.use("/kuronime", kuronime);
// app.use("/otakudesu", otakudesu); //Url page streaming memakai slug yang berbeda

app.listen(process.env.PORT || 3001, () => {
  console.warn("\nReady 🚀");
});
