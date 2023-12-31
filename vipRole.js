var colors = {
  onPlayerChat: {
    Player: [
      [0xffffff, 0x95ff8e],
      [0xffdb72, 0x95ff8e],
    ],
  },
  onPlayerJoin: {
    VIP: 0x95ff8e,
  },
  onPlayerLeave: {
    VIP: 0x95ff8e,
  },
};

var fonts = {
  onPlayerChat: {
    Player: [
      ["normal", "bold"],
      ["bold", "bold"],
    ],
  },
  onPlayerJoin: {
    VIP: "bold",
  },
  onPlayerLeave: {
    VIP: "bold",
  },
};

var sounds = {
  onPlayerChat: {
    Player: [
      [1, 1],
      [1, 2],
    ],
  },
  onPlayerJoin: {
    VIP: 1,
  },
  onPlayerLeave: {
    VIP: 1,
  },
};

var messages = {
  onPlayerChat: {
    Player: [
      ["[PLAYER]", "[VIP][PLAYER]"],
      ["[ADMIN]", "[VIP][ADMIN]"],
    ],
  },
  onPlayerJoin: {
    VIP: "✅ A VIP user has joined:",
  },
  onPlayerLeave: {
    VIP: "➡️ A VIP user has left:",
  },
};

var roomObject = {
  maxPlayers: 4,
  noPlayer: true,
  public: true,
  roomName: "VIP Roles",
};

var admins = [];

// Lista de jugadores específicos que tendrán el estado VIP
var vipPlayers = ["Player1", "Player2", "Player3"];

var playerList = [];

var room = HBInit({
  roomName: roomObject.roomName,
  noPlayer: roomObject.noPlayer,
  public: roomObject.public,
  maxPlayers: roomObject.maxPlayers,
});

room.onPlayerChat = function (player, message) {
  if (message === "!admin" && !isAdmin(player)) {
    // Verifica que el jugador no sea administrador y otorga privilegios al jugador actual
    admins.push(player.id);
    room.sendAnnouncement(
      `${player.name} ahora tiene privilegios de administrador.`,
      null,
      0x00ff00
    );
  }
  room.sendAnnouncement(
    `${messages.onPlayerChat.Player[Number(player.admin)]} ${
      player.name
    }: ${message}`,
    null,
    colors.onPlayerChat.Player[Number(player.admin)],
    fonts.onPlayerChat.Player[Number(player.admin)],
    sounds.onPlayerChat.Player[Number(player.admin)]
  );
  return false;
};

room.onPlayerJoin = function (player) {
  playerList.push({ name: player.name, auth: player.auth, conn: player.conn });

  // Verificamos si el nombre del jugador está en la lista VIP
  if (vipPlayers.includes(player.name)) {
    // Asignamos el estado VIP solo a los jugadores específicos
    room.sendAnnouncement(
      `${messages.onPlayerJoin.VIP} ${player.name}`,
      null,
      colors.onPlayerJoin.VIP,
      fonts.onPlayerJoin.VIP,
      sounds.onPlayerJoin.VIP
    );
  }
};

room.onPlayerLeave = function (player) {
  admins = admins.filter((adminId) => adminId !== player.id);
  // Eliminamos al jugador que se va de la lista
  var index = playerList.findIndex(
    (p) =>
      p.name == player.name || p.auth == player.auth || p.conn == player.conn
  );
  if (index !== -1) {
    playerList.splice(index, 1);
  }

  // Verificamos si el jugador que se va estaba en la lista VIP
  if (vipPlayers.includes(player.name)) {
    room.sendAnnouncement(
      `${messages.onPlayerLeave.VIP} ${player.name}`,
      null,
      colors.onPlayerLeave.VIP,
      fonts.onPlayerLeave.VIP,
      sounds.onPlayerLeave.VIP
    );
  }
};

function isAdmin(player) {
  // Verifica si el jugador actual tiene privilegios de administrador
  return admins.includes(player.id);
}
