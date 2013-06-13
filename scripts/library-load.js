var playlistSnapshot;
require([
  '$api/models',
  '$api/library#Library'
], function(models, Library) {

  var doGetStarred = function(){
  var library = Library.forCurrentUser();
  var snap = library.load("starred").done(function(library){
		library.starred.load("tracks").done(function(starred){
			library.starred.tracks.snapshot().done(function(snapshot){
				document.querySelector('#starred').innerHTML = ('starred: ' + 
					snapshot.get(0).name	);
				});
			});
		});
	};
  
  //Scan for a specified song using snapshot
  var doGetPlaylists = function(){
	  var library = Library.forCurrentUser();
	  var playlists = library.load("playlists");
	  var playlistPromise = playlists.done(function(playlists){
			library.playlists.snapshot().done(function(snapshot){
				console.log("Found " + snapshot.length + " playlists.");
				playlistSnapshot = snapshot; 
				//Filled this global variable to use for check song.
				});
			});
		};
		
	//Check for song after getting snapshot of current playlists..
	var doCheckSong = function(song) {
		var numPlaylists = playlistSnapshot.length;
		var foundPlaylists = new Array(); //Return array with all playlists song is in.
		console.log("About to scan: " + numPlaylists + " playlists");
		console.log("Looking for song: " + song);
		//Now we are going to scan every playlist for song...
		for( var i = 0; i < numPlaylists; i++) {
			var curPlaylist = playlistSnapshot.get(i);
			if(curPlaylist != null) //Playlist collection. All playlists come in...?
				curPlaylist.load("tracks").done(function(curPlaylist){
					curPlaylist.tracks.snapshot().done(function(snapshot){
					/*
						We now have a snapshot of the current playlist's
						tracks. Now we're going to check each one for a
						matching URI for the song.
					*/
						//console.log("#tracks: " + snapshot.length);
						
						for(var j = 0; j < snapshot.length; j++)
						{
							var track = snapshot.get(j);
							if(song == track.uri){
								console.log("Found: " +track.name  + " in " + curPlaylist.name); 
								foundPlaylists.push(curPlaylist.name);
								//Found it!
							}							
						}
						
					});
				});
				
		} //playlist for loop
		return foundPlaylists;
	};
	
  var doPrint = function(array){
	var toPrint = '';
	if(array.length == 0){
		toPrint = "<b>Nope</b>";
		console.log("Song Not Found. Or something went wrong.");
	} //if
	else{
			toPrint = "<p><b> Yep! </b> You have it in: </p><br />";
			for(var i = 0; i < array.length; i++)
			{
				toPrint += "<li> "+ array[i];				
				console.log("found in: " + array[i]);
			}
		} //else
		document.querySelector('#found').innerHTML = (toPrint);
  };
  
  exports.doGetStarred = doGetStarred;
  exports.doCheckSong = doCheckSong;
  exports.doGetPlaylists = doGetPlaylists;
  exports.doPrint = doPrint;
  
});
