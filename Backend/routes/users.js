import express from 'express';
import {
    GetHome,
    RegisterUsers,
    LoginUsers, 
    Auth,
    DeleteUserAccount, 
    UpdatePassword 
}from '../controller/users.js';

const router = express.Router();

router.get('/', GetHome);

router.post('/register', RegisterUsers);

router.post('/login', LoginUsers);

router.post('/auth', Auth);

router.post('/delete', DeleteUserAccount);

router.post('/updatePassword', UpdatePassword);

export default router;