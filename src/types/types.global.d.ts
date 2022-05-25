
type Reviews = [{
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

type ButtonSearch = {
  children: React.ReactNode
};
type CommentProps = {
  pic: string,
  name: string,
  date: string,
  text: string,
  edit?: boolean,
  rating: number
};
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
type DBMovieFilter = {
  season_number: number | string,
  genres: string[],
  countries: string[],
};
type TMDBMovie = {
  id: number,
  title: string
  release_date: string,
  poster_path: string,
  original_title?: string
  poster_url?: string
}
type ProposalMovie = {
  id?: number,
  episode?: string
  french_title: string,
  original_title: string,
  poster_url: string,
  directors: string[],
  release_date: string,
  runtime: number,
  casting: string[],
  presentation?: string,
  publishing_date?: string,
  user_id?: number,
  season_id?: number,
  movie_genres: string[],
  movie_languages: string[],
  movie_countries: string[],
}

type Director = {
  job: string,
  name: string,
  id: number
}
type StarRating = {
  alt?: boolean,
  value?: number,
  isInput?: boolean
};
type GlobalState = {
  mobileIsOpen: boolean,
  connectionIsOpen: boolean,
  userIsOpen: boolean,
  toasts: object[],
}
type Toast = {
  payload: {
    type: 'error' | 'warn' | 'success',
    text: string,
    duration?: number,
    id?: number
  }
}
type RemoveToast = {
  payload: {
    id:number
  } | number
}
type Comment = {
  avatar_url: null | string,
  comment: string,
  movie_id: number,
  rating: null | number,
  user_id: number,
  user_pseudo: string
}
