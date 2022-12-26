import express from 'express';
import {
    NewMusic,
    NewPlaylists,
    NewAlbums, 
    AddMusicToPlaylist,
    DeleteMusicToPlaylist,
    AddMusicToAlbum,
    DeleteMusicToAlbum,
    Track_Check,
    Playlist_Check,
    Album_Check
} from '../controller/musics.js';

const router = express.Router();

router.post('/addMusic', NewMusic);

router.post('/checkMusic', Track_Check);

router.post('/checkPlaylist', Playlist_Check);

router.post('/checkAlbum', Album_Check);

router.post('/newPlaylist', NewPlaylists);

router.post('/newAlbum', NewAlbums);

router.post('/addMusicToPlaylist', AddMusicToPlaylist);

router.post('/deleteMusicToPlaylist', DeleteMusicToPlaylist);

router.post('/addMusicToAlbum', AddMusicToAlbum);

router.post('/deleteMusicToAlbum', DeleteMusicToAlbum);

export default router;