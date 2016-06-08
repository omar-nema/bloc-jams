

var currToggle = 1;
var playButton = '<a class="album-song-button play"><span class="ion-play"></span></a>';
var pauseButton = '<a class="album-song-button pause"><span class="ion-pause"></span></a>';
var currentSong = null;
    
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
    var table = document.getElementsByClassName('album-view-song-list')[0];
    var songRows = document.getElementsByClassName('album-view-song-item');
    
    table.addEventListener('mouseover', function(event){
        //ONLY hover if we are above song-item-number in DOM
        console.log(event.target);
        if (event.target.parentElement.querySelector('.song-item-number')){
                 hoverHandler(event.target);       
        }
    });
    
    for (var i=0; i<songRows.length; i++){
        
        songRows[i].addEventListener('mouseleave', function(event){            
            exitHandler(event.target);              
        });
        
        songRows[i].addEventListener('click', function(event){
            clickHandler(event.target);
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

var exitHandler = function(targetElement){
    var songItem = getSongItem(targetElement);
    if (songItem != currentSong){
        songItem.innerHTML = songItem.getAttribute('data-song-number')
    }; 
};

var hoverHandler = function(targetElement){
    var songItem = getSongItem(targetElement);
    if (currentSong !== songItem){
        songItem.innerHTML = playButton;
    }
    else {
        console.log('wrk');
    }
};

var clickHandler = function(targetElement){
    var songItem = getSongItem(targetElement);
    console.log('cl');
    if (currentSong == null){
        songItem.innerHTML = pauseButton;
        currentSong = songItem;
    } else if (currentSong === songItem){
        songItem.innerHTML = playButton;
        currentSong = null;
    } else if (currentSong !== songItem){
        currentSong.innerHTML = currentSong.getAttribute('data-song-number');
        songItem.innerHTML = pauseButton;
        currentSong = songItem;
    }
};

var findParentByClassName = function(element, targetClass){
        var currparent;   
        if (element.parentElement){
             currparent = element.parentElement;
        }else {
            alert('no parents!');
            return null
        }
        while (currparent.className !== null && currparent.className != targetClass){   
            if(currparent.parentElement == null){
                alert('no parent found with class name');
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
      case 'album-song-button play':
      case 'album-song-button pause':              
      case 'ion-play':
      case 'ion-pause':
        return findParentByClassName(element, 'song-item-number');
      case 'album-view-song-item':
        return element.querySelector('.song-item-number');
      case 'album-view-song-title':
      case 'album-view-song-duration':  
          case 'song-item-title':
          case 'song-item-duration':
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
