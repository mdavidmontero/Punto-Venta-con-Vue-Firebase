<script setup>
import { ref } from 'vue'
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { useSalesStore } from '@/stores/sales'
import SalesDetails from '@/components/SalesDetails.vue';
import { formatCurrency } from '@/helpers';
const sales = useSalesStore()
const formater = ref({
    date: 'DD/MM/YYYY',
    month: 'MMMM'
})

</script>
<template>
  <h1 class="mx-10 my-4 text-4xl font-black">Resumen de Ventas</h1>
  <div class="gap-5 mx-10 md:flex md:items-start">
        <div class="flex justify-center p-5 bg-white md:w-1/2 lg:w-1/3">
            <vue-tailwind-datepicker v-model="sales.date" i18n="es-mx" as-single="true" no-input :formatter="formater" />
        </div>
        <div class="p-5 pb-32 space-y-5 md:w-1/2 lg:w-2/3 lg:h-screen lg:overflow-y-scroll">
            <p class="text-lg text-center" v-if="sales.isDateSelect">Ventas de la fecha: <span class="font-black">{{
                sales.date }}</span></p>
            <p v-else class="text-lg font-extrabold text-center">Selecciona una Fecha</p>

            <div v-if="sales.salesCollection.length" class="space-y-5">
                <p class="text-2xl text-right ">Total del día:
                    <span class="font-black">
                        {{ formatCurrency(sales.totalSalesOfDay) }}
                    </span>
                </p>
                <SalesDetails v-for="sale in sales.salesCollection" :key="sale.id" :sale="sale" />

            </div>
            <p v-else-if="sales.noSales" class="text-lg text-center">No hay Ventas en
                este día</p>
        </div>

    </div>
</template>

