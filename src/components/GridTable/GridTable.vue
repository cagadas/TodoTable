<template>
  <div class="q-pa-md">
    <q-table
      grid
      title="Users"
      row-key="name"
      :rows="rows"
      :columns="columns"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <q-btn
          color="green"
          label="Add User"
          icon-right="add"
          @click="userDialog = true"
        />
      </template>
      <template v-slot:item="props">
        <div class="q-pa-xs col-3">
          <q-card>
            <q-card-actions class="q-pb-none" align="right">
              <ButtonGroup
                @update-user="[(state.user = JSON.parse(JSON.stringify(props.row))),(userDialog = true)]"
                @delete-user="[(deleteDialog = true), (selectedId = props.row.id)]"
              />
            </q-card-actions>
            <q-card-section class="q-pt-xs">
              <q-list dense>
                <q-item
                  v-for="item in props.cols.filter((t) => t.name !== 'id')"
                  :key="item.id"
                >
                  <q-item-section class="q-mb-xs">
                    <q-item-label caption> {{ item.label }} </q-item-label>
                    <q-item-label>{{ item.value }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="userDialog" persistent>
    <DialogCard
      :user="state.user"
      :addUser="addUser"
      :updateUser="updateUser"
      :text="{
        header: state.user.id !== null ? 'Edit User' : 'Add User',
        headerStyle: 'bg-primary text-center',
        leftBtn: 'Cancel',
        rightBtn: state.user.id !== null ? 'Edit' : 'Add',
      }"
      @cancel="userNullfy()"
    />
  </q-dialog>
  <q-dialog v-model="deleteDialog" persistent>
    <DialogCard
      :text="{
        header: 'This item will be deleted',
        headerStyle: 'text-center bg-grey-8 text-white',
        leftBtn: 'No',
        rightBtn: 'Yes',
      }"
      @deleteUser="deleteUser"
    />
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import GridTable from "./GridTable.js";
import ButtonGroup from "../ButtonGroup.vue";
import DialogCard from "../DialogCard.vue";

const columns = [
  {
    name: "id",
    required: true,
    field: (row) => row.id,
  },
  {
    name: "name",
    align: "center",
    label: "Name",
    field: "name",
    sortable: true,
  },
  { name: "phone", label: "Phone Number", field: "phone" },
  { name: "email", label: "Email", field: "email" },
  { name: "adress", label: "Adress", field: "adress" },
  { name: "postalZip", label: "postalZip", field: "postalZip" },
];

export default {
  components: { ButtonGroup, DialogCard },
  setup() {
    const { selectedId, rows, state, addUser, updateUser, deleteUser } = GridTable();
    const initialPagination = {
      sortBy: "id",
      rowsPerPage: 8,
    };
    return {
      userDialog: ref(false),
      deleteDialog: ref(false),
      initialPagination,
      columns,
      selectedId,
      rows,
      state,
      updateUser,
      addUser,
      deleteUser,
    };
  },
};
</script>