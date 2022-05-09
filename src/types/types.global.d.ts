interface Layout {
  children?: import('react').ReactNode
};

type mouseEvent = import('react').MouseEvent<HTMLButtonElement | HTMLInputElement>;
type onChangeEvent = import('react').ChangeEvent<HTMLInputElement>
type onChangeEventHandler = import('react').ChangeEventHandler<HTMLInputElement>
type Button = {
  state: string
  children: React.ReactNode
  action?: MouseEventHandler; 
}
type ButtonSearch = { children: React.ReactNode };