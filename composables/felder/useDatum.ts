import * as yup from 'yup'
import InputDateFeld from '~~/types/InputDateFeld'

export function useDatum() {
  const feld: InputDateFeld = {
    id: 'datum',
    label: 'Datum',
    value: '',
  }
  const values = reactive({
    id: 'datum',
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
