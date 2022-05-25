<template>
  <div class="row justify-center">
    <div class="col-3 self-center">{{ title }} :</div>
    <div class="col-8">
      <q-input
        dense
        outlined
        :placeholder="title + '...'"
        :mask="mask"
        v-model="modelValue"
        @update:modelValue="(event) => $emit('update:modelValue', event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    modelValue: String,
    title: String,
    mask: String,
  },
  emits: ["update:modelValue"],
};
</script>