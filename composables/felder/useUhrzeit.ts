import InputTimeFeld from '~~/types/InputTimeFeld'

export function useUhrzeit() {
  const feld: InputTimeFeld = {
    id: 'uhrzeit',
    label: 'Uhrzeit',
    value: '',
  }
  const value = ref('')

  return { feld, value }
}
