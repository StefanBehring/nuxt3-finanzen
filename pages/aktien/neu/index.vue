<template>
  <div class="card">
    <div class="card-header">
      <h3>Neue Aktie anlegen</h3>
    </div>
    <div class="card-body">
      <form @submit="handleSubmit">
        <div class="form-container">
          <InputText
            v-bind="unternehmenFeld"
            v-model:content="unternehmen.value"
            v-model:hasError="unternehmen.hasError"
            v-model:errorMessage="unternehmen.errorMessage"
          />
          <div></div>
          <InputText
            v-bind="wknFeld"
            v-model:content="wkn.value"
            v-model:hasError="wkn.hasError"
            v-model:errorMessage="wkn.errorMessage"
          />
          <InputText
            v-bind="isinFeld"
            v-model:content="isin.value"
            v-model:hasError="isin.hasError"
            v-model:errorMessage="isin.errorMessage"
          />
          <InputText
            v-bind="symbolFeld"
            v-model:content="symbol.value"
            v-model:hasError="symbol.hasError"
            v-model:errorMessage="symbol.errorMessage"
          />
          <div></div>
          <InputText
            v-bind="linkFeld"
            v-model:content="link.value"
            v-model:hasError="link.hasError"
            v-model:errorMessage="link.errorMessage"
          />
          <div></div>
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

import InputText from "~~/components/inputs/InputText.vue";

import { ComputedRef, Ref } from "vue";
import Aktie from "~~/types/Aktie";
import FeldValues from "~~/types/FeldValues";

import { useUnternehmen } from "~~/composables/felder/useUnternehmen";
import { useWkn } from "~~/composables/felder/useWkn";
import { useIsin } from "~~/composables/felder/useIsin";
import { useSymbol } from "~~/composables/felder/useSymbol";
import { useLink } from "~~/composables/felder/useLink";

definePageMeta({
  layout: "custom",
});

/*
  FIELDS
*/
const allFields: Ref<FeldValues>[] = reactive([]);

const { feld: unternehmenFeld, values: unternehmen } = useUnternehmen();
allFields.push(unternehmen);

const { feld: wknFeld, values: wkn } = useWkn();
allFields.push(wkn);

const { feld: isinFeld, values: isin } = useIsin();
allFields.push(isin);

const { feld: symbolFeld, values: symbol } = useSymbol();

const { feld: linkFeld, values: link } = useLink();
allFields.push(link);

/*
  SUBMIT
*/
const disableButton: ComputedRef<boolean> = computed(() => {
  for (const field of allFields) {
    if (field.value.value === "") {
      return true;
    }
  }
  return false;
});

const handleSubmit = (e: Event): void => {
  e.preventDefault();

  const newAktie: Aktie = {
    id: uuidv4(),
    unternehmen: unternehmen.value.value,
    wkn: wkn.value.value,
    isin: isin.value.value,
    symbol: symbol.value.value,
    link: link.value.value,
  };

  let aktienLocalStorage: Aktie[] | null = loadFromLocal("aktien");
  if (aktienLocalStorage === null) {
    aktienLocalStorage = [];
  }

  aktienLocalStorage.push(newAktie);
  saveToLocal("aktien", aktienLocalStorage);
};
</script>
