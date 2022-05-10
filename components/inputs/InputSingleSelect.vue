<template>
  <div class="input-area">
    <label :for="id">{{ label }}</label>
    <select
      :name="name"
      :id="id"
      v-model="value"
      @change="handleChange"
      v-show="showOptions"
    >
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.unternehmen }}
      </option>
    </select>
    <p v-show="!showOptions">Keine Optionen vorhanden</p>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  options: {
    type: Array,
    required: true,
  },
  content: {
    type: String,
    required: false,
    default: "",
  },
});

const emit = defineEmits(["update:content"]);

const value: Ref<string> = ref(props.content);

const showOptions = props.options.length > 0;

const handleChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  value.value = target.value;
  emit("update:content", target.value);
};
</script>

<style lang="css"></style>
