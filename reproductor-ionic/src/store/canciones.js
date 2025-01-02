import { defineStore } from 'pinia';

import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  deleteDoc, 
  updateDoc 
} from "firebase/firestore";
import { db } from '../firebase'; // Asegúrate de que la ruta sea correcta
import { ref } from 'firebase/storage'; // Referencias a Storage
 
  import { storage } from "../firebase"; // Cpara guardar las pistas de audio
  import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { addDoc } from 'firebase/firestore';


export const useCanciones = defineStore('url',{
  
    state: () => ({
        //url: null,
        listacanciones: [],
        cancion: null,
        cantante: null,
    }),
    getters: {
        getListaCanciones: (state) => state.canciones,
        getCancion: (state) => state.cancion,
        getCantante: (state) => state.cantante,
        getUrl: (state) => state.url,
    },

    actions: {
    async obtenerTodasLasCanciones() {
        try {
            // Referencia a la colección "songs" en Firestore
            const songsCollectionRef = collection(db, 'songs');

            // Obtener todas las canciones de la colección
            const querySnapshot = await getDocs(songsCollectionRef);
            
            // Guardar todos los datos de las canciones en el array
            const cancionesArray = [];
            querySnapshot.forEach((doc) => {
                const cancionData = doc.data();
                cancionesArray.push(cancionData);
            });

            // Devolver el array con todos los datos de las canciones
            this.listacanciones=cancionesArray;
            return cancionesArray;
        } catch (error) {
            console.error('Error obteniendo las canciones:', error);
            throw error; // Lanza el error para que pueda ser manejado por el llamador
        }
    },



    async obtenerArtista(urlparametro) {
        try{
            const url=urlparametro;
            const songsCollectionRef = collection(db, "songs");
            const q = query(songsCollectionRef, where("url", "==", url));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.empty){
                console.log("No hay canciones con ese nombre");
                return;
            }
            else{
                querySnapshot.forEach((doc) => {
                    const cancionData = doc.data();
                    this.cantante=cancionData.usuario;
                    return cancionData.usuario;
                });
            }
        }
        catch(error){
            console.error('Error obteniendo el artista:', error);
            throw error;
        }
    }, 
    async cancionesdeArtista(artista) {
        
        try{
            const songsCollectionRef = collection(db, "songs");
            const q = query(songsCollectionRef, where("usuario", "==", artista));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.empty){
                console.log("No hay canciones de ese artista");
                return;
            }
            else{
                const cancionesArray = [];
                querySnapshot.forEach((doc) => {
                    const cancionData = doc.data();
                    cancionesArray.push(cancionData);
                });
                this.listacanciones=cancionesArray;
                return cancionesArray;
            }
        }
        catch(error){
            console.error('Error obteniendo las canciones del artista:', error);
            throw error;
        }
    },
    // **Función para eliminar una canción**
   // **Función para eliminar una canción usando la URL como identificador directo**
async eliminarCancion(songUrl) {
    try {
        
    const id= await this.obtenerIdPorUrl(songUrl);

    let stringID=String(id);
      // Crear referencia al documento usando la URL como identificador
      const songRef = doc(db, 'songs', stringID);
        
      // Eliminar el documento
      await deleteDoc(songRef);
  
      // Actualizar la lista local
      //this.listacanciones = this.listacanciones.filter(song => song.url !== songUrl);
      console.log(stringID);  
      console.log('Canción eliminada correctamente');
    } catch (error) {
        alert('No se puede eliminar la canción pinia');
      console.error('Error eliminando la canción:', error);

      throw error;
    }
    },
  
  
      // **Función para editar una canción**
      async editarCancion(id, newTitle) {
        try {
            if (!id) {
                throw new Error('El ID proporcionado es inválido o está vacío.');
            }
    
            let stringID = String(id); // Convertir el ID a cadena
            console.log("ID del documento:", stringID);
    
            const songRef = doc(db, 'songs', stringID); // Crear referencia al documento
            console.log("Referencia al documento:", songRef.path);
    
            // Actualizar los datos en Firestore
            await updateDoc(songRef, { title: newTitle });
    
            console.log('Canción actualizada correctamente');
        } catch (error) {
            alert('No se puede editar la canción pinia');
            console.error('Error editando la canción:', error);
            throw error;
        }
    },
    

    async obtenerIdPorUrl(url) {
    try {
      // Referencia a la colección "songs"
      const songsCollectionRef = collection(db, "songs");
  
      // Crear una consulta para buscar por la URL
      const q = query(songsCollectionRef, where("url", "==", url));
  
      // Ejecutar la consulta
      const querySnapshot = await getDocs(q);
  
      // Comprobar si se encontró algún documento con esa URL
      if (!querySnapshot.empty) {
        // Si se encontró, obtén el primer documento (suponiendo que la URL es única)
        const doc = querySnapshot.docs[0];
          console.log("ID del documento:", doc.id); // Este es el ID del documento
          console.log("Datos del documento:", doc.data()); // Opcional: muestra los datos
        
        
        return doc.id;
      } else {
        console.log("No se encontraron canciones con esa URL");
      }
    } catch (error) {
      console.error("Error al obtener el ID de la canción:", error);
    }
  },
  async guardarCancion(songFile, songTitle, userEmail) {
    try {
        // Subir archivo a Cloud Storage
        const storageRef = ref(storage, `songs/${songFile.name}`);
        await uploadBytes(storageRef, songFile);

        // Obtener la URL de descarga
        const downloadURL = await getDownloadURL(storageRef);

        // Guardar metadatos en Firestore
        const newSong = {
            title: songTitle,
            url: downloadURL,
            usuario: userEmail,
        };

        await addDoc(collection(db, "songs"), newSong);

        

        console.log("Canción subida exitosamente");
        return { success: true, message: "Canción subida exitosamente" };
    } catch (error) {
        console.error("Error subiendo la canción:", error);
        return { success: false, message: "Hubo un error al subir la canción" };
    }
    },

 
    


},	
});