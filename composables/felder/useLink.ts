import * as yup from 'yup'
import handleValidation from '~~/lib/handleValidation'
import InputTextFeld from '~~/types/InputTextFeld'

export function useLink() {
  const feld: InputTextFeld = {
    id: 'link',
    label: 'Link',
    placeholder: 'https://www.finanzen.net/aktien/biontech-aktie',
    value: '',
  }
  const values = reactive({
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
