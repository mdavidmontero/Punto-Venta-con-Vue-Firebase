<script setup>
import { useProductsStore } from '../../stores/products';
import Link from '@/components/Link.vue';
import Product from '@/components/Product.vue';
const products = useProductsStore();
console.log( products.productsCollection );

</script>
<template>
  <div class="flex flex-row items-center gap-2 mt-10 sm:mt-0">
    <Link to="new-product">
    Nuevo Producto
    </Link>
  </div>
  <h1 class="my-10 text-4xl font-black">Productos</h1>
  <p v-if=" products.noResults " class="text-4xl text-center">No hay Productos</p>
  <ul v-else role="list" class="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
    <Product v-for="   product in products.productsCollection   " key="product.id" :product=" product " />

  </ul>
</template>
