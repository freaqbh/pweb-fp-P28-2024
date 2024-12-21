<template>
    <div class="thank-you-container max-w-3xl mx-auto px-4 py-8">
        <div v-if="loading" class="text-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p class="mt-4">Loading donation details...</p>
        </div>

        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ error }}
        </div>

        <div v-else class="bg-white shadow-lg rounded-lg overflow-hidden">
            <!-- Thank You Header -->
            <div class="bg-green-500 text-white px-6 py-8 text-center">
                <div class="mb-4">
                    <span class="inline-block p-3 bg-white rounded-full">
                        <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </span>
                </div>
                <h1 class="text-3xl font-bold mb-2">Thank You for Your Donation!</h1>
                <p class="text-lg">Your generosity makes a difference</p>
            </div>

            <!-- Donation Details -->
            <div class="px-6 py-6">
                <div class="bg-gray-50 rounded-lg p-6 mb-6">
                    <h2 class="text-xl font-semibold mb-4">Donation Details</h2>
                    <div class="space-y-3">
                        <div class="flex justify-between border-b pb-2">
                            <span class="text-gray-600">Donation ID</span>
                            <span class="font-medium">{{ donationDetails._id }}</span>
                        </div>
                        <div class="flex justify-between border-b pb-2">
                            <span class="text-gray-600">Amount</span>
                            <span class="font-medium text-green-600">
                                {{ formatCurrency(donationDetails.amount) }}
                            </span>
                        </div>
                        <div class="flex justify-between border-b pb-2">
                            <span class="text-gray-600">Payment Method</span>
                            <span class="font-medium">{{ donationDetails.payment_method }}</span>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        @click="generatePDF"
                        class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Download Receipt (PDF)</span>
                    </button>
                    <button 
                        @click="goToDashboard"
                        class="bg-gray-100 text-gray-700 px-6 py-2 rounded hover:bg-gray-200 transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>

            <!-- Footer Message -->
            <div class="border-t px-6 py-4 text-center text-gray-600">
                <p>A confirmation email has been sent to your registered email address.</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default defineComponent({
    setup() {
        const route = useRoute();
        const router = useRouter();
        const loading = ref(true);
        const error = ref<string | null>(null);
        const donationDetails = ref<any>(null);

        const formatCurrency = (amount: number) => {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(amount);
        };

        const formatDate = (dateString: string) => {
            return new Date(dateString).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        };

        const fetchDonationDetails = async () => {
            loading.value = true;
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Token tidak ditemukan');

                const donationId = route.params.id;
                const response = await axios.get(`http://localhost:3000/donate/donations/${donationId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                donationDetails.value = response.data.data;
            } catch (err: any) {
                error.value = err.response?.data?.message || 'Gagal memuat detail donasi';
                console.error(err);
            } finally {
                loading.value = false;
            }
        };

        const generatePDF = () => {
            if (!donationDetails.value) return;

            const doc = new jsPDF();
            const details = donationDetails.value;

            // Add title
            doc.setFontSize(20);
            doc.text('Donation Receipt', 105, 20, { align: 'center' });

            // Add donation details
            doc.setFontSize(12);
            const content = [
                ['Donation ID', `: ${details._id}`],
                ['Amount', `: ${formatCurrency(details.amount)}`],
                ['Payment Method', `: ${details.payment_method}`],
            ];

            doc.autoTable({
                startY: 40,
                head: [],
                body: content,
                theme: 'plain',
                styles: {
                    fontSize: 12,
                    cellPadding: 5
                },
                columnStyles: {
                    0: { cellWidth: 80 },
                    1: { cellWidth: 100 }
                }
            });

            // Add thank you message
            doc.setFontSize(12);
            doc.text('Thank you for your generous donation!', 105, doc.autoTable.previous.finalY + 20, { align: 'center' });

            // Add footer
            const pageHeight = doc.internal.pageSize.height;
            doc.setFontSize(10);
            doc.text('This is an automatically generated receipt.', 105, pageHeight - 20, { align: 'center' });

            // Save the PDF
            doc.save(`donation-receipt-${details._id}.pdf`);
        };

        const goToDashboard = () => {
            router.push('/crowdfund');
        };

        onMounted(fetchDonationDetails);

        return {
            loading,
            error,
            donationDetails,
            formatCurrency,
            formatDate,
            generatePDF,
            goToDashboard
        };
    }
});
</script>

<style scoped>
.thank-you-container {
    min-height: calc(100vh - 100px);
}
</style>