<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Subir una Canción</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <form @submit.prevent="uploadSong">
          <ion-item>
            <ion-label position="stacked">Archivo de canción</ion-label>
            <input type="file" @change="onFileChange" accept="audio/*" />
          </ion-item>
  
          <ion-item>
            <ion-label position="stacked">Título de la canción</ion-label>
            <ion-input 
              v-model="songTitle" 
              placeholder="Título de la canción" 
              required
              @input="songTitle = $event.target.value">
            </ion-input>
          </ion-item>
  
          <!-- Botón sin transiciones -->
          <div class="ion-margin-top">
            <ion-button 
              expand="block"  
              type="submit">
              Subir Canción
            </ion-button>
          </div>
        </form>
  
        <!-- Mensaje de éxito -->
        <ion-text 
          v-if="showSuccessMessage" 
          color="success" 
          class="ion-text-center ion-margin-top">
          <p>¡Canción subida con éxito!</p>
        </ion-text>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { useCanciones } from "../store/canciones"; // Importa el store de Pinia
  import { useUserStore } from "../store/store";
  
  export default {
    data() {
      return {
        songFile: null,
        songTitle: "",
        userEmail: "",
        showSuccessMessage: false, // Controla la aparición del mensaje de éxito
      };
    },
    computed: {
      userStore() {
        return useUserStore();
      },
      decodedToken() {
        return this.userStore.decodedToken;
      },
      canSubmit() {
        // Verifica si ambos campos están completos
        return this.songFile !== null && this.songTitle.trim() !== "";
      },
    },
    methods: {
      onFileChange(event) {
        this.songFile = event.target.files[0];
      },
      async uploadSong() {
        if (!this.songFile || !this.songTitle) {
            
        alert("Por favor, selecciona un archivo y añade un título."); // Mensaje de alerta
        return;
        }
        try {
          const useCancionesData = useCanciones();
          await useCancionesData.guardarCancion(this.songFile, this.songTitle, this.userEmail);
  
          this.showSuccessMessage = true;
  
          // Oculta el mensaje después de 3 segundos
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
  
          this.songFile = null;
          this.songTitle = "";
          document.querySelector("input[type='file']").value = null;
        } catch (error) {
          console.error("Error subiendo la canción:", error);
        }
      },
    },
    mounted() {
      this.userStore.loadTokenFromStorage();
      this.userEmail = this.userStore.decodedToken.email;
    },
  };
  </script>
  
  <style scoped>
  .ion-text-center {
    text-align: center;
  }
  </style>
  