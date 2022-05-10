import InputTextFeld from '~~/types/InputTextFeld'

export function useLink() {
  const feld: InputTextFeld = {
    id: 'link',
    label: 'Link',
    placeholder: 'https://www.finanzen.net/aktien/biontech-aktie',
    value: '',
  }
  const value = ref('')

  return { feld, value }
}
