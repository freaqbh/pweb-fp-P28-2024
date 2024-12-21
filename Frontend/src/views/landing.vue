<template>
    <div class="container">
      <!-- Sticky Header -->
      <header class="header">
        <nav class="nav">
          <a class="brand">BisaKita</a>
          <ul class="nav-list">
            <li><a href="" class="nav-item">Home</a></li>
            <li><a href="#feedback" class="nav-item">Feedback</a></li>
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
      </main>
  
      <!-- Sticky Footer -->
      <footer class="footer">
        <p>&copy; {{ currentYear }} BisaKita. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear(),
        username: localStorage.getItem('username') || null, // Get the username from localStorage
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
    background-color: #000000; /* Black background */
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
    color: #80c0ff; /* Light blue color for hover */
  }
  
  .main-content {
    margin-top: 40px; /* Adjusted for the fixed header */
    padding: 20px;
    flex-grow: 1;
  }
  
  .hero {
    background-color: #000000; /* Black background */
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
    padding: 180px 20px;
    background-color: #ffffff; /* White background */
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
  
  .footer {
    background-color: #000000; /* Black background */
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
  