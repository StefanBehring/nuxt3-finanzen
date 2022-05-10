import InputDateFeld from '~~/types/InputDateFeld'

export function useDatum() {
  const feld: InputDateFeld = {
    id: 'datum',
    label: 'Datum',
    value: '',
  }
  const value = ref('')

  return { feld, value }
}
