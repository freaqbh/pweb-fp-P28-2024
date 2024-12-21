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
            <p><strong>Favorite:</strong> <span class="favorite">No</span></p>
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

export default defineComponent({
    setup() {
        const route = useRoute(); // Akses parameter dari route
        const fund = ref(null);
        const loading = ref(false);
        const error = ref<string | null>(null);

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
                fund.value = response.data.data; // Simpan detail buku
            } catch (err: any) {
                error.value = err.response?.data?.message || 'Gagal memuat detail';
                console.error(err);
            } finally {
                loading.value = false;
            }
        };

        onMounted(fetchCrowdDetail); // Fetch detail buku saat komponen dimuat

        return { fund, loading, error };
    },
});
</script>