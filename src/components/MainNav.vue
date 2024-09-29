<script setup>
import Link from './Link.vue';
import Logo from './Logo.vue';
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useProductsStore } from '../stores/products';
const { isAuth, logout } = useAuthStore();
const products = useProductsStore();

console.log( isAuth.value );
</script>
<template>
  <header
    class="absolute top-0 z-10 flex flex-col justify-between w-full gap-5 px-10 py-5 bg-gray-700 lg:flex-row lg:items-center">
    <div>
      <Logo />
      <div class="flex gap-5 text-white">
        <h2 class="text-lg font-extrabold">Filtros: </h2>
        <div class="flex items-center gap-2"
          v-for="                                                        category in products.categories                                                        "
          :key=" category.id ">

          <input type="radio" name="category" :value=" category.id "
            class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
            :checked=" products.selectedCategory === category.id "
            @change="products.selectedCategory = +$event.target.value">
          <label class="text-gray-100">{{ category.name }}</label>
        </div>
      </div>
    </div>
    <nav>

      <!-- <Link to="sales">
            Administrar
            </Link> -->
      <button v-if=" isAuth " @click=" logout "
        class="p-2 px-10 font-bold text-white transition duration-300 bg-red-500 rounded hover:bg-red-600">
        Salir
      </button>
    </nav>
  </header>
</template>
