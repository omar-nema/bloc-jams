
var currToggle = 1;
var playButton = '<a class="album-song-button play"><span class="ion-play"></span></a>';
var pauseButton = '<a class="album-song-button pause"><span class="ion-pause"></span></a>';

var playerPlayButton = '<span class="ion-play">'
var playerPauseButton = '<span class="ion-pause">'
var currentSongNumber = null;
var currentAlbum = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

//Variable below is used to handle one edge case: when a song is paused with the control bar, its play button continues to linger. 

//This happens because I am using the pre-existing clickHandler methods (the same one used to handle clicks within the table) for the control bar. Within the table, our mouseLeave function handle this case and removes the lingering play button. When the control-bar is used however, mouseLeave is never triggered and the play button stays.

//I have included a 'lastPlayedSong' variable that stores the number of a paused song. This way - when a control bar play is clicked, the edge case is dealt with by replacing the .html of the lastPlayedSong with a number in the OnHover method. 
//var lastPlayedSong = null;

$(document).ready(function(){  
    $(window).load(function(){
        var albumToggle = [albumPicasso,  albumSecond,  albumThird];
        setCurrentAlbum(albumToggle[0]);
         
        $('.control-group.main-controls .play-pause').click(function(){genHandler(0)});
        $('.control-group.main-controls .next').click(function(){genHandler(1)});     
        $('.control-group.main-controls .previous').click(function(){genHandler(-1)});     
        
        $('.album-cover-art').click(function(event){
            if (currToggle == albumToggle.length){
                currToggle = 0;
            }
            setCurrentAlbum(albumToggle[currToggle]);
            currToggle = currToggle + 1;
        });
       var songRows = $('.album-view-song-item');
    });

    var createSongRow = function(songNumber, songName, songLength){
        var temp = '<tr class="album-view-song-item">' + '<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' + '<td class="song-item-title">' +  songName+ '</td>' + '</td>' + '<td class="song-item-duration">' +  songLength + '</td>' 
        var $row = $(temp);   
        $row.find('.song-item-number').click(clickHandler);
        $row.hover(onHover, offHover);
        return $row;
    }
    var setCurrentAlbum = function(album){
        currentAlbum = album;
        currentSongNumber = null;
        var $albumTitle = $('.album-view-title');
        var $albumArtist = $('.album-view-artist');
        var $albumReleaseInfo =  $('.album-view-release-info');
        var $albumImage = $('.album-cover-art');
        var $albumSongList = $('.album-view-song-list');
        $albumTitle.text(album.title);
        $albumArtist.text(album.artist);
        $albumReleaseInfo.text(album.year + ' ' + album.label);
        $albumImage.attr('src', album.albumArtUrl);
        $albumSongList.empty();
        for (var i=0; i<album.songs.length; i++){
           $albumSongList.append (createSongRow(i+1,album.songs[i].title,album.songs[i].duration));
        };
        $('.control-group.currently-playing .artist-name').text(currentAlbum.artist);
        $('.control-group.currently-playing .song-name').text('');
    };

    //EVENT HANDLERS - gen used for control bar, clickHandler used for table
    var onHover = function(){
        var $songItem = $(this).find('.song-item-number');
        var $songNumber = parseInt($songItem.attr('data-song-number'));
        //edgeCase handling
        currentSongNumber = parseInt(currentSongNumber);
//        if (!currentSongNumber && lastPlayedSong){
//            getNumberCell(lastPlayedSong).html(lastPlayedSong);
//            
//        }
        if (currentSongNumber!== $songNumber){      
            $songItem.empty();
            $songItem.html(playButton);
        } 
    };
    var offHover = function(){
        var $songItem = $(this).find('.song-item-number');
        var $songNumber = parseInt($songItem.attr('data-song-number'));
        if (currentSongNumber !== $songNumber){
            $songItem.empty();
            //$songItem.html(parseInt($songItem.attr('data-song-number')));
            $songItem.html($songNumber);         
        };
    };
    var genHandler = function(num){      
        if (currentSongNumber){
        newNum = parseInt(num)+parseInt(currentSongNumber);
        if (newNum > 5){
            newNum = 1;
        }       
        else if (newNum < 1){
            newNum = 5;
        }  
        var nextSong = getNumberCell(newNum);
        var newHandler = clickHandler.bind(nextSong);
        //function that relies on this and not parameters, so we have to bind
        newHandler();                
        };
    };
    var clickHandler = function(){
        var songNumber = parseInt($(this).attr('data-song-number'));
        currentSongNumber = parseInt(currentSongNumber);
        if (currentSongNumber !== null){
            var otherSong = getNumberCell(currentSongNumber);
            otherSong.empty();
            otherSong.html(currentSongNumber);
        } 
        if (currentSongNumber !== songNumber){
            $(this).empty();
            $(this).html(pauseButton);
            setSong(parseInt(songNumber));
            currentSoundFile.play();
            updatePlayerBar(playerPauseButton);
           // lastPlayedSong = null;            
        } 
        else if (currentSongNumber === songNumber){
            $(this).empty();
            $(this).html(playButton);
            updatePlayerBar(playerPlayButton);
            //lastPlayedSong = parseInt(currentSongNumber);
//            setSong(null);
//            currentSoundFile.pause();

            if ( currentSoundFile.isPaused() ){
                $(this).empty();
                $(this).html(pauseButton);
                currentSoundFile.play();
                updatePlayerBar(playerPauseButton);
            }
            else {
                currentSoundFile.pause();
                $(this).empty();
                $(this).html(playButton);  
                updatePlayerBar(playerPlayButton);                
            }
            //check if currentSoundFile is pause - look at btn content?
                //yes, then start playing song
                //not, then pause 
        } 
    };  
    
    //HELPER METHODS
    var updatePlayerBar = function(button){
        $('.control-group.currently-playing .song-name').text(currentSongFromAlbum.title);
        $('.control-group.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + currentAlbum.artist);
        if (button){
            $('.play-pause').html(button);
        };
    };
    
    var getNumberCell = function(number){
        return $('.song-item-number[data-song-number="' + number + '"]');
    };
    
    var setVolume = function(val){
        if (currentSoundFile){
            currentSoundFile.setVolume(val);
        }
    };
    
    var setSong = function(songnum){
      if (songnum){
        if (currentSoundFile){
            currentSoundFile.stop();
        }
        currentSongNumber = parseInt(songnum);
        currentSongFromAlbum = currentAlbum.songs[parseInt(songnum)-1];
        currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
            formats: ['mp3'],
            preload: true
            });
        setVolume(currentVolume);  
      }
      else {
        currentSongNumber = parseInt(songnum);
        currentSongFromAlbum = parseInt(songnum);          
      }
    };
    
});    


       

    //personal notes:
    //we can't just select downward from document on a click event, we're looking for specifically anything in or below table-number class
    //multiple depths to selection, but we need to add only to parent selection
    //select each song row and add event listener
    //now can be added when album is added


    //how did previous clickHandler work? can you attach a click handler in the createSongRow function? wouldn't have worked because this would have been a simple string? but jQuery can work with theoretical object?