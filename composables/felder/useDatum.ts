import InputDateFeld from '~~/types/InputDateFeld'

export function useDatum() {
  const feld: InputDateFeld = {
    id: 'datum',
    label: 'Datum',
    value: '',
  }
  const values = ref({
    value: '',
    hasError: false,
    errorMessage: '',
  })

  return { feld, values }
}
