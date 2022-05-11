import loadFromLocal from '~~/lib/loadFromLocal'
import saveToLocal from '~~/lib/saveToLocal'

import Aktie from '~~/types/Aktie'
import AktieBestand from '~~/types/AktieBestand'
import AktieKauf from '~~/types/AktieKauf'

const calcAktienBestand = (): void => {
  let aktienLocalStorage: Aktie[] | null = loadFromLocal('aktien')
  if (aktienLocalStorage === null) {
    aktienLocalStorage = []
  }

  let aktienKaufLocalStorage: AktieKauf[] | null = loadFromLocal('aktien_kauf')
  if (aktienKaufLocalStorage === null) {
    aktienKaufLocalStorage = []
  }

  let aktienVerkaufLocalStorage: AktieKauf[] | null =
    loadFromLocal('aktien_verkauf')
  if (aktienVerkaufLocalStorage === null) {
    aktienVerkaufLocalStorage = []
  }

  let transaktionen: AktieKauf[] = [
    ...aktienKaufLocalStorage,
    ...aktienVerkaufLocalStorage,
  ]

  transaktionen.sort((a, b) => {
    if (a.datum < b.datum) {
      return -1
    }
    if (a.datum > b.datum) {
      return 1
    }
    if (a.uhrzeit < b.uhrzeit) {
      return -1
    }
    if (a.uhrzeit > b.uhrzeit) {
      return 1
    }
    return 0
  })

  const aktienBestand: AktieBestand[] = []

  for (const aktie of aktienLocalStorage) {
    const newBestand: AktieBestand = {
      aktie_id: aktie.id,
      unternehmen: aktie.unternehmen,
      wkn: aktie.wkn,
      isin: aktie.isin,
      anzahl: 0,
      wert_avg: 0,
    }

    let anzahl = 0
    let wert = 0

    for (const transaktion of transaktionen.filter(
      (t) => t.aktie_id === aktie.id
    )) {
      if (transaktion.is_kauf) {
        anzahl += transaktion.anzahl
        wert += transaktion.anzahl * transaktion.preis
      } else {
        anzahl -= transaktion.anzahl
        if (anzahl === 0) {
          wert = 0
        } else if (anzahl < 0) {
          console.error('Anzahl ist kleiner 0 für AktieId: ' + aktie.id)
        }
      }
    }

    if (anzahl > 0) {
      newBestand.wert_avg =
        Math.round((wert / anzahl + Number.EPSILON) * 100) / 100
      newBestand.anzahl = anzahl
      aktienBestand.push(newBestand)
    }
  }

  saveToLocal('aktien_bestand', aktienBestand)
}

export default calcAktienBestand
