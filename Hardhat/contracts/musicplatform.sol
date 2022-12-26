    //SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MusicPlatform {

    IERC20 public btbToken;

    constructor(address tokenAddress){
        btbToken = IERC20(tokenAddress);
    }
 
    struct Music {
        string musicName;
        string musicIpfs;
        address musicOwner;
    }

    struct Playlist {
        Music[] songs;
        string playlistName;
        address playlistOwner;
    }

    struct Album {
        Music[] tracks;
        string albumName;
        address albumOwner;
    }

    mapping(address => uint) public users;
    uint256 musicId;
    uint256 playlistId;
    uint256 albumId;
    mapping(uint256 => Playlist) private playlists;
    mapping(uint256 => Music) private musics;
    mapping(uint256 => Album) private albums;
    uint256 public  payment;

    function addNewMusic(string memory _musicName,string memory _musicIpfs) public  {
        uint256 userBalance = btbToken.balanceOf(msg.sender);
        require(userBalance >= 100, "yetersiz bakiye");
        btbToken.transferFrom(msg.sender,address(this), 100); 
        musics[musicId].musicName = _musicName;
        musics[musicId].musicIpfs = _musicIpfs;
        musics[musicId].musicOwner = msg.sender;
        musicId++;
    }

    function addNewPlaylist(string memory _playlistName) public {
        playlists[playlistId].playlistName = _playlistName;
        playlists[playlistId].playlistOwner = msg.sender;
        playlistId++;
    }

    function addNewAlbum(string memory _albumName)  public {
        albums[albumId].albumName = _albumName;
        albums[albumId].albumOwner = msg.sender;
        albumId++;
    }
    
    function addMusicToPlaylist(uint256 _playlistId,uint256  _musicId) public {
        playlists[_playlistId].songs.push(musics[_musicId]);
    }

    function addMusicToAlbum(uint256 _albumId, uint256 _musicId) onlyOwnerOfalbum(_albumId,_musicId)  public {
        albums[_albumId].tracks.push(musics[_musicId]);
    }

    function deleteMusicToPlaylist(uint256 _musicId, uint256 _playlistId) public {
        playlists[_playlistId].songs[_musicId] =  playlists[_playlistId].songs[ playlists[_playlistId].songs.length -1];
        playlists[_playlistId].songs.pop();
    }

    function deleteMusicToAlbum(uint256 _musicId, uint256 _albumId) onlyOwnerOfalbum(_albumId,_musicId) public   {
        albums[_albumId].tracks[_musicId] = albums[_albumId].tracks[albums[_albumId].tracks.length -1];
        albums[_albumId].tracks.pop();
    }

    modifier onlyOwnerOfalbum(uint256 _albumId, uint256 _musicId) {
        require(address(albums[_albumId].albumOwner) == address(musics[_musicId].musicOwner), "yetkili degil");
        _;
    }
    function trackInAlbum(uint256 _albumId) external view returns (Music[] memory) {
        return albums[_albumId].tracks;
    }
    function trackInPlaylist(uint256 _playlistId) external view returns(Music[] memory){
        return playlists[_playlistId].songs;
    }
    function getMusic(uint256 _musicId) public view returns(Music memory) {
        return musics[_musicId];
    }

    function getPlaylist(uint256 _playlistId) public view returns (Playlist memory) {
        return playlists[_playlistId];
    }

    function getAlbum(uint256 _albumId) public view returns (Album memory) {
        return albums[_albumId];
    }

    function giveTip(address to, uint256 amount) external  {
        uint256 userBalance = btbToken.balanceOf(msg.sender);
        require(userBalance > amount, "yetersiz bakiye");
        btbToken.transferFrom(msg.sender,to, amount); 
    }
    
    function restCountReward(uint256 _restCount) external  {
        payment = _restCount * 10;
        btbToken.transferFrom(address(this),msg.sender, payment);
    }
    
    function getTokenBalance() public view returns(uint)
    {
    return btbToken.balanceOf(msg.sender) ; 
    }
    
}