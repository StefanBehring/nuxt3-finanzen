import InputTextFeld from '~~/types/InputTextFeld'

export function useUnternehmen() {
  const feld: InputTextFeld = {
    id: 'unternehmen',
    label: 'Unternehmen',
    placeholder: 'Allianz',
    value: '',
  }
  const value = ref('')

  return { feld, value }
}
