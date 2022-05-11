import * as yup from 'yup'
import handleNumberValidation from '~~/lib/handleNumberValidation'
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
  const values = reactive({
    value: NaN,
    hasError: false,
    errorMessage: '',
  })

  const feldSchema = yup.object({
    value: yup
      .number()
      .required(`${feld.label} is required`)
      .integer(`${feld.label} must be an integer`)
      .min(1, `${feld.label} must be at least 1`),
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
