<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import Link from '@/components/Link.vue';
import { useCategoriresStore } from '@/stores/categories';

const categories = useCategoriresStore();


const router = useRouter();
const formData = reactive( {
  id: '',
  name: '',
} );

const submitHandler = async ( data ) => {
  try {
    await categories.createCategory( data );
    router.push( { name: 'products' } );
  } catch ( error ) {
    console.log( error );
  }

};
</script>


<template>
  <div>
    <Link to="products">
    Volver
    </Link>
    <h1 class="my-10 text-4xl font-black">Nuevo Categoria</h1>
    <div class="flex justify-center bg-white shadow">
      <div class="w-full p-10 mt-10 2xl:w-2/4">
        <FormKit type="form" submit-label="Agregar Categoria"
          incomplete-message="No se puedo enviar, revisa los mensajes" @submit=" submitHandler ">
          <FormKit type="text" label="Nombre" name="name" placeholder="Nombre de Producto" validation="required"
            :validation-messages=" { required: 'El Nombre del Producto es Obligatorio' } "
            v-model.trim=" formData.name " />

        </FormKit>
      </div>
    </div>
  </div>
</template>
