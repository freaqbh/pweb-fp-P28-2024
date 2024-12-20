// index.ts
import express from "express";
import bcrypt from 'bcrypt';
import router from "./routes";
import dbConnection from "./db-connection"; 
import Crowdfund, { CrowdfundStatus } from './models/crowdfund.model';
import Feedback from './models/feedback.model';
import Donation, { PaymentMethod } from './models/donation.model';
import Comment from './models/comment.model';
import FavoriteCrowdfund from './models/favorite.model';
import User from './models/user.model';

const cors = require('cors');

dbConnection();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173' // Allow requests from this origin
}));

const port = process.env.PORT || 3000;
const currentDate = new Date().toISOString().split('T')[0];
app.use(express.json());
app.use(router);
app.use(
    cors({
        origin: 'http://localhost:5173', // URL frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
        credentials: true, // Jika menggunakan cookies
    })
);


app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Hello World",
    data: {
        date: currentDate,
    },
    
  });
});

app.get('/create-sample-data', async (req, res) => {
  try {
      // Sample User Data with Bcrypt
      const users = [
          { username: 'John Doe', email: 'john@example.com', password: await bcrypt.hash('password123', 10) },
          { username: 'Jane Smith', email: 'jane@example.com', password: await bcrypt.hash('securepass456', 10) },
          { username: 'Alice Brown', email: 'alice@example.com', password: await bcrypt.hash('alice789', 10) },
      ];
      const savedUsers = await User.insertMany(users);

      // Sample Crowdfund Data
      const crowdfunds = [
          { name: 'Save the Ocean', target: '100000', current_donation: 20000, status: CrowdfundStatus.OPEN },
          { name: 'Build a Library', target: '50000', current_donation: 35000, status: CrowdfundStatus.OPEN },
          { name: 'Plant Trees in City', target: '30000', current_donation: 15000, status: CrowdfundStatus.CLOSE },
          { name: 'Support Local Farmers', target: '20000', current_donation: 5000, status: CrowdfundStatus.OPEN },
          { name: 'Provide Clean Water', target: '60000', current_donation: 40000, status: CrowdfundStatus.OPEN },
      ];
      const savedCrowdfunds = await Crowdfund.insertMany(crowdfunds);

      // Sample Feedback Data
      const feedbacks = [
          { name: 'Anonymous', is_anonymous: true, email: '', message: 'I love this initiative!' },
          { name: 'John Doe', is_anonymous: false, email: 'john@example.com', message: 'Great work!' },
      ];
      const savedFeedbacks = await Feedback.insertMany(feedbacks);

      // Sample Donation Data
      const donations = [
          { payment_method: PaymentMethod.QRIS, amount: 10000 },
          { payment_method: PaymentMethod.BANK_TRANSFER, amount: 2000 },
      ];
      const savedDonations = await Donation.insertMany(donations);

      // Sample Comment Data
      const comments = [
          { message: 'This is amazing. Keep going!' },
          { message: 'Happy to contribute!' },
      ];
      const savedComments = await Comment.insertMany(comments);

      // Sample FavoriteCrowdfund Data
      const favoriteCrowdfunds = [
          { user_id: savedUsers[0]._id, crowdfund_id: savedCrowdfunds[0]._id },
          { user_id: savedUsers[1]._id, crowdfund_id: savedCrowdfunds[2]._id },
      ];
      const savedFavoriteCrowdfunds = await FavoriteCrowdfund.insertMany(favoriteCrowdfunds);

      res.status(201).json({
          message: 'Sample data created successfully',
          data: {
              users: savedUsers,
              crowdfunds: savedCrowdfunds,
              feedbacks: savedFeedbacks,
              donations: savedDonations,
              comments: savedComments,
              favoriteCrowdfunds: savedFavoriteCrowdfunds,
          },
      });
  } catch (error) {
      res.status(500).json({ message: 'Error creating sample data', error });
  }
});

app.delete('/clear-database', async (req, res) => {
  try {
      // Hapus semua dokumen dari koleksi yang terdaftar
      await Crowdfund.deleteMany({});
      await Feedback.deleteMany({});
      await Donation.deleteMany({});
      await Comment.deleteMany({});
      await FavoriteCrowdfund.deleteMany({});
      await User.deleteMany({});

      res.status(200).json({ message: 'All data has been cleared from the database.' });
  } catch (error) {
      console.error('Error clearing the database:', error);
      res.status(500).json({ message: 'Failed to clear database', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
