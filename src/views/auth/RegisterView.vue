<script setup>
import { reactive, watch } from 'vue';
import { FormKit } from '@formkit/vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();

const formData = reactive( {
  name: '',
  email: '',
  password: '',
  password_confirm: '',
} );
const register = async () => {
  try {
    const registration = await auth.registerUser( formData.name, formData.email, formData.password );
    console.log( registration );
  } catch ( error ) {
    console.log( error );
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
    <div class="w-full max-w-md p-10 transition-all transform bg-white shadow-2xl rounded-xl hover:scale-105">
      <div class="mb-6 text-center">
        <h1 class="text-4xl font-extrabold text-gray-700">
          Crear Cuenta
        </h1>
        <p class="text-sm text-gray-500">
          Por favor, completa los siguientes campos para registrarte
        </p>
      </div>

      <FormKit type="form" submit-label="Registrarse" incomplete-message="No se puedo enviar, revisa los mensajes"
        @submit=" register ">
        <FormKit type="text" name="name" label="Nombre Completo" placeholder="Tu Nombre" validation="required"
          :validation-messages=" { required: 'El nombre es obligatorio' } "
          input-class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model.trim=" formData.name " />

        <FormKit type="email" name="email" label="Correo Electrónico" placeholder="ejemplo@correo.com"
          input-class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          validation="required|email"
          :validation-messages=" { required: 'El correo es obligatorio', email: 'El correo no es válido' } "
          v-model.trim=" formData.email " />

        <FormKit type="group">
          <FormKit type="password" name="password" value="super-secret" label="Contraseña" validation-visibility="blur"
            validation="required" v-model.trim=" formData.password "
            input-class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            :validation-messages=" { required: 'La contraseña es obligatoria' } " placeholder="********" />
          <FormKit type="password" name="password_confirm" label="Confirmar Contraseña" validation="required|confirm"
            validation-visibility="blur" validation-label="Password confirmation"
            input-class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model.trim=" formData.password_confirm " placeholder="********"
            :validation-messages=" { confirm: 'La contraseña no coincide', required: 'La contraseña es obligatoria' } " />
        </FormKit>
      </FormKit>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          ¿Ya tienes una cuenta?
          <RouterLink to="/login" class="text-blue-600 hover:underline">Iniciar Sesión</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
