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
          <button type="submit" class="btn btn-primary">Speichern</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import loadFromLocal from "~~/lib/loadFromLocal";
import saveToLocal from "~~/lib/saveToLocal";

import InputText from "~~/components/inputs/InputText.vue";

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
  VALIDATION SCHEMA
*/

const formSchema = yup.object({
  unternehmen: yup.string().required("Unternehmen is required"),
  wkn: yup.string().required("WKN is required"),
  isin: yup.string().required("ISIN is required"),
  symbol: yup.string(),
  link: yup.string().required("Link is required").url("Link must be an url"),
});

/*
  FIELDS
*/
const allFields: FeldValues[] = reactive([]);
const allValidations: (() => void)[] = reactive([]);

const addField = (field: FeldValues, fieldValidate: () => void): void => {
  allFields.push(field);
  allValidations.push(fieldValidate);
};

const {
  feld: unternehmenFeld,
  values: unternehmen,
  doValidate: unternehmenValidate,
} = useUnternehmen();
addField(unternehmen, unternehmenValidate);

const { feld: wknFeld, values: wkn, doValidate: wknValidate } = useWkn();
addField(wkn, wknValidate);

const { feld: isinFeld, values: isin, doValidate: isinValidate } = useIsin();
addField(isin, isinValidate);

const { feld: symbolFeld, values: symbol, doValidate: symbolValidate } = useSymbol();
addField(symbol, symbolValidate);

const { feld: linkFeld, values: link, doValidate: linkValidate } = useLink();
addField(link, linkValidate);

/*
  SUBMIT
*/

const handleSubmit = async (e: Event): Promise<void> => {
  e.preventDefault();

  for (const validate of allValidations) {
    validate();
  }

  const formEntries = {
    unternehmen: unternehmen.value,
    wkn: wkn.value,
    isin: isin.value,
    symbol: symbol.value,
    link: link.value,
  };

  const isValid = await formSchema.isValid(formEntries);

  if (isValid) {
    doSubmit();
  }
};

const doSubmit = (): void => {
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
