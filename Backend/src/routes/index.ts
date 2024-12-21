import { Express } from "express";

const router = require('express').Router();

import authroute from './auth.routes';
import crowdfundroute from './crowdfund.route';
import favoriteroute from './favorite.route';
import donationroute from './donation.route';
import comment from './comment.route';

router.use('/auth', authroute);
router.use('/fund', crowdfundroute);
router.use('/fav', favoriteroute);
router.use('/donate', donationroute);
router.use('/comments', comment);

export default router;