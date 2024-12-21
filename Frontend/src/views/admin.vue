<template>
    <div class="dashboard">
        <div class="catalog">
            <h3>Crowdfund Catalog:</h3>
            <div v-if="loading">Loading crowdfunds...</div>
            <div v-if="error" class="error">{{ error }}</div>
            <div v-else>
                <div v-for="item in fund" :key="item._id" class="crowdfund">
                    <h4>{{ item.name }}</h4>
                    <p><strong>Target:</strong> ${{ item.target }}</p>
                    <p><strong>Status:</strong> {{ item.status }}</p>
                    <router-link :to="`/crowdfund/${item._id}`">
                        <button>Donate</button>
                    </router-link>
                </div>
                <p v-if="fund.length === 0">No crowdfunds available.</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'Dashboard',
    setup() {
        const fund = ref([]); // Menyimpan data buku
        const loading = ref(false); // Status loading
        const error = ref<string | null>(null); // Menyimpan error, jika ada

        const fetchfund = async () => {
            loading.value = true;
            error.value = null;

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token tidak ditemukan. Silakan login.');
                }
                const admin = localStorage.getItem('admin');
                if (!admin) {
                    throw new Error('Tidak admin.');
                }

                const response = await axios.get('http://localhost:3000/fund/crowdfunds', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Tambahkan token ke header
                    },
                });

                console.log('Response data:', response.data); // Debug log
                fund.value = response.data.data.filter((item: any) => item.status.toLowerCase() !== 'close');
            } catch (err: any) {
                error.value = err.response?.data?.message || 'Gagal memuat data';
                console.error('Error fetching books:', err);
            } finally {
                loading.value = false;
            }
        };

        onMounted(fetchfund);
        return { fund, loading, error };

    },
});
</script>