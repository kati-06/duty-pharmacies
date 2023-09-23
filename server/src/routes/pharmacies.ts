import express from 'express';
import {getAllPharmacies} from '../controllers/pharmacies.js';

const router = express.Router();

router.route('/').get(getAllPharmacies);

export default router;
