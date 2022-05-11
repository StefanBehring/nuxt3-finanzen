import * as yup from 'yup'
import handleValidation from '~~/lib/handleValidation'
import InputTextFeld from '~~/types/InputTextFeld'

export function useWkn() {
  const feld: InputTextFeld = {
    id: 'wkn',
    label: 'WKN',
    placeholder: 'A2PSR2',
    value: '',
  }
  const values = reactive({
    value: '',
    hasError: false,
    errorMessage: '',
  })

  const feldSchema = yup.object({
    value: yup.string().required(`${feld.label} is required`),
  })

  const doValidate = async (): Promise<boolean> => {
    const res = await handleValidation(feldSchema, { value: values.value })
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
