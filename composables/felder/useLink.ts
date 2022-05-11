import * as yup from 'yup'
import InputTextFeld from '~~/types/InputTextFeld'

export function useLink() {
  const feld: InputTextFeld = {
    id: 'link',
    label: 'Link',
    placeholder: 'https://www.finanzen.net/aktien/biontech-aktie',
    value: '',
  }
  const values = reactive({
    id: 'link',
    value: '',
    hasError: false,
    errorMessage: '',
  })

  const feldSchema = yup.object({
    value: yup
      .string()
      .required(`${feld.label} is required`)
      .url(`${feld.label} must be an url`),
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
