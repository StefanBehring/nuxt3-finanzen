import * as yup from 'yup'
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
    id: 'anzahl',
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

  const doValidate = () => {
    feldSchema.isValid({ value: values.value }).then((isValid) => {
      if (isValid) {
        values.hasError = false
        values.errorMessage = ''
      } else {
        feldSchema
          .validate({ value: values.value }, { abortEarly: true })
          .catch((error) => {
            values.hasError = true
            values.errorMessage = error.errors[0]
          })
      }
    })
  }

  watch(
    () => values.value,
    () => doValidate()
  )

  return { feld, values, doValidate }
}
