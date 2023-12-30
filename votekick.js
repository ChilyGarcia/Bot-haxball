const votedPlayers = new Set() //The set of players which were voted.
var votekickInfoInterval; //The interval for information message about votekick.
var votekickInfoIntervalTime = 180000; //The time for the interval to be reset. (180000 means 180 seconds, you are free to change it according to your preference.)
let votekickTimes = {}; //This holds the amount of votes which the players used.
let votekickCount = {}; //This holds the amount of votes which were done against each of the players.
var votekickTimeout = 60000; //If votekick doesn't reach a result, then it's reset after 60 seconds. (60000 means 60 seconds, you are free to change it according to your preference.)
var PlayerFound = false; //If voted player doesn't exist, then this is false. Initial value: false.

function votekickRemove(player) {
    votekickCount[player.id] = [];
    var players = room.getPlayerList();
    for(var i=0; i<players.length; i++){
	if(votedPlayers.has(players[i].id)==true){
	    votedPlayers.delete(players[i].id);
	}
    }
}

function votekickCheck(player){
    if((room.getPlayerList().length)%2 == 0){
        if(votekickCount[player.id].length >= (room.getPlayerList().length)*1/2){
	    room.kickPlayer(player.id,"You've kicked by vote.",false);
	}
    	else{
	    room.sendAnnouncement("🗳️ " + player.name + " : " + votekickCount[player.id].length + "/" + (room.getPlayerList().length)*1/2,null,0xFFFFFF,"normal",1);
	}
    }
    else if((room.getPlayerList().length)%2 == 1){
        if(votekickCount[player.id].length >= Math.round((room.getPlayerList().length)*1/2)){
	    room.kickPlayer(player.id,"You've kicked by vote.",false);
	}
    	else{
	    room.sendAnnouncement("🗳️ " + player.name + " : " + votekickCount[player.id].length + "/" + Math.round((room.getPlayerList().length)*1/2),null,0xFFFFFF,"normal",1);
	}
    }
}

room.onPlayerJoin = function(player){
    votekickCount[player.id] = []; //This is needed to hold the amount of the votes against a player.
}

room.onPlayerLeave = function(player){
    delete votekickCount[player.id]; //Delete the votes used against the player.
    delete votekickTimes[player.id]; //Delete the votes used by the player.
}

room.onPlayerChat = function(player,msg){
    if(msg.startsWith("!votekick ")==true){
	playerFound = false;
	players = room.getPlayerList();
	for(var i=0; i<players.length; i++){
	    if(msg === ("!votekick " + players[i].name)){
		if(room.getPlayerList().length < 4){ //If there's less than 4 players. Don't do vote because of trolls can easily abuse it.
		    room.sendAnnouncement("There's not enough players to do voting.",player.id,0xFF0000,"bold",2);
		    return false;
		}
		if(players[i].name==player.name){ //You shouldn't vote yourself.
		    room.sendAnnouncement("You cannot vote yourself.",player.id,0xFF0000,"bold",2);
		    return false;
		}
		if(votedPlayers.has(player.id)){ //If you voted a player, then you have to wait the timeout to finish.
		    room.sendAnnouncement("Please wait " + votekickTimeout/1000 + " seconds to vote again.",player.id,0xFF0000,"bold",2);
		    return false;
		}
	 	votedPlayers.add(player.id);
		playerFound = true;
		if(votekickCount[players[i].id].indexOf(players[i]) === -1){
		    votekickCount[players[i].id].push(player);
		}
		votekickTimes[players[i].id] = setTimeout(votekickRemove, votekickTimeout, players[i]); //Start the timeout after the player was voted.
		votekickCheck(players[i]); //Do votekick check for the player who was voted.
	    }
	}
	if(playerFound === false){ //If there's no such a player, then here is called.
	    playersString = "";
	    for(i=0; i<players.length; i++){
		playersString = playersString + players[i].name + ", ";
	    }
	    room.sendAnnouncement("There's no such a player. Here is the list for available players: " + playersString,player.id,0xFFFF00,"normal",1);
	}
	return false;
    }
}

votekickInfoInterval = setInterval(function(){room.sendAnnouncement("You can type !votekick [player_name] (for example: !votekick IvanBre) to kick a player in the room by voting. The voting system does not work if there are less than 4 people in the room.",null,0xFFFFFF,"normal",1);},votekickInfoIntervalTime);