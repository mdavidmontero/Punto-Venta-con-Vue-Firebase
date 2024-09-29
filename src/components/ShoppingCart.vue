<script setup>
import { useCartStore } from '@/stores/cart';
import Amount from './Amout.vue'
import ShoppingCartItem from './ShoppingCartItem.vue'
import CouponForm from './CouponForm.vue';
import { formatCurrency } from '@/helpers';
import { useCouponStore } from '../stores/coupons'
import { useCurrentUser } from 'vuefire'
const user = useCurrentUser()

const cart = useCartStore()
const coupon = useCouponStore()
console.log(user.providerData)
</script>
<template>
    <p v-if="cart.isEmpty" class="text-xl text-center text-gray-900">El carrito esta vacio</p>
    <div v-else>
        <p class="text-4xl font-bold text-gray-900">Resumen de Venta</p>
        <ul role="list" class="mt-6 divide-y divide-gray-200">
            <ShoppingCartItem v-for="item in cart.items" :key="item.id" :item="item" />
        </ul>
        <dl class="pt-6 space-y-6 text-sm font-medium text-gray-500 border-t border-gray-200">
            <Amount>
                <template #label>Subtotal: </template>
                {{ formatCurrency(cart.subtotal) }}
            </Amount>
            <Amount>
                <template #label>Impuestos: </template>
                {{ formatCurrency(cart.taxes) }}
            </Amount>
            <Amount v-if="coupon.isValidCoupon">
                <template #label>Descuento: </template>
                {{ formatCurrency(coupon.discount) }}
            </Amount>
            <Amount>
                <template #label>Total a Pagar: </template>
                {{ formatCurrency(cart.total) }}
            </Amount>
            <p v-if="user">Hello {{ user.providerData.displayName }}</p>
        </dl>
        <CouponForm />

        <button type="button" class="w-full p-3 mt-10 font-bold text-white uppercase bg-indigo-600 hover:bg-indigo-700"
            @click="cart.checkout">
            Confirmar Compra
        </button>
    </div>
</template>

