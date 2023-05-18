<template>
  <q-page padding>
    <q-table
      title="Houses"
      :rows="rows"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :loading="loading"
    >
      <template v-slot:top>
        <span class="text-h5">Houses</span>
        <q-space />
        <q-btn
          color="primary"
          :disable="loading"
          label="New"
          :to="{ name: 'formHouse' }"
        />
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="edit"
            color="primary"
            dense
            size="sm"
            @click="handleEditHouse(props.row.id)"
          />

          <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @click="handleDeleteHouse(props)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import housesService from "src/services/houses";
import { Notify } from "quasar";
import { Dialog } from "quasar";

const { list, remove } = housesService();

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      columns: [
        {
          name: "id",
          field: "id",
          label: "ID",
          sortable: true,
          align: "left",
        },
        {
          name: "name",
          field: "name",
          label: "Nome",
          sortable: true,
          align: "left",
        },
        {
          name: "active",
          field: "active",
          label: "Ativo",
          sortable: true,
          align: "left",
        },
        {
          name: "order",
          field: "order",
          label: "Order",
          sortable: true,
          align: "left",
        },
        {
          name: "actions",
          field: "actions",
          label: "Ações",
          sortable: false,
          align: "left",
        },
      ],
      rows: [],
      pagination: {},
      loading: false,
    };
  },
  mounted() {
    this.listHouse();
  },
  methods: {
    async listHouse() {
      try {
        const res = await list();
        if (res.success === true) {
          this.rows.push(...res.data.entities);
          const { current_page, per_page, total } = res.data.pagination;
          this.pagination = {
            sortBy: "desc",
            descending: false,
            page: current_page,
            rowsPerPage: per_page,
            rowsNumber: total,
          };
        }
      } catch (e) {
        console.log(e);
      }
    },
    async handleEditHouse(id) {
      this.$router.push({ name: "formHouse", params: { id } });
    },
    async handleDeleteHouse(props) {
      Dialog.create({
        title: "Confirm",
        message: "Do you want to delete house ?",
        cancel: true,
        persistent: true,
      })
        .onOk(async () => {
          const { row, rowIndex } = props;
          try {
            const res = await remove(row.id, rowIndex);
            if (res.success === true) {
              this.rows.splice(rowIndex, 1);
              Notify.create({
                message: res.message,
                icon: "check",
                color: "positive",
              });
            }
          } catch (e) {
            Notify.create({
              message: "Error deleting house.",
              icon: "cancel",
              color: "negative",
            });
          }
        })
        .onCancel(() => {
          Notify.create({
            message: "Operation canceled.",
            icon: "cancel",
            color: "negative",
          });
        });
    },
  },
});
</script>
