
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
var albumToggle = [albumPicasso,  albumSecond,  albumThird];

//HELPER FUNCTIONS
    
    //SEEK BAR UPDATE FUNCTIONS 
        //set-up seek bars & attach event handlers for click interaction w volume & duration bars
var setupSeekBars = function(){
    var $seekbars = $('.player-bar .seek-bar');
    $seekbars.click(function(event){
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        var ratio = offsetX / barWidth;
        //if statement here prevents us from moving thumb/fill when clicking on currently-playing seek bar.
        if (!($(this).parent().hasClass('seek-control'))){
            updateSeekPercentage($(this), ratio);   
        }
    });
    $seekbars.find('.thumb').mousedown(function(event){
        var $seekbar = $(this).parent();
        //we namespace so that we don't remove all event listeners
        $(document).bind('mousemove.thumbname', function(event){
            var offsetX = event.pageX - $seekbar.offset().left;
            var barWidth = $seekbar.width();
            var ratio = offsetX / barWidth;
            updateSeekPercentage($seekbar, ratio);
        });
        $(document).bind('mouseup.thumbname', function(event){
            $(document).unbind('mousemove.thumbname');
            if ($seekbar.parent().hasClass('volume')){
                volumeUpdate($seekbar);
            }
            else if ($seekbar.parent().hasClass('seek-control')){
                seek($seekbar);
            };
            $(document).unbind('mouseup.thumbname');
        });            
    });
};
        //visually update seek bars given ratio
var updateSeekPercentage = function($seekbar, ratio){
    var offsetXPercent = ratio*100;
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
    var percentageString = offsetXPercent + '%';
    $seekbar.find('.thumb').css({left: percentageString});
    $seekbar.find('.fill').width(percentageString);

};
        //allows thumb/fill to move with song duration
var updateBarPlaying = function(){
    if (currentSoundFile){
        currentSoundFile.bind('timeupdate', function(event){
            var ratio = this.getTime()/this.getDuration();
            var $seekbar = $('.seek-control .seek-bar');
            var formatTime = buzz.toTimer(this.getTime());
            updateSeekPercentage($seekbar, ratio);
            $('.currently-playing .current-time').html(formatTime);
        });
    };  
};
        //to seek - skip through song
var seek = function($seekbar){
    if (currentSoundFile){
        var ratio = (event.pageX - $seekbar.offset().left) / $seekbar.width();
        currentSoundFile.setPercent(100*ratio);
        updateSeekPercentage($seekbar, ratio);
    };      
};
        //given bar, changes volume to currentVolume setting
var volumeUpdate = function($seekbar){
    var ratio = (event.pageX - $seekbar.offset().left) / $seekbar.width();
    currentVolume = ratio*100;    
    if (currentSoundFile){
            setVolume(currentVolume);
    }
};
var setVolume = function(val){
    if (currentSoundFile){
        currentSoundFile.setVolume(val);
    }
};


    //CLICK HANDLER HELPERS (used in clickHandler())
        //handles real audio: creates audio object, plays and pauses
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
//    var formatTime = buzz.toTimer(currentSoundFile.getDuration());
//    $('.currently-playing .total-time').html(formatTime);
  }
  else {
    currentSongNumber = parseInt(songnum);
    currentSongFromAlbum = parseInt(songnum);          
  }
};
        //ensures that control bar is updated to reflect changes in table play/pause
var updatePlayerBar = function(button){
    $('.control-group.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.control-group.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + currentAlbum.artist);
    if (button){
        $('.play-pause').html(button);
    };
};
    //general accessor
var getNumberCell = function(number){
    return $('.song-item-number[data-song-number="' + number + '"]');
};
    //change time format
var formatDuration = function(time){
    var minutes = Math.floor(time/60);
    if (minutes < 10){
        minutes = '0' + minutes  
    };
    var seconds = parseFloat((time%60).toFixed(0));
    return minutes + ':' + seconds    
};



$(document).ready(function(){ 

    //setting seekBars, album display
    $(window).load(function(){
        setCurrentAlbum(albumToggle[0]);
        setupSeekBars();
        updateSeekPercentage($('.volume .seek-bar'), currentVolume/100);
        //clickHandlers for prev/play/next control bar
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
    });
    //song row + click handlers created, called in setCurrentAlbum
    var createSongRow = function(songNumber, songName, songLength){
        var temp = '<tr class="album-view-song-item">' + '<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' + '<td class="song-item-title">' +  songName+ '</td>' + '</td>' + '<td class="song-item-duration">' +  songLength + '</td>' 
        var $row = $(temp);   
        $row.find('.song-item-number').click(clickHandler);
        $row.hover(onHover, offHover);
        return $row;
    };
    //sets page display based on album input (from fixtures.js)
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

//EVENT HANDLERS
    //play button over location of song Number added / removed with onHover, offHover
    var onHover = function(){
        var $songItem = $(this).find('.song-item-number');
        var $songNumber = parseInt($songItem.attr('data-song-number'));
        currentSongNumber = parseInt(currentSongNumber);
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
    //MAIN FUNCTION - sets songs, pauses, changes display based on user clicks
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
            updateBarPlaying();          
            $('.total-time').html(formatDuration(currentSongFromAlbum.duration));
        } 
        else if (currentSongNumber === songNumber){
            $(this).empty();
            $(this).html(playButton);
            updatePlayerBar(playerPlayButton);
            if ( currentSoundFile.isPaused() ){
                $(this).empty();
                $(this).html(pauseButton);
                currentSoundFile.play();
                updatePlayerBar(playerPauseButton);
                updateBarPlaying();                
            }
            else {
                currentSoundFile.pause();
                $(this).empty();
                $(this).html(playButton);  
                updatePlayerBar(playerPlayButton);                
            }
        }
        
    };  
    //adapts clickHandler to prev/next/play buttons
    //when control-group is clicked, 'simulates a click' to table song number. input 'num' distinguishes between prev, play, or next click
    var genHandler = function(num){      
        if (currentSongNumber){
        newNum = parseInt(num)+parseInt(currentSongNumber);
        if (num != 0){
            if (newNum > 5){
                newNum = 1;
            }       
            else if (newNum < 1){
                newNum = 5;
            }    
        };
        //simulate click to table for corresponding playing song
        var nextSong = getNumberCell(newNum);
        var newHandler = clickHandler.bind(nextSong);
        newHandler();                
        };
    };
    
});    
