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
  const values = ref({
    value: '',
    hasError: false,
    errorMessage: '',
  })

  return { feld, values }
}
