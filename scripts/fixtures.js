
var formatDuration = function(time){
    var minutes = Math.floor(time/60);
    if (minutes < 10){
        minutes = '0' + minutes  
    };
    var seconds = parseFloat((time%60).toFixed(0));
    return minutes + ':' + seconds    
};

//albums
var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl:  'assets/images/album_covers/01.png',
    songs: [
        {title: 'Blue', duration: 161.71, audioUrl: 'assets/music/blue'},
        {title: 'Green', duration: 103.96, audioUrl: 'assets/music/green' },
        {title: 'Red', duration: 268.45, audioUrl: 'assets/music/red' },
        {title: 'Pink', duration: 153.14, audioUrl: 'assets/music/pink' },
        {title: 'Magenta', duration: 374.22, audioUrl: 'assets/music/magenta' }
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
