<template>
   <div class="details-container">
        <div v-if="loading">Loading crowdfunds...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-else-if="fund">
            <h2>{{ fund.name }}</h2>
            <p><strong>Target:</strong> {{ fund.target }}</p>
            <p><strong>Current Donation:</strong> {{ fund.current_donation }}</p>
            <p><strong>Status:</strong> {{ fund.status }}</p>
            <p><strong>Created At:</strong> {{ fund.created_at }}</p>
            <p><strong>Favorite:</strong> 
                <span class="favorite" :class="{ 'favorite-active': isFavorite }">
                    {{ isFavorite ? "Yes" : "No" }}
                </span>
            </p>
            <button class="favorite-button">Add to Favorite</button>
        </div>
        

        <div class="form-section">
            <h3>Donate to this Crowdfund</h3>
            <form>
                <label for="payment-method">Payment Method</label>
                <select v-model="paymentMethod" id="payment-method" name="payment-method">
                    <option value="qris">QRIS</option>
                    <option value="transfer">Transfer</option>
                </select>

                <div v-if="paymentMethod === 'transfer'">
                    <label for="bank-name">Bank Name</label>
                    <input type="text" id="bank-name" name="bank-name" v-model="bankName">
                </div>

                <label for="donation-amount">Donation Amount</label>
                <input type="number" id="donation-amount" name="donation-amount" placeholder="Enter amount">

                <button type="submit">Submit Donation</button>
            </form>
        </div>

        <div class="form-section">
            <h3>Leave a Comment</h3>
            <form>
                <label for="comment-message">Message</label>
                <textarea id="comment-message" name="comment-message" rows="4" placeholder="Write your comment..."></textarea>

                <button type="submit">Submit Comment</button>
            </form>
        </div>

        <router-link to="/crowdfund">
            <button class="back-button">Back to Dashboard</button>
        </router-link>
        
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default defineComponent({
    setup() {
        const route = useRoute(); // Akses parameter dari route
        const fund = ref<any>(null); // Menyimpan detail crowdfund
        const loading = ref(false); // Menandakan status pemuatan
        const error = ref<string | null>(null); // Menyimpan pesan kesalahan
        const isFavorite = ref(false); // Menyimpan status favorit
        const userId = ref<string | null>(null); // Menyimpan ID user yang login
        const paymentMethod = ref<string>('qris');
        const bankName = ref<string>('');

        const getUserIdFromToken = () => {
            const token = localStorage.getItem('token');
            if (!token) return null;

            try {
                const decoded: any = jwtDecode(token); // Pastikan jwtDecode sudah diimport
                return decoded._id; // Dapatkan user_id dari token
            } catch (error) {
                console.error('Failed to decode token:', error);
                return null;
            }
        };

        const fetchCrowdDetail = async () => {
            loading.value = true;
            error.value = null;

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token tidak ditemukan. Silakan login.');
                }
                const { id } = route.params; // Ambil id dari route
                const response = await axios.get(`http://localhost:3000/fund/crowdfunds/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Tambahkan token ke header
                    },
                });
                fund.value = response.data.data;
                userId.value = getUserIdFromToken(); // Ambil user_id dari token

                // Cek apakah crowdfund ini sudah difavoritkan
                await checkFavorite(id);
            } catch (err: any) {
                error.value = err.response?.data?.message || 'Gagal memuat detail';
                console.error(err);
            } finally {
                loading.value = false;
            }
        };

        const checkFavorite = async (crowdfundId: string) => {
            if (!userId.value) {
                return;
            } 

            try {
                const response = await axios.get(`http://localhost:3000/fav/favorites/${userId.value}`);
                const favorites = response.data.data;
                isFavorite.value = favorites.some((fav: any) => fav.crowdfund_id._id === crowdfundId);
            } catch (err) {
                console.error('Error checking favorite:', err);
            }
        };

        onMounted(fetchCrowdDetail); // Fetch detail buku saat komponen dimuat

        return { 
            fund, 
            loading, 
            error, 
            isFavorite, 
            paymentMethod, 
            bankName
        };
    },
});
</script>