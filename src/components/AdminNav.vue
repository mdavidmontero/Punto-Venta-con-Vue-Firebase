<script setup>
import { RouterLink } from 'vue-router';
import Link from './Link.vue';
import Logo from './Logo.vue';
import { useAuthStore } from '@/stores/auth';
const { isAuth, logout } = useAuthStore();
console.log( isAuth );
</script>

<template>
  <header class="fixed top-0 z-10 w-full p-6 bg-gray-700 shadow-md">
    <div class="container flex flex-col items-center justify-between mx-auto md:flex-row">
      <div class="flex items-center justify-center mb-4 md:mb-0">
        <Logo />
      </div>

      <nav class="flex flex-row flex-wrap items-center justify-center gap-4">
        <RouterLink :to=" { name: 'products' } "
          class="p-2 font-bold text-white transition duration-300 rounded hover:bg-gray-600">
          Productos
        </RouterLink>
        <RouterLink :to=" { name: 'categories' } "
          class="p-2 font-bold text-white transition duration-300 rounded hover:bg-gray-600">
          Categorias
        </RouterLink>
        <RouterLink :to=" { name: 'sales' } "
          class="p-2 font-bold text-white transition duration-300 rounded hover:bg-gray-600">
          Ventas
        </RouterLink>

        <RouterLink :to=" { name: 'configure-whatsapp' } "
          class="p-2 font-bold text-white transition duration-300 rounded hover:bg-gray-600">
          Watsapp
        </RouterLink>
        <!-- <Link to="shop" class="p-2 font-bold text-white transition duration-300 rounded hover:bg-gray-600">
          Ir a Tienda
        </Link> -->
        <button v-if=" isAuth " @click=" logout "
          class="p-2 px-10 font-bold text-white transition duration-300 bg-red-500 rounded hover:bg-red-600">
          Salir</button>
      </nav>
    </div>
  </header>
</template>
