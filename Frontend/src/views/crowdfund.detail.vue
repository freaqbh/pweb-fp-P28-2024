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
             <button 
                 class="favorite-button" 
                 @click="toggleFavorite"
                 :disabled="loading || !userId">
                 {{ isFavorite ? "Remove from Favorite" : "Add to Favorite" }}
             </button>
         </div>
         
         <div class="form-section">
             <h3>Donate to this Crowdfund</h3>
             <form @submit.prevent="handleDonation">
                 <label for="payment-method">Payment Method</label>
                 <select v-model="donationForm.paymentMethod" id="payment-method" name="payment-method">
                     <option value="QRIS">QRIS</option>
                     <option value="BANK_TRANSFER">Transfer</option>
                 </select>
 
                 <div v-if="donationForm.paymentMethod === 'BANK_TRANSFER'">
                     <label for="bank-name">Bank Name</label>
                     <input type="text" id="bank-name" name="bank-name" v-model="bankName">
                 </div>
 
                 <label for="donation-amount">Donation Amount</label>
                 <input 
                     type="number" 
                     id="donation-amount" 
                     name="donation-amount" 
                     v-model="donationForm.amount"
                     placeholder="Enter amount"
                 >
 
                 <button type="submit" :disabled="donationLoading">
                     {{ donationLoading ? 'Processing...' : 'Submit Donation' }}
                 </button>
             </form>
         </div>
 
         <div class="form-section">
            <h3>Leave a Comment</h3>
            <form @submit.prevent="submitComment">
                <label for="comment-message">Message</label>
                <textarea 
                    id="comment-message" 
                    name="comment-message" 
                    rows="4" 
                    placeholder="Write your comment..."
                    v-model="commentMessage">
                </textarea>
                <button type="submit" :disabled="loading">Submit Comment</button>
            </form>
            <div v-if="error" class="error">{{ error }}</div>
            <div v-if="success" class="success">{{ success }}</div>
        </div>
 
         <router-link to="/crowdfund">
             <button class="back-button">Back to Dashboard</button>
         </router-link>
     </div>
 </template>
 
 <script lang="ts">
 import { defineComponent, ref, onMounted } from 'vue';
 import { useRoute, useRouter } from 'vue-router';
 import axios from 'axios';
 import { jwtDecode } from 'jwt-decode';
 
 export default defineComponent({
     setup() {
         const route = useRoute();
         const router = useRouter();
         const fund = ref<any>(null);
         const loading = ref(false);
         const error = ref<string | null>(null);
         const isFavorite = ref(false);
         const userId = ref<string | null>(null);
         const bankName = ref<string>('');
         const donationLoading = ref(false);
         const commentMessage = ref<string>('');
         const success = ref<string | null>(null);
 
         // Form state untuk donasi
         const donationForm = ref({
             paymentMethod: 'QRIS',
             amount: 0
         });
 
         const getUserIdFromToken = () => {
             const token = localStorage.getItem('token');
             if (!token) return null;
 
             try {
                 const decoded: any = jwtDecode(token);
                 return decoded._id;
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
                 const { id } = route.params;
                 const response = await axios.get(`http://localhost:3000/fund/crowdfunds/${id}`, {
                     headers: {
                         Authorization: `Bearer ${token}`,
                     },
                 });
                 fund.value = response.data.data;
                 userId.value = getUserIdFromToken();
 
                 await checkFavorite(id);
             } catch (err: any) {
                 error.value = err.response?.data?.message || 'Gagal memuat detail';
                 console.error(err);
             } finally {
                 loading.value = false;
             }
         };
 
         const handleDonation = async () => {
             donationLoading.value = true;
             try {
                 const token = localStorage.getItem('token');
                 if (!token) {
                     throw new Error('Token tidak ditemukan. Silakan login.');
                 }
 
                 const response = await axios.post(
                     'http://localhost:3000/donate/donations',
                     {
                         paymentMethod: donationForm.value.paymentMethod,
                         amount: donationForm.value.amount
                     },
                     {
                         headers: {
                             Authorization: `Bearer ${token}`,
                         },
                     }
                 );
                 router.push(`/crowdfund/thank-you/${response.data.data._id}`);
 
                 // Reset form setelah berhasil
                 donationForm.value = {
                     paymentMethod: 'QRIS',
                     amount: 0
                 };
 
                 // Refresh data crowdfund untuk memperbarui jumlah donasi
                 await fetchCrowdDetail();
 
                 alert('Donation submitted successfully!');
             } catch (err: any) {
                 error.value = err.response?.data?.message || 'Failed to submit donation';
                 console.error('Donation error:', err);
                 alert('Failed to submit donation. Please try again.');
             } finally {
                 donationLoading.value = false;
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
 
         const toggleFavorite = async () => {
             if (!userId.value) return;
 
             const crowdfundId = route.params.id;
 
             try {
                 if (isFavorite.value) {
                     await axios.delete(`http://localhost:3000/fav/favorites/${userId.value}/${crowdfundId}`);
                 } else {
                     await axios.post(`http://localhost:3000/fav/favorites`, {
                         user_id: userId.value,
                         crowdfund_id: crowdfundId,
                     });
                 }
 
                 isFavorite.value = !isFavorite.value;
             } catch (err) {
                 console.error('Error toggling favorite:', err);
             }
         };

         const submitComment = async () => {
            if (!commentMessage.value.trim()) {
                error.value = 'Message cannot be empty';
                success.value = null;
                return;
            }

            loading.value = true;
            error.value = null;
            success.value = null;

            try {
                const response = await axios.post('http://localhost:3000/comments/', {
                    message: commentMessage.value.trim(),
                });
                success.value = 'Comment submitted successfully!';
                commentMessage.value = '';
            } catch (err: any) {
                error.value = err.response?.data?.message || 'Failed to submit comment';
                console.error(err);
            } finally {
                loading.value = false;
            }
         };
 
         onMounted(fetchCrowdDetail);
 
         return { 
             fund, 
             loading, 
             error, 
             isFavorite, 
             bankName,
             userId,
             toggleFavorite,
             donationForm,
             donationLoading,
             handleDonation,
             submitComment,
             success,
             commentMessage,
         };
     },
 });
 </script>