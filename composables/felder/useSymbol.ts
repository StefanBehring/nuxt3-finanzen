import InputTextFeld from '~~/types/InputTextFeld'

export function useSymbol() {
  const feld: InputTextFeld = {
    id: 'symbol',
    label: 'Symbol',
    placeholder: 'BNTX',
    value: '',
  }
  const values = ref({
    value: '',
    hasError: false,
    errorMessage: '',
  })

  return { feld, values }
}
