import express from "express";
import {
  anime,
  animeVideoSource,
  genre,
  genreList,
  recentRelease,
  search,
} from "./parser";

const app = express.Router();

app.get("/", async (req: any, res: any) => {
  return res.status(200).send("Otakudesu Server is ready 🚀");
});

app.get("/recent", async (req: any, res: any) => {
  try {
    const { page } = req.query;
    const data = await recentRelease(page);
    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({
      error: "Internal Error",
      message: err.toString(),
    });
  }
});

app.get("/search", async (req: any, res: any) => {
  try {
    const { page, query } = req.query;
    const data = await search(query, page);
    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({
      error: "Internal Error",
      message: err.toString(),
    });
  }
});

app.get("/popular", async (req: any, res: any) => {
  return res.status(500).json({
    error: "Internal Error",
    message: "This request is not available for this server",
  });
});

app.get("/genre", async (req: any, res: any) => {
  try {
    const { page } = req.query;
    const data = await genreList(page);
    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({
      error: "Internal Error",
      message: err.toString(),
    });
  }
});

app.get("/genre/:genre", async (req: any, res: any) => {
  try {
    const genreType = req.params.genre;
    const { page } = req.query;
    const data = await genre(genreType, page);
    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({
      error: "Internal Error",
      message: err.toString(),
    });
  }
});

app.get("/season", async (req: any, res: any) => {
  return res.status(500).json({
    error: "Internal Error",
    message: "This request is not available for this server",
  });
});

app.get("/season/:season", async (req: any, res: any) => {
  return res.status(500).json({
    error: "Internal Error",
    message: "This request is not available for this server",
  });
});

app.get("/anime/:animeSlug", async (req: any, res: any) => {
  try {
    const slug = req.params.animeSlug;
    const data = await anime(slug);
    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({
      error: "Internal Error",
      message: err.toString(),
    });
  }
});

app.get("/anime/:animeId/:episodeId", async (req: any, res: any) => {
  try {
    const id = req.params.animeId;
    const ep = req.params.episodeId;
    const data = await animeVideoSource(id, ep);
    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({
      error: "Internal Error",
      message: err.toString(),
    });
  }
});

export default app;
