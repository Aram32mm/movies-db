import genresData from './genres.json';

export function getGenreNameById(genreId: number): string {
    const genre = genresData.genres.find((g) => g.id === genreId);
    return genre? genre.name : 'Unknown Genre';
}
