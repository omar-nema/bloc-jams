

var currToggle = 1;
window.onload = function(){
    var albumToggle = [albumPicasso,  albumSecond,  albumThird];
    setCurrentAlbum(albumToggle[0]);
    
    document.getElementsByClassName('album-cover-art')[0].addEventListener('click', function(event){
        if (currToggle == albumToggle.length){
            currToggle = 0;
        }
        setCurrentAlbum(albumToggle[currToggle]);
        currToggle = currToggle + 1;
  
    });
    
    //my solution does not use getSongItem
    //instead, a tag with 'pause' or 'play' is added to the button HTML template
    //only one click event listener is used - in the table. three states are considered: whether a clicked element is already in play mode (pauseInd), if a song is currently selected (currentSong - shows location of song) and if a click occurred in the right palace (findParentElement leads to song-item-number), 
    
    var table = document.getElementsByClassName('album-view-song-list')[0];
    var songRows = document.getElementsByClassName('album-view-song-item');
    var playButton = '<a class="album-song-button play"><span class="ion-play"></span></a>';
    var pauseButton = '<a class="album-song-button pause"><span class="ion-pause"></span></a>';
    var currentSong = null;
    
    table.addEventListener('click', function(event){  
        
        var findParentResult = findParentByClassName(event.target, 'song-item-number');
        //indicates whether already playing
        if (findParentResult){
            var pauseInd = findParentResult.querySelector('.pause');
        }
        else {
            pauseInd = null;
        }
        if  (findParentResult && !pauseInd){
            findParentResult.innerHTML = pauseButton;
            if (currentSong){
                currentSong.innerHTML = currentSong.getAttribute('data-song-number');
            }
            currentSong = findParentResult;
        }
        else if (findParentResult && pauseInd){
            findParentResult.innerHTML = playButton;
            currentSong = null;
        }       
    });
        
    table.addEventListener('mouseover', function(event){   
        if (event.target.parentElement.className === 'album-view-song-item'){  
            //if not played
            
            if (!event.target.parentElement.querySelector('.song-item-number').querySelector('.album-song-button.pause')){
                event.target.parentElement.querySelector('.song-item-number').innerHTML = playButton;            
            }
        }
    });
    
    for (var i=0; i<songRows.length; i++){
        songRows[i].addEventListener('mouseleave', function(event){

            if (!this.querySelector('.pause')){
               this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
            }
         
        });
    }
  
};

//functions 
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

var findParentByClassName = function(element, targetClass){
        var currparent = element.parentElement;
        while (currparent.className !== null && currparent.className != targetClass){   
            if(currparent.parentElement == null){
                return null;
            }
            else {
               currparent = currparent.parentElement;    
            }  
        }
        return currparent;
    };

var getSongItem = function(element){
      switch (element.className){
      case 'album-song-button':
      case 'ion-play':
      case 'ion-pause':
        return findParentByClassName(element, 'song-item-number');
      case 'album-view-song-item':
        return element.querySelector('.song-item-number');
      case 'album-view-song-title':
      case 'album-view-song-duration':      
        return element.parentElement.querySelector('.song-item-number');     
      case 'song-item-number':
        return element; 
      default:
        return;
  }
}

    
//albums
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



