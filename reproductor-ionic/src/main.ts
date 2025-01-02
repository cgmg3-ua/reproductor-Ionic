import { createApp } from 'vue';
import App from './App.vue'; // Tu componente principal
import router from './router'; // Importa el router
import { createPinia } from 'pinia'; // Importa Pinia

// Importar Ionic
import { IonicVue } from '@ionic/vue';

// Importar estilos básicos de Ionic
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

const app = createApp(App); // Crea la aplicación
const pinia = createPinia(); // Instancia Pinia

app.use(IonicVue); // Usa Ionic
app.use(router); // Usa el router
app.use(pinia); // Usa Pinia
app.mount('#app'); // Monta la aplicación