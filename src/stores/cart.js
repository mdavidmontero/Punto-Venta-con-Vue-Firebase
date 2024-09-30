import { ref, computed, watchEffect, onMounted } from "vue";
import { defineStore } from "pinia";
import { useCouponStore } from "./coupons";
import {
  collection,
  addDoc,
  runTransaction,
  doc,
  getDocs,
} from "firebase/firestore";
import { useFirestore } from "vuefire";
import { getCurrentDate } from "../helpers";

export const useCartStore = defineStore("cart", () => {
  const coupon = useCouponStore();
  const db = useFirestore();
  const items = ref([]);
  const subtotal = ref(0);
  // const taxes = ref(0);
  const total = ref(0);
  const MAX_PRODUCTS = 5;
  // const TAX_RATE = 0.0;
  const whatsappNumber = ref("");
  onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, "phoneNumbers"));
    if (!querySnapshot.empty) {
      const firstDoc = querySnapshot.docs[0];
      whatsappNumber.value = firstDoc.data().phone;
    } else {
      console.log("No se encontró ningún documento en phoneNumbers");
    }
  });

  watchEffect(() => {
    subtotal.value = items.value.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    // taxes.value = subtotal.value * TAX_RATE;
    total.value = Number(subtotal.value.toFixed(2));
    total.value = Number((subtotal.value - coupon.discount).toFixed(2));
  });

  function addItem(item) {
    const index = isItemInCart(item.id);
    if (index >= 0) {
      if (isProductAvailable(item, index)) {
        alert("Has alcanzado el límite");
        return;
      }
      items.value[index].quantity++;
    } else {
      items.value.push({ ...item, quantity: 1, id: item.id });
    }
  }

  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  async function checkout(userData) {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      if (!user) {
        alert("Debes iniciar sesión");
        return;
      }
      await addDoc(collection(db, "sales"), {
        items: items.value.map((item) => {
          const { availability, category, ...data } = item;
          return data;
        }),
        subtotal: subtotal.value,
        // taxes: taxes.value,
        discount: coupon.discount,
        total: total.value,
        date: getCurrentDate(),
        user: userData,
      });

      items.value.forEach(async (item) => {
        const productRef = doc(db, "products", item.id);
        await runTransaction(db, async (transaction) => {
          const currentProduct = await transaction.get(productRef);
          const availability =
            currentProduct.data().availability - item.quantity;
          transaction.update(productRef, { availability: availability });
        });
      });

      sendToWhatsApp(userData);

      $reset();
      coupon.$reset();
    } catch (error) {
      console.log(error);
    }
  }

  function sendToWhatsApp(userData) {
    const message = `Nuevo pedido de ${userData.name} (${userData.email}, ${
      userData.phone
    }, ${userData.address}):\n\n${items.value
      .map(
        (item) => `${item.name} (x${item.quantity}) - Precio: $${item.price}`
      )
      .join("\n")}\n\nSubtotal: $${subtotal.value}\nTotal: $${total.value}`;

    const url = `https://wa.me/57${
      whatsappNumber.value
    }?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  }
  function $reset() {
    items.value = [];
    subtotal.value = 0;
    // taxes.value = 0;
    total.value = 0;
  }

  const isItemInCart = (id) => items.value.findIndex((item) => item.id === id);
  const isProductAvailable = (item, index) => {
    return (
      items.value[index].quantity >= item.availability ||
      items.value[index].quantity >= MAX_PRODUCTS
    );
  };

  const isEmpty = computed(() => items.value.length === 0);

  const checkProductAvailability = computed(() => {
    return (product) =>
      product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS;
  });

  return {
    items,
    subtotal,
    total,
    addItem,
    removeItem,
    checkout,
    // taxes,
    isEmpty,
    checkProductAvailability,
    updateQuantity,
  };
});
