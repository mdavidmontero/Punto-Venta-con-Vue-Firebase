<script setup>
import { formatCurrency } from '@/helpers';
import Amount from './Amout.vue';
defineProps( {
  sale: {
    type: Object
  }
} );
</script>
<template>
  <div class="py-6 space-y-6 border-t border-gray-200">
    <h2 class="text-2xl font-black">Detalle de Venta</h2>
    <p class="text-xl font-black text-gray-500">Productos Vendidos</p>
    <ul role="list" class="mt-6 text-sm font-medium text-gray-500 border-t border-gray-200 divide-gray-200">
      <li v-for="       item in sale.items       " class="flex py-6 space-x-6">
        <img class="flex-none w-24 h-24 rounded-lg" :src=" item.image " :alt=" 'Imagen de ' + item.name ">
        <div class="flex-auto space-y-2">
          <h3 class="text-gray-900">{{ item.name }}</h3>
          <p class="font-extrabold">{{ formatCurrency( item.price ) }}</p>
          <p>Cantidad: {{ item.quantity }}</p>
        </div>
      </li>
    </ul>
    <dl class="pt-6 space-y-6 text-sm font-medium text-gray-500 border-t border-gray-200">
      <Amount>
        <template #label>Subtotal: </template>
        {{ formatCurrency( sale.subtotal ) }}
      </Amount>
      <Amount>
        <template #label>Cliente: </template>
        {{ sale.user.name }}
      </Amount>
      <Amount>
        <template #label>Telefono: </template>
        {{ sale.user.phone }}
      </Amount>
      <Amount>
        <template #label> Email: </template>
        {{ sale.user.email }}
      </Amount>
      <Amount>
        <template #label>Dirección: </template>
        {{ sale.user.address }}
      </Amount>

      <!-- <Amount v-if=" sale.discount " class="p-2 bg-green-200">
        <template #label>Descuento: </template>
        {{ formatCurrency( sale.discount ) }}
      </Amount> -->
      <Amount>
        <template #label>Total a Pagar: </template>
        {{ formatCurrency( sale.total ) }}
      </Amount>
    </dl>

  </div>
</template>
