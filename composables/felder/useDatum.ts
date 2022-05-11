import * as yup from 'yup'
import handleValidation from '~~/lib/handleValidation'
import InputDateFeld from '~~/types/InputDateFeld'

export function useDatum() {
  const feld: InputDateFeld = {
    id: 'datum',
    label: 'Datum',
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
