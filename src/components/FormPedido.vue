<template>
  <div>
    <h2>Detalles del Pedido</h2>
    <form @submit.prevent=" handleCheckout ">
      <div>
        <label for="name">Nombre:</label>
        <input type="text" v-model=" cartStore.customerName " id="name" required />
      </div>
      <div>
        <label for="phone">Teléfono:</label>
        <input type="tel" v-model=" cartStore.customerPhone " id="phone" required />
      </div>
      <div>
        <label for="email">Correo:</label>
        <input type="email" v-model=" cartStore.customerEmail " id="email" required />
      </div>
      <div>
        <label for="address">Dirección:</label>
        <input type="text" v-model=" cartStore.customerAddress " id="address" required />
      </div>
      <button type="submit">Confirmar Pedido</button>
    </form>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cart";

export default {
  setup() {
    const cartStore = useCartStore();

    const handleCheckout = () => {
      cartStore.checkout();
    };

    return {
      cartStore,
      handleCheckout,
    };
  },
};
</script>
