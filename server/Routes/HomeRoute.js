import { ensureAuthenticated } from '../Middlewares/AuthMiddleware.js';
import { Router } from 'express';

const router = Router();

router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            message: "Chat to start writing, planning, learning and more with ZappyBot"
        }
    ]);
});

export default router;
