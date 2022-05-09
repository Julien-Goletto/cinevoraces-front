type UserHeader = {
  username: string,
  avatar?: string | null,
  registerDate: string
}
type UserMetrics = {
  stats: {[key: string]: number}
}