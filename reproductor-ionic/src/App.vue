<template>
  <ion-app>
    <ion-router-outlet /> <!-- Aquí se cargará el contenido de las rutas -->
  </ion-app>

  <!-- Footer de Ionic -->
  <ion-footer v-if="isAuthenticated" >
    <ion-toolbar>
      <div class="footer-container" >
        <ion-button href="/canciones" expand="full">
          <ion-icon aria-hidden="true" :icon="triangle" />
          <ion-label>Canciones</ion-label>
        </ion-button>

        <ion-button href="/radio" expand="full">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <ion-label>Radio</ion-label>
        </ion-button>

        <ion-button href="/perfil" expand="full">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Perfil</ion-label>
        </ion-button>
      </div>
    </ion-toolbar>
  </ion-footer>
</template>
<script setup lang="ts">
import { IonApp, IonRouterOutlet, IonButton, IonIcon, IonLabel, IonFooter, IonToolbar } from '@ionic/vue';
import { triangle, ellipse, square } from 'ionicons/icons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Asegúrate de importar tu instancia de Firebase correctamente

// Variable para controlar la autenticación
import { ref, onMounted } from 'vue';

const isAuthenticated = ref<boolean>(false); // Usamos ref para hacer reactiva la variable

// Usamos onMounted para escuchar cambios en el estado de autenticación
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true; // Usuario autenticado
    } else {
      isAuthenticated.value = false; // Usuario no autenticado
    }
  });
});
</script>

<style scoped>
/* Estilo para el footer */
ion-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 10;
}

.footer-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

ion-button {
  flex: 1;
  margin: 0 5px;
}
</style>
