/* User */
type UserState = { 
  isOnline: boolean,
  id: number | null,
  pseudo: string,
  avatar: string,
  role: string,
  access_jwt: string | null | undefined,
  refresh_jwt: string | null | undefined,
};
type User = {
  pseudo: string,
  mail: string,
  password: string
}
type loginUser = {
  data: {
    id: number | null,
    pseudo: string,
    role: string,
  }
  isLoading: boolean,
}
/* Filter */
interface FilterState {
  seasons: radioFilter[],
  isViewed: radioFilter[],
  tags: checkboxFilter[],
  periode: periodeFilter,
  query: string,
  isDefault: boolean,
  filterState: DBMovieFilter
}
interface FilterStateConstructor {
  seasons: radioFilter[],
  tags: checkboxFilter[],
  periode: periodeFilterConstructor,
}
type radioFilter = { 
  name: string,
  value: string,
  isChecked: boolean 
}
type checkboxFilter = { 
  tagName: string,
  tags: tag[],
}
type tag = {
  name: string,
  isChecked: boolean
}
type periodeFilter = { [key: string]: [number , number] }
type periodeFilterConstructor = { [key: string]: number[] }