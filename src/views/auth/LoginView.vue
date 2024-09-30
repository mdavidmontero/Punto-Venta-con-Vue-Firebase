<script setup>
import { reactive } from 'vue';
import { FormKit } from '@formkit/vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

const formData = reactive( {
  email: '',
  password: '',
} );

const login = async () => {
  try {
    const data = await auth.loginUser( formData.email, formData.password );
    console.log( data );
  } catch ( error ) {
    console.log( error );
  }
};


</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
      <h2 class="text-3xl font-bold text-center text-gray-700">Iniciar Sesión</h2>

      <FormKit type="form" submit-label="Registrarse" incomplete-message="No se puedo enviar, revisa los mensajes"
        @submit=" login ">
        <div class="space-y-2">
          <FormKit type="email" label="Correo Electrónico" placeholder="ejemplo@correo.com" name="email"
            validation="required|email"
            :validation-messages=" { required: 'El correo es obligatorio', email: 'El correo no es válido' } "
            input-class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model.trim=" formData.email " />
        </div>

        <div class="space-y-2">
          <FormKit type="password" label="Contraseña" placeholder="********" name="password" validation="required"
            :validation-messages=" { required: 'La contraseña es obligatoria' } "
            input-class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model.trim=" formData.password " />
        </div>
      </FormKit>
      <pre>{{ JSON.stringify( formData ) }}</pre>
      <p class="text-center text-gray-600">
        ¿No tienes cuenta?
        <RouterLink to="/register" class="text-blue-600 hover:underline">Regístrate</RouterLink>
      </p>
    </div>
  </div>
</template>
