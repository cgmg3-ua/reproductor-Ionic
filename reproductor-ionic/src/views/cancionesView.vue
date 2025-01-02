<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Lista de Canciones</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <ion-list>
          <ion-item 
            v-for="(cancion, index) in cancionesFiltradas" 
            :key="index">
            <ion-label>
              <h2>{{ cancion.title }}</h2>
              <p v-if="cancion.usuario"><strong>Artista:</strong> {{ cancion.usuario }}</p>
            </ion-label>
            <ion-button fill="clear" slot="end" @click="mostrarInformacion(index)">
              <ion-icon :icon="desplegableVisible === index ? 'chevron-up-outline' : 'chevron-down-outline'" />
            </ion-button>
          </ion-item>
  
          <ion-item v-if="desplegableVisible !== null">
            <div class="inner" v-if="desplegableVisible !== null">
              <p style="color:black">Detalles adicionales sobre la canción.</p>
            </div>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { useCanciones } from "../store/canciones";
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  
  export default {
    data() {
      return {
        canciones: [], // Lista de canciones con información completa
        desplegableVisible: null, // Índice del desplegable actualmente visible
        busqueda: "", // Texto de búsqueda
      };
    },
    computed: {
      cancionesFiltradas() {
        if (!this.busqueda) {
          return this.canciones; // Si no hay búsqueda, devuelve todas las canciones
        }
        return this.canciones.filter(cancion =>
          cancion.title.toLowerCase().includes(this.busqueda.toLowerCase()) // Filtra por título
        );
      },
    },
    methods: {
      async cargarCanciones() {
        try {
          const useCancionesData = useCanciones();
          const todasLasCanciones = await useCancionesData.obtenerTodasLasCanciones();
          this.canciones = todasLasCanciones;
          console.log('Canciones cargadas correctamente');
        } catch (error) {
          console.error("Error al obtener las canciones:", error);
          this.mensaje = "Hubo un error al obtener las canciones. Inténtalo de nuevo.";
        }
      },
      mostrarInformacion(index) {
        this.desplegableVisible = this.desplegableVisible === index ? null : index;
      },
      buscar() {
        // Manejar lógica adicional de búsqueda si es necesario
      },
    },
    async mounted() {
      // Asegúrate de esperar a que las canciones se carguen antes de hacer algo más
      await this.cargarCanciones();
    },
  };
  </script>
  
  <style scoped>
  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    width: 300px;
    height: 100px;
    border: 1px solid #ccc;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  </style>
  