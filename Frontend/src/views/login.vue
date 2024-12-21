<template>
    <div class="login-container">
    <form @submit.prevent="loginUser" class="login-form">
        <div class="input-group">
            <label>Email:</label>
            <input type="email" v-model="formData.email" required />
        </div>
        <div class="input-group">
            <label>Password:</label>
            <input class="input-pass" type="password" v-model="formData.password" required />
        </div>
        <button class="submit-button" :disabled="loading" type="submit">
            {{ loading ? "Logging in..." : "Login" }}
        </button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'LoginForm',
    setup() {
        const formData = reactive({
            email: '',
            password: '',
        });

        const loading = ref(false);
        const error = ref('');
        const router = useRouter();

        const loginUser = async () => {
            loading.value = true;
            error.value = '';
            try {
                // Send login data to the backend
                const response = await axios.post('http://localhost:3000/auth/login', {
                    email: formData.email,
                    password: formData.password,
                });

                // Check if the response contains the token and user data
                if (response.data.status === 'success') {
                    // Save the token and user data in localStorage
                    localStorage.setItem('token', response.data.data.token); // Save token
                    localStorage.setItem('username', response.data.data.user.username); // Save username
                    localStorage.setItem('userId', response.data.data.user._id); // Save user ID

                    // Redirect to the crowdfund page
                    alert('Login successful!');
                    router.push('/crowdfund'); // Navigate to dashboard or other page
                } else {
                    error.value = 'Login failed. Please try again.';
                }
            } catch (err: any) {
                error.value = err.response?.data?.error || 'Login failed';
                console.error(err);
            } finally {
                loading.value = false;
            }
        };

        return { formData, loginUser, loading, error };
    },
});
</script>
