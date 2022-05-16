type ButtonSearch = {
  children: React.ReactNode
};
type CommentProps = {
  pic: string,
  name: string,
  date: string,
  text: string,
  edit?: boolean
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
  avg_rating: string
};
type TMDBMovie = {
  id: number,
  title: string
  release_date: string,
  poster_path: string,
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