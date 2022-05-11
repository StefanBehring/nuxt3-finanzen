<template>
  <div class="card">
    <div class="card-header">
      <h3>Übersicht</h3>
      <div class="card-toolbox">
        <NuxtLink to="/aktien/neu" class="btn btn-primary"
          >Aktie anlegen</NuxtLink
        >
        <NuxtLink to="/aktien/kaufen" class="btn btn-primary">Kauf</NuxtLink>
        <NuxtLink to="/aktien/verkaufen" class="btn btn-primary"
          >Verkauf</NuxtLink
        >
      </div>
    </div>
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>Aktie</th>
            <th>Anzahl</th>
            <th>Wert (avg)</th>
            <th>Wert (total)</th>
            <th>WKN</th>
            <th>ISIN</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aktie of aktienBestand" :key="aktie.id">
            <td>{{ aktie.unternehmen }}</td>
            <td>{{ aktie.anzahl }}</td>
            <td>{{ aktie.wert_avg }} &euro;</td>
            <td>{{ aktie.wert_avg * aktie.anzahl }} &euro;</td>
            <td>{{ aktie.wkn }}</td>
            <td>{{ aktie.isin }}</td>
            <td><NuxtLink to="/" class="btn btn-light">Details</NuxtLink></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import loadFromLocal from '~~/lib/loadFromLocal'

import { Ref } from 'vue'
import AktieBestand from '~~/types/AktieBestand'

definePageMeta({
  layout: 'custom',
})

const aktienBestand: Ref<AktieBestand[]> = ref([])

onBeforeMount(() => {
  let aktienBestandLocalStorage: AktieBestand[] | null =
    loadFromLocal('aktien_bestand')
  if (aktienBestandLocalStorage === null) {
    aktienBestandLocalStorage = []
  }

  aktienBestand.value = aktienBestandLocalStorage
})
</script>
