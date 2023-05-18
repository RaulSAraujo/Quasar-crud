<template>
  <q-page padding>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm">
      <q-input
        outlined
        v-model="form.name"
        label="New house rules"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Required field']"
      />

      <q-input outlined type="number" v-model="form.order" label="Order" />

      <q-toggle v-model="form.active" label="Start house rules as active" />

      <div class="q-gutter-sm">
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm float-right"
        />
        <q-btn
          label="Cancel"
          type="Cancel"
          color="white"
          text-color="negative"
          class="float-right"
          :to="{ name: 'home' }"
        />
        <q-btn
          label="Submit"
          type="submit"
          color="primary"
          class="float-right"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import housesService from "src/services/houses";
import { Notify } from "quasar";

const { create, show, update } = housesService();

export default defineComponent({
  name: "FormHouse",
  data() {
    return {
      form: {
        name: "",
        active: false,
        order: 0,
      },
    };
  },
  async mounted() {
    if (this.$route.params.id) {
      this.getHouse(this.$route.params.id);
    }
  },
  methods: {
    async getHouse(id) {
      try {
        const res = await show(id);
        if (res.success === true) {
          const { id, active, name, order } = res.data;
          this.form = {
            id: id,
            name: name,
            active: active === 1 ? true : false,
            order: order,
          };
        }
      } catch (e) {
        Notify.create({
          message: "Error create new house",
          icon: "cancel",
          color: "negative",
        });
      }
    },
    async onSubmit() {
      try {
        if (this.form.id) {
          const res = await update(this.form.id, { house_rules: this.form });
          if (res.success === true) {
            Notify.create({
              message: res.message,
              icon: "check",
              color: "positive",
            });
            this.$router.push({ name: "home" });
          }
        } else {
          const res = await create({ house_rules: this.form });
          if (res.success === true) {
            Notify.create({
              message: res.message,
              icon: "check",
              color: "positive",
            });
            this.$router.push({ name: "home" });
          }
        }
      } catch (e) {
        Notify.create({
          message: "Error create new house",
          icon: "cancel",
          color: "negative",
        });
      }
    },
  },
});
</script>

<style>
</style>
