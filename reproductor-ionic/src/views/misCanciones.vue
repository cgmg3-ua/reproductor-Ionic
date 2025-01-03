<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Mis Canciones</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item v-for="(cancion, index) in canciones" :key="index">
            <ion-label>
              <h2>{{ cancion.title }}</h2>
              
            </ion-label>
            <ion-button color="primary" @click="editSong(cancion.url)" slot="end">
              Editar
            </ion-button>
            <ion-button color="danger" @click="deleteSong(cancion.url)" slot="end">
              Eliminar
            </ion-button>
          </ion-item>
        </ion-list>
  
        <!-- Mensaje de error -->
        <ion-text v-if="mensaje" color="danger" class="ion-text-center">
          <p>{{ mensaje }}</p>
        </ion-text>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { useCanciones } from "../store/canciones";
  import { useUserStore } from "../store/store";
  
  export default {
    data() {
      return {
        canciones: [],
        mensaje: "",
        user: "",
      };
    },
    computed: {
      userStore() {
        return useUserStore();
      },
      decodedToken() {
        return this.userStore.decodedToken; // Accede al token decodificado desde Pinia
      },
    },
    watch: {
      user(newValue) {
        if (newValue) {
          this.cancionesdeArtista(newValue);
        }
      },
    },
    methods: {
      async cancionesdeArtista(user) {
        try {
          const useCancionesData = useCanciones();
          const cancionesespecificas = (await useCancionesData.obtenerTodasLasCanciones()).filter(
            (cancion) => cancion.usuario === user
          );
  
          this.canciones = cancionesespecificas;
        } catch (error) {
          console.error("Error al obtener las canciones:", error);
          this.mensaje = "Hubo un error al obtener las canciones. Inténtalo de nuevo.";
        }
      },
      async deleteSong(url) {
        try {
          const useCancionesData = useCanciones();
          await useCancionesData.eliminarCancion(url);
          this.canciones = this.canciones.filter((cancion) => cancion.url !== url); // Actualiza la lista localmente
        } catch (error) {
          console.error("Error al eliminar la canción:", error);
          alert("Hubo un error al eliminar la canción. Inténtalo de nuevo.");
        }
      },
      async editSong(url) {
        const useCancionesData = useCanciones();
        const id = await useCancionesData.obtenerIdPorUrl(url);
       
        this.$router.push({ path: "/editarcancion", query: { id: id } }).catch(() => {});
        window.location.href = `/editarcancion?id=${id}`;
        
      },
    },
    mounted() {
      this.userStore.loadTokenFromStorage();
      // Verificar que decodedToken esté disponible y tenga la propiedad email
      if (this.decodedToken.email) {
        this.user = this.decodedToken.email;
        this.cancionesdeArtista(this.decodedToken.email);
      } else {
        alert("No estás autenticado.");
        console.warn("El usuario no está autenticado o el token es inválido.");
        this.mensaje = "No se pudo obtener el usuario. Por favor, inicie sesión.";
      }
    },
  };
  </script>
  
  <style scoped>
  .ion-text-center {
    text-align: center;
  }
  </style>
  