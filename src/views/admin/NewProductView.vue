<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
import Link from "@/components/Link.vue"
import useImage from '@/composables/useImage'
import { useProductsStore } from '@/stores/products'

const { onFileChange, url, isImageUploaded } = useImage()
const products = useProductsStore()
const router = useRouter()
const formData = reactive({
    name: '',
    category: '',
    price: '',
    availability: '',
    image: ''
})

const submitHandler = async (data) => {
    const { image, ...values } = data
    try {
        await products.createProduct({ ...values, image: url.value })
        router.push({ name: 'products' })
    } catch (error) {
        console.log(error);
    }
}
</script>
<template>
    <div>
        <Link to="products">
        Volver
        </Link>
        <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>
        <div class="flex justify-center bg-white shadow">
            <div class="mt-10 p-10 w-full 2xl:w-2/4">
                <FormKit type="form" submit-label="Agregar Producto"
                    incomplete-message="No se puedo enviar, revisa los mensajes" @submit="submitHandler">
                    <FormKit type="text" label="Nombre" name="name" placeholder="Nombre de Producto" validation="required"
                        :validation-messages="{ required: 'El Nombre del Producto es Obligatorio' }"
                        v-model.trim="formData.name" />
                    <FormKit type="file" label="Imagen Producto" name="image" validation="required"
                        :validation-messages="{ required: 'La imagen del Producto es Obligatoria' }" accept=".jpg"
                        @change="onFileChange" v-model.trim="formData.image" />
                    <div v-if="isImageUploaded">
                        <p class="font-black ">Imagen de Producto</p>
                        <img :src="url" alt="Nueva Imagen Producto" class="w-32">
                    </div>
                    <FormKit type="select" label="Categoria" name="category" validation="required"
                        :validation-messages="{ required: 'La Categoria es Obligatoria' }"
                        :options="products.categoryOptions" v-model.trim="formData.category" />
                    <FormKit type="number" label="Precio" name="price" validation="required"
                        placeholder="Precio del Producto"
                        :validation-messages="{ required: 'El precio de Producto es obligatorio' }" min="1"
                        v-model.trim="formData.price" />
                    <FormKit type="number" label="Disponibles" name="availability" validation="required"
                        placeholder="Cantidad disponible" :validation-messages="{ required: 'La cantidad es obligatoria' }"
                        min="1" v-model.number="formData.availability" />
                </FormKit>
            </div>
        </div>
    </div>
</template>

