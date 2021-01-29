import { Router} from 'express';
import LogicController from './controllers';
import {sanitizer} from './middlewares';

const router = Router();

router.get('', LogicController.info);
router.post('/validate-rule', sanitizer, LogicController.validateRule);


export default router;