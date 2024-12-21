import { Express } from "express";

const router = require('express').Router();

import authroute from './auth.routes';
import crowdfundroute from './crowdfund.route';
import favoriteroute from './favorite.route';

router.use('/auth', authroute);
router.use('/fund', crowdfundroute);
router.use('/fav', favoriteroute);

export default router;