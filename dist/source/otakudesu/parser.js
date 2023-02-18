"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animeVideoSource = exports.anime = exports.genre = exports.genreList = exports.search = exports.recentRelease = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const BASEURL = "https://otakudesu.ltd";
const recentRelease = async (page = 1) => {
    let list = [];
    try {
        const base = await axios_1.default.get(`${BASEURL}/ongoing-anime/page/${page}`);
        const $ = cheerio_1.default.load(base.data);
        let maxPage = ~~$(".venutama .pagination .page-numbers:not(.prev,.next)")
            .last()
            .html();
        if (!maxPage) {
            throw new Error("Page not found, you may request more than the maximum page");
        }
        $(".venutama .venz ul>li").each((i, el) => {
            return list.push({
                slug: $(el).find(".thumb a").attr("href")?.split("/")[4],
                title: $(el).find(".thumb h2").text(),
                episode: ~~$(el).find(".epz").text().replace("Episode", "").trim(),
                cover: $(el).find(".thumb img").attr("src"),
                url: $(el).find(".thumb a").attr("href"),
            });
        });
        return {
            page: ~~page,
            maxPage: maxPage,
            list: list,
        };
    }
    catch (err) {
        throw err;
    }
};
exports.recentRelease = recentRelease;
const search = async (query, page = 1) => {
    let list = [];
    try {
        const base = await axios_1.default.get(`${BASEURL}/?s=${query}&post_type=anime`);
        const $ = cheerio_1.default.load(base.data);
        let maxPage = 1;
        if ($(".venutama .chivsrc li").length < 1) {
            throw new Error("Anime not found, or you may request more than the maximum page");
        }
        $(".venutama .chivsrc li").each((i, el) => {
            return list.push({
                slug: $(el).find("h2>a").attr("href")?.split("/")[4],
                title: $(el)
                    .find("h2>a")
                    .text()
                    .replace(/\s*\(Episode[^\)]*\)|\s*Subtitle Indonesia*|\s*Sub Indo*/g, ""),
                cover: $(el).find("img").attr("src"),
                url: $(el).find("h2>a").attr("href"),
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
    }
    catch (err) {
        throw err;
    }
};
exports.search = search;
const genreList = async (page = 1) => {
    let list = [];
    try {
        const base = await axios_1.default.get(`${BASEURL}/genre-list`);
        const $ = cheerio_1.default.load(base.data);
        $(".genres li a").each((i, el) => {
            list.push({
                slug: $(el).attr("href")?.split("/")[2],
                title: $(el).text(),
                url: $(el).attr("href"),
            });
        });
        return list;
    }
    catch (err) {
        throw err;
    }
};
exports.genreList = genreList;
const genre = async (genre, page = 1) => {
    let list = [];
    try {
        const base = await axios_1.default.get(`${BASEURL}/genres/${genre}/page/${page}`);
        const $ = cheerio_1.default.load(base.data);
        let maxPage = ~~$(".venser .pagination .page-numbers:not(.prev,.next)")
            .last()
            .html();
        if (!maxPage) {
            throw new Error("Genre not found, you may request more than the maximum page");
        }
        $(".venser .col-anime").each((i, el) => {
            return list.push({
                slug: $(el).find(".col-anime-title a").attr("href")?.split("/")[4],
                title: $(el).find(".col-anime-title a").text(),
                episode: ~~$(el)
                    .find(".col-anime-eps")
                    .text()
                    .replace(/Eps|Unknown/g, "")
                    .trim(),
                cover: $(el).find(".col-anime-cover img").attr("src"),
                url: $(el).find(".col-anime-title a").attr("href"),
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
    }
    catch (err) {
        throw err;
    }
};
exports.genre = genre;
const anime = async (slug) => {
    try {
        const base = await axios_1.default.get(`${BASEURL}/anime/${slug}`, {
            maxRedirects: 0,
        });
        const $ = cheerio_1.default.load(base.data);
        if (!base.data) {
            throw new Error("Anime not found");
        }
        let genre = [];
        $(".infozingle p:last-child")
            .find("a")
            .each((i, el) => {
            genre.push($(el).text());
        });
        let episode = [];
        $(".episodelist ul li").each((i, el) => {
            episode.push($(el).find("span:first-child").text());
        });
        return {
            slug: $('meta[property="og:url"]').attr("content")?.split("/")[4],
            title: $(".infozingle p:first-child").text().replace("Judul:", "").trim(),
            titleAlt: $(".infozingle p:nth-child(2)")
                .text()
                .replace("Japanese:", "")
                .trim(),
            synopsis: "Synopsis not available",
            episodeTotal: ~~$(".infozingle p:nth-child(7)")
                .text()
                .replace(/Total Episode:|Unknown/g, ""),
            episode: episode.length,
            genre: genre,
            cover: $(".venser .fotoanime img").attr("src"),
            url: $('meta[property="og:url"]').attr("content"),
        };
    }
    catch (err) {
        throw err;
    }
};
exports.anime = anime;
const animeVideoSource = async (slug, ep) => {
    try {
        const formattedEp = ("00" + ep).slice(-3);
        const base = await axios_1.default.get(`${BASEURL}/episode/${slug}-episode-${formattedEp}`);
        const $ = cheerio_1.default.load(base.data);
        if (!$("#change-server > option").html()) {
            throw new Error("Episode not found");
        }
        let videoSource = [];
        $("#change-server > option").each((i, el) => {
            videoSource.push({
                quality: $(el).text().split(" ")[0],
                url: $(el).attr("value"),
            });
        });
        return {
            episode: ~~ep,
            video: videoSource,
        };
    }
    catch (err) {
        throw err;
    }
};
exports.animeVideoSource = animeVideoSource;
