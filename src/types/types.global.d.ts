// API Arguments
type id = number | string;
type interactionBody = {
  rating?: number,
  comment?: Comment
}
type proposalBody = {
  publishing_date: string | null;
  presentation: string | null;
  user_id: number | null;
  season_id: string | null;
}
// Responses
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
  user_pseudo: string,
  user_avatar_url: string | null,
  season_number: number,
  genres: string[],
  countries: string[],
  languages: string[],
  watchlist_count: string,
  likes_count: string,
  ratings_count: string,
  views_count: string,
  avg_rating: string
};
type DBFilters = {
  seasons_list: [number[]],
  genres_list: string[],
  countries_list: string[],
  min_max_dates: [number, number],
  max_runtime: number
}
type DBProposal = {
  id: number,
  french_title: string,
  poster_url: string,
  directors: string[],
  release_date: string,
  user_id: number,
  user_pseudo: string,
  publishing_date: string,
  genres: string[],
  presentation: string
}
type TMDBMovie = {
  id: number,
  title: string
  release_date: string,
  poster_path: string,
  original_title?: string
  poster_url?: string
}
type filter = {
  name: string,
  value?: string,
  isChecked: boolean
}
type refreshToken = {
  accessToken: string,
  avatar_url: string,
  created_at: string,
  id: number,
  pseudo: string,
  refreshToken: string,
  role: string
}
type reviews = [{
  bookmarked: boolean,
  comment: string,
  created_at: string,
  liked: boolean,
  movie_id: number,
  rating: null | number,
  updated_at: string,
  user_id: number,
  viewed: boolean
}]
type slot = {
  id: number,
  season_number: number,
  episode: number,
  publishing_date: string,
  is_booked: boolean
}
type user = {
  pseudo: string,
  mail: string,
  password: string,
  accessToken: string,
  refreshToken: string
}