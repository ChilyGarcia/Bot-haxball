    var playerListMute = {};
    var minMessageLength = 2;
    var bound = 3; //You can either decrease or increase this, min = 2;
    var spamBanLimit = 3;
    var spamTimer = 2000; //In milliseconds
    var removal = 4000; //In milliseconds

    var room = HBInit({roomName:"Spam-Mute",noPlayer:true,public:false,maxPlayers:12});

    room.onPlayerChat = function(player,message){
        playerListMute[player.name].messageDates.push(Date.now());
        var administrators = room.getPlayerList(p => p.admin == true);

        if(playerListMute[player.name].messageDates.length == bound){
        playerListMute[player.name].messageDates.shift();
        }
        if(minMessageLength < playerListMute[player.name].messageDates.length && playerListMute[player.name].messageDates.length <= bound-1 && playerListMute[player.name].messageDates[playerListMute[player.name].messageDates.length-1] - playerListMute[player.name].messageDates[0] < spamTimer){
        if(playerListMute[player.name].muted == false){
            var name = player.name;
            room.sendAnnouncement(`${player.name} no envies tantos mensajes a la vez!`,null,0x00FF00,"bold",1);
            playerListMute[player.name].muted = true;

            setTimeout(function(){
            if(playerListMute[name].muted == true){
                playerListMute[name].muted = false;
                room.sendAnnouncement(`${player.name} ha sido desmuteado!`,null,0x00FF00,"bold",1);
            }
            },removal);
        }
        else{
            room.sendAnnouncement(`Mono imbécil deja de spamear!`,player.id,0xFF8000,"bold",2);

            if(playerListMute[player.name].spamInMute < spamBanLimit){
            playerListMute[player.name].spamInMute++;
            }
            else{
            room.kickPlayer(player.id,"Expulsado por spamear 🐒🐒", false);
            }

            return false;
        }
        }
        if(playerListMute[player.name].muted == true){

        return false;
        }
    }

    room.onPlayerJoin = function(player){
        if(playerListMute[player.name] == undefined){
        playerListMute[player.name] = {name: player.name, messageDates: [], muted: false, spamInMute: 0};
        }
    }