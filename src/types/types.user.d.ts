type UserHeader = {
  username: string,
  avatar?: string | null,
  registerDate: string
}
type UserSubmittedFilm = {
  film?: submittedMovie
}
type user = {
  username: string,
  email: string,
}
type submittedMovie = {
  title: string,
  cover: string,
  releaseDate: number,
  director: string[],
  genres: string[],
  publishDate: string
}