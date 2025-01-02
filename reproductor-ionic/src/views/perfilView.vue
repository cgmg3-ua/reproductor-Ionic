<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Perfil</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Perfil</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding">
        <h1>Bienvenido!</h1>
        <p v-if="decodedToken">Correo del usuario: {{ decodedToken.email }}</p>
        <p v-else>No estás autenticado.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../store/store';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';


const userStore = useUserStore();

const decodedToken = computed(() => userStore.decodedToken); // Accede al token decodificado desde Pinia

onMounted(() => {
  userStore.loadTokenFromStorage(); // Carga el token desde localStorage al cargar el componente
  
});
</script>

<style scoped>
/* Aquí puedes agregar estilos personalizados si es necesario */
h1 {
  margin-bottom: 16px;
}
p {
  font-size: 16px;
}
</style>
