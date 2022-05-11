import InputNumberFeld from '~~/types/InputNumberFeld'

export function useAnzahl() {
  const feld: InputNumberFeld = {
    id: 'anzahl',
    label: 'Anzahl',
    placeholder: '10',
    type: 'integer',
    step: 1,
    min: 1,
    max: Infinity,
    value: NaN,
  }
  const values = ref({
    value: NaN,
    hasError: false,
    errorMessage: '',
  })

  return { feld, values }
}
