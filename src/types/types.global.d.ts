interface Layout {
  children?: import('react').ReactNode
};

type eventButton = import('react').MouseEvent<HTMLButtonElement>;
type eventHandler = import('react').ChangeEvent<HTMLInputElement>;

type FieldsetSeason = {
  array: number[]
}
type FieldsetTag = { 
  array: string[],
  tagName: string
}
type FieldsetDate = {
  min: number,
  max: number,
  label: string,
};