<template>
  <q-page padding>
    <div class="row" style="height: 90vh">
      <div class="col-12 flex content-center justify-center">
        <q-card style="width: 400px">
          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
              <q-input
                outlined
                v-model="form.email"
                label="Email"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Required field']"
              />

              <q-input
                outlined
                v-model="form.password"
                label="Password"
                type="password"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Required field']"
              />

              <q-btn
                label="Login"
                type="submit"
                color="primary"
                class="full-width"
                rounded
              />
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { SessionStorage } from "quasar";
// import { Notify } from "quasar";
export default defineComponent({
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      var token =
        "Bearer 40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8";
      var numParts = 4;
      var partSize = Math.ceil(token.length / numParts);

      for (var i = 0; i < numParts; i++) {
        var startIndex = i * partSize;
        var endIndex = startIndex + partSize;
        var part = token.substring(startIndex, endIndex);

        SessionStorage.set("tokenPart" + i, part);
      }

      this.$router.push({ name: "home" });
    },
  },
});
</script>

<style>
</style>
