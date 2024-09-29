import { ref, computed, onMounted } from "vue";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useFirebaseAuth } from "vuefire";
import { useRouter } from "vue-router";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { db } from "@/config/firebase";

export const useAuthStore = () => {
  const auth = useFirebaseAuth();
  const router = useRouter();
  const authUser = ref(null);
  const errorMsg = ref("");

  const errorCodes = {
    "auth/user-not-found": "Usuario no encontrado",
    "auth/wrong-password": "El password es incorrecto",
    "auth/invalid-credential": "Credenciales Invalidas",
  };

  onMounted(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      authUser.value = storedUser;
      router.push({ name: storedUser.role === "admin" ? "admin" : "shop" });
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          authUser.value = user;
        }
      });
    }
  });

  const registerUser = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: user.email,
      role: "user",
      userId: user.uid,
    });

    localStorage.setItem(
      "user",
      JSON.stringify({ uid: user.uid, role: "user", ...userCredential })
    );
    return user;
  };

  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      authUser.value = user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userRole = userDoc.data().role;

      const local = localStorage.setItem(
        "user",
        JSON.stringify({ uid: user.uid, role: userRole, ...userCredential })
      );
      router.push({ name: userRole === "admin" ? "admin" : "shop" });
      authUser.value = local;
    } catch (error) {
      errorMsg.value = errorCodes[error.code] || "Error inesperado";
    }
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        authUser.value = null;
        localStorage.removeItem("user");
        router.push({ name: "login" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Computed property to check for errors
  const hasError = computed(() => {
    return errorMsg.value;
  });

  // Computed property to check if a user is authenticated
  const isAuth = computed(() => {
    return authUser.value;
  });

  // Return the authentication functions and state
  return {
    registerUser,
    loginUser,
    logout,
    hasError,
    errorMsg,
    isAuth,
    authUser,
  };
};
