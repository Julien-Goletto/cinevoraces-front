type AboutProps = {
  children?: React.ReactNode
}
type Content = {
  movie: DBMovie,
  isLoading: boolean
}
type Description = {
  movie: DBMovie
}
type ErrorPage = {
  errorNum?: number,
};
type FieldsetRadio = {
  array: radioFilter[],
  label: string,
  handler: onChangeEventHandler
}
type FieldsetCheckbox = { 
  array: tag[],
  tagName: string,
  handler: onChangeEventHandler
}
interface Layout {
  children?: import('react').ReactNode
};
type Loader = {
  isMaxed?: boolean
}
type MovieGrid = {
  movies: DBMovie[],
  isLoading: boolean
}
type DBMovie = {
  id: number,
  french_title: string,
  original_title: string,
  poster_url: string,
  directors: string[],
  release_date: string,
  runtime: number,
  casting: string[],
  presentation: string,
  is_published: boolean,
  publishing_date: string,
  user_id: number,
  season_id: number,
  createAt: string,
  updatedAt: string | null,
};
type Metrics = {
  data: {
    countries_count: string,
    movies_count: string,
    seasons_count: string,
  }
  isLoading: boolean,
}
type ToastProps = {
  type: string,
  text: string,
  duration?: number,
  id: number
}