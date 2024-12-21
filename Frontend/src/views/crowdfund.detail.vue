<template>
   <div class="details-container">
        <h2>Save the Rainforest</h2>
        <p><strong>Target:</strong> $50,000</p>
        <p><strong>Current Donation:</strong> $30,000</p>
        <p><strong>Status:</strong> Ongoing</p>
        <p><strong>Created At:</strong> January 1, 2024</p>
        <p><strong>Favorite:</strong> <span class="favorite">No</span></p>
        <button class="favorite-button">Add to Favorite</button>

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
<script>
export default {
    data() {
        return {
            crowdfund: {
                isFavorite: false
            },
            paymentMethod: 'qris',
            bankName: '',
            donationAmount: '',
            commentMessage: ''
        };
    },
    methods: {
        toggleFavorite() {
            this.crowdfund.isFavorite = !this.crowdfund.isFavorite;
        },
        submitDonation() {
            alert(`Donation of ${this.donationAmount} via ${this.paymentMethod} submitted.`);
        },
        submitComment() {
            alert(`Comment submitted: ${this.commentMessage}`);
        }
    }
};
</script>