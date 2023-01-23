import express from 'express';
import {
    GetHome,
    RegisterUsers,
    LoginUsers, 
    DeleteUserAccount, 
    UpdatePassword,
//    UploadTrack
}from '../controller/users.js';

const router = express.Router();

router.get('/', GetHome);

router.post('/register', RegisterUsers);

router.post('/login', LoginUsers);

router.post('/delete', DeleteUserAccount);

router.post('/updatePassword', UpdatePassword);

// router.post('/upload',UploadTrack);

export default router;