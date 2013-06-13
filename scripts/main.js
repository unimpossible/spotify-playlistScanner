require([
  '$api/models',
  'scripts/library-load'
  /*
  'scripts/language-example',
  'scripts/cover-example',
  'scripts/button-example',
  'scripts/playlist-example'
  */
], function(models, libraryLoad) {
  'use strict';
  
  models.application.addEventListener('dropped', function() {
   var dropped = models.application.dropped; // it contains the dropped elements
    //libraryLoad.doGetStarred();
   var checkTrack = dropped[0];
   libraryLoad.doGetPlaylists();
   var array = libraryLoad.doCheckSong(checkTrack);
   libraryLoad.doPrint(array);
});

 
  
  /* //Example Code
  coverExample.doCoverForAlbum();
  buttonExample.doShareButtonForArtist();
  buttonExample.doPlayButtonForAlbum();
  playlistExample.doPlaylistForAlbum();
*/
});
