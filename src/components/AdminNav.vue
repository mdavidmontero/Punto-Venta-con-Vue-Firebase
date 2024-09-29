<script setup>
import { RouterLink } from 'vue-router';
import Link from './Link.vue';
import Logo from './Logo.vue';
</script>

<template>
  <header class="fixed top-0 z-10 w-full p-6 bg-gray-700 shadow-md">
    <div class="container flex flex-col items-center justify-between mx-auto md:flex-row">
      <div class="flex items-center justify-center mb-4 md:mb-0">
        <Logo />
      </div>
      
      <nav class="flex flex-row items-center justify-center gap-4">
        <RouterLink :to="{ name: 'products' }" class="p-2 font-bold text-white transition duration-300 rounded hover:bg-gray-600">
          Productos
        </RouterLink>
        <RouterLink :to="{ name: 'sales' }" class="p-2 font-bold text-white transition duration-300 rounded hover:bg-gray-600">
          Ventas
        </RouterLink>
        <Link to="shop" class="p-2 font-bold text-white transition duration-300 rounded hover:bg-gray-600">
          Ir a Tienda
        </Link>
      </nav>
    </div>
  </header>
</template>
