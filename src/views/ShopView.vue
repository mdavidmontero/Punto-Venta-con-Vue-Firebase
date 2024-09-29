<script setup>
import { storeToRefs } from 'pinia'
import MainNav from '@/components/MainNav.vue'
import { useProductsStore } from '../stores/products'
import ShoppingCart from '@/components/ShoppingCart.vue';
import ProductCard from '@/components/ProductCard.vue';
const products = useProductsStore()
const { filterProducts, noResults } = storeToRefs(products)
</script>
<template>
    <MainNav />
    <main class="pt-10 lg:flex lg:h-screen lg:overflow-y-hidden sm:mt-10">
        <div class="px-10 py-24 lg:w-2/3 lg:screen lg:overflow-y-scroll">
            <p v-if="noResults" class="text-4xl text-center">No hay Productos</p>
            <div v-else class="grid grid-cols-1 gap-5 lg:grid-cols-3 2xl:grid-cols-3 md:grid-cols-2">
                <ProductCard v-for="product in filterProducts" :key="product.id" :product="product" />
            </div>
        </div>

        <aside class="px-10 py-24 lg:w-1/3 lg:screen lg:overflow-y-scroll">
            <ShoppingCart />
        </aside>
    </main>
</template>

