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