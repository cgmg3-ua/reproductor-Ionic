<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Radio Player</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Dropdown para seleccionar una estación -->
      <ion-item>
        <ion-label>Selecciona una estación</ion-label>
        <ion-select v-model="selectedStation" @ionChange="onStationChange">
          <ion-select-option
            v-for="station in stations"
            :key="station.stationuuid"
            :value="station.url_resolved"
          >
            {{ station.name }}
          </ion-select-option>
        </ion-select>
      </ion-item>

      <!-- Reproductor de audio -->
      <div v-if="selectedStation">
        <h3>Now playing: {{ selectedStation }}</h3>
        <audio id="audio" :src="selectedStation" controls autoplay>
          Your browser does not support the audio element.
        </audio>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';

export default {
  name: 'RadioPlayer',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
  },
  data() {
    return {
      stations: [], // Lista de estaciones de radio
      selectedStation: null, // URL de la estación seleccionada
    };
  },

  methods: {
    // Función para obtener estaciones desde la API
    fetchStations() {
      axios
        .get('https://de1.api.radio-browser.info/json/stations/bycountry/Spain')
        .then((response) => {
          this.stations = response.data;
        })
        .catch((error) => {
          console.error('Error fetching stations', error);
        });
    },

    onStationChange(event) {
      // Aquí puedes agregar lógica adicional si es necesario
      console.log('Estación seleccionada:', this.selectedStation);
    },
  },

  mounted() {
    this.fetchStations();
    
  },
};
</script>

<style scoped>
/* Puedes agregar estilos específicos aquí */
</style>
