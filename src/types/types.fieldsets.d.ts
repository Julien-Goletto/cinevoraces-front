type FieldsetTextInput = { 
  label?: string,
  name: string,
  placeholder: string,
  type: string
}
type FieldsetRadio = {
  array: radioFilter[],
  label: string,
  handler: onChangeEventHandler
}
type FieldsetCheckbox = { 
  array: tag[],
  tagName: string,
  handler: onChangeEventHandler
}