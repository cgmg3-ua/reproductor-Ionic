import { defineStore } from 'pinia';
import { db, auth } from '../firebase';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import {jwtDecode} from 'jwt-decode';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
    currentToken: (state) => state.token,
    decodedToken: (state) => (state.token ? jwtDecode(state.token) : null), // Getter para decodificar el token
  },

  actions: {
    async login(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        this.token = await this.user.getIdToken();
        
        // Persistir el token en localStorage
        localStorage.setItem('authToken', this.token);

        console.log('Inicio de sesión exitoso');
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
      }
    },

    async logout() {
      try {
        await signOut(auth); // Cerrar sesión con Firebase
        this.user = null;
        this.token = null;
        localStorage.removeItem('authToken');
        alert('Has cerrado sesión correctamente.');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Hubo un problema al cerrar sesión: ' + error.message);
      }
    },

    async register(email, password, artista) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        this.user = userCredential.user;
        this.token = await this.user.getIdToken();
        await addDoc(collection(db, 'usuarios'), {
          email: email,
          artista: artista,
        });

        // Persistir el token en localStorage
        localStorage.setItem('authToken', this.token);
        alert('Usuario registrado exitosamente');
        console.log('Usuario registrado exitosamente');
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error;
      }
    },

    // Nueva acción para cargar el token desde localStorage
    loadTokenFromStorage() {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.token = token;
        this.user = jwtDecode(token); // Decodifica el token y actualiza el usuario
      }
    },
  },
});