export interface SerieDetails {
    tvShow: {
        id: number,
        name: string,
        permalink: string,
        url: string,
        description: string,
        network: string,
        image_thumbnail_path: string,
        rating: number,
        rating_count: number,
        genres: string[]
    }
}