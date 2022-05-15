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
  isDefault: boolean
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
type periodeFilter = { [key: string]: [number, number] }