import express from "express";
import { registerController, loginController } from "../controller/CandidateController.js";
import {  requireSignIn } from "../middleware/auth.js";

const router = express.Router();



router.post('/registercandidate', registerController)
router.post('/login', loginController)


//protected User Routes
router.get('/user-auth', requireSignIn,(req,res) =>{
    res.status(200).send({ok: true});
})

export default router;