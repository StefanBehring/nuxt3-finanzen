<template>
  <div class="card">
    <div class="card-header">
      <h3>Card Header</h3>
      <div class="card-toolbox">
        <button class="btn btn-primary">BTN</button>
        <button class="btn btn-success">BTN</button>
        <button class="btn btn-warning">BTN</button>
        <button class="btn btn-danger">BTN</button>
      </div>
    </div>
    <div class="card-body">
      <p>Card</p>
    </div>
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th>Aktie</th>
            <th>Wert</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Allianz</td>
            <td>200 &euro;</td>
          </tr>
          <tr>
            <td>BMW</td>
            <td>80 &euro;</td>
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
