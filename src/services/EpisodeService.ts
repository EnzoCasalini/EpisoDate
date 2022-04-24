import {EpisoDateAPI} from "../api/results/EpisoDateAPI";

async function getSeries(url:string, allSeries: EpisoDateAPI) : Promise<EpisoDateAPI> {
    const response = await fetch(url);
    const data = await response.json() as EpisoDateAPI;

    return {
        page: data.page,
        pages: data.pages,
        total: data.total,
        tv_shows: [...allSeries.tv_shows, ...data.tv_shows]
    }
}

export { getSeries }