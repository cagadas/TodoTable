<template>
  <q-card class="dialog-card">
    <q-card-section :class="text.headerStyle">
      <span class="header">{{ text.header }}</span>
    </q-card-section>
    <q-card-section v-if="user" class="q-gutter-y-md q-my-sm">
      <FormInput title="Name" v-model="user.name" />
      <FormInput title="Phone Number" mask="(###) ### - ####" v-model="user.phone"/>
      <FormInput title="Email" v-model="user.email" />
      <FormInput title="Adress" v-model="user.adress" />
      <FormInput title="Zip Code" mask="#####" v-model="user.postalZip" />
    </q-card-section>
    <q-card-actions :align="!user ? 'center' : 'right'">
      <q-btn
        dense
        v-close-popup
        :color="!user ? 'grey-6' : 'red'"
        :label="text.leftBtn"
        @click="$emit('cancel')"
      />
      <q-btn
        dense
        v-close-popup
        :color="!user ? 'red' : 'green'"
        :label="text.rightBtn"
        @click="
          !user
            ? $emit('deleteUser')
            : user.id !== null
            ? updateUser()
            : addUser()
        "
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import FormInput from "./FormInput.vue";
export default {
  name: "DialogCard",
  props: {
    user: Object,
    addUser: Function,
    updateUser: Function,
    text: Object,
  },
  components: { FormInput },
  emits: ["deleteUser","cancel"],
};
</script>