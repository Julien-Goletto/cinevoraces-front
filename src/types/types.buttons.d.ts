type Button = {
  state: string,
  children: React.ReactNode,
  action?: MouseEventHandler, 
  href?: string
}

type ButtonTest = {
  children?: React.ReactNode,
  styleMod?: string,
  handler?: MouseEventHandler,
  href?: string
}