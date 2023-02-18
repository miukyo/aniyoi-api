"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animeVideoSource = exports.anime = exports.season = exports.seasonList = exports.genre = exports.genreList = exports.search = exports.recentRelease = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const BASEURL = "https://otakudesu.asia";
const recentRelease = async (page = 1) => {
    let list = [];
    try {
        const base = await axios_1.default.get(`${BASEURL}/ongoing-anime/page/${page}`);
        const $ = cheerio_1.default.load(base.data);
        let maxPage = ~~$(".venutama .pagination .page-numbers:not(.prev,.next)").last().html();
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
        const base = await axios_1.default.get(`${BASEURL}`);
        const $ = cheerio_1.default.load(base.data);
        if (!$(".box-content:last-child .box-primary:nth-child(2) .box-body a").html()) {
            throw new Error("Page not found, you may request more than the maximum page");
        }
        $(".box-content:last-child .box-primary:nth-child(2) .box-body a").each((i, el) => {
            list.push({
                slug: $(el).attr("href")?.split("/")[4],
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
        const base = await axios_1.default.get(`${BASEURL}/genre/${genre}/page/${page}`);
        const $ = cheerio_1.default.load(base.data);
        let maxPage = ~~$(".box-poster .btn-group .page-numbers:not(.prev,.next)").last().html();
        if (!maxPage) {
            throw new Error("Genre not found, you may request more than the maximum page");
        }
        $(".box-poster .content-item").each((i, el) => {
            if (!!$(el).find('.episode .btn-danger:contains("Episode")').html()) {
                return list.push({
                    slug: $(el).find("a").attr("href")?.split("/")[4],
                    title: $(el).find("h3").attr("title"),
                    episode: ~~$(el).find(".episode .btn-danger").text().replace("Episode", "").trim(),
                    cover: $(el).find(".poster img").attr("data-lazy-src"),
                    url: $(el).find("a").attr("href"),
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
    }
    catch (err) {
        throw err;
    }
};
exports.genre = genre;
const seasonList = async (page = 1) => {
    let list = [];
    try {
        const base = await axios_1.default.get(`${BASEURL}/properties/season?page=${page}`);
        const $ = cheerio_1.default.load(base.data);
        if (!$(".box-content:last-child .box-primary:nth-child(2) .box-body a").html()) {
            throw new Error("Page not found, or you may request more than the maximum page");
        }
        $(".box-content:last-child .box-primary:nth-child(3) .box-body a").each((i, el) => {
            list.push({
                slug: $(el).attr("href")?.split("/")[4],
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
exports.seasonList = seasonList;
const season = async (season, page = 1) => {
    let list = [];
    try {
        const base = await axios_1.default.get(`${BASEURL}/year_/${season}/page/${page}`);
        const $ = cheerio_1.default.load(base.data);
        let maxPage = ~~$(".box-poster .btn-group .page-numbers:not(.prev,.next)").last().html();
        if (!maxPage) {
            throw new Error("Season not found, you may request more than the maximum page");
        }
        $(".box-poster .content-item").each((i, el) => {
            if (!!$(el).find('.episode .btn-danger:contains("Episode")').html()) {
                return list.push({
                    slug: $(el).find("a").attr("href")?.split("/")[4],
                    title: $(el).find("h3").attr("title"),
                    episode: ~~$(el).find(".episode .btn-danger").text().replace("Episode", "").trim(),
                    cover: $(el).find(".poster img").attr("data-lazy-src"),
                    url: $(el).find("a").attr("href"),
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
    }
    catch (err) {
        throw err;
    }
};
exports.season = season;
const anime = async (slug) => {
    try {
        const base = await axios_1.default.get(`${BASEURL}/anime/${slug}`);
        const $ = cheerio_1.default.load(base.data);
        if (!$(".box-default .box-body > div:nth-child(3) .episode_list").html()) {
            throw new Error("Anime not found");
        }
        let genre = [];
        $(".box-default .box-primary table")
            .find('td:contains("Genre")')
            .parent()
            .find("a")
            .each((i, el) => {
            genre.push($(el).text());
        });
        let episode = [];
        $(".box-default .box-body > div:nth-child(3) .episode_list table")
            .find("tr")
            .each((i, el) => {
            episode.push($(el).text());
        });
        return {
            slug: $('meta[property="og:url"]').attr("content")?.split("/")[4],
            title: $(".box-content .box-body > div:nth-child(2) table tr:nth-child(1) > td:nth-child(2) > a:nth-child(1)").text(),
            titleAlt: $(".box-content .box-body > div:nth-child(2) table tr:nth-child(2) > td:nth-child(2)").text(),
            synopsis: $(".box-content .box-body .attachment-block.clearfix .attachment-text").text(),
            episodeTotal: ~~$(".box-default>.box-body>.box-primary table")
                .find('td:contains("Total Episode")')
                .parent()
                .find("td:last-child")
                .text(),
            episode: episode.length,
            season: $(".box-content .box-body > div:nth-child(2) table tr:nth-child(1) > td:nth-child(2) > a:nth-child(2)").text(),
            genre: genre,
            cover: $(".box-content .box-body .attachment-block.clearfix .attachment-img").attr("data-lazy-src"),
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
