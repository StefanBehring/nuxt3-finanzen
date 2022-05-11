import * as yup from 'yup'
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
    id: 'aktie_id',
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
