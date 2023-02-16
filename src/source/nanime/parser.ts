import axios from "axios";
import cheerio from "cheerio";
import type { AnimeDetails, Anime, Genre, AnimeVideo, ListAnime } from "../utils/types";

const BASEURL = "https://nanimex1.com";

export const recentRelease = async (page: number = 1): Promise<ListAnime> => {
  let list: Anime[] = [];
  try {
    const base = await axios.get(`${BASEURL}/page/${page}`);
    const $ = cheerio.load(base.data);
    let maxPage = ~~$(".box-poster .btn-group .page-numbers:not(.prev,.next)").last().html()!;
    if (!!!maxPage) {
      throw new Error("Page not found, you may request more than the maximum page");
    }
    $(".box-poster .content-item").each((i, el) => {
      return list.push({
        slug: $(el).find("a").attr("href")?.split("/")[4]!,
        title: $(el).find("h3").attr("title")!,
        episode: ~~$(el).find(".episode .btn-danger").text().replace("Episode", "").trim(),
        cover: $(el).find(".poster img").attr("data-lazy-src")!,
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

export const search = async (query: string, page: number = 1): Promise<ListAnime> => {
  let list: Anime[] = [];
  try {
    const base = await axios.get(`${BASEURL}/page/${page}/?s=${query}`);
    const $ = cheerio.load(base.data);
    let maxPage = ~~$(".box-poster .btn-group .page-numbers:not(.prev,.next)").last().html()!;
    if (!!!maxPage) {
      throw new Error("Anime not found, or you may request more than the maximum page");
    }
    $(".box-poster .content-item").each((i, el) => {
      if (!!$(el).find('.episode .btn-danger:contains("Episode")').html()) {
        return list.push({
          slug: $(el).find("a").attr("href")?.split("/")[4]!,
          title: $(el).find("h3").attr("title")!,
          episode: ~~$(el).find(".episode .btn-danger").text().replace("Episode", "").trim(),
          cover: $(el).find(".poster img").attr("src")!,
          url: $(el).find("a").attr("href")!,
        });
      }
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

export const genreList = async (page: number = 1): Promise<Genre[]> => {
  let list: Genre[] = [];
  try {
    const base = await axios.get(`${BASEURL}`);
    const $ = cheerio.load(base.data);
    if (!!!$(".box-content:last-child .box-primary:nth-child(2) .box-body a").html()) {
      throw new Error("Page not found, you may request more than the maximum page");
    }
    $(".box-content:last-child .box-primary:nth-child(2) .box-body a").each((i, el) => {
      list.push({
        slug: $(el).attr("href")?.split("/")[4]!,
        title: $(el).text(),
        url: $(el).attr("href")!,
      });
    });
    return list;
  } catch (err: any) {
    throw err;
  }
};

export const genre = async (genre: string, page: number = 1): Promise<ListAnime> => {
  let list: Anime[] = [];
  try {
    const base = await axios.get(`${BASEURL}/genre/${genre}/page/${page}`);
    const $ = cheerio.load(base.data);
    let maxPage = ~~$(".box-poster .btn-group .page-numbers:not(.prev,.next)").last().html()!;
    if (!!!maxPage) {
      throw new Error("Genre not found, you may request more than the maximum page");
    }
    $(".box-poster .content-item").each((i, el) => {
      if (!!$(el).find('.episode .btn-danger:contains("Episode")').html()) {
        return list.push({
          slug: $(el).find("a").attr("href")?.split("/")[4]!,
          title: $(el).find("h3").attr("title")!,
          episode: ~~$(el).find(".episode .btn-danger").text().replace("Episode", "").trim(),
          cover: $(el).find(".poster img").attr("data-lazy-src")!,
          url: $(el).find("a").attr("href")!,
        });
      }
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

export const seasonList = async (page: number = 1): Promise<Genre[]> => {
  let list: Genre[] = [];
  try {
    const base = await axios.get(`${BASEURL}/properties/season?page=${page}`);
    const $ = cheerio.load(base.data);
    if (!!!$(".box-content:last-child .box-primary:nth-child(2) .box-body a").html()) {
      throw new Error("Page not found, or you may request more than the maximum page");
    }
    $(".box-content:last-child .box-primary:nth-child(3) .box-body a").each((i, el) => {
      list.push({
        slug: $(el).attr("href")?.split("/")[4]!,
        title: $(el).text(),
        url: $(el).attr("href")!,
      });
    });
    return list;
  } catch (err: any) {
    throw err;
  }
};

export const season = async (season: string, page: number = 1): Promise<ListAnime> => {
  let list: Anime[] = [];
  try {
    const base = await axios.get(`${BASEURL}/year_/${season}/page/${page}`);
    const $ = cheerio.load(base.data);
    let maxPage = ~~$(".box-poster .btn-group .page-numbers:not(.prev,.next)").last().html()!;
    if (!!!maxPage) {
      throw new Error("Season not found, you may request more than the maximum page");
    }
    $(".box-poster .content-item").each((i, el) => {
      if (!!$(el).find('.episode .btn-danger:contains("Episode")').html()) {
        return list.push({
          slug: $(el).find("a").attr("href")?.split("/")[4]!,
          title: $(el).find("h3").attr("title")!,
          episode: ~~$(el).find(".episode .btn-danger").text().replace("Episode", "").trim(),
          cover: $(el).find(".poster img").attr("data-lazy-src")!,
          url: $(el).find("a").attr("href")!,
        });
      }
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

export const anime = async (slug: string): Promise<AnimeDetails> => {
  try {
    const base = await axios.get(`${BASEURL}/anime/${slug}`);
    const $ = cheerio.load(base.data);
    if (!!!$(".box-default .box-body > div:nth-child(3) .episode_list").html()) {
      throw new Error("Anime not found");
    }
    let genre: string[] = [];
    $(".box-default .box-primary table")
      .find('td:contains("Genre")')
      .parent()
      .find("a")
      .each((i, el) => {
        genre.push($(el).text());
      });
    let episode: string[] = [];
    $(".box-default .box-body > div:nth-child(3) .episode_list table")
      .find("tr")
      .each((i, el) => {
        episode.push($(el).text());
      });
    return {
      slug: $('meta[property="og:url"]').attr("content")?.split("/")[4]!,
      title: $(
        ".box-content .box-body > div:nth-child(2) table tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)"
      ).text(),
      titleAlt: $(
        ".box-content .box-body > div:nth-child(2) table tr:nth-child(2) > td:nth-child(2)"
      ).text(),
      synopsis: $(".box-content .box-body .attachment-block.clearfix .attachment-text").text(),
      episodeTotal: ~~$(".box-default>.box-body>.box-primary table")
        .find('td:contains("Total Episode")')
        .parent()
        .find("td:last-child")
        .text(),
      episode: episode.length,
      season: $(
        ".box-content .box-body > div:nth-child(2) table tr:nth-child(1) > td:nth-child(2) > a:nth-child(2)"
      ).text(),
      genre: genre,
      cover: $(".box-content .box-body .attachment-block.clearfix .attachment-img").attr(
        "data-lazy-src"
      )!,
      url: $('meta[property="og:url"]').attr("content")!,
    };
  } catch (err: any) {
    throw err;
  }
};

export const animeVideoSource = async (slug: string, ep: number): Promise<AnimeVideo> => {
  try {
    const formattedEp = ("00" + ep).slice(-3);
    const base = await axios.get(`${BASEURL}/episode/${slug}-episode-${formattedEp}`);
    const $ = cheerio.load(base.data);
    if (!!!$("#change-server > option").html()) {
      throw new Error("Episode not found");
    }
    let videoSource: { quality: string; url: string }[] = [];
    $("#change-server > option").each((i, el) => {
      videoSource.push({
        quality: $(el).text().split(" ")[0]!,
        url: $(el).attr("value")!,
      });
    });

    return {
      episode: ~~ep,
      video: videoSource,
    };
  } catch (err: any) {
    throw err;
  }
};
