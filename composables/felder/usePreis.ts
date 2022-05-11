import * as yup from 'yup'
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
    id: 'preis',
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
