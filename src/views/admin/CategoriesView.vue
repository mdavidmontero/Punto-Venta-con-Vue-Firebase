<script setup>
import { useCategoriresStore } from '@/stores/categories';
import Link from '@/components/Link.vue';
import Categorie from '@/components/Categorie.vue';
const categories = useCategoriresStore()

</script>
<template>
  <div class="flex flex-row items-center gap-2 mt-10 sm:mt-0">
    <Link to="new-categories">
    Nuevo Categoria
    </Link>
    <!-- <Link to="edit-category">
    Editar Categoria
    </Link> -->
  </div>
  <h1 class="my-10 text-4xl font-black">Categorias</h1>
  <p v-if=" categories.noResults ">No hay resultados</p>
  <ul v-else role="list" class="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
    <Categorie
      v-for="                                              category in categories.categoriesCollection                                              "
      key="category.id" :category=" category " />
  </ul>
</template>
