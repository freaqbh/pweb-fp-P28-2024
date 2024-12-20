import { Express } from "express";

const router = require('express').Router();

import authroute from './auth.routes';

router.use('/auth', authroute);

export default router;