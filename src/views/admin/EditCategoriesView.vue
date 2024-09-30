<script setup>
import { watch, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc } from 'firebase/firestore';
import { useFirestore, useDocument } from 'vuefire';
import Link from '@/components/Link.vue';
import { useCategoriresStore } from '@/stores/categories';

const route = useRoute();
const router = useRouter();
const db = useFirestore();
const docRef = doc( db, 'categories', route.params.id );
const category = useDocument( docRef );
const categories = useCategoriresStore();



const formData = reactive( {
  name: '',

} );

watch( category, ( category ) => {
  if ( !category ) {
    router.push( ( { name: 'categories' } ) );
  }
  // formData.name = product.name
  // formData.price = product.price
  // formData.category = product.category
  // formData.availability = product.availability
  // formData.image = product.image
  Object.assign( ( formData ), category );
} );

const submitHandler = async ( data ) => {
  try {
    await categories.updateCategory( docRef, { ...data } );
    router.push( { name: 'categories' } );
  } catch ( error ) {
    console.log( error );
  }
}

</script>

<template>
  <div class="mt-10">
    <Link to="categories">
    Volver
    </Link>
    <h1 class="my-10 text-4xl font-extrabold">Editar Categoria</h1>

    <div class="flex justify-center bg-white shadow">
      <div class="w-full p-10 mx-auto mt-10 2xl:w-2/4">

        <FormKit type="form" :value=" formData " submit-label="Guardar Cambios"
          incomplete-message="No se pudo enviar, revisa los mensajes" @submit=" submitHandler " :actions=" false ">
          <FormKit type="text" label="Nombre" name="name" placeholder="Nombre de Categoria" validation="required"
            v-model.trim=" formData.name "
            :validation-messages=" { required: 'El Nombre de la categoria es Obligatorio' } " />





          <FormKit type="submit">Guardar Cambios</FormKit>

        </FormKit>
      </div>
    </div>
  </div>
</template>
