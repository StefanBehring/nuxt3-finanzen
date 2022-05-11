<template>
  <div class="card">
    <div class="card-header">
      <h3>Verkauf von Aktien</h3>
    </div>
    <div class="card-body">
      <form @submit="handleSubmit">
        <div class="form-container">
          <InputNumber
            v-bind="anzahlFeld"
            v-model:content="anzahl.value"
            v-model:hasError="anzahl.hasError"
            v-model:errorMessage="anzahl.errorMessage"
          />
          <InputNumber
            v-bind="preisFeld"
            v-model:content="preis.value"
            v-model:hasError="preis.hasError"
            v-model:errorMessage="preis.errorMessage"
          />
          <InputSingleSelect
            v-bind="aktienFeld"
            v-model:content="aktie.value"
            v-model:hasError="aktie.hasError"
            v-model:errorMessage="aktie.errorMessage"
          />
          <InputDate
            v-bind="datumFeld"
            v-model:content="datum.value"
            v-model:hasError="datum.hasError"
            v-model:errorMessage="datum.errorMessage"
          />
          <InputTime
            v-bind="uhrzeitFeld"
            v-model:content="uhrzeit.value"
            v-model:hasError="uhrzeit.hasError"
            v-model:errorMessage="uhrzeit.errorMessage"
          />
        </div>
        <div class="form-actions">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="disableButton"
          >
            Speichern
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import loadFromLocal from '~~/lib/loadFromLocal'
import saveToLocal from '~~/lib/saveToLocal'
import calcAktienBestand from '~~/lib/calcAktienBestand'

import InputDate from '~~/components/inputs/InputDate.vue'
import InputNumber from '~~/components/inputs/InputNumber.vue'
import InputSingleSelect from '~~/components/inputs/InputSingleSelect.vue'
import InputTime from '~~/components/inputs/InputTime.vue'

import { useAktien } from '~~/composables/felder/useAktien'
import { useAnzahl } from '~~/composables/felder/useAnzahl'
import { useDatum } from '~~/composables/felder/useDatum'
import { usePreis } from '~~/composables/felder/usePreis'
import { useUhrzeit } from '~~/composables/felder/useUhrzeit'

import { ComputedRef, Ref } from 'vue'
import AktieKauf from '~~/types/AktieKauf'
import FeldValues from '~~/types/FeldValues'

definePageMeta({
  layout: 'custom',
})

/*
  FELDER
*/
const allFields: Ref<FeldValues>[] = reactive([])

const { feld: aktienFeld, values: aktie } = useAktien()
allFields.push(aktie)

const { feld: anzahlFeld, values: anzahl } = useAnzahl()
allFields.push(anzahl)

const { feld: datumFeld, values: datum } = useDatum()
allFields.push(datum)

const { feld: preisFeld, values: preis } = usePreis()
allFields.push(preis)

const { feld: uhrzeitFeld, values: uhrzeit } = useUhrzeit()
allFields.push(uhrzeit)

/*
  SUBMIT
*/
const disableButton: ComputedRef<boolean> = computed(() => {
  for (const field of allFields) {
    if (field.value.value === '') {
      return true
    } else if (typeof field.value.value === 'number') {
      if (isNaN(field.value.value)) {
        return true
      }
    }
  }
  return false
})

const handleSubmit = (e: Event): void => {
  e.preventDefault()

  const newAktie: AktieKauf = {
    id: uuidv4(),
    unternehmen_id: aktie.value.value,
    anzahl: anzahl.value.value,
    preis: preis.value.value,
    datum: datum.value.value,
    uhrzeit: uhrzeit.value.value,
    is_kauf: false,
  }

  let aktienKaufLocalStorage: AktieKauf[] | null =
    loadFromLocal('aktien_verkauf')
  if (aktienKaufLocalStorage === null) {
    aktienKaufLocalStorage = []
  }

  aktienKaufLocalStorage.push(newAktie)
  saveToLocal('aktien_verkauf', aktienKaufLocalStorage)

  calcAktienBestand()
}
</script>
