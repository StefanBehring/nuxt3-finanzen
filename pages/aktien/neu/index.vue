<template>
  <div class="card">
    <div class="card-header">
      <h3>Neue Aktie anlegen</h3>
    </div>
    <div class="card-body">
      <form @submit="handleSubmit">
        <div class="form-container">
          <InputText v-bind="unternehmenFeld" v-model:content="unternehmen" />
          <div></div>
          <InputText v-bind="wknFeld" v-model:content="wkn" />
          <InputText v-bind="isinFeld" v-model:content="isin" />
          <InputText v-bind="symbolFeld" v-model:content="symbol" />
          <div></div>
          <InputText v-bind="linkFeld" v-model:content="link" />
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

import { ComputedRef, Ref } from "@vue/reactivity";
import Aktie from "~~/types/Aktie";

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
const allFields: Ref<string>[] = reactive([]);

const { feld: unternehmenFeld, value: unternehmen } = useUnternehmen();
allFields.push(unternehmen);

const { feld: wknFeld, value: wkn } = useWkn();
allFields.push(wkn);

const { feld: isinFeld, value: isin } = useIsin();
allFields.push(isin);

const { feld: symbolFeld, value: symbol } = useSymbol();
allFields.push(symbol);

const { feld: linkFeld, value: link } = useLink();
allFields.push(link);

/*
  SUBMIT
*/
const disableButton: ComputedRef<boolean> = computed(() => {
  for (const field of allFields) {
    if (field.value === "") {
      return true;
    }
  }
  return false;
});

const handleSubmit = (e: Event): void => {
  e.preventDefault();

  const newAktie: Aktie = {
    id: uuidv4(),
    unternehmen: unternehmen.value,
    wkn: wkn.value,
    isin: isin.value,
    symbol: symbol.value,
    link: link.value,
  };

  let aktienLocalStorage: Aktie[] | null = loadFromLocal("aktien");
  if (aktienLocalStorage === null) {
    aktienLocalStorage = [];
  }

  aktienLocalStorage.push(newAktie);
  saveToLocal("aktien", aktienLocalStorage);
};
</script>
