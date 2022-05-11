import * as yup from 'yup'
import handleValidation from '~~/lib/handleValidation'
import InputTextFeld from '~~/types/InputTextFeld'

export function useIsin() {
  const feld: InputTextFeld = {
    id: 'isin',
    label: 'ISIN',
    placeholder: 'US09075V1026',
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
