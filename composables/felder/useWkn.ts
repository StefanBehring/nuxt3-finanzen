import InputTextFeld from '~~/types/InputTextFeld'

export function useWkn() {
  const feld: InputTextFeld = {
    id: 'wkn',
    label: 'WKN',
    placeholder: 'A2PSR2',
    value: '',
  }
  const value = ref('')

  return { feld, value }
}
