import express from 'express';
import {
    NewMusic,
    NewPlaylists,
    NewAlbums, 
    AddMusicToPlaylist,
    DeleteMusicToPlaylist,
    AddMusicToAlbum,
    DeleteMusicToAlbum 
} from '../controller/musics.js';

const router = express.Router();

router.post('/addMusic', NewMusic);

router.post('/newPlaylist', NewPlaylists);

router.post('/newAlbum', NewAlbums);

router.post('/addMusicToPlaylist', AddMusicToPlaylist);

router.post('/deleteMusicToPlaylist', DeleteMusicToPlaylist);

router.post('/addMusicToAlbum', AddMusicToAlbum);

router.post('/deleteMusicToAlbum', DeleteMusicToAlbum);

export default router;