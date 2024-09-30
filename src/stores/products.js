import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useCollection, useFirestore, useFirebaseStorage } from "vuefire";
import {
  collection,
  addDoc,
  orderBy,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  query,
} from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";

export const useProductsStore = defineStore("products", () => {
  const db = useFirestore();
  const storage = useFirebaseStorage();

  const categoriesQuery = query(
    collection(db, "categories"),
    orderBy("name", "asc")
  );
  const categoriesCollection = useCollection(categoriesQuery);

  const selectedCategory = ref("");

  const productsQuery = query(
    collection(db, "products"),
    orderBy("availability", "asc")
  );
  const productsCollection = useCollection(productsQuery);

  watch(categoriesCollection, (newCategories) => {
    if (newCategories?.length && !selectedCategory.value) {
      selectedCategory.value = newCategories[0].id;
    }
  });

  const filterProducts = computed(() => {
    if (selectedCategory.value === "") {
      return productsCollection.value?.filter(
        (product) => product.availability > 0
      );
    }

    return productsCollection.value
      ?.filter((product) => product.category === selectedCategory.value)
      .filter((product) => product.availability > 0);
  });

  async function createProduct(product) {
    await addDoc(collection(db, "products"), product);
  }

  async function updateProduct(docRef, product) {
    const { image, url, ...values } = product;
    if (image.length) {
      await updateDoc(docRef, {
        ...values,
        image: url.value,
      });
    } else {
      await updateDoc(docRef, values);
    }
  }

  const categoryOptions = computed(() => {
    const options = [
      { label: "Seleccione", value: "", attrs: { disabled: true } },
      ...(categoriesCollection.value?.map((category) => ({
        label: category.name,
        value: category.id,
      })) || []),
    ];
    return options;
  });

  async function deleteProduct(id) {
    if (confirm("¿Eliminar Producto?")) {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      const { image } = docSnap.data();
      const imageRef = storageRef(storage, image);
      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)]);
    }
  }

  const noResults = computed(() => productsCollection.value?.length === 0);

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    productsCollection,
    categories: categoriesCollection,
    selectedCategory,
    categoryOptions,
    noResults,
    filterProducts,
  };
});
