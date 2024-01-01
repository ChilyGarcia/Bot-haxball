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
  public: false,
  roomName: "VIP Roles",
};

var vips = {
  name: ["ds3"],
  auth: [
    "K5--Pj0lZfG0gt4BL1re0KtRkRbcy7tvA3qZ_ccKZd4",
    "DKzwwQNi-iG28ERjiCaXw8m18h-wApBWK8x_Ry05bD8",
    "DKzwwQNi-iG28ERjiCaXw8m18h-wApBWK8x_Ry05bD8",
  ],
  id: [],
};

var playerList = [];

var room = HBInit({
  roomName: roomObject.roomName,
  noPlayer: roomObject.noPlayer,
  public: roomObject.public,
  maxPlayers: roomObject.maxPlayers,
});

function checkJoiningHistory(player) {
  return (
    playerList.length > 0 &&
    playerList.filter(
      (p) =>
        p.name == player.name || p.auth == player.auth || p.conn == player.conn
    ).length > 0
  );
}

function checkPlayerAuth(auth) {
  return vips.auth.length > 0 && vips.auth.includes(auth);
}

function checkPlayerID(id) {
  return vips.id.length > 0 && vips.id.includes(id);
}

function setPlayer(name, auth, conn) {
  playerList.push({ name: name, auth: auth, conn: conn });
}

room.onPlayerChat = function (player, message) {
  room.sendAnnouncement(
    `${
      messages.onPlayerChat.Player[Number(player.admin)][
        Number(checkPlayerID(player.id))
      ]
    } ${player.name}: ${message}`,
    null,
    colors.onPlayerChat.Player[Number(player.admin)][
      Number(checkPlayerID(player.id))
    ],
    fonts.onPlayerChat.Player[Number(player.admin)][
      Number(checkPlayerID(player.id))
    ],
    sounds.onPlayerChat.Player[Number(player.admin)][
      Number(checkPlayerID(player.id))
    ]
  );
  return false;
};

room.onPlayerJoin = function (player) {
  // Verificar si el jugador está en la lista por nombre o autenticación
  var checkName = vips.auth.length > 0 && vips.auth.includes(player.auth);
  var checkAuth = vips.name.length > 0 && vips.name.includes(player.name);

  if (checkAuth && checkName) {
    // Asignarle el rol VIP
    vips.id.push(player.id);

    // Enviar anuncio VIP
    room.sendAnnouncement(
      `${messages.onPlayerJoin.VIP} ${player.name}`,
      null,
      colors.onPlayerJoin.VIP,
      fonts.onPlayerJoin.VIP,
      sounds.onPlayerJoin.VIP
    );
  }

  // Actualizar la lista de jugadores
  setPlayer(player.name, player.auth, player.conn);
  if (playerList.length == 0) {
    setPlayer(player.name, player.auth, player.conn);
  } else {
    var data = checkJoiningHistory(player);
    if (data) {
      var checkAuth = checkPlayerAuth(player.auth);
      var checkID = checkPlayerID(player.id);
      if (checkAuth && !checkID) {
        vips.id.push(player.id);
        room.sendAnnouncement(
          `${messages.onPlayerJoin.VIP} ${player.name}`,
          null,
          colors.onPlayerJoin.VIP,
          fonts.onPlayerJoin.VIP,
          sounds.onPlayerJoin.VIP
        );
      }
    } else {
      setPlayer(player.name, player.auth, player.conn);
      var checkAuth = checkPlayerAuth(player.auth);
      var checkID = checkPlayerID(player.id);
      if (checkAuth && !checkID) {
        vips.id.push(player.id);
        room.sendAnnouncement(
          `${messages.onPlayerJoin.VIP} ${player.name}`,
          null,
          colors.onPlayerJoin.VIP,
          fonts.onPlayerJoin.VIP,
          sounds.onPlayerJoin.VIP
        );
      }
    }
  }
};

room.onPlayerLeave = function (player) {
  if (checkPlayerID(player.id)) {
    var index = vips.id.findIndex((p) => p == player.id);
    if (index !== -1) {
      room.sendAnnouncement(
        `${messages.onPlayerLeave.VIP} ${player.name}`,
        null,
        colors.onPlayerLeave.VIP,
        fonts.onPlayerLeave.VIP,
        sounds.onPlayerLeave.VIP
      );
      vips.id.splice(index, 1);
    }
  }
};
