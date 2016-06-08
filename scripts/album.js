var currToggle = 1;
var playButton = '<a class="album-song-button play"><span class="ion-play"></span></a>';
var pauseButton = '<a class="album-song-button pause"><span class="ion-pause"></span></a>';
var currentSong = null;
    
$(window).load(function(){
    var albumToggle = [albumPicasso,  albumSecond,  albumThird];
    setCurrentAlbum(albumToggle[0]);
    document.getElementsByClassName('album-cover-art')[0].addEventListener
    
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
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo =  $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    $albumTitle.text = album.title;
    $albumArtist.text = album.artist;
    $albumReleaseInfo.text = album.year + ' ' + album.label;
    $albumImage.attr('src', album.albumArtUrl);
    $albumSongList.empty();
    for (var i=0; i<album.songs.length; i++){
       $albumSongList.append (createSongRow(i+1,album.songs[i].title,album.songs[i].duration));
    };
}

var onHover = function(){
    var $songItem = $(this).find('.song-item-number');
    var $songNumber = $songItem.attr('data-song-number')
    if (currentSong !== $songNumber){
        $songItem.empty();
        $songItem.html(playButton);
    } 
};

var offHover = function(){
    var $songItem = $(this).find('.song-item-number');
    var $songNumber = $songItem.attr('data-song-number')
    if (currentSong !== $songNumber){
        $songItem.empty();
        $songItem.html($songItem.attr('data-song-number'));
    }; 
};

var clickHandler = function(){
    var songNumber = $(this).attr('data-song-number')
    //how does this handle going both up and down?
    
    if (currentSong == null){
        $(this).empty();
        $(this).html(pauseButton);
        currentSong = songNumber;
    } else if (currentSong === songNumber){
        $(this).empty();
        $(this).html(playButton);
        currentSong = null;
    } else if (currentSong !== songNumber){
        //get element with certain attribute and empty
        var otherSong = $('.song-item-number[data-song-number="' + currentSong + '"]');
        otherSong.empty();
        otherSong.html(currentSong);
        $(this).empty();
        $(this).html(pauseButton);
        currentSong = songNumber;
    }
};

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
