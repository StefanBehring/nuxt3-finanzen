import InputTextFeld from '~~/types/InputTextFeld'

export function useIsin() {
  const feld: InputTextFeld = {
    id: 'isin',
    label: 'ISIN',
    placeholder: 'US09075V1026',
    value: '',
  }
  const values = ref({
    value: '',
    hasError: false,
    errorMessage: '',
  })

  return { feld, values }
}
