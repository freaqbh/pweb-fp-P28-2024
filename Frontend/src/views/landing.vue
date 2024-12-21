<template>
  <div class="container">
    <!-- Sticky Header -->
    <header class="header">
      <nav class="nav">
        <a class="brand">BisaKita</a>
        <ul class="nav-list">
          <li><a href="" class="nav-item">Home</a></li>
          <li><a href="Crowdfund" class="nav-item">Crowdfund</a></li>
          <li><a href="News" class="nav-item">News</a></li>
          <li v-if="!username" class="nav-item"><a href="login">Login</a></li>
          <li v-if="username" class="nav-item">Hello, {{ username }}</li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-text">
          <h1>Bergabunglah dalam Mewujudkan Impian dengan Donasi Anda!</h1>
          <p>Mendukung berbagai inisiatif sosial dan proyek-proyek baik melalui donasi langsung ke CrowdFund pilihan Anda.</p>
        </div>
        <img src="https://placehold.co/800x400" alt="Hero Image" class="hero-image" />
      </section>

      <!-- About Us Section -->
      <section class="about">
        <h2>Tentang Funding Dana BisaKita</h2>
        <div class="about-content">
          <p>
            Funding Dana BisaKita adalah platform crowdfunding yang memungkinkan Anda untuk memberikan donasi kepada berbagai proyek sosial yang bermanfaat. Baik Anda ingin membantu pendidikan, kesehatan, atau berbagai tujuan lainnya, kami menyediakan tempat untuk semua jenis inisiatif. Kami juga memberikan kemudahan bagi admin untuk membuat CrowdFund baru, menentukan target, dan melacak pencapaian donasi.
          </p>
          <img src="https://placehold.co/200x100" alt="About Us Image" class="about-image" />
        </div>
      </section>

      <!-- Feedback Form -->
      <div class="feedback-form">
        <div class="form-container">
          <h2>Feedback Form</h2>
          <form @submit.prevent="submitFeedback" class="form">
            <div>
              <label for="name">Name</label>
              <input
                id="name"
                v-model="feedback.name"
                type="text"
                :disabled="feedback.is_anonymous"
                class="input"
                :class="{ 'input-disabled': feedback.is_anonymous }"
              >
            </div>

            <div>
              <label for="email">Email</label>
              <input
                id="email"
                v-model="feedback.email"
                type="email"
                :disabled="feedback.is_anonymous"
                class="input"
                :class="{ 'input-disabled': feedback.is_anonymous }"
              >
            </div>

            <div>
              <label for="message">Message</label>
              <textarea
                id="message"
                v-model="feedback.message"
                rows="4"
                class="textarea"
              ></textarea>
            </div>

            <div class="anonymous-switch">
              <label for="anonymous">Submit anonymously</label>
              <input
                type="checkbox"
                id="anonymous"
                v-model="feedback.is_anonymous"
                class="switch-input"
              >
            </div>

            <div>
              <button type="submit" class="submit-btn">Submit Feedback</button>
            </div>
          </form>
        </div>
      </div>
    </main>

    <!-- Sticky Footer -->
    <footer class="footer">
      <p>&copy; {{ currentYear }} BisaKita. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios'; // Import axios for HTTP requests

export default {
  setup() {
    const feedback = ref({
      name: '',
      email: '',
      message: '',
      is_anonymous: false,
    });

    const username = localStorage.getItem('username') || null;
    const currentYear = new Date().getFullYear();

    // Function to submit feedback and post to the backend
    async function submitFeedback() {
      // Prepare feedback data with conditional fields based on anonymity
      const feedbackData = {
        message: feedback.value.message,
        is_anonymous: feedback.value.is_anonymous,
      };

      // Only include name and email if not anonymous
      if (!feedback.value.is_anonymous) {
        feedbackData.name = feedback.value.name;
        feedbackData.email = feedback.value.email;
      }

      try {
        // Sending the feedback data to the server
        const response = await axios.post('http://localhost:3000/feedback/feeds', feedbackData);
        console.log('Feedback submitted successfully:', response.data);

        // Reset form after successful submission
        feedback.value.name = '';
        feedback.value.email = '';
        feedback.value.message = '';
        feedback.value.is_anonymous = false;
      } catch (error) {
        console.error('Error submitting feedback:', error);
        // Optionally, display an error message to the user
      }
    }

    return {
      feedback,
      username,
      currentYear,
      submitFeedback,
    };
  },
};
</script>


<style scoped>
/* General Reset */
* {
  margin: 0;
  padding: 0;
}

/* Container and Layout */
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: #000000;
  color: white;
  padding: 15px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  font-weight: bold;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.brand {
  font-size: 2rem;
  font-weight: bold;
}

.nav-list {
  display: flex;
  list-style: none;
}

.nav-item {
  margin-left: 20px;
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  transition: color 0.3s ease;
  font-size: 20px;
}

.nav-item:hover {
  color: #80c0ff;
}

.main-content {
  margin-top: 40px;
  padding: 20px;
  flex-grow: 1;
}

.hero {
  background-color: #000000;
  color: white;
  padding: 210px 20px;
  top: 0;
  right: 0;
  left: 0;
  text-align: center;
}

.hero h1 {
  font-size: 2.8rem;
  margin-bottom: 20px;
  font-weight: bold;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.hero-image {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.about {
  padding: 200px 40px;
  background-color: #ffffff;
}

.about h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
}

.about-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.about p {
  font-size: 1.5rem;
  line-height: 1.6;
  flex: 1;
  margin-right: 20px;
}

.about-image {
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
  margin-top: 20px;
}

.feedback-form {
  margin-top: 210px;
  margin-bottom: 230px;
}

.form-container {
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px 40px;
  border-radius: 10px;
  width: 50%;
  margin: 0 auto;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  margin-bottom: 5px;
}

.input,
.textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.input-disabled {
  opacity: 0.5;
}

.textarea {
  resize: vertical;
}

.switch-input {
  margin-right: 10px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #4c51bf;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #5a67d8;
}

.footer {
  background-color: #000000;
  color: white;
  text-align: center;
  padding: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  font-weight: bold;
}
</style>
