<template>
  <div class="card">
    <div class="card-header">
      <h3>Kauf von Aktien</h3>
    </div>
    <div class="card-body">
      <form @submit="handleSubmit">
        <div class="form-container">
          <InputNumber v-bind="anzahlFeld" v-model:content="anzahl" />
          <InputNumber v-bind="preisFeld" v-model:content="preis" />
          <InputSingleSelect v-bind="aktienFeld" v-model:content="aktie" />
          <InputDate v-bind="datumFeld" v-model:content="datum" />
          <InputTime v-bind="uhrzeitFeld" v-model:content="uhrzeit" />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="disableButton">
            Speichern
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import loadFromLocal from "~~/lib/loadFromLocal";
import saveToLocal from "~~/lib/saveToLocal";
import calcAktienBestand from "~~/lib/calcAktienBestand";

import InputDate from "~~/components/inputs/InputDate.vue";
import InputNumber from "~~/components/inputs/InputNumber.vue";
import InputSingleSelect from "~~/components/inputs/InputSingleSelect.vue";
import InputTime from "~~/components/inputs/InputTime.vue";

import { useAktien } from "~~/composables/felder/useAktien";
import { useAnzahl } from "~~/composables/felder/useAnzahl";
import { useDatum } from "~~/composables/felder/useDatum";
import { usePreis } from "~~/composables/felder/usePreis";
import { useUhrzeit } from "~~/composables/felder/useUhrzeit";

import { ComputedRef, Ref } from "vue";
import AktieKauf from "~~/types/AktieKauf";

definePageMeta({
  layout: "custom",
});

/*
  FELDER
*/
const allFields: Ref<string | number>[] = reactive([]);

const { feld: aktienFeld, value: aktie } = useAktien();
allFields.push(aktie);

const { feld: anzahlFeld, value: anzahl } = useAnzahl();
allFields.push(anzahl);

const { feld: datumFeld, value: datum } = useDatum();
allFields.push(datum);

const { feld: preisFeld, value: preis } = usePreis();
allFields.push(preis);

const { feld: uhrzeitFeld, value: uhrzeit } = useUhrzeit();
allFields.push(uhrzeit);

/*
  SUBMIT
*/
const disableButton: ComputedRef<boolean> = computed(() => {
  for (const field of allFields) {
    if (field.value === "") {
      return true;
    } else if (typeof field.value === "number") {
      if (isNaN(field.value)) {
        return true;
      }
    }
  }
  return false;
});

const handleSubmit = (e: Event): void => {
  e.preventDefault();

  const newAktie: AktieKauf = {
    id: uuidv4(),
    unternehmen_id: aktie.value,
    anzahl: anzahl.value,
    preis: preis.value,
    datum: datum.value,
    uhrzeit: uhrzeit.value,
    is_kauf: true,
  };

  let aktienKaufLocalStorage: AktieKauf[] | null = loadFromLocal("aktien_kauf");
  if (aktienKaufLocalStorage === null) {
    aktienKaufLocalStorage = [];
  }

  aktienKaufLocalStorage.push(newAktie);
  saveToLocal("aktien_kauf", aktienKaufLocalStorage);

  calcAktienBestand();
};
</script>
