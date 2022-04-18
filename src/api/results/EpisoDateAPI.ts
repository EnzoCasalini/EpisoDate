import {Series} from "../responses/Series";

export interface EpisoDateAPI {
    page: number,
    pages: number,
    total: string,
    tv_shows: Series[],
}