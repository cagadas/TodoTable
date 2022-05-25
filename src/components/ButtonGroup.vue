<template>
  <q-icon class="custom-button" size="sm" name="zoom_in" />
  <q-icon
    class="custom-button"
    size="sm"
    name="manage_accounts"
    @click="$emit('update-user')"
  />
  <q-icon
    class="custom-button"
    size="sm"
    name="delete"
    @click="$emit('delete-user')"
  />
</template>

<script>
export default {
  name: "ButtonGroup",
  emits: ["update-user", "delete-user"],
};
</script>