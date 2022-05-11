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
          <button type="submit" class="btn btn-primary">Speichern</button>
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

import AktieKauf from "~~/types/AktieKauf";
import FeldValues from "~~/types/FeldValues";

definePageMeta({
  layout: "custom",
});

/*
  FELDER
*/
const allFields: FeldValues[] = reactive([]);
const allValidations: (() => Promise<boolean>)[] = reactive([]);

const addField = (field: FeldValues, fieldValidate: () => Promise<boolean>): void => {
  allFields.push(field);
  allValidations.push(fieldValidate);
};

const { feld: aktienFeld, values: aktie, doValidate: aktieValidate } = useAktien();
addField(aktie, aktieValidate);

const { feld: anzahlFeld, values: anzahl, doValidate: anzahlValidate } = useAnzahl();
addField(anzahl, anzahlValidate);

const { feld: datumFeld, values: datum, doValidate: datumValidate } = useDatum();
addField(datum, datumValidate);

const { feld: preisFeld, values: preis, doValidate: preisValidate } = usePreis();
addField(preis, preisValidate);

const { feld: uhrzeitFeld, values: uhrzeit, doValidate: uhrzeitValidate } = useUhrzeit();
addField(uhrzeit, uhrzeitValidate);

/*
  SUBMIT
*/

const handleSubmit = async (e: Event): Promise<void> => {
  e.preventDefault();

  let isValid = true;

  for (const validate of allValidations) {
    let test = await validate();
    if (test) {
      isValid = !test;
    }
  }

  if (isValid) {
    doSubmit();
  }
};

const doSubmit = () => {
  const newAktie: AktieKauf = {
    id: uuidv4(),
    aktie_id: aktie.value,
    anzahl: anzahl.value,
    preis: preis.value,
    datum: datum.value,
    uhrzeit: uhrzeit.value,
    is_kauf: false,
  };

  let aktienKaufLocalStorage: AktieKauf[] | null = loadFromLocal("aktien_verkauf");
  if (aktienKaufLocalStorage === null) {
    aktienKaufLocalStorage = [];
  }

  aktienKaufLocalStorage.push(newAktie);
  saveToLocal("aktien_verkauf", aktienKaufLocalStorage);

  calcAktienBestand();
};
</script>
