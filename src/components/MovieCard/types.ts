export interface IMovieCard {
    /**
     * The title of the movie
     */
    title: string;
    /**
     * The id of the movie genre to get the genre name
     */
    genreId: number;
    movieId: number;
    voteAverage: number;
    posterPath: string;
}