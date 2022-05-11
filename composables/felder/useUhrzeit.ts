import InputTimeFeld from '~~/types/InputTimeFeld'

export function useUhrzeit() {
  const feld: InputTimeFeld = {
    id: 'uhrzeit',
    label: 'Uhrzeit',
    value: '',
  }
  const values = ref({
    value: '',
    hasError: false,
    errorMessage: '',
  })

  return { feld, values }
}
