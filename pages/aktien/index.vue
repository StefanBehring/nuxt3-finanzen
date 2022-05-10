<template>
  <div class="card">
    <div class="card-header">
      <h3>Übersicht</h3>
      <div class="card-toolbox">
        <NuxtLink to="/aktien/neu" class="btn btn-primary">Aktie anlegen</NuxtLink>
        <NuxtLink to="/" class="btn btn-primary">Kauf</NuxtLink>
        <NuxtLink to="/" class="btn btn-primary">Verkauf</NuxtLink>
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
          <tr>
            <td>Allianz</td>
            <td>3</td>
            <td>200 &euro;</td>
            <td>600 &euro;</td>
            <td>ABC</td>
            <td>DEF</td>
            <td><NuxtLink to="/" class="btn btn-light">Details</NuxtLink></td>
          </tr>
          <tr>
            <td>BMW</td>
            <td>8</td>
            <td>80 &euro;</td>
            <td>640 &euro;</td>
            <td>ABC</td>
            <td>DEF</td>
            <td><NuxtLink to="/" class="btn btn-light">Details</NuxtLink></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
// This will also work in `<script setup>`
definePageMeta({
  layout: "custom",
});
</script>
