export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function required(value: string, message = 'Պարտադիր դաշտ է։') {
  return value.trim() ? '' : message;
}

export function minLength(value: string, length: number, message: string) {
  return value.trim().length >= length ? '' : message;
}

export function email(value: string, message = 'Մուտքագրեք վավեր էլեկտրոնային հասցե։') {
  return !value || emailPattern.test(value) ? '' : message;
}
