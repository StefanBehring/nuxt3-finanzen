import InputTextFeld from '~~/types/InputTextFeld'

export function useIsin() {
  const feld: InputTextFeld = {
    id: 'isin',
    label: 'ISIN',
    placeholder: 'US09075V1026',
    value: '',
  }
  const value = ref('')

  return { feld, value }
}
