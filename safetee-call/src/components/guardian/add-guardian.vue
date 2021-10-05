<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add Guardian</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.username" label="Username"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.email" label="Email"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.gender" label="Gender"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.firstName" label="First name"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.lastName" label="Last name"></v-text-field>
          </v-col>
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
  name: "add-guardian",
  data() {
    return {
      item: {
        username:"",
        email:"",
        gender: "",
        firstName: "",
        lastName: "",
        address:""
      }
    }
  },
  methods: {

    save() {
      GuardiansApiService.create(this.item)
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
  }
}
</script>

<style scoped>

</style>