import * as yup from 'yup'
import handleNumberValidation from '~~/lib/handleNumberValidation'
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
  const values = reactive({
    value: NaN,
    hasError: false,
    errorMessage: '',
  })

  const feldSchema = yup.object({
    value: yup
      .number()
      .required(`${feld.label} is required`)
      .min(0.01, `${feld.label} must be at least 0.01`),
  })

  const doValidate = async (): Promise<boolean> => {
    const res = await handleNumberValidation(feldSchema, {
      value: values.value,
    })
    values.hasError = res.hasError
    values.errorMessage = res.errorMessage
    return res.hasError
  }

  watch(
    () => values.value,
    async () => {
      await doValidate()
    }
  )

  return { feld, values, doValidate }
}
