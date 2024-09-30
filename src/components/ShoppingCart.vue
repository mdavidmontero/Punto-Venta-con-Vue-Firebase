<template>
  <p v-if=" cart.isEmpty " class="text-xl text-center text-gray-900">El carrito está vacío</p>
  <div v-else>
    <p class="text-4xl font-bold text-gray-900">Resumen de Venta</p>
    <ul role="list" class="mt-6 divide-y divide-gray-200">
      <ShoppingCartItem v-for="       item in cart.items       " :key=" item.id " :item=" item " />
    </ul>
    <dl class="pt-6 space-y-6 text-sm font-medium text-gray-500 border-t border-gray-200">
      <Amount>
        <template #label>Subtotal: </template>
        {{ formatCurrency( cart.subtotal ) }}
      </Amount>
      <!-- <Amount>
        <template #label>Impuestos: </template>
        {{ formatCurrency( cart.taxes ) }}
      </Amount> -->
      <Amount v-if=" coupon.isValidCoupon ">
        <template #label>Descuento: </template>
        {{ formatCurrency( coupon.discount ) }}
      </Amount>
      <Amount>
        <template #label>Total a Pagar: </template>
        {{ formatCurrency( cart.total ) }}
      </Amount>
    </dl>
    <CouponForm />

    <div class="mt-6">
      <h3 class="text-lg font-bold">Datos de envío</h3>
      <form @submit.prevent=" submitOrder ">
        <div>
          <label for="name" class="block">Nombre:</label>
          <input type="text" v-model=" userData.name " id="name" required class="w-full px-3 py-2 border rounded" />
        </div>
        <div class="mt-2">
          <label for="phone" class="block">Teléfono:</label>
          <input type="tel" v-model=" userData.phone " id="phone" required class="w-full px-3 py-2 border rounded" />
        </div>
        <div class="mt-2">
          <label for="email" class="block">Correo:</label>
          <input type="email" v-model=" userData.email " id="email" required class="w-full px-3 py-2 border rounded" />
        </div>
        <div class="mt-2">
          <label for="address" class="block">Dirección:</label>
          <input type="text" v-model=" userData.address " id="address" required
            class="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" class="w-full p-3 mt-6 font-bold text-white uppercase bg-indigo-600 hover:bg-indigo-700">
          Confirmar Compra
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from '@/stores/cart';
import Amount from './Amout.vue';
import ShoppingCartItem from './ShoppingCartItem.vue';
import CouponForm from './CouponForm.vue';
import { formatCurrency } from '@/helpers';
import { useCouponStore } from '../stores/coupons';

const cart = useCartStore();
const coupon = useCouponStore();

// Datos del usuario
const userData = ref( {
  name: '',
  phone: '',
  email: '',
  address: '',
} );

function submitOrder() {
  if ( userData.value.name && userData.value.phone && userData.value.email && userData.value.address ) {
    cart.checkout( userData.value );


  } else {
    alert( 'Por favor, completa todos los campos.' );
  }
}
</script>
