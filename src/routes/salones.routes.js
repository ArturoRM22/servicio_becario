import {Router} from 'express';
import {methods as salonController} from '../controllers/salones.controllers.js';

const router  = Router();

router.get('/salones_disponibles',salonController.get_salones_disponibles);

router.post('/salones', salonController.add_salon);

router.get('/salones_disponibles/:id',salonController.get_salon);

router.put('/salon_update/:id', salonController.update_salon);

router.patch('/salon_update/:id',salonController.update_salon);

router.delete('/salon_delete/:id', salonController.delete_salon);

export default router;