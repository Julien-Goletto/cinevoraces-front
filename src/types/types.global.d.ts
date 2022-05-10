interface Layout {
  children?: import('react').ReactNode
};

type mouseEvent = import('react').MouseEvent<HTMLButtonElement | HTMLInputElement>;
type onChangeEvent = import('react').ChangeEvent<HTMLInputElement>
type onChangeEventHandler = import('react').ChangeEventHandler<HTMLInputElement>
type onChangeFormEvent = import('react').FormEvent<HTMLFormElement>
type Button = {
  state: string
  children: React.ReactNode
  action?: MouseEventHandler; 
  href?: string
}
type StarRating = {
  state: string
}
type ButtonSearch = { children: React.ReactNode };