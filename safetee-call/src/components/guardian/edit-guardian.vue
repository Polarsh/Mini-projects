<template>
  <v-card>
    <v-card-title>
      <span class="headline">Edit Guardian</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.id" label="Guardian Id"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.username" label="Username"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.email" label="Email"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.firstName" label="First Name"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.lastName" label="Last Name"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.gender" label="Gender"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.address" label="Address"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import GuardiansApiService from "@/services/guardians-api.service";

export default {
  name: "edit-guardian",
  data() {
    return {
      item: {
        id: "",
        username: "",
        email: "",
        firstName: "",
        lastName:"",
        gender:"",
        address:""
      }
    }
  },
  methods: {
    retrieveGuardian(id) {
      GuardiansApiService.get(id)
          .then((response) => {
            this.item = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },

    save() {
      GuardiansApiService.update(this.item.id, this.item)
          .then(() => {
            this.navigateToGuardians();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToGuardians();
    },
    navigateToGuardians() {
      this.$router.push({name: 'guardians'});
    }
  },
  created() {
    this.retrieveGuardian(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>