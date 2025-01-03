<template>
    <ion-page expand="full">
      <ion-header expand="full">
        <ion-toolbar>
          <ion-title>Editar Canción</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content  expand="full">
        <ion-card expand="full">
          <ion-card-header expand="full">
            <ion-card-title expand="full">Editar Canción</ion-card-title>
          </ion-card-header>
  
          <ion-card-content expand="full">
            <form @submit.prevent="handleEdit" expand="full">
              <ion-item>
                <ion-label position="stacked">Título</ion-label>
                <ion-input 
                  type="text" 
                  v-model="title" 
                  placeholder="Introduce el título" 
                  required
                  @input="title = $event.target.value">
                </ion-input>
              </ion-item>
  
              <div class="ion-margin-top">
                <ion-button 
                  expand="block" 
                  type="submit" 
                  :disabled="!title.trim()">
                  Guardar Cambios
                </ion-button>
              </div>
            </form>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { useCanciones } from "../store/canciones";
  
  
  export default {
    data() {
      return {
        title: "",
        id: "",
      };
    },
    methods: {
      async handleEdit() {
        try {
          const useCancionesData = useCanciones();
          await useCancionesData.editarCancion(this.id, this.title);
          console.log("Canción editada con éxito");
          this.$router.push("/miscanciones").catch(() => {});
          window.location.href = "/miscanciones";
        } catch (error) {
          console.error("Error al editar la canción:", error);
          alert("Error al editar la canción: " + error.message);
        }
      },
    },
    mounted() {
      this.id = this.$route.query.id;
    },
  };
  </script>
  
  <style scoped>
  /* Estilo opcional para centrar el contenido */
  .ion-padding {
    max-width: 500px;
    margin: auto;
  }
  </style>
  