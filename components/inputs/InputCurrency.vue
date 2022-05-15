<template>
  <div class="input-area pos-relative">
    <label :for="id">{{ label }}</label>
    <input
      type="number"
      :name="id"
      :placeholder="placeholder"
      :class="hasError ? 'input-danger' : ''"
      :step="step"
      :min="min"
      :max="max"
      :value="value"
      @input="handleInput"
    />
    <div class="currency-display">{{ valueNumber }}</div>
    <p class="text-danger" v-show="hasError">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, ComputedRef } from "vue";

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
    required: true,
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
    default: "",
  },
});

const emit = defineEmits(["update:content"]);

const value: Ref<number> = ref(props.content);

const valueNumber: ComputedRef<string> = computed(() => {
  let val = Number.isNaN(value.value) ? "0" : value.value.toString().replace(".", ",");
  let n: string[] = [];
  if (val.includes(",")) {
    n = val.split(",");
    if (n[1].length === 1) {
      n[1] += "0";
    } else if (n[1].length > 2) {
      n[1] = n[1].substring(0, 2);
    }
  } else {
    n[0] = val;
    n[1] = "00";
  }

  let strWork = n[0];
  n[0] = "";

  while (strWork.length > 3) {
    let newStr = strWork.substring(strWork.length - 3);
    n[0] = "." + newStr + n[0];
    strWork = strWork.substring(0, strWork.length - 3);
  }
  n[0] = strWork + n[0];

  return `${n[0]},${n[1]} €`;
});

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

<style lang="css">
.pos-relative {
  position: relative;
}
.currency-display {
  position: absolute;
  width: 12rem;
  padding: 0.25rem 0.5rem;
  background-color: var(--gray-700);
  color: var(--white);
  top: 0;
  right: 0;
  text-align: right;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}
</style>
