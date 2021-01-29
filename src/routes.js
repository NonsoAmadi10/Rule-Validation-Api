import { Router} from 'express';
import LogicController from './controllers';
import {san} from './middlewares';

const router = Router();

router.get('', LogicController.info);
router.post('validate-rule', sanitizer);


export default router;