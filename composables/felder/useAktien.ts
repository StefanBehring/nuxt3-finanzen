import * as yup from 'yup'
import handleValidation from '~~/lib/handleValidation'
import loadFromLocal from '~~/lib/loadFromLocal'

import Aktie from '~~/types/Aktie'
import InputSingleSelectFeld from '~~/types/InputSingleSelectFeld'
import OptionUnternehmen from '~~/types/OptionUnternehmen'

export function useAktien() {
  const aktien: Aktie[] = loadFromLocal('aktien')
  const options: OptionUnternehmen[] = []
  for (const aktie of aktien) {
    const newEntry = {
      id: aktie.id,
      unternehmen: aktie.unternehmen,
    }
    options.push(newEntry)
  }

  options.sort((a, b) => a.unternehmen.localeCompare(b.unternehmen))

  const feld: InputSingleSelectFeld = {
    id: 'aktie_id',
    name: 'aktie',
    label: 'Aktie',
    options: options,
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
