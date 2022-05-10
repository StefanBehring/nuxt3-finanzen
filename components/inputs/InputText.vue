<template>
  <div class="input-area">
    <label :for="id">{{ label }}</label>
    <input
      type="text"
      :name="id"
      :placeholder="placeholder"
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
  content: {
    type: String,
    required: false,
    default: "",
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
