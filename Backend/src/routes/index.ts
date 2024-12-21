import { Express } from "express";

const router = require('express').Router();

import authroute from './auth.routes';
import crowdfundroute from './crowdfund.route';

router.use('/auth', authroute);
router.use('/fund', crowdfundroute);

export default router;