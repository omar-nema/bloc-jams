
var currToggle = 1;
var playButton = '<a class="album-song-button play"><span class="ion-play"></span></a>';
var pauseButton = '<a class="album-song-button pause"><span class="ion-pause"></span></a>';

var playerPlayButton = '<span class="ion-play">'
var playerPauseButton = '<span class="ion-pause">'

var currentSongNumber = null;
var currentAlbum = null;
var currentSongFromAlbum = null;

//Variable below is used to handle one edge case: when a song is paused with the control bar, its play button continues to linger. 

//This happens because I am using the pre-existing clickHandler methods (the same one used to handle clicks within the table) for the control bar. Within the table, our mouseLeave function handle this case and removes the lingering play button. When the control-bar is used however, mouseLeave is never triggered and the play button stays.

//I have included a 'lastPlayedSong' variable that stores the number of a paused song. This way - when a control bar play is clicked, the edge case is dealt with by replacing the .html of the lastPlayedSong with a number in the OnHover method. 
var lastPlayedSong = null;

$(document).ready(function(){  
    $(window).load(function(){
        var albumToggle = [albumPicasso,  albumSecond,  albumThird];
        setCurrentAlbum(albumToggle[0]);

        $('.control-group.main-controls .play-pause').click(playHandler);
        $('.control-group.main-controls .next').click(nextHandler);     
        $('.control-group.main-controls .previous').click(prevHandler);           
        
        $('.album-cover-art').click(function(event){
    //    ('click', function(event){
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
    }
    

    var onHover = function(){
        var $songItem = $(this).find('.song-item-number');
        var $songNumber = $songItem.attr('data-song-number');
        //edgeCase handling
        if (!currentSongNumber && lastPlayedSong){
            getNumberCell(lastPlayedSong).html(lastPlayedSong);
            
        }
        if (currentSongNumber!== $songNumber){      
            $songItem.empty();
            $songItem.html(playButton);
        } 
    };
    var offHover = function(){
        var $songItem = $(this).find('.song-item-number');
        var $songNumber = $songItem.attr('data-song-number')
        if (currentSongNumber !== $songNumber){
            $songItem.empty();
            $songItem.html($songItem.attr('data-song-number'));
        };
    };
    var updatePlayerBar = function(button){
        $('.control-group.currently-playing .song-name').text(currentSongFromAlbum.title);
        $('.control-group.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + currentAlbum.artist);
        if (button){
            $('.play-pause').html(button);
        };
    };
    var playHandler = function(){
        if (currentSongNumber){
            var currsong = getNumberCell(currentSongNumber);
            var newHandler = clickHandler.bind(currsong);
            newHandler();  
        };
    };
    var nextHandler = function(){
        if (currentSongNumber){
            newNum = 1+ +currentSongNumber;
            if (newNum > 5){
                newNum = 1;
            }
            var nextSong = getNumberCell(newNum);
            var newHandler = clickHandler.bind(nextSong);
            newHandler();                
        };
    };
    var prevHandler = function(){
        if (currentSongNumber){
            newNum = +currentSongNumber-1;
            if (newNum < 1){
                newNum = 5;
            }
            var prevSong = getNumberCell(newNum);            
            var newHandler = clickHandler.bind(prevSong);
            newHandler();     
        }
    };
    var clickHandler = function(){
        var songNumber = $(this).attr('data-song-number');
        
        if (currentSongNumber !== null){
            var otherSong = getNumberCell(currentSongNumber);
            otherSong.empty();
            otherSong.html(currentSongNumber);
        } 
        if (currentSongNumber !== songNumber){
            $(this).empty();
            $(this).html(pauseButton);
            currentSongNumber = songNumber;
            currentSongFromAlbum = currentAlbum.songs[songNumber-1];
            updatePlayerBar(playerPauseButton);
            lastPlayedSong = null;            
        } 
        else if (currentSongNumber === songNumber){
            $(this).empty();
            $(this).html(playButton);
            updatePlayerBar(playerPlayButton);
            lastPlayedSong = currentSongNumber;
            setSong(null);
        } 
    };  
    
        var getNumberCell = function(number){
            return $('.song-item-number[data-song-number="' + number + '"]');
        };
    //really unnecessary, but following instructions with this method    
        var setSong= function(songnum){
          currentSongNumber = songnum;
          currentSongFromAlbum = songnum;
        };
    
});    


       

    //personal notes:
    //we can't just select downward from document on a click event, we're looking for specifically anything in or below table-number class
    //multiple depths to selection, but we need to add only to parent selection
    //select each song row and add event listener
    //now can be added when album is added


    //how did previous clickHandler work? can you attach a click handler in the createSongRow function? wouldn't have worked because this would have been a simple string? but jQuery can work with theoretical object?