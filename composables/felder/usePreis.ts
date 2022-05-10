import InputNumberFeld from '~~/types/InputNumberFeld'

export function usePreis() {
  const feld: InputNumberFeld = {
    id: 'preis',
    label: 'Preis',
    placeholder: '80',
    type: 'float',
    step: 0.01,
    min: 0.01,
    max: Infinity,
    value: NaN,
  }
  const value = ref(NaN)

  return { feld, value }
}