<template>
  <v-card>
    <v-card-title>
      Urgencies
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers"
                    :items="displayUrgencies"
                    :items-per-page="5"
                    :search="search"
                    class="elevation-1" ref="urgenciesTable">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="navigateToEditUrgency(item.id)">mdi-pen</v-icon>
          <v-icon small class="mr-2" @click="deleteUrgency(item.id)">mdi-delete</v-icon>
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.id" label="Id"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.summary" label="Summary"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.latitude" label="Latitude"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.longitude" label="Longitude"></v-text-field>
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
          </v-dialog>
        </template>
      </v-data-table>
    </v-card-text>

    <v-card-actions>
      <v-btn
          class="mx-2"
          fab
          dark
          color="indigo"
          x-small
          @click="navigateToAddUrgency"><v-icon dark> mdi-plus </v-icon> </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import UrgencyApiService from '../services/urgencies-api.service';
export default {
  name: "urgencies",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'GuardianId', value: 'guardianId'},
        {text: 'Title', value: 'title'},
        {text: 'Summary', value: 'summary'},
        {text: 'Latitude', value: 'latitude'},
        {text: 'Longitude', value: 'longitude'},
        {text: 'Actions', value: 'actions'}
      ],
      urgencies: [],
      displayUrgencies: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        guardianId:'',
        title: '',
        summary: '',
        latitude: '',
        longitude: '',
      },
      defaultItem: {
        id: 0,
        guardianId: '',
        title: '',
        summary: '',
        latitude: '',
        longitude: '',
      },
    }
  },
  methods: {
    retrieveUrgencies() {
      UrgencyApiService.getAll()
          .then(response => {
            this.urgencies = response.data;
            this.displayUrgencies = response.data.map(this.getDisplayUrgency);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    getDisplayUrgency(urgency) {
      return {
        id: urgency.id,
        guardianId:urgency.guardianId,
        title: urgency.title,
        summary: urgency.summary,
        latitude: urgency.latitude,
        longitude: urgency.longitude,
      };
    },
    refreshList() {
      this.retrieveUrgencies();
    },
    save() {
      if (this.editedIndex > -1) {
        this.urgencies[this.editedIndex] = this.editedItem;
        this.displayUrgencies[this.editedIndex] = this.getDisplayUrgency(this.urgencies[this.editedIndex]);
        UrgencyApiService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });
      } else {
        UrgencyApiService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.urgencies.push(item);
              this.displayUrgencies.push(this.getDisplayUrgency(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },
    deleteUrgency(id) {
      UrgencyApiService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },
    navigateToAddUrgency() {
      this.$router.push({name: 'add-urgency'});
    },
    navigateToEditUrgency(id) {
      this.$router.push({name: 'edit-urgency', params: { id: id}});
    }
  },
  mounted() {
    this.retrieveUrgencies();
  }
}
</script>
<style scoped>
</style>