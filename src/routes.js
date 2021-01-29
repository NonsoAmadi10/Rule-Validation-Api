import { Router} from 'express';
import LogicController from './controllers';

const router = Router();

router.get('', LogicController.info);


export default router;