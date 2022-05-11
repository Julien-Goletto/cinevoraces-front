interface Layout {
  children?: import('react').ReactNode
};

type mouseEvent = import('react').MouseEvent<HTMLButtonElement | HTMLInputElement>;
type onChangeEvent = import('react').ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type onChangeEventHandler = import('react').ChangeEventHandler<HTMLInputElement>
type onChangeFormEvent = import('react').FormEvent<HTMLFormElement>
type StarRating = { state: string, alt?: boolean }
type ButtonSearch = { children: React.ReactNode };