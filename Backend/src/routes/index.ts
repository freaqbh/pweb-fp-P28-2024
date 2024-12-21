import { Express } from "express";

const router = require('express').Router();

import authroute from './auth.routes';
import crowdfundroute from './crowdfund.route';
import feedbackroute from './feedback.route';

router.use('/auth', authroute);
router.use('/fund', crowdfundroute);
router.use('/feedback', feedbackroute);

export default router;