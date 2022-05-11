<template>
  <div class="input-area">
    <label :for="id">{{ label }}</label>
    <input
      type="date"
      :name="id"
      :class="hasError ? 'input-danger' : ''"
      :value="value"
      @input="handleInput"
    />
    <p class="text-danger" v-show="hasError">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
    default: "",
  },
  hasError: {
    type: Boolean,
    required: true,
    default: false,
  },
  errorMessage: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:content"]);

const value: Ref<string> = ref(props.content);

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  value.value = target.value;
  emit("update:content", target.value);
};
</script>

<style lang="css"></style>
