<script setup>
import { ref, onMounted } from 'vue';
import { useFirestore } from 'vuefire';
import { addDoc, collection, updateDoc, getDocs, query, limit, doc } from 'firebase/firestore';

const db = useFirestore();
const phoneNumber = ref( '' );
const existingPhoneId = ref( null );

const fetchPhoneNumber = async () => {
  try {
    const q = query( collection( db, 'phoneNumbers' ), limit( 1 ) );
    const querySnapshot = await getDocs( q );

    if ( !querySnapshot.empty ) {
      const phoneData = querySnapshot.docs[ 0 ];
      phoneNumber.value = phoneData.data().phone;
      existingPhoneId.value = phoneData.id;
    }
  } catch ( error ) {
    console.error( 'Error buscando número de teléfono:', error );
  }
};

onMounted( () => {
  fetchPhoneNumber();
} );

const handleSubmit = async () => {
  if ( phoneNumber.value.trim() === '' ) {
    alert( 'Por favor ingrese un número de teléfono válido' );
    return;
  }

  try {
    if ( existingPhoneId.value ) {
      const phoneDocRef = doc( db, 'phoneNumbers', existingPhoneId.value );
      await updateDoc( phoneDocRef, {
        phone: phoneNumber.value,
      } );
      alert( 'Número de teléfono actualizado correctamente' );
    } else {
      await addDoc( collection( db, 'phoneNumbers' ), {
        phone: phoneNumber.value,
        createdAt: new Date(),
      } );
      alert( 'Número de teléfono guardado correctamente' );
    }
  } catch ( error ) {
    console.error( 'Error guardando el número de teléfono:', error );
    alert( 'Hubo un error guardando el número de teléfono' );
  }
};
</script>

<template>
  <div class="w-full max-w-md p-6 mx-auto mt-10 bg-white rounded-md shadow-md">
    <h2 class="mb-4 text-xl font-bold text-center">Configurar número de WhatsApp</h2>
    <form @submit.prevent=" handleSubmit " class="space-y-4">
      <FormKit type="tel" v-model=" phoneNumber " name="phone" placeholder="Ingrese su número de WhatsApp"
        validation="required|length:10" />
      <div>
        <button type="submit"
          class="w-full p-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none">
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>
