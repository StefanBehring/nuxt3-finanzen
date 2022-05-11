import * as yup from 'yup'
import InputTimeFeld from '~~/types/InputTimeFeld'

export function useUhrzeit() {
  const feld: InputTimeFeld = {
    id: 'uhrzeit',
    label: 'Uhrzeit',
    value: '',
  }
  const values = reactive({
    id: 'uhrzeit',
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
