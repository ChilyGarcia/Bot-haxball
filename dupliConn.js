var playerListDuplicados = {};

var room = HBInit({ roomName: "Duplicated Connections", noPlayer: true, public: true, maxPlayers: 8 });

room.onPlayerJoin = function (player) {
    if (playerListDuplicados[player.name] == undefined) {
        playerListDuplicados[player.name] = { name: player.name, auth: player.auth, conn: player.conn, isInTheRoom: true, isBlacklisted: false };
    }
    else {
        playerListDuplicados[player.name].isInTheRoom = true; //To catch the identical players with the same auth or the same conn in the room
    }

    var p = playerListDuplicados.find(x => (x.isInTheRoom == true) && (x.auth == player.auth || x.conn == player.conn));

    if (p) {
        room.kickPlayer(p.id, "Joining the room with multiple accounts is prohibited!", true);
        room.kickPlayer(player.id, "Joining the room with multiple accounts is prohibited!", true);
        playerListDuplicados[p.name].isBlacklisted = true;
        playerListDuplicados[player.name].isBlacklisted = true; //If the person uses different name under the same auth or conn.
    }
}

room.onPlayerLeave = function (player) {
    playerList[player.name].isInTheRoom = false;
}