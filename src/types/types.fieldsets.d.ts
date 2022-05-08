type FieldsetRadio = {
  array: radioFilter[]
  handler: onChangeEventHandler
}
type FieldsetCheckbox = { 
  array: tag[],
  tagName: string
  handler: onChangeEventHandler
}