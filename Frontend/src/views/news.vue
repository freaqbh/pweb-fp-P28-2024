<template>
    <div class="container">
      <!-- Sticky Header -->
      <header class="header">
        <nav class="nav">
          <a class="brand">BisaKita</a>
          <ul class="nav-list">
            <li><a href="/" class="nav-item">Home</a></li>
            <li><a href="crowdfund" class="nav-item">Crowdfund</a></li>
            <li><a href="News" class="nav-item">News</a></li>
            <li v-if="!username" class="nav-item"><a href="login">Login</a></li>
            <li v-if="username" class="nav-item">Hello, {{ username }}</li>
          </ul>
        </nav>
      </header>
  
      <!-- Main Content -->
      <main class="main-content">
        <div class="news-page">
          <h1>Latest News</h1>
          <div class="news-grid">
            <div v-for="article in newsArticles" :key="article.id" class="news-card">
              <div class="card-image">
                <img :src="article.imageUrl" :alt="article.title" />
              </div>
              <div class="card-content">
                <div class="card-meta">
                  <span class="date">{{ article.date }}</span>
                  <span class="category">{{ article.category }}</span>
                </div>
                <h2>{{ article.title }}</h2>
                <p>{{ article.description }}</p>
                <button class="read-more">
                  Read More
                  <ArrowRight class="icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Sticky Footer -->
      <footer class="footer">
        <p>&copy; {{ currentYear }} BisaKita. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ArrowRight } from 'lucide-vue-next';
  
  const newsArticles = ref([
    {
      id: 1,
      title: "SpaceX Successfully Launches New Satellite",
      description: "SpaceX's Falcon 9 rocket successfully deployed a new communications satellite into orbit on Thursday.",
      imageUrl: "https://placehold.co/300x400",
      date: "2023-06-15",
      category: "Technology",
    },
    {
      id: 2,
      title: "Global Climate Summit Reaches Landmark Agreement",
      description: "World leaders have agreed on ambitious new targets to reduce carbon emissions at the latest climate summit.",
      imageUrl: "https://placehold.co/300x400",
      date: "2023-06-14",
      category: "Environment",
    },
    {
      id: 3,
      title: "New AI Model Achieves Human-Level Performance in Complex Tasks",
      description: "Researchers have developed a new AI model that can perform complex cognitive tasks at a level comparable to humans.",
      imageUrl: "https://placehold.co/300x400",
      date: "2023-06-13",
      category: "Science",
    },
    {
      id: 4,
      title: "Stock Markets Hit Record Highs Amid Economic Recovery",
      description: "Global stock markets reached new record highs as economies show strong signs of recovery post-pandemic.",
      imageUrl: "https://placehold.co/300x400",
      date: "2023-06-12",
      category: "Finance",
    },
    {
      id: 5,
      title: "Breakthrough in Renewable Energy Storage",
      description: "Scientists have made a significant breakthrough in energy storage technology, potentially revolutionizing renewable energy use.",
      imageUrl: "https://placehold.co/300x400",
      date: "2023-06-11",
      category: "Technology",
    },
    {
      id: 6,
      title: "Major Sports League Announces Expansion Teams",
      description: "A leading sports league has announced the addition of two new expansion teams, set to join the league in the upcoming season.",
      imageUrl: "https://placehold.co/300x400",
      date: "2023-06-10",
      category: "Sports",
    },
  ]);
  
  const currentYear = new Date().getFullYear();
  const username = localStorage.getItem('username') || null; // Fetch username from localStorage
  </script>
  
  <style scoped>
  /* General Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  /* Header */
  .header {
    background-color: #000000;
    color: white;
    padding: 15px 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
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
    transition: color 0.3s ease;
  }
  
  .nav-item:hover {
    color: #80c0ff;
  }
  
  /* Main Content */
  .main-content {
    margin-top: 70px; /* Adjust for header height */
    margin-bottom: 70px;
    flex-grow: 1;
  }
  
  .news-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }
  
  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .news-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
  }
  
  .news-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .card-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .card-content {
    padding: 16px;
  }
  
  .card-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 0.9em;
    color: #666;
  }
  
  .category {
    background-color: #f0f0f0;
    padding: 2px 8px;
    border-radius: 12px;
  }
  
  h2 {
    margin: 0 0 10px 0;
    font-size: 1.2em;
    color: #333;
  }
  
  p {
    margin: 0 0 15px 0;
    color: #666;
    font-size: 0.9em;
    line-height: 1.4;
  }
  
  .read-more {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 8px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .read-more:hover {
    background-color: #0056b3;
  }
  
  .icon {
    margin-left: 5px;
  }
  
  /* Footer */
  .footer {
    background-color: #000000;
    color: white;
    text-align: center;
    padding: 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  </style>
  