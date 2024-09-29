<script setup>
import Link from './Link.vue'
import Logo from './Logo.vue'
import { useProductsStore } from '../stores/products'
const products = useProductsStore()
</script>
<template>
    <header
        class="absolute top-0 z-10 flex flex-col justify-between w-full gap-5 px-10 py-5 bg-gray-700 lg:flex-row lg:items-center">
        <div>
            <Logo />
            <div class="flex gap-5 text-white">
                <h2 class="text-lg font-extrabold">Filtros: </h2>
                <div class="flex items-center gap-2" v-for="category in products.categories" :key="category.id">

                    <input type="radio" name="category" :value="category.id"
                        class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                        :checked="products.selectedCategory === category.id"
                        @change="products.selectedCategory = +$event.target.value">
                    <label class="text-gray-100">{{ category.name }}</label>
                </div>
            </div>
        </div>
        <nav>
            <Link to="sales">
            Administrar
            </Link>
        </nav>
    </header>
</template>

