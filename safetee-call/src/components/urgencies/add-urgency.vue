<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add Urgency</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.guardianId" label="Guardian Id"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.title" label="Urgency Title"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.summary" label="Summary"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.longitude" label="Urgency Longitude"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.latitude" label="Urgency Latitude"></v-text-field>
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
import UrgenciesApiService from "@/services/urgencies-api.service";

export default {
  name: "add-urgency",
  data() {
    return {
      item: {
        guardianId: 0,
        title: '',
        summary:'',
        longitude:'',
        latitude:''
      }
    }
  },
  methods: {

    save() {
      UrgenciesApiService.create(this.item)
          .then(() => {
            this.navigateToUrgencies();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToUrgencies();
    },
    navigateToUrgencies() {
      this.$router.push({name: 'urgencies'});
    }
  }
}
</script>

<style scoped>

</style>