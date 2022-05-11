import * as yup from 'yup'
import InputTextFeld from '~~/types/InputTextFeld'

export function useWkn() {
  const feld: InputTextFeld = {
    id: 'wkn',
    label: 'WKN',
    placeholder: 'A2PSR2',
    value: '',
  }
  const values = reactive({
    id: 'wkn',
    value: '',
    hasError: false,
    errorMessage: '',
  })

  const feldSchema = yup.object({
    value: yup.string().required(`${feld.label} is required`),
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
