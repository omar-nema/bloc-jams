

var currToggle = 1;

window.onload = function(){
    console.log('load');
    
    var albumToggle = [albumPicasso,  albumSecond,  albumThird];
    setCurrentAlbum(albumToggle[0]);
    
    document.getElementsByClassName('album-cover-art')[0].addEventListener('click', function(event){
        if (currToggle == albumToggle.length){
            currToggle = 0;
        }
        setCurrentAlbum(albumToggle[currToggle]);
        currToggle = currToggle + 1;
  
    });
    
    var table = document.getElementsByClassName('album-view-song-list')[0];
    
    var songRows = document.getElementsByClassName('album-view-song-item');
    
    var playButton = '<a class="album-song-button"><span class="ion-play"></span></a>';
    
    table.addEventListener('mouseover', function(event){
     
        
        var initial = event.target.parentElement.querySelector('.song-item-number').innerHTML;
        
        if (event.target.parentElement.className === 'album-view-song-item'){
            
            event.target.parentElement.querySelector('.song-item-number').innerHTML = playButton;
        }
  

    });
    
    for (var i=0; i<songRows.length; i++){
        songRows[i].addEventListener('mouseleave', function(event){
            this.children[0].innerHTML = this.children[0].getAttribute('data-song-number')
        });
    }
    
};


var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl:  'assets/images/album_covers/01.png',
    songs: [
        {title: 'Blue', duration: '4:26' },
        {title: 'Red', duration: '4:26' },
        {title: 'Pink', duration: '5:26' },
        {title: 'Orange', duration: '6:26' },
        {title: 'BlYellowue', duration: '7:26' }
    ]   
};
var albumSecond = {
    title: 'The Ecstatic',
    artist: 'Mos Def',
    label: 'Def Jam',
    year: '2004',
    albumArtUrl:  'assets/images/album_covers/20.png',
    songs: [
        {title: 'One', duration: '4:26' },
        {title: 'Two', duration: '4:26' },
        {title: 'Tre', duration: '5:26' },
        {title: '4', duration: '6:26' },
        {title: '5', duration: '7:26' }
    ]   
};

var albumThird = {
    title: 'Coloring Book',
    artist: 'Chance The Rapper',
    label: 'Indie',
    year: '2016',
    albumArtUrl:  'assets/images/album_covers/15.png',
    songs: [
        {title: 'One', duration: '1:26' },
        {title: 'Two', duration: '2:26' },
        {title: 'Tre', duration: '3:26' },
        {title: '4', duration: '4:26' },
        {title: '5', duration: '5:26' }
    ]   
};

//var collectionItemTemplate = 
//'<div class="collection-album-container column fourth"> ' + '<img src="assets/images/album_covers/01.png">' + '' + '<div class="collection-album-info caption">' + '<p>'+ '<a class="album-name" href="album.html">The Colors</a>' + '<br/>' + '<a href="/album.html">Pablo Picasso</a>' + '<br/>' + ' X songs' + '<br/>' + '</p>' + '</div>' + '</div>';

var createSongRow = function(songNumber, songName, songLength){
    var temp = '<tr class="album-view-song-item">' + '<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' + '<td class="song-item-title">' +  songName+ '</td>' + '</td>' + '<td class="song-item-duration">' +  songLength + '</td>' 
    return temp;   
}

var setCurrentAlbum = function(album){
    
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo =  document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    
    albumTitle.textContent = album.title;
    albumArtist.textContent = album.artist;
    albumReleaseInfo.textContent = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);
    
    albumSongList.innerHTML = '';
    for (var i=0; i<album.songs.length; i++){
         albumSongList.innerHTML += createSongRow(i+1,album.songs[i].title,album.songs[i].duration);
    };

}



//var collectionItemTemplate = 
//'<div class="collection-album-container column fourth"> ' + '<img src="assets/images/album_covers/01.png">' + '' + '<div class="collection-album-info caption">' + '<p>'+ '<a class="album-name" href="album.html">The Colors</a>' + '<br/>' + '<a href="/album.html">Pablo Picasso</a>' + '<br/>' + ' X songs' + '<br/>' + '</p>' + '</div>' + '</div>';


//albums.songs[i].duration


//                <tr class="album-view-song-item">
//                    <td class="song-item-number">1</td>
//                    <td class="song-item-title">Blue</td>
//                    <td class="song-item-duration">X:XX</td>
//                </tr>
//                <tr class="album-view-song-item">
//                    <td class="song-item-number">2</td>
//                    <td class="song-item-title">Red</td>
//                    <td class="song-item-duration">X:XX</td>
//                </tr>
//                <tr class="album-view-song-item">
//                    <td class="song-item-number">3</td>
//                    <td class="song-item-title">Green</td>
//                    <td class="song-item-duration">X:XX</td>
//                </tr>
//                <tr class="album-view-song-item">
//                    <td class="song-item-number">4</td>
//                    <td class="song-item-title">Purple</td>
//                    <td class="song-item-duration">X:XX</td>
//                </tr>
//                <tr class="album-view-song-item">
//                    <td class="song-item-number">5</td>
//                    <td class="song-item-title">Black</td>
//                    <td class="song-item-duration">X:XX</td>
//                </tr>                
