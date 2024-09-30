<script setup>
import Link from './Link.vue';
import Logo from './Logo.vue';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useProductsStore } from '../stores/products';
const { isAuth, logout } = useAuthStore();
const products = useProductsStore();

function handleCategoryChange( categoryId ) {
  products.selectedCategory = categoryId;
}
</script>

<template>
  <header
    class="absolute top-0 z-10 flex flex-col justify-between w-full gap-5 px-5 py-5 bg-gray-700 lg:flex-row lg:items-center lg:px-10">
    <div class="flex flex-col gap-5 lg:gap-0">
      <Logo />
      <div class="flex flex-wrap gap-3 text-white lg:flex-nowrap">
        <h2 class="text-lg font-extrabold">Filtros: </h2>
        <div class="flex items-center gap-2">
          <input type="radio" name="category" value=""
            class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
            :checked=" products.selectedCategory === '' " @change="handleCategoryChange( '' )">
          <label class="text-gray-100">Todos</label>
        </div>
        <div class="flex items-center gap-2" v-for=" category in products.categories " :key=" category.id ">
          <input type="radio" name="category" :value=" category.id "
            class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
            :checked=" products.selectedCategory === category.id " @change="handleCategoryChange( category.id )">
          <label class="text-gray-100">{{ category.name }}</label>
        </div>
      </div>
    </div>
    <nav class="flex justify-end">
      <button v-if=" isAuth " @click=" logout " class="p-2 px-5 text-white bg-red-500 rounded hover:bg-red-600">
        Salir
      </button>
    </nav>
  </header>
</template>
