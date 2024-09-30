import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { useCollection, useFirestore, useFirebaseStorage } from "vuefire";

import {
  collection,
  addDoc,
  where,
  query,
  limit,
  orderBy,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export const useCategoriresStore = defineStore("categories", () => {
  const db = useFirestore();

  const q = query(collection(db, "categories"));
  const categoriesCollection = useCollection(q);
  async function createCategory(category) {
    const colRef = collection(db, "categories");
    const docRef = await addDoc(colRef, category);
    await updateDoc(doc(db, "categories", docRef.id), { id: docRef.id });
  }

  async function updateCategory(docRef, category) {
    await updateDoc(docRef, category);
  }
  async function deleteCategory(id) {
    if (confirm("¿Eliminar Categoria?")) {
      const docRef = doc(db, "categories", id);
      await deleteDoc(docRef);
    }
  }
  const noResults = computed(() => categoriesCollection.value.length === 0);
  return {
    createCategory,
    updateCategory,
    deleteCategory,
    noResults,
    categoriesCollection,
  };
});
