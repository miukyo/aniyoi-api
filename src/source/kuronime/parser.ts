import axios, { Axios } from "axios";
import cheerio from "cheerio";
import type {
  AnimeDetails,
  Anime,
  Genre,
  AnimeVideo,
  ListAnime,
} from "../utils/types";
import decryptor from "./decryptor.js";

const BASEURL = process.env.KURONIME_URL;

export const recentRelease = async (page: number = 1): Promise<ListAnime> => {
  let list: Anime[] = [];
  try {
    const base = await axios.get(`${BASEURL}/page/${page}`);
    const $ = cheerio.load(base.data);
    if (!!!$(".postbody").html()) {
      throw new Error("Page not found");
    }
    let maxPage = ~~$(".postbody>.bixbox")
      .first()
      .find(".pagination a:not(.prev,.next)")
      .last()
      .text()
      .replace(",", "");
    $(".postbody>.bixbox")
      .first()
      .find(".excstf article")
      .each((i, el) => {
        return list.push({
          slug: $(el)
            .find("a")
            .attr("href")
            ?.split("/")[3]
            .replace(/\b(?:nonton-|-episode-[a-zA-Z0-9_]*)\b/gi, "")!,
          title: $(el).find(".bsuxtt").text()!,
          episode: ~~$(el).find(".bt .ep").text().replace("Episode", "").trim(),
          cover:
            $(el)
              .find(".limit img[itemprop]")
              .attr("data-src")
              ?.split("?")[0]! + "?resize=141,200",
          url: $(el)
            .find("a")
            .attr("href")
            ?.replace(/\b(?:nonton-|-episode-[a-zA-Z0-9_]*)\b/gi, "")!,
        });
      });
    return {
      page: ~~page,
      maxPage: maxPage,
      list: list,
    };
  } catch (err: any) {
    throw err;
  }
};

export const search = async (
  query: string,
  page: number = 1
): Promise<ListAnime> => {
  let list: Anime[] = [];
  try {
    const base = await axios.get(
      `${BASEURL}/anime/page/${page}/?title=${query}&order=update`
    );
    const $ = cheerio.load(base.data);
    if (!!!$(".postbody").html()) {
      throw new Error("Page not found");
    }
    let maxPage = ~~$(".postbody>.bixbox")
      .first()
      .find(".pagination a:not(.prev,.next)")
      .last()
      .text()
      .replace(",", "");
    $(".postbody>.bixbox")
      .first()
      .find(".listupd article")
      .each((i, el) => {
        return list.push({
          slug: $(el).find("a").attr("href")?.split("/")[4]!,
          title: $(el).find("a").attr("title")!,
          cover:
            $(el)
              .find(".limit img[itemprop]")
              .attr("data-src")
              ?.split("?")[0]! + "?resize=141,200",
          url: $(el).find("a").attr("href")!,
        });
      });
    if (list.length == 0) {
      throw new Error("Anime not found");
    }
    return {
      page: ~~page,
      maxPage: maxPage,
      list: list,
    };
  } catch (err: any) {
    throw err;
  }
};

export const popular = async (page: number = 1): Promise<ListAnime> => {
  let list: Anime[] = [];
  try {
    const base = await axios.get(`${BASEURL}/popular-anime/page/${page}`);
    const $ = cheerio.load(base.data);
    if (!!!$(".postbody").html()) {
      throw new Error("Page not found");
    }
    let maxPage = ~~$(".postbody>.bixbox")
      .first()
      .find(".pagination a:not(.prev,.next)")
      .last()
      .text()
      .replace(",", "");
    $(".postbody>.bixbox")
      .first()
      .find(".listupd article")
      .each((i, el) => {
        return list.push({
          slug: $(el).find("a").attr("href")?.split("/")[4]!,
          title: $(el).find("a").attr("title")!,
          cover:
            $(el)
              .find(".limit img[itemprop]")
              .attr("data-src")
              ?.split("?")[0]! + "?resize=141,200",
          url: $(el).find("a").attr("href")!,
        });
      });
    return {
      page: ~~page,
      maxPage: maxPage,
      list: list,
    };
  } catch (err: any) {
    throw err;
  }
};

export const genreList = async (page: number = 1): Promise<Genre[]> => {
  let list: Genre[] = [];
  try {
    const base = await axios.get(`${BASEURL}/genres`);
    const $ = cheerio.load(base.data);
    if (!!!$(".postbody").html()) {
      throw new Error("Page not found");
    }
    $(".postbody>.bixbox")
      .first()
      .find(".genre li")
      .each((i, el) => {
        list.push({
          slug: $(el).find("a").attr("href")?.split("/")[4]!,
          title: $(el).find("a").text(),
          url: $(el).find("a").attr("href")!,
        });
      });
    return list;
  } catch (err: any) {
    throw err;
  }
};

export const genre = async (
  genre: string,
  page: number = 1
): Promise<ListAnime> => {
  let list: Anime[] = [];
  try {
    const base = await axios.get(`${BASEURL}/genres/${genre}/page/${page}`);
    const $ = cheerio.load(base.data);
    if (!!!$(".postbody").html()) {
      throw new Error("Page not found");
    }
    let maxPage = ~~$(".postbody>.bixbox")
      .first()
      .find(".pagination a:not(.prev,.next)")
      .last()
      .text()
      .replace(",", "");
    $(".postbody>.bixbox")
      .first()
      .find(".listupd article")
      .each((i, el) => {
        return list.push({
          slug: $(el).find("a").attr("href")?.split("/")[4]!,
          title: $(el).find("a").attr("title")!,
          cover:
            $(el)
              .find(".limit img[itemprop]")
              .attr("data-src")
              ?.split("?")[0]! + "?resize=141,200",
          url: $(el).find("a").attr("href")!,
        });
      });
    return {
      page: ~~page,
      maxPage: maxPage,
      list: list,
    };
  } catch (err: any) {
    throw err;
  }
};

export const seasonList = async (page: number = 1): Promise<Genre[]> => {
  let list: Genre[] = [];
  try {
    const base = await axios.get(`${BASEURL}/season/winter-2023`);
    const $ = cheerio.load(base.data);
    if (!!!$(".postbody").html()) {
      throw new Error("Page not found");
    }
    $(".postbody>.bixbox")
      .first()
      .find("#season option:not([selected])")
      .each((i, el) => {
        list.push({
          slug: $(el).attr("value")!,
          title: $(el).text(),
          url: `${BASEURL}/season/` + $(el).attr("value")!,
        });
      });
    return list;
  } catch (err: any) {
    throw err;
  }
};

export const season = async (
  season: string,
  page: number = 1
): Promise<ListAnime> => {
  let list: Anime[] = [];
  try {
    const base = await axios.get(`${BASEURL}/season/${season}`);
    const $ = cheerio.load(base.data);
    if (!!!$(".postbody").html()) {
      throw new Error("Page not found");
    }
    let maxPage = 0;
    $(".postbody>.bixbox")
      .first()
      .find(".listupd .sebox")
      .each((i, el) => {
        return list.push({
          slug: $(el).find(".tisebox a").attr("href")?.split("/")[4]!,
          title: $(el).find(".tisebox a").text()!,
          cover:
            $(el).find(".bigsebox img").attr("data-src")?.split("?")[0]! +
            "?resize=141,200",
          url: $(el).find(".tisebox a").attr("href")!,
        });
      });
    return {
      page: ~~page,
      maxPage: maxPage,
      list: list,
    };
  } catch (err: any) {
    throw err;
  }
};

export const anime = async (slug: string): Promise<AnimeDetails> => {
  try {
    const base = await axios.get(`${BASEURL}/anime/${slug}`);
    const $ = cheerio.load(base.data);
    if (!!!$(".postbody").html()) {
      throw new Error("Anime not found");
    }
    let genre: string[] = [];
    $(".postbody article .entry-content")
      .find(".infodetail ul li:nth-child(2) a")
      .each((i, el) => {
        genre.push($(el).text());
      });
    let episode: string[] = [];
    $(".postbody article .entry-content")
      .find(".bixbox.bxcl ul li")
      .each((i, el) => {
        if (!$(el).find(".lchx a").text().match(/OVA/)) {
          episode.push($(el).find(".lchx a").text());
        }
      });
    return {
      slug: $('meta[property="og:url"]').attr("content")?.split("/")[4]!,
      title: $(".postbody .info-header h1.entry-title").text(),
      titleAlt: $(".postbody .infodetail ul li:first-child")
        .text()
        .replace("Judul:", "")
        .trim(),
      synopsis: $(".postbody .main-info .r .conx p").text(),
      episodeTotal:
        ~~$(".postbody .infodetail ul li:nth-child(9)")
          .text()
          .split(":")[1]
          .trim() | 0,
      episode: episode.length,
      season: $(".postbody .infodetail ul li:nth-child(6)").find("a").text(),
      genre: genre,
      cover:
        $(".postbody .main-info .l img").attr("data-src")?.split("?")[0]! +
        "?resize=141,200"!,
      url: $('meta[property="og:url"]').attr("content")!,
    };
  } catch (err: any) {
    throw err;
  }
};

export const animeVideoSource = async (
  slug: string,
  ep: number
): Promise<AnimeVideo> => {
  try {
    const base = await axios.get(`${BASEURL}/nonton-${slug}-episode-${ep}`);
    const $ = cheerio.load(base.data);
    if (!!!$(".postbody").html()) {
      throw new Error("Episode not found");
    }
    let embedUrl: string = $("#tonton.video-content .player-embed")
      .find("iframe")
      .attr("data-src")!;
    const videoSourceBase = await axios.get(embedUrl);
    const $$ = cheerio.load(videoSourceBase.data);
    if (!!$(".postbody .megavid .video-nav .iconx a").html()) {
      let enc = $$("script:not([src])")
        .first()
        .html()!
        .match(/\(r\)\)\}(.*)/)!;
      let penc = enc[1].replace(/[\(\)"']/g, "").split(",");
      let decrypt = decryptor(
        penc[0],
        parseInt(penc[1]),
        penc[2],
        parseInt(penc[3]),
        parseInt(penc[4]),
        parseInt(penc[5])
      );
      let getSrcs: { file: string; label: string; type: string }[] = JSON.parse(
        decrypt.match(/srcs\s*=\s*(\[.*\])/)![1]
      );

      let videoSource: { quality: string; url: string }[] = [];

      const waitSrc: Promise<{ quality: string; url: string }>[] = getSrcs.map(
        async (el, i) => {
          const url = await axios.get(el.file, { maxRedirects: 0 });
          let $$$ = cheerio.load(url.data);
          let surl = $$$("a").attr("href");
          return {
            quality:
              el.label === "HD"
                ? "720p"
                : el.label === "SD"
                ? "480p"
                : "Unknown",
            url: surl!,
          };
        }
      );
      videoSource = await Promise.all(waitSrc);
      return {
        episode: ~~ep,
        video: videoSource,
      };
    } else {
      throw new Error("Video source are not supported.");
    }
  } catch (err: any) {
    throw err;
  }
};
