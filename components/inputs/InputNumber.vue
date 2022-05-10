<template>
  <div class="input-area">
    <label :for="id">{{ label }}</label>
    <input
      type="number"
      :name="id"
      :placeholder="placeholder"
      :step="step"
      :min="min"
      :max="max"
      :value="value"
      @input="handleInput"
    />
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
  placeholder: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  step: {
    type: Number,
    required: false,
  },
  min: {
    type: Number,
    required: false,
  },
  max: {
    type: Number,
    required: false,
  },
  content: {
    type: Number,
    required: false,
    default: NaN,
  },
});

const emit = defineEmits(["update:content"]);

const value: Ref<number> = ref(props.content);

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  if (props.type === "integer") {
    value.value = parseInt(target.value);
    emit("update:content", parseInt(target.value));
  } else if (props.type === "float") {
    value.value = parseFloat(target.value);
    emit("update:content", parseFloat(target.value));
  }
};
</script>

<style lang="css"></style>
