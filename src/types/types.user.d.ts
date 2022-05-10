type UserHeader = {
  username: string,
  avatar?: string | null,
  registerDate: string
}
type UserMetrics = {
  stats: {[key: string]: number}
}
type UserSubmittedFilm = {
  film?: submittedMovie
}

type submittedMovie = {
  title: string,
  cover: string,
  releaseDate: number,
  director: string[],
  genres: string[],
  publishDate: string
}