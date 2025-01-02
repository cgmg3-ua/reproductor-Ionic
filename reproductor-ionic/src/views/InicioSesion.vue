<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Iniciar Sesión</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <div class="login-container" v-if="!isAuthenticated">
          <!-- Título -->
          <ion-text color="primary">
            <h1>Iniciar Sesión</h1>
          </ion-text>
  
          <!-- Mensaje de error -->
          <ion-text color="danger" v-if="errorMessage">
            <p class="error-message">{{ errorMessage }}</p>
          </ion-text>
  
          <!-- Formulario -->
          <form @submit.prevent="handleLogin" :class="{ shake: isShaking }">
            <ion-item>
              <ion-label position="floating">Correo Electrónico</ion-label>
              <ion-input
                type="email"
                v-model="email"
                placeholder="Introduce tu correo"
                required
                @input="email = $event.target.value"
              ></ion-input>
            </ion-item>
  
            <ion-item>
              <ion-label position="floating">Contraseña</ion-label>
              <ion-input
                type="password"
                v-model="password"
                placeholder="Introduce tu contraseña"
                required
                @input="password = $event.target.value"
              ></ion-input>
            </ion-item>
  
            <div class="form-buttons">
              <ion-button expand="block" type="submit" :class="{ shake: isShaking }">
                Iniciar Sesión
              </ion-button>
            </div>
          </form>
  
          <!-- Enlaces -->
          <ion-text>
            <router-link to="/register">¿No tienes cuenta? Regístrate aquí</router-link>
          </ion-text>
          <ion-text>
            <router-link to="/forgot-password">He olvidado la contraseña</router-link>
          </ion-text>
        </div>
       
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import ExploreContainer from '@/components/ExploreContainer.vue';
  import { useUserStore } from '../store/store'; // Ajusta la ruta si es necesario
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        isShaking: false, // Controlador de la animación de sacudida
        errorMessage: '' // Mensaje de error
      };
    },
    setup() {
      const userStore = useUserStore();
      return { userStore };
    },
    methods: {
      
      async handleLogin() {
        console.log('Correo ingresado:', this.email);// Depuración del correo electrónico
        console.log('Contraseña ingresada:', this.password); // Depuración de la contraseñ
        if (!this.email || !this.email.includes('@') || !this.email.includes('.')) {
        
        this.errorMessage = 'Por favor, introduce un correo electrónico válido.';
        return;
      }
        try {
          await this.userStore.login(this.email, this.password);
          console.log("Inicio de sesión exitoso");
          this.$router.push("canciones");
        } catch (error) {
          console.error("Error al iniciar sesión:", error);
  
          // Mostrar mensaje de error
          this.errorMessage = "Inicio de sesión incorrecto. Verifica tus credenciales.";
  
          // Activar animación de sacudida
          this.isShaking = true;
  
          // Limpiar animación y mensaje de error después de un tiempo
          setTimeout(() => {
            this.isShaking = false;
          }, 500); // Duración de la animación
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Animación de sacudida */
  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    20%, 60% {
      transform: translateX(-10px);
    }
    40%, 80% {
      transform: translateX(10px);
    }
  }
  
  .shake {
    animation: shake 0.5s ease-in-out;
  }
  
  /* Mensaje de error */
  .error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
  }
  
  /* Estilo del contenedor */
  .login-container {
    padding: 16px;
    max-width: 400px;
    margin: auto;
  }
  
  .form-buttons {
    margin-top: 20px;
  }
  </style>
  