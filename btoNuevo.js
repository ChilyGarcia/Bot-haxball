/* ROOM */
const roomName = "☕[AF] Santos F.C Hax 4v4 24/7 ⬛⬜ ☕";
const botName = "Santos F.C";
const maxPlayers = 24; // maximum number of players in the room
const roomPublic = false; // true = public room | false = players only enter via the room link (it does not appear in the room list)
const geo = [
  { lat: -22.9201, lon: -43.3307, code: "br" },
  { code: "FR", lat: 46.2, lon: 2.2 },
  { code: "PL", lat: 51.9, lon: 19.1 },
  { code: "GB", lat: 55.3, lon: -3.4 },
  { code: "PT", lat: 39.3, lon: -8.2 },
];
// place your geoloc, so as not to have a leaky room

const votedPlayers = new Set(); //The set of players which were voted.
var votekickInfoInterval; //The interval for information message about votekick.
var votekickInfoIntervalTime = 180000; //The time for the interval to be reset. (180000 means 180 seconds, you are free to change it according to your preference.)
let votekickTimes = {}; //This holds the amount of votes which the players used.
let votekickCount = {}; //This holds the amount of votes which were done against each of the players.
var votekickTimeout = 60000; //If votekick doesn't reach a result, then it's reset after 60 seconds. (60000 means 60 seconds, you are free to change it according to your preference.)
var PlayerFound = false; //If voted player doesn't exist, then this is false. Initial value: false.

function votekickRemove(player) {
  votekickCount[player.id] = [];
  var players = room.getPlayerList();
  for (var i = 0; i < players.length; i++) {
    if (votedPlayers.has(players[i].id) == true) {
      votedPlayers.delete(players[i].id);
    }
  }
}

function votekickCheck(player) {
  if (room.getPlayerList().length % 2 == 0) {
    if (
      votekickCount[player.id].length >=
      (room.getPlayerList().length * 1) / 2
    ) {
      room.kickPlayer(player.id, "You've kicked by vote.", false);
    } else {
      room.sendAnnouncement(
        "🗳️ " +
          player.name +
          " : " +
          votekickCount[player.id].length +
          "/" +
          (room.getPlayerList().length * 1) / 2,
        null,
        0xffffff,
        "normal",
        1
      );
    }
  } else if (room.getPlayerList().length % 2 == 1) {
    if (
      votekickCount[player.id].length >=
      Math.round((room.getPlayerList().length * 1) / 2)
    ) {
      room.kickPlayer(player.id, "You've kicked by vote.", false);
    } else {
      room.sendAnnouncement(
        "🗳️ " +
          player.name +
          " : " +
          votekickCount[player.id].length +
          "/" +
          Math.round((room.getPlayerList().length * 1) / 2),
        null,
        0xffffff,
        "normal",
        1
      );
    }
  }
}

let lastUsed = {};
const room = HBInit({
  roomName: roomName,
  maxPlayers: maxPlayers,
  public: roomPublic,
  playerName: botName,
});
geo: geo[0];

const scoreLimitPractice = 3;
const timeLimitPractice = 4;

let Cor = {
  Vermelho: 0xfa5646,
  Laranja: 0xffc12f,
  Verde: 0x7dfa89,
  Azul: 0x05c5ff,
  Amarelo: 0xffff17,
  Cinza: 0xcccccc,
  Branco: 0xffffff,
  Azulclaro: 0x6ecaff,
  Powderblue: 0xb0e0e6,
  Roxo: 0x800080,
  Platinum: 0xe5e4e2,
  Gold: 0xffd700,
  Silver: 0xd5d5d5,
  Bronze: 0x896728,
  Thistle: 0xd8bfd8,
  Khaki: 0xf0e68c,
  AliceBlue: 0xf0f8ff,
  GhostWhite: 0xf8f8ff,
  Snow: 0xfffafa,
  Seashell: 0xfff5ee,
  FloralWhite: 0xfffaf0,
  WhiteSmoke: 0xf5f5f5,
  Beige: 0xf5f5dc,
  OldLace: 0xfdf5e6,
  Ivory: 0xfffff0,
  Linen: 0xfaf0e6,
  Cornsilk: 0xfff8dc,
  AntiqueWhite: 0xfaebd7,
  BlanchedAlmond: 0xffebcd,
  Bisque: 0xffe4c4,
  LightYellow: 0xffffe0,
  LemonChiffon: 0xfffacd,
  LightGoldenrodYellow: 0xfafad2,
  PapayaWhip: 0xffefd5,
  PeachPuff: 0xffdab9,
  Moccasin: 0xffe4b5,
  PaleGoldenrod: 0xeee8aa,
  Azulescuro: 0x426ad6,
  Warn: 0xff9966,
};
// here you can place/edit goal messages, always respecting the " , ". Example: "Belo gooool," the player's name will always be after the comma.
const frasesGols = [
  " QUE GOLAZO METEEEEEEEEEEEEEEES ",
  " GOOOOOOOOOOL! Va para Púskas ",
  " GOOOOOOOOOOL! Nuevp fichaje del Santos ",
  " No te cansas de anotar? ",
  " GOOOOOOOOOOOOOL! Casi que no entra ",
  " CASI ERRASSSSSSSSSSSSS ",
  " La calidad jamás se pierde ",
  " QUE GOLAZOOOOOOOOO, aprendió del GOAT Romario ",
];
// here you can place/edit assistance messages, always respecting the " , ". Example: "Nice pass," the player's name will always be after the comma.
const frasesasis = [
  " gracias a ",
  " accompanied by the beautiful pass of ",
  " with the ball in the mouth of the goal by ",
  " with the phenomenal assistance of ",
  " and we cannot forget the magnificent pass of",
];
// here you can post/edit messages for mockery, for own goals, always respecting the " , ". Example: "Try to kick to the other side," the player's name will always be after the comma.
const frasesautogol = [
  " I'm sure it was by accident, right, ",
  " YOU'RE PLAYING FOR THE WRONG TEAM, ",
  " CONGRATULATIONS!! THE OPPONENT TEAM THANKS YOU, ",
  " IT'S GOOOOOOOOOL... against ",
  " Return to the sea offering, ",
];

const secondsToResetAvatar = 3;
var registro = new Map();
const css = "border:2px solid;padding:8px;background:";
room.setTeamsLock(true);
var message;
var Botdivulga;
var msg1;
var msg1Time = 1500000;
var Deus = [];
var BotdivulgaTime = 900000;
var adminPassword = 4002;

var vip1 = [];
var vip2 = [];
var vip3 = [];

/* ESTÁDIO */

const playerRadius = 15;
var ballRadius = 6.25;
const triggerDistance = playerRadius + ballRadius + 0.01;

var practiceMap = `{"name":"AF Official 4v4 by Vitão ®","width":810,"height":350,"bg":{"kickOffRadius":80,"color":"1D2431"},"vertexes":[{"x":-700,"y":-85,"bCoef":0.1,"cMask":["ball"]},{"x":-735,"y":-85,"bCoef":0.1,"cMask":["ball"]},{"x":-734,"y":-86,"bCoef":0.1,"cMask":["ball"]},{"x":-734,"y":86,"bCoef":0.1,"cMask":["ball"]},{"x":-735,"y":85,"bCoef":0.1,"cMask":["ball"]},{"x":-700,"y":85,"bCoef":0.1,"cMask":["ball"]},{"x":700,"y":85,"bCoef":0.1,"cMask":["ball"]},{"x":735,"y":85,"bCoef":0.1,"cMask":["ball"]},{"x":734,"y":86,"bCoef":0.1,"cMask":["ball"]},{"x":734,"y":-86,"bCoef":0.1,"cMask":["ball"]},{"x":735,"y":-85,"bCoef":0.1,"cMask":["ball"]},{"x":700,"y":-85,"bCoef":0.1,"cMask":["ball"]},{"x":-700,"y":-321.5,"cMask":["ball"]},{"x":-700,"y":-85,"cMask":["ball"]},{"x":-700,"y":85,"cMask":["ball"]},{"x":-700,"y":321.5,"cMask":["ball"]},{"x":-700,"y":320,"cMask":["ball"]},{"x":700,"y":320,"cMask":["ball"]},{"x":700,"y":321.5,"cMask":["ball"]},{"x":700,"y":85,"cMask":["ball"]},{"x":700,"y":-85,"cMask":["ball"]},{"x":700,"y":-321.5,"cMask":["ball"]},{"x":700,"y":-320,"cMask":["ball"]},{"x":-700,"y":-320,"cMask":["ball"]},{"x":-700,"y":-85,"cMask":[]},{"x":-700,"y":85,"cMask":[]},{"x":700,"y":85,"cMask":[]},{"x":700,"y":-85,"cMask":[]},{"x":-360,"y":318,"cMask":[]},{"x":-360,"y":-318,"cMask":[]},{"x":360,"y":-318,"cMask":[]},{"x":360,"y":318,"cMask":[]},{"x":-500,"y":-1,"cMask":[]},{"x":-500,"y":1,"cMask":[]},{"x":-500,"y":-2,"cMask":[]},{"x":-500,"y":2,"cMask":[]},{"x":0,"y":-80,"cMask":["red","blue"],"cGroup":["redKO"]},{"x":0,"y":80,"cMask":["red","blue"],"cGroup":["redKO"]},{"x":0,"y":-350,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":350,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-318,"cMask":[]},{"x":0,"y":-80,"cMask":[]},{"x":0,"y":318,"cMask":[]},{"x":0,"y":80,"cMask":[]},{"x":500,"y":-1,"cMask":[]},{"x":500,"y":1,"cMask":[]},{"x":500,"y":-2,"cMask":[]},{"x":500,"y":2,"cMask":[]},{"x":-360,"y":-135,"cMask":[]},{"x":-360,"y":135,"cMask":[]},{"x":360,"y":135,"cMask":[]},{"x":360,"y":-135,"cMask":[]},{"x":-698,"y":125,"cMask":[]},{"x":-630,"y":125,"cMask":[]},{"x":-630,"y":-125,"cMask":[]},{"x":-698,"y":-125,"cMask":[]},{"x":-630,"y":126.5,"cMask":[]},{"x":-630,"y":-126.5,"cMask":[]},{"x":698,"y":125,"cMask":[]},{"x":630,"y":125,"cMask":[]},{"x":630,"y":-125,"cMask":[]},{"x":698,"y":-125,"cMask":[]},{"x":630,"y":126.5,"cMask":[]},{"x":630,"y":-126.5,"cMask":[]},{"x":-50,"y":30,"cMask":[]},{"x":-25,"y":-30,"cMask":[]},{"x":11,"y":30,"cMask":[]},{"x":20,"y":-30,"cMask":[]},{"x":-42.5,"y":30,"cMask":[]},{"x":-17.5,"y":-30,"cMask":[]},{"x":-52,"y":30,"cMask":[]},{"x":-27,"y":-30,"cMask":[]},{"x":-40.5,"y":30,"cMask":[]},{"x":-15.5,"y":-30,"cMask":[]},{"x":-33,"y":30,"cMask":[]},{"x":-8,"y":-30,"cMask":[]},{"x":-31,"y":30,"cMask":[]},{"x":-6,"y":-30,"cMask":[]},{"x":-29,"y":30,"cMask":[]},{"x":-4,"y":-30,"cMask":[]},{"x":-27,"y":30,"cMask":[]},{"x":-2,"y":-30,"cMask":[]},{"x":-25,"y":30,"cMask":[]},{"x":0,"y":-30,"cMask":[]},{"x":5,"y":30,"cMask":[]},{"x":0,"y":-30,"cMask":[]},{"x":3,"y":30,"cMask":[]},{"x":-2,"y":-30,"cMask":[]},{"x":1,"y":30,"cMask":[]},{"x":-4,"y":-30,"cMask":[]},{"x":-1,"y":30,"cMask":[]},{"x":-6,"y":-30,"cMask":[]},{"x":-3,"y":30,"cMask":[]},{"x":-8,"y":-30,"cMask":[]},{"x":-21,"y":19,"cMask":[]},{"x":-5,"y":19,"cMask":[]},{"x":-21,"y":17,"cMask":[]},{"x":-5,"y":17,"cMask":[]},{"x":-21,"y":15,"cMask":[]},{"x":-5,"y":15,"cMask":[]},{"x":-21,"y":13,"cMask":[]},{"x":-5,"y":13,"cMask":[]},{"x":-21,"y":11,"cMask":[]},{"x":-5,"y":11,"cMask":[]},{"x":13,"y":30,"cMask":[]},{"x":22,"y":-30,"cMask":[]},{"x":15,"y":30,"cMask":[]},{"x":24,"y":-30,"cMask":[]},{"x":17,"y":30,"cMask":[]},{"x":26,"y":-30,"cMask":[]},{"x":19,"y":30,"cMask":[]},{"x":28,"y":-30,"cMask":[]},{"x":19,"y":-29,"cMask":[]},{"x":49,"y":-29,"cMask":[]},{"x":19,"y":-27,"cMask":[]},{"x":49,"y":-27,"cMask":[]},{"x":19,"y":-25,"cMask":[]},{"x":49,"y":-25,"cMask":[]},{"x":19,"y":-23,"cMask":[]},{"x":49,"y":-23,"cMask":[]},{"x":19,"y":-21,"cMask":[]},{"x":49,"y":-21,"cMask":[]},{"x":23,"y":-6,"cMask":[]},{"x":42,"y":-6,"cMask":[]},{"x":23,"y":-4,"cMask":[]},{"x":42,"y":-4,"cMask":[]},{"x":23,"y":-2,"cMask":[]},{"x":42,"y":-2,"cMask":[]},{"x":23,"y":0,"cMask":[]},{"x":42,"y":0,"cMask":[]},{"x":23,"y":2,"cMask":[]},{"x":42,"y":2,"cMask":[]},{"x":-52,"y":27,"cMask":[]},{"x":-27,"y":-33,"cMask":[]},{"x":9,"y":27,"cMask":[]},{"x":18,"y":-33,"cMask":[]},{"x":-44.5,"y":27,"cMask":[]},{"x":-19.5,"y":-33,"cMask":[]},{"x":-54,"y":27,"cMask":[]},{"x":-29,"y":-33,"cMask":[]},{"x":-42.5,"y":27,"cMask":[]},{"x":-17.5,"y":-33,"cMask":[]},{"x":-35,"y":27,"cMask":[]},{"x":-10,"y":-33,"cMask":[]},{"x":-33,"y":27,"cMask":[]},{"x":-8,"y":-33,"cMask":[]},{"x":-31,"y":27,"cMask":[]},{"x":-6,"y":-33,"cMask":[]},{"x":-29,"y":27,"cMask":[]},{"x":-4,"y":-33,"cMask":[]},{"x":-27,"y":27,"cMask":[]},{"x":-2,"y":-33,"cMask":[]},{"x":3,"y":27,"cMask":[]},{"x":-2,"y":-33,"cMask":[]},{"x":1,"y":27,"cMask":[]},{"x":-4,"y":-33,"cMask":[]},{"x":-1,"y":27,"cMask":[]},{"x":-6,"y":-33,"cMask":[]},{"x":-3,"y":27,"cMask":[]},{"x":-8,"y":-33,"cMask":[]},{"x":-5,"y":27,"cMask":[]},{"x":-10,"y":-33,"cMask":[]},{"x":-23,"y":16,"cMask":[]},{"x":-7,"y":16,"cMask":[]},{"x":-23,"y":14,"cMask":[]},{"x":-7,"y":14,"cMask":[]},{"x":-23,"y":12,"cMask":[]},{"x":-7,"y":12,"cMask":[]},{"x":-23,"y":10,"cMask":[]},{"x":-7,"y":10,"cMask":[]},{"x":-23,"y":8,"cMask":[]},{"x":-7,"y":8,"cMask":[]},{"x":11,"y":27,"cMask":[]},{"x":20,"y":-33,"cMask":[]},{"x":13,"y":27,"cMask":[]},{"x":22,"y":-33,"cMask":[]},{"x":15,"y":27,"cMask":[]},{"x":24,"y":-33,"cMask":[]},{"x":17,"y":27,"cMask":[]},{"x":26,"y":-33,"cMask":[]},{"x":17,"y":-32,"cMask":[]},{"x":47,"y":-32,"cMask":[]},{"x":17,"y":-30,"cMask":[]},{"x":47,"y":-30,"cMask":[]},{"x":17,"y":-28,"cMask":[]},{"x":47,"y":-28,"cMask":[]},{"x":17,"y":-26,"cMask":[]},{"x":47,"y":-26,"cMask":[]},{"x":17,"y":-24,"cMask":[]},{"x":47,"y":-24,"cMask":[]},{"x":21,"y":-9,"cMask":[]},{"x":40,"y":-9,"cMask":[]},{"x":21,"y":-7,"cMask":[]},{"x":40,"y":-7,"cMask":[]},{"x":21,"y":-5,"cMask":[]},{"x":40,"y":-5,"cMask":[]},{"x":21,"y":-3,"cMask":[]},{"x":40,"y":-3,"cMask":[]},{"x":21,"y":-1,"cMask":[]},{"x":40,"y":-1,"cMask":[]}],"segments":[{"v0":0,"v1":1,"bias":10,"bCoef":0.1,"cMask":["ball"],"color":"717F98"},{"v0":3,"v1":2,"bias":-10,"bCoef":0.1,"curve":35,"curveF":3.1715948023632126,"cMask":["ball"],"color":"717F98"},{"v0":4,"v1":5,"bias":10,"bCoef":0.1,"cMask":["ball"],"color":"717F98"},{"v0":6,"v1":7,"bias":10,"bCoef":0.1,"cMask":["ball"],"color":"717F98"},{"v0":9,"v1":8,"bias":-10,"bCoef":0.1,"curve":35,"curveF":3.1715948023632126,"cMask":["ball"],"color":"717F98"},{"v0":10,"v1":11,"bias":10,"bCoef":0.1,"cMask":["ball"],"color":"717F98"},{"v0":12,"v1":13,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":14,"v1":15,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":16,"v1":17,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":18,"v1":19,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":20,"v1":21,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":22,"v1":23,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":24,"v1":25,"cMask":[],"color":"3B424F"},{"v0":26,"v1":27,"cMask":[],"color":"3B424F"},{"v0":28,"v1":29,"cMask":[],"color":"161C26"},{"v0":30,"v1":31,"cMask":[],"color":"161C26"},{"v0":33,"v1":32,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":32,"v1":33,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":35,"v1":34,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":34,"v1":35,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":38,"v1":36,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":39,"v1":37,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":37,"v1":36,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["blueKO"]},{"v0":36,"v1":37,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["redKO"]},{"v0":40,"v1":41,"cMask":[],"color":"161C26"},{"v0":42,"v1":43,"cMask":[],"color":"161C26"},{"v0":43,"v1":41,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":41,"v1":43,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":45,"v1":44,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":44,"v1":45,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":47,"v1":46,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":46,"v1":47,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":48,"v1":49,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"161C26"},{"v0":50,"v1":51,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"161C26"},{"v0":52,"v1":53,"cMask":[],"color":"161C26"},{"v0":54,"v1":55,"cMask":[],"color":"161C26"},{"v0":56,"v1":57,"cMask":[],"color":"161C26"},{"v0":58,"v1":59,"cMask":[],"color":"161C26"},{"v0":60,"v1":61,"cMask":[],"color":"161C26"},{"v0":62,"v1":63,"cMask":[],"color":"161C26"},{"v0":64,"v1":65,"cMask":[],"color":"9101D"},{"v0":66,"v1":67,"cMask":[],"color":"9101D"},{"v0":68,"v1":69,"cMask":[],"color":"9101D"},{"v0":70,"v1":71,"cMask":[],"color":"9101D"},{"v0":72,"v1":73,"cMask":[],"color":"9101D"},{"v0":74,"v1":75,"cMask":[],"color":"9101D"},{"v0":76,"v1":77,"cMask":[],"color":"9101D"},{"v0":78,"v1":79,"cMask":[],"color":"9101D"},{"v0":80,"v1":81,"cMask":[],"color":"9101D"},{"v0":82,"v1":83,"cMask":[],"color":"9101D"},{"v0":84,"v1":85,"cMask":[],"color":"9101D"},{"v0":86,"v1":87,"cMask":[],"color":"9101D"},{"v0":88,"v1":89,"cMask":[],"color":"9101D"},{"v0":90,"v1":91,"cMask":[],"color":"9101D"},{"v0":92,"v1":93,"cMask":[],"color":"9101D"},{"v0":94,"v1":95,"cMask":[],"color":"9101D"},{"v0":96,"v1":97,"cMask":[],"color":"9101D"},{"v0":98,"v1":99,"cMask":[],"color":"9101D"},{"v0":100,"v1":101,"cMask":[],"color":"9101D"},{"v0":102,"v1":103,"cMask":[],"color":"9101D"},{"v0":104,"v1":105,"cMask":[],"color":"9101D"},{"v0":106,"v1":107,"cMask":[],"color":"9101D"},{"v0":108,"v1":109,"cMask":[],"color":"9101D"},{"v0":110,"v1":111,"cMask":[],"color":"9101D"},{"v0":112,"v1":113,"cMask":[],"color":"9101D"},{"v0":114,"v1":115,"cMask":[],"color":"9101D"},{"v0":116,"v1":117,"cMask":[],"color":"9101D"},{"v0":118,"v1":119,"cMask":[],"color":"9101D"},{"v0":120,"v1":121,"cMask":[],"color":"9101D"},{"v0":122,"v1":123,"cMask":[],"color":"9101D"},{"v0":124,"v1":125,"cMask":[],"color":"9101D"},{"v0":126,"v1":127,"cMask":[],"color":"9101D"},{"v0":128,"v1":129,"cMask":[],"color":"9101D"},{"v0":130,"v1":131,"cMask":[],"color":"9101D"},{"v0":132,"v1":133,"cMask":[],"color":"333945"},{"v0":134,"v1":135,"cMask":[],"color":"333945"},{"v0":136,"v1":137,"cMask":[],"color":"333945"},{"v0":138,"v1":139,"cMask":[],"color":"333945"},{"v0":140,"v1":141,"cMask":[],"color":"333945"},{"v0":142,"v1":143,"cMask":[],"color":"333945"},{"v0":144,"v1":145,"cMask":[],"color":"333945"},{"v0":146,"v1":147,"cMask":[],"color":"333945"},{"v0":148,"v1":149,"cMask":[],"color":"333945"},{"v0":150,"v1":151,"cMask":[],"color":"333945"},{"v0":152,"v1":153,"cMask":[],"color":"333945"},{"v0":154,"v1":155,"cMask":[],"color":"333945"},{"v0":156,"v1":157,"cMask":[],"color":"333945"},{"v0":158,"v1":159,"cMask":[],"color":"333945"},{"v0":160,"v1":161,"cMask":[],"color":"333945"},{"v0":162,"v1":163,"cMask":[],"color":"333945"},{"v0":164,"v1":165,"cMask":[],"color":"333945"},{"v0":166,"v1":167,"cMask":[],"color":"333945"},{"v0":168,"v1":169,"cMask":[],"color":"333945"},{"v0":170,"v1":171,"cMask":[],"color":"333945"},{"v0":172,"v1":173,"cMask":[],"color":"333945"},{"v0":174,"v1":175,"cMask":[],"color":"333945"},{"v0":176,"v1":177,"cMask":[],"color":"333945"},{"v0":178,"v1":179,"cMask":[],"color":"333945"},{"v0":180,"v1":181,"cMask":[],"color":"333945"},{"v0":182,"v1":183,"cMask":[],"color":"333945"},{"v0":184,"v1":185,"cMask":[],"color":"333945"},{"v0":186,"v1":187,"cMask":[],"color":"333945"},{"v0":188,"v1":189,"cMask":[],"color":"333945"},{"v0":190,"v1":191,"cMask":[],"color":"333945"},{"v0":192,"v1":193,"cMask":[],"color":"333945"},{"v0":194,"v1":195,"cMask":[],"color":"333945"},{"v0":196,"v1":197,"cMask":[],"color":"333945"},{"v0":198,"v1":199,"cMask":[],"color":"333945"}],"planes":[{"normal":[0,1],"dist":-350},{"normal":[0,-1],"dist":-350},{"normal":[1,0],"dist":-810},{"normal":[-1,0],"dist":-810},{"normal":[-1,0],"dist":-360,"bCoef":0,"cMask":["c1"]},{"normal":[1,0],"dist":-360,"bCoef":0,"cMask":["c0"]}],"goals":[{"p0":[-708.3,-85],"p1":[-708.3,85],"team":"red"},{"p0":[708.3,85],"p1":[708.3,-85],"team":"blue"}],"discs":[{"radius":5.8,"bCoef":0.412,"invMass":1.5,"color":"FFA500","cGroup":["ball","kick","score"]},{"pos":[-700,85],"radius":5.4,"invMass":0,"color":"3B424F"},{"pos":[-700,-85],"radius":5.4,"invMass":0,"color":"3B424F"},{"pos":[700,85],"radius":5.4,"invMass":0,"color":"3B424F"},{"pos":[700,-85],"radius":5.4,"invMass":0,"color":"3B424F"}],"playerPhysics":{"bCoef":0,"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":4.545},"ballPhysics":"disc0","spawnDistance":366.5}`;
/* OPÇÕES */

var afkLimit = 12; // limite de afk (12 segundos)
var drawTimeLimit = 1; // minutos
var maxTeamSize = 4; // máximo de jogadores num time, isso funciona para 1 (você pode querer adaptar as coisas para remover algumas estatísticas inúteis em 1v1, como assist ou cs), 2, 3 ou 4
var slowMode = 0;

/* JOGADORES */

const Team = {
  SPECTATORS: 0,
  RED: 1,
  BLUE: 2,
};
var extendedP = [];
const eP = {
  ID: 0,
  AUTH: 1,
  CONN: 2,
  AFK: 3,
  ACT: 4,
  GK: 5,
  MUTE: 6,
};
const Ss = {
  GA: 0,
  WI: 1,
  DR: 2,
  LS: 3,
  WR: 4,
  GL: 5,
  AS: 6,
  GK: 7,
  CS: 8,
  CP: 9,
  RL: 10,
  NK: 11,
};
var players;
var TeamR;
var TeamB;
var teamS;
var messageHistory = [0, 0, 0, 0, 0, 0];
var messageCounter = 0;

/* GAME */

let forbid = [
  "macaco",
  "desc",
  "descendido",
  "cuzao",
  "meme",
  "autista",
  "cu",
  "hitler",
  "Macaco",
  "Hitler",
  "Pênis",
];

let link = [
  "https://www.haxball.com/play?c=_",
  "https://www.haxball.com",
  "haxball.com",
  ".com",
  "https://",
  "https:",
  "https://www.",
];
let regex = [
  "fdp",
  "cu",
  "carai",
  "cuzao",
  "porra",
  "arrombado",
  "cu preto",
  "lixo",
  "autista",
  "lixeira",
  "verme",
  "Horrível",
  "seu merda",
  "filho da puta",
  "vsfd",
  "caralho",
  "seu gordo",
  "cuzão",
  "vadia",
  "sua mãe",
  "seu fdp",
  "cala a boca",
  "puta",
  "fudido",
  "krl",
  "f d p",
  "vtnc",
  "vai tomar no cu",
  "crl",
  "cadeirante",
  "caderante",
  "nigga",
  "prr",
  "CARALHO",
  "PORRA",
  "CARAI",
  "CUZAO",
  "CUZÃO",
  "FDP",
  "FILHO DA PUTA",
  "Cu",
  "CU",
  "CÚ",
  "PORR",
  "porr",
  "PRRA",
  "fodido",
  "FODIDO",
  "CRALHO",
  "CARLHO",
  "poha",
  "prr",
  "PRR",
  "POHA",
  "bct",
  "BCT",
];
let xingo = [
  "seu preto",
  "seu macaco",
  "macaco",
  "seu negro",
  "pretinho",
  "resto de aborto",
  "seu mcc",
  "Negrinho",
  "carvão",
  "nazista",
  "Nazista",
];

function nameForbid(player) {
  if (forbid.includes(player.name)) {
    room.kickPlayer(player.id, "nick proibido nessa sala", false);
  }
}

var lastTeamTouched; // records who was the last to touch the ball
var lastPlayersTouched; // allows you to receive good goal notifications (must be lastPlayersKicked, waiting for a next update to get better control of shots on target)
var countAFK = false; // created to get better control of the activity, kicks if it's AFK
var activePlay = false; // created to gain better control of ball possession
var goldenGoal = false;
var SMSet = new Set(); // set created to get slow mode which is useful in ChooseMode
var banList = []; // keep track of bans, so we can unban people if we want

/* STATS */

var game;
var GKList = ["", ""];
var Rposs = 0;
var Bposs = 0;
var point = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 0,
    y: 0,
  },
]; // created to obtain ball speed
var ballSpeed;
var lastWinner = Team.SPECTATORS;
var streak = 0;
var allBlues = []; // this is to count the players who should be counted for statistics. This includes players who left after the game started.
var allReds = [];

/* BALANCE AND RECRUITMENT */

var inChooseMode = false; // this variable allows you to distinguish the 2 phases of the game and choose which ones should be treated very differently
var redCaptainChoice = "";
var blueCaptainChoice = "";
var chooseTime = 20;
var timeOutCap;

/* ASSISTANT */

var checkTimeVariable = false; // this is created so that chat doesn't get spammed when a game ends via timeLimit
var announced = false;
var statNumber = 0; // this allows the room to receive statistical information every X minutes
var endGameVariable = false; // this variable with the one below helps distinguish cases where games are stopped because they are over from those where games are stopped due to player movements or team resets
var resettingTeams = false;
var capLeft = false;
var statInterval = 6;

loadMap(practiceMap, scoreLimitPractice, timeLimitPractice);

/* OBJECTS */

function GetPlayer(id) {
  for (var i = 0; i < ListaDeJugadores.length; i++) {
    if (ListaDeJugadores[i].id == id) {
      return ListaDeJugadores[i];
    }
  }
}

function Goal(time, team, striker, assist) {
  this.time = time;
  this.team = team;
  this.striker = striker;
  this.assist = assist;
}

function Game(date, scores, goals) {
  this.date = date;
  this.scores = scores;
  this.goals = goals;
}

// function setRegister(player, senha) {
//    if (registro.get(player.name)) room.sendAnnouncement('Você já está registrado.', player.id);
//    else {
//        registro.set(player.name, senha);
//        localStorage.setItem("registros", JSON.stringify([...registro]));
//        room.sendAnnouncement('Registrado!', player.id, 0x2FE436);
//        room.sendAnnouncement(`Senha: ${senha}`, player.id, 0x2FE436);
//    }
//}

//function getLogin(player, senha) {
//    if (registro.get(player.name)) {
//        if (registro.get(player.name) == senha) {
//            room.sendAnnouncement(`${player.name} logou!`, null, 0x2FE436);
//        } else room.sendAnnouncement('Senha incorreta.', player.id, 0xFF0000);
//    } else room.sendAnnouncement('Você não está registrado.', player.id, 0xFF0000);
//}

/* FUNCTIONS */

function centerText(string) {
  var space = parseInt((80 - string.length) * 0.8, 10);
  if (space <= 0) {
    return "";
  }
  return " ".repeat(space) + string + " ".repeat(space);
}

/* CHASING */
function golcontra(goaler) {
  var messages = [
    "Deberia darte pena volve a entrar luego de eso, " + goaler.name + "?",
    "Retirate ya " + goaler.name,
    "Felicidades " + goaler.name + " cada vez mas cerca del ban",
  ];
  var randomIndex = Math.floor(Math.random() * messages.length);
  var announcement = messages[randomIndex];
  setTimeout(function () {
    room.sendAnnouncement(centerText(announcement), null, Cor.White, "bold");
  }, 3000);
}

/* AUXILIARY FUNCTIONS */

function getRandomInt(max) {
  // returns a random number from 0 to max-1
  return Math.floor(Math.random() * Math.floor(max));
}

function getTime(scores) {
  // returns the current game time
  return (
    "[" +
    Math.floor(Math.floor(scores.time / 60) / 10).toString() +
    Math.floor(Math.floor(scores.time / 60) % 10).toString() +
    ":" +
    Math.floor(
      Math.floor(scores.time - Math.floor(scores.time / 60) * 60) / 10
    ).toString() +
    Math.floor(
      Math.floor(scores.time - Math.floor(scores.time / 60) * 60) % 10
    ).toString() +
    "]"
  );
}

function pointDistance(p1, p2) {
  var d1 = p1.x - p2.x;
  var d2 = p1.y - p2.y;
  return Math.sqrt(d1 * d1 + d2 * d2);
}

/* BUTTONS */

function download(conteudo, nomeDoArquivo, tipoDeArquivo) {
  let blob = new Blob([conteudo], {
    type: tipoDeArquivo,
  });
  const link = window.document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = nomeDoArquivo;
  link.click();
  window.URL.revokeObjectURL(link.href);
}

function topBtn() {
  if (teamS.length == 0) {
    return;
  } else {
    if (TeamR.length == TeamB.length) {
      if (teamS.length > 1) {
        room.setPlayerTeam(teamS[0].id, Team.RED);
        room.setPlayerTeam(teamS[1].id, Team.BLUE);
      }
      return;
    } else if (TeamR.length < TeamB.length) {
      room.setPlayerTeam(teamS[0].id, Team.RED);
    } else {
      room.setPlayerTeam(teamS[0].id, Team.BLUE);
    }
  }
}

function randomBtn() {
  if (teamS.length == 0) {
    return;
  } else {
    if (TeamR.length == TeamB.length) {
      if (teamS.length > 1) {
        var r = getRandomInt(teamS.length);
        room.setPlayerTeam(teamS[r].id, Team.RED);
        teamS = teamS.filter((spec) => spec.id != teamS[r].id);
        room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
      }
      return;
    } else if (TeamR.length < TeamB.length) {
      room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.RED);
    } else {
      room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
    }
  }
}

function blueToSpecBtn() {
  resettingTeams = true;
  setTimeout(() => {
    resettingTeams = false;
  }, 100);
  for (var i = 0; i < TeamB.length; i++) {
    room.setPlayerTeam(TeamB[TeamB.length - 1 - i].id, Team.SPECTATORS);
  }
}

function redToSpecBtn() {
  resettingTeams = true;
  setTimeout(() => {
    resettingTeams = false;
  }, 100);
  for (var i = 0; i < TeamR.length; i++) {
    room.setPlayerTeam(TeamR[TeamR.length - 1 - i].id, Team.SPECTATORS);
  }
}

function resetBtn() {
  resettingTeams = true;
  setTimeout(() => {
    resettingTeams = false;
  }, 100);
  if (TeamR.length <= TeamB.length) {
    for (var i = 0; i < TeamR.length; i++) {
      room.setPlayerTeam(TeamB[TeamB.length - 1 - i].id, Team.SPECTATORS);
      room.setPlayerTeam(TeamR[TeamR.length - 1 - i].id, Team.SPECTATORS);
    }
    for (var i = TeamR.length; i < TeamB.length; i++) {
      room.setPlayerTeam(TeamB[TeamB.length - 1 - i].id, Team.SPECTATORS);
    }
  } else {
    for (var i = 0; i < TeamB.length; i++) {
      room.setPlayerTeam(TeamB[TeamB.length - 1 - i].id, Team.SPECTATORS);
      room.setPlayerTeam(TeamR[TeamR.length - 1 - i].id, Team.SPECTATORS);
    }
    for (var i = TeamB.length; i < TeamR.length; i++) {
      room.setPlayerTeam(TeamR[TeamR.length - 1 - i].id, Team.SPECTATORS);
    }
  }
}

function blueToRedBtn() {
  resettingTeams = true;
  setTimeout(() => {
    resettingTeams = false;
  }, 100);
  for (var i = 0; i < TeamB.length; i++) {
    room.setPlayerTeam(TeamB[i].id, Team.RED);
  }
}

/* GAME FUNCTIONS */

function checkTime() {
  const scores = room.getScores();
  game.scores = scores;
  if (
    Math.abs(scores.time - scores.timeLimit) <= 0.01 &&
    scores.timeLimit != 0
  ) {
    if (scores.red != scores.blue) {
      if (checkTimeVariable == false) {
        checkTimeVariable = true;
        setTimeout(() => {
          checkTimeVariable = false;
        }, 3000);
        scores.red > scores.blue ? endGame(Team.RED) : endGame(Team.BLUE);
        setTimeout(() => {
          room.stopGame();
        }, 2000);
      }
      return;
    }
    goldenGoal = true;
    // room.sendAnnouncement("⚽ Gol de Gold!", null, 0xF1AF09);
    room.sendAnnouncement(
      centerText("EXTRA TIEMPO"),
      null,
      Cor.Amarelo,
      "bold"
    );
    room.sendAnnouncement(
      centerText("Se dará " + drawTimeLimit * 400 + " segundos!"),
      null,
      Cor.White,
      "normal"
    );
    room.sendAnnouncement(
      centerText("⚽ GOL gana como en el barrio mijos! ⚽"),
      null,
      Cor.White,
      "normal"
    );
  }
  if (
    scores.time > scores.timeLimit + drawTimeLimit * 400 - 15 &&
    scores.time <= scores.timeLimit + drawTimeLimit * 400
  ) {
    if (checkTimeVariable == false && announced == false) {
      checkTimeVariable = true;
      announced = true;
      setTimeout(() => {
        checkTimeVariable = false;
      }, 10);
      room.sendAnnouncement(
        centerText("⌛ 15 segundos para el empate!"),
        null,
        Cor.Amarelo,
        "bold"
      );
    }
  }
  if (scores.time > scores.timeLimit + drawTimeLimit * 400) {
    if (checkTimeVariable == false) {
      checkTimeVariable = true;
      setTimeout(() => {
        checkTimeVariable = false;
      }, 10);
      endGame(Team.SPECTATORS);
      room.stopGame();
      goldenGoal = false;
    }
  }
}

function endGame(winner) {
  // lida com o final de um jogo: nenhuma função stopGame dentro
  players.length >= 2 * maxTeamSize - 1 ? activateChooseMode() : null;
  const scores = room.getScores();
  game.scores = scores;
  Rposs = Rposs / (Rposs + Bposs);
  Bposs = 1 - Rposs;
  lastWinner = winner;
  endGameVariable = true;
  if (winner == Team.RED) {
    streak++;
    room.sendAnnouncement(
      centerText("🏆 Red team won! | Win Streak(s):") + streak + " 🏆",
      null,
      0xfdc43a
    );
  } else if (winner == Team.BLUE) {
    streak = 1;
    room.sendAnnouncement(
      centerText("🏆 Blue team won! | Win streak(s):") + streak + " 🏆",
      null,
      0xfdc43a
    );
  } else {
    streak = 0;
    room.sendAnnouncement("💤 Limit reached");
  }
  //room.sendAnnouncement("📊 Posse de Bola: 🔴 " + (Rposs*100).toPrecision(3).toString() + "% | " + (Bposs*100).toPrecision(3).toString() + "% 🔵", null, 0xFDC43A);
  room.sendAnnouncement(
    centerText("🏆 END OF MATCH 🏆"),
    null,
    Cor.White,
    "bold"
  );
  room.sendAnnouncement(
    centerText(" " + scores.red + " - " + scores.blue),
    null,
    Cor.White,
    "normal"
  );
  room.sendAnnouncement(
    centerText(
      (Rposs * 100).toPrecision(3).toString() +
        "% | Ball possession | " +
        (Bposs * 100).toPrecision(3).toString() +
        "% "
    ),
    null,
    Cor.White,
    "normal"
  );
  scores.red == 0
    ? scores.blue == 0
      ? room.sendAnnouncement(
          "🥅 " +
            GKList[0].name +
            " Es el GK que el Santos necesita! " +
            GKList[1].name +
            " no dejo entrar ni un gol ",
          null,
          0xfdc43a
        )
      : room.sendAnnouncement(
          "🥅 Es el GK que el Santos necesita! " +
            GKList[1].name +
            " no dejo entrar ni un gol ",
          null,
          0xfdc43a
        )
    : scores.blue == 0
    ? room.sendAnnouncement(
        "🥅 Es el GK que el Santos necesita! " +
          GKList[0].name +
          " no dejo entrar ni un gol ",
        null,
        0xfdc43a
      )
    : null;
  updateStats();
  //sendDiscordWebhook(scores);
  //room.sendAnnouncement("A partida foi gravada e enviada em nosso discord. ID: " + `${getDate()}`, null, Cor.Amrelo, Negrito);
}

function quickRestart() {
  room.stopGame();
  setTimeout(() => {
    room.startGame();
  }, 2000);
}

function resumeGame() {
  setTimeout(() => {
    room.startGame();
  }, 2000);
  setTimeout(() => {
    room.pauseGame(false);
  }, 1000);
}

function activateChooseMode() {
  inChooseMode = true;
  slowMode = 2;
  room.sendAnnouncement(
    "Modo de reclutamiento activado!",
    null,
    0x55bae2,
    "normal"
  );
}

function deactivateChooseMode() {
  inChooseMode = false;
  clearTimeout(timeOutCap);
  if (slowMode != 0) {
    slowMode = 0;
    room.sendAnnouncement(
      "Modo de reclutamiento cerrado.",
      null,
      0xf2a000,
      "normal"
    );
  }
  redCaptainChoice = "";
  blueCaptainChoice = "";
}

function loadMap(map, scoreLim, timeLim) {
  room.setTeamColors(
    Team.RED,
    60,
    0xd4b000, // Color del texto (amarillo en tu ejemplo)
    [0x000305, 0x292929, 0x000000] // Colores del equipo (rojo oscuro, gris oscuro, negro)
  );

  room.setTeamColors(
    Team.BLUE,
    60, // Puedes ajustar el ángulo según tus preferencias
    0xffffff, // Color del texto (blanco en tu ejemplo)
    [0x0800fa, 0x1947ff, 0x3d64ff] // Colores del equipo (azul claro, azul medio, azul oscuro)
  );

  if (map != "") {
    room.setCustomStadium(map);
  } else {
    console.log("There was an error loading the stadium");
    room.setDefaultStadium("Classic");
  }
  room.setScoreLimit(scoreLim);
  room.setTimeLimit(timeLim);
}

/* PLAYER FUNCTIONS */

function updateTeams() {
  // updates the list of players and the list of all teams
  players = room
    .getPlayerList()
    .filter((player) => player.id != 0 && !getAFK(player));
  TeamR = players.filter((p) => p.team === Team.RED);
  TeamB = players.filter((p) => p.team === Team.BLUE);
  teamS = players.filter((p) => p.team === Team.SPECTATORS);
}

function handleInactivity() {
  // handles inactivity: players will be kicked after afkLimit
  if (countAFK && TeamR.length + TeamB.length > 1) {
    for (var i = 0; i < TeamR.length; i++) {
      setActivity(TeamR[i], getActivity(TeamR[i]) + 1);
    }
    for (var i = 0; i < TeamB.length; i++) {
      setActivity(TeamB[i], getActivity(TeamB[i]) + 1);
    }
  }
  for (var i = 0; i < extendedP.length; i++) {
    if (extendedP[i][eP.ACT] == 60 * ((2 / 3) * afkLimit)) {
      room.sendAnnouncement(
        "@" +
          room.getPlayer(extendedP[i][eP.ID]).name +
          ", si no te mueves en los proximos " +
          Math.floor(afkLimit / 3) +
          " segundos, seras expulsado de la sala!",
        extendedP[i][eP.ID],
        0xf4a404,
        "bold",
        2
      );
    }
    if (extendedP[i][eP.ACT] >= 60 * afkLimit) {
      extendedP[i][eP.ACT] = 0;
      if (room.getScores().time <= afkLimit - 0.5) {
        setTimeout(() => {
          !inChooseMode ? quickRestart() : room.stopGame();
        }, 10);
      }
      room.kickPlayer(extendedP[i][eP.ID], "AFK", false);
    }
  }
}

function getAuth(player) {
  return extendedP.filter((a) => a[0] == player.id) != null
    ? extendedP.filter((a) => a[0] == player.id)[0][eP.AUTH]
    : null;
}

function getAFK(player) {
  return extendedP.filter((a) => a[0] == player.id) != null
    ? extendedP.filter((a) => a[0] == player.id)[0][eP.AFK]
    : null;
}

function setAFK(player, value) {
  extendedP
    .filter((a) => a[0] == player.id)
    .forEach((player) => (player[eP.AFK] = value));
}

function getActivity(player) {
  return extendedP.filter((a) => a[0] == player.id) != null
    ? extendedP.filter((a) => a[0] == player.id)[0][eP.ACT]
    : null;
}

function setActivity(player, value) {
  extendedP
    .filter((a) => a[0] == player.id)
    .forEach((player) => (player[eP.ACT] = value));
}

function getGK(player) {
  return extendedP.filter((a) => a[0] == player.id) != null
    ? extendedP.filter((a) => a[0] == player.id)[0][eP.GK]
    : null;
}

function setGK(player, value) {
  extendedP
    .filter((a) => a[0] == player.id)
    .forEach((player) => (player[eP.GK] = value));
}

function getMute(player) {
  return extendedP.filter((a) => a[0] == player.id) != null
    ? extendedP.filter((a) => a[0] == player.id)[0][eP.MUTE]
    : null;
}

function setMute(player, value) {
  extendedP
    .filter((a) => a[0] == player.id)
    .forEach((player) => (player[eP.MUTE] = value));
}

/* BALANCE AND RECRUITMENT FUNCTIONS */

function updateRoleOnPlayerIn() {
  updateTeams();
  if (inChooseMode) {
    if (players.length == 6) {
      loadMap(practiceMap, scoreLimitPractice, timeLimitp);
    }
    getSpecList(TeamR.length <= TeamB.length ? TeamR[0] : TeamB[0]);
  }
  balanceTeams();
}

function updateRoleOnPlayerOut() {
  updateTeams();
  if (room.getScores() != null) {
    var scores = room.getScores();
    if (
      players.length >= 2 * maxTeamSize &&
      scores.time >= (5 / 6) * game.scores.timeLimit &&
      TeamR.length != TeamB.length
    ) {
      if (TeamR.length < TeamB.length) {
        if (scores.blue - scores.red == 2) {
          endGame(Team.BLUE);
          // room.sendChat("🤖 Ragequit 🤖");
          room.sendAnnouncement(
            "[Juez] Ragequit detectado, se acabó el partido!",
            null,
            0xbfff00,
            "normal"
          );
          setTimeout(() => {
            room.stopGame();
          }, 100);
          return;
        }
      } else {
        if (scores.red - scores.blue == 2) {
          endGame(Team.RED);
          // room.sendChat("🤖 Ragequit 🤖");
          room.sendAnnouncement(
            "[Juez] Ragequit detectado, se acabó el partido!",
            null,
            0xbfff00,
            "normal"
          );
          setTimeout(() => {
            room.stopGame();
          }, 100);
          return;
        }
      }
    }
  }
  if (inChooseMode) {
    if (players.length < 6) {
      loadMap(practiceMap, scoreLimitPractice, timeLimitPractice);
    }
    if (TeamR.length == 0 || TeamB.length == 0) {
      TeamR.length == 0
        ? room.setPlayerTeam(teamS[0].id, Team.RED)
        : room.setPlayerTeam(teamS[0].id, Team.BLUE);
      return;
    }
    if (Math.abs(TeamR.length - TeamB.length) == teamS.length) {
      // room.sendChat("Sem alternativas, deixe me lidar com essa situação. ...");
      room.sendAnnouncement(
        "[Juiz] Dejade decidir...",
        null,
        0xc0bdb1,
        "normal"
      );
      deactivateChooseMode();
      resumeGame();
      var b = teamS.length;
      if (TeamR.length > TeamB.length) {
        for (var i = 0; i < b; i++) {
          setTimeout(() => {
            room.setPlayerTeam(teamS[0].id, Team.BLUE);
          }, 5 * i);
        }
      } else {
        for (var i = 0; i < b; i++) {
          setTimeout(() => {
            room.setPlayerTeam(teamS[0].id, Team.RED);
          }, 5 * i);
        }
      }
      return;
    }
    if (streak == 0 && room.getScores() == null) {
      if (Math.abs(TeamR.length - TeamB.length) == 2) {
        // if someone leaves an already formed team, thus leaving 2 players, put the last one chosen back to the spectators so that it is fair
        // room.sendChat("🤖 Equilibrando equipes... 🤖");
        room.sendAnnouncement(
          " 🤖 Balanceando equipos... 🤖 ",
          null,
          0xc0bdb1,
          "normal"
        );
        TeamR.length > TeamB.length
          ? room.setPlayerTeam(TeamR[TeamR.length - 1].id, Team.SPECTATORS)
          : room.setPlayerTeam(TeamB[TeamB.length - 1].id, Team.SPECTATORS);
      }
    }
    if (TeamR.length == TeamB.length && teamS.length < 2) {
      deactivateChooseMode();
      resumeGame();
      return;
    }
    capLeft
      ? choosePlayer()
      : getSpecList(TeamR.length <= TeamB.length ? TeamR[0] : TeamB[0]);
  }
  balanceTeams();
}

function balanceTeams() {
  if (!inChooseMode) {
    if (players.length == 1 && TeamR.length == 0) {
      // 1 player
      quickRestart();
      loadMap(practiceMap, scoreLimitPractice, timeLimitPractice);
      room.setPlayerTeam(players[0].id, Team.RED);
    } else if (
      Math.abs(TeamR.length - TeamB.length) == teamS.length &&
      teamS.length > 0
    ) {
      // specific players provide necessary players
      const n = Math.abs(TeamR.length - TeamB.length);
      if (TeamR.length > TeamB.length) {
        for (var i = 0; i < n; i++) {
          room.setPlayerTeam(teamS[i].id, Team.BLUE);
        }
      } else {
        for (var i = 0; i < n; i++) {
          room.setPlayerTeam(teamS[i].id, Team.RED);
        }
      }
    } else if (Math.abs(TeamR.length - TeamB.length) > teamS.length) {
      // there are not enough players
      const n = Math.abs(TeamR.length - TeamB.length);
      if (players.length == 1) {
        quickRestart();
        loadMap(practiceMap, scoreLimitPractice, timeLimitPractice);
        room.setPlayerTeam(players[0].id, Team.RED);
        return;
      } else if (players.length == 6) {
        quickRestart();
        loadMap(practiceMap, scoreLimitPractice, timeLimitp);
      }
      if (players.length == maxTeamSize * 2 - 1) {
        allReds = [];
        allBlues = [];
      }
      if (TeamR.length > TeamB.length) {
        for (var i = 0; i < n; i++) {
          room.setPlayerTeam(TeamR[TeamR.length - 1 - i].id, Team.SPECTATORS);
        }
      } else {
        for (var i = 0; i < n; i++) {
          room.setPlayerTeam(TeamB[TeamB.length - 1 - i].id, Team.SPECTATORS);
        }
      }
    } else if (
      Math.abs(TeamR.length - TeamB.length) < teamS.length &&
      TeamR.length != TeamB.length
    ) {
      // recruitment mode
      room.pauseGame(true);
      activateChooseMode();
      choosePlayer();
    } else if (
      teamS.length >= 2 &&
      TeamR.length == TeamB.length &&
      TeamR.length < maxTeamSize
    ) {
      // 2 in red, 2 in blue and 2 or more specifications
      if (TeamR.length == 2) {
        quickRestart();
        if (!teamS.length == 2) {
          loadMap(practiceMap, scoreLimitPractice, timeLimitp);
        }
      }
      topBtn();
    }
  }
}

function choosePlayer() {
  clearTimeout(timeOutCap);
  if (TeamR.length <= TeamB.length && TeamR.length != 0) {
    room.sendAnnouncement(
      "[Juez] Para elegir un jugador, ingrese su número de lista o use 'top', 'random' o 'bottom'.",
      TeamR[0].id,
      0x5db5db,
      "normal"
    );
    timeOutCap = setTimeout(
      function (player) {
        room.sendAnnouncement(
          "Sé rápido, @" +
            player.name +
            ", solo te quedan " +
            Number.parseInt(chooseTime / 2) +
            " segundos para que escogas!",
          player.id,
          0xf2a000,
          "normal"
        );
        timeOutCap = setTimeout(
          function (player) {
            room.kickPlayer(player.id, "Didn't choose in time", false);
          },
          chooseTime * 500,
          TeamR[0]
        );
      },
      chooseTime * 1000,
      TeamR[0]
    );
  } else if (TeamB.length < TeamR.length && TeamB.length != 0) {
    room.sendAnnouncement(
      "[Juez] Para elegir un jugador, ingrese su número de lista o use 'top', 'random' o 'bottom'.",
      TeamB[0].id,
      0x5db5db,
      "normal"
    );
    timeOutCap = setTimeout(
      function (player) {
        room.sendAnnouncement(
          "Sé rápido, @" +
            player.name +
            ", solo te quedan " +
            Number.parseInt(chooseTime / 2) +
            " segundos para escoger!",
          player.id,
          0xf2a000,
          "normal"
        );
        timeOutCap = setTimeout(
          function (player) {
            room.kickPlayer(player.id, "No escogió a tiempo 🐒", false);
          },
          chooseTime * 500,
          TeamB[0]
        );
      },
      chooseTime * 1000,
      TeamB[0]
    );
  }
  if (TeamR.length != 0 && TeamB.length != 0)
    getSpecList(TeamR.length <= TeamB.length ? TeamR[0] : TeamB[0]);
}

function getSpecList(player) {
  var cstm = "[Seleccion] Jugadores: ";
  for (var i = 0; i < teamS.length; i++) {
    if (140 - cstm.length < (teamS[i].name + "[" + (i + 1) + "], ").length) {
      room.sendChat(cstm, player.id);
      cstm = "... ";
    }
    cstm += teamS[i].name + "[" + (i + 1) + "], ";
  }
  cstm = cstm.substring(0, cstm.length - 2);
  cstm += ".";
  room.sendAnnouncement(cstm, player.id, 0xebeb09, "normal");
}

/* STATISTICS FUNCTIONS */

function getLastTouchOfTheBall() {
  const ballPosition = room.getBallPosition();
  updateTeams();
  for (var i = 0; i < players.length; i++) {
    if (players[i].position != null) {
      var distanceToBall = pointDistance(players[i].position, ballPosition);
      if (distanceToBall < triggerDistance) {
        !activePlay ? (activePlay = true) : null;
        if (
          lastTeamTouched == players[i].team &&
          lastPlayersTouched[0] != null &&
          lastPlayersTouched[0].id != players[i].id
        ) {
          lastPlayersTouched[1] = lastPlayersTouched[0];
          lastPlayersTouched[0] = players[i];
        }
        lastTeamTouched = players[i].team;
      }
    }
  }
}

function getStats() {
  // gives possession, ball speed and GK of each team
  if (activePlay) {
    updateTeams();
    lastTeamTouched == Team.RED ? Rposs++ : Bposs++;
    var ballPosition = room.getBallPosition();
    point[1] = point[0];
    point[0] = ballPosition;
    ballSpeed = (pointDistance(point[0], point[1]) * 60 * 60 * 60) / 15000;
    var k = [-1, Infinity];
    for (var i = 0; i < TeamR.length; i++) {
      if (TeamR[i].position.x < k[1]) {
        k[0] = TeamR[i];
        k[1] = TeamR[i].position.x;
      }
    }
    k[0] != -1 ? setGK(k[0], getGK(k[0]) + 1) : null;
    k = [-1, -Infinity];
    for (var i = 0; i < TeamB.length; i++) {
      if (TeamB[i].position.x > k[1]) {
        k[0] = TeamB[i];
        k[1] = TeamB[i].position.x;
      }
    }
    k[0] != -1 ? setGK(k[0], getGK(k[0]) + 1) : null;
    findGK();
  }
}

function updateStats() {
  if (
    players.length >= 2 * maxTeamSize &&
    (game.scores.time >= (5 / 6) * game.scores.timeLimit ||
      game.scores.red == game.scores.scoreLimit ||
      game.scores.blue == game.scores.scoreLimit) &&
    allReds.length >= maxTeamSize &&
    allBlues.length >= maxTeamSize
  ) {
    var stats;
    for (var i = 0; i < allReds.length; i++) {
      localStorage.getItem(getAuth(allReds[i]))
        ? (stats = JSON.parse(localStorage.getItem(getAuth(allReds[i]))))
        : (stats = [
            0,
            0,
            0,
            0,
            "0.00",
            0,
            0,
            0,
            0,
            "0.00",
            "player",
            allReds[i].name,
          ]);
      stats[Ss.GA]++;
      lastWinner == Team.RED
        ? stats[Ss.WI]++
        : lastWinner == Team.BLUE
        ? stats[Ss.LS]++
        : stats[Ss.DR]++;
      stats[Ss.WR] = ((100 * stats[Ss.WI]) / stats[Ss.GA]).toPrecision(3);
      localStorage.setItem(getAuth(allReds[i]), JSON.stringify(stats));
    }
    for (var i = 0; i < allBlues.length; i++) {
      localStorage.getItem(getAuth(allBlues[i]))
        ? (stats = JSON.parse(localStorage.getItem(getAuth(allBlues[i]))))
        : (stats = [
            0,
            0,
            0,
            0,
            "0.00",
            0,
            0,
            0,
            0,
            "0.00",
            "player",
            allBlues[i].name,
          ]);
      stats[Ss.GA]++;
      lastWinner == Team.BLUE
        ? stats[Ss.WI]++
        : lastWinner == Team.RED
        ? stats[Ss.LS]++
        : stats[Ss.DR]++;
      stats[Ss.WR] = ((100 * stats[Ss.WI]) / stats[Ss.GA]).toPrecision(3);
      localStorage.setItem(getAuth(allBlues[i]), JSON.stringify(stats));
    }
    for (var i = 0; i < game.goals.length; i++) {
      if (game.goals[i].striker != null) {
        if (
          allBlues
            .concat(allReds)
            .findIndex((player) => player.id == game.goals[i].striker.id) != -1
        ) {
          stats = JSON.parse(
            localStorage.getItem(getAuth(game.goals[i].striker))
          );
          stats[Ss.GL]++;
          localStorage.setItem(
            getAuth(game.goals[i].striker),
            JSON.stringify(stats)
          );
        }
      }
      if (game.goals[i].assist != null) {
        if (
          allBlues
            .concat(allReds)
            .findIndex((player) => player.name == game.goals[i].assist.name) !=
          -1
        ) {
          stats = JSON.parse(
            localStorage.getItem(getAuth(game.goals[i].assist))
          );
          stats[Ss.AS]++;
          localStorage.setItem(
            getAuth(game.goals[i].assist),
            JSON.stringify(stats)
          );
        }
      }
    }
    if (allReds.findIndex((player) => player.id == GKList[0].id) != -1) {
      stats = JSON.parse(localStorage.getItem(getAuth(GKList[0])));
      stats[Ss.GK]++;
      game.scores.blue == 0 ? stats[Ss.CS]++ : null;
      stats[Ss.CP] = ((100 * stats[Ss.CS]) / stats[Ss.GK]).toPrecision(3);
      localStorage.setItem(getAuth(GKList[0]), JSON.stringify(stats));
    }
    if (allBlues.findIndex((player) => player.id == GKList[1].id) != -1) {
      stats = JSON.parse(localStorage.getItem(getAuth(GKList[1])));
      stats[Ss.GK]++;
      game.scores.red == 0 ? stats[Ss.CS]++ : null;
      stats[Ss.CP] = ((100 * stats[Ss.CS]) / stats[Ss.GK]).toPrecision(3);
      localStorage.setItem(getAuth(GKList[1]), JSON.stringify(stats));
    }
  }
}

function findGK() {
  var tab = [
    [-1, ""],
    [-1, ""],
  ];
  for (var i = 0; i < extendedP.length; i++) {
    if (
      room.getPlayer(extendedP[i][eP.ID]) != null &&
      room.getPlayer(extendedP[i][eP.ID]).team == Team.RED
    ) {
      if (tab[0][0] < extendedP[i][eP.GK]) {
        tab[0][0] = extendedP[i][eP.GK];
        tab[0][1] = room.getPlayer(extendedP[i][eP.ID]);
      }
    } else if (
      room.getPlayer(extendedP[i][eP.ID]) != null &&
      room.getPlayer(extendedP[i][eP.ID]).team == Team.BLUE
    ) {
      if (tab[1][0] < extendedP[i][eP.GK]) {
        tab[1][0] = extendedP[i][eP.GK];
        tab[1][1] = room.getPlayer(extendedP[i][eP.ID]);
      }
    }
  }
  GKList = [tab[0][1], tab[1][1]];
}

setInterval(() => {
  var tableau = [];
  if (statNumber % 5 == 0) {
    Object.keys(localStorage).forEach(function (key) {
      if (
        ![
          "player_name",
          "view_mode",
          "geo",
          "avatar",
          "player_auth_key",
        ].includes(key)
      ) {
        tableau.push([
          JSON.parse(localStorage.getItem(key))[Ss.NK],
          JSON.parse(localStorage.getItem(key))[Ss.GA],
        ]);
      }
    });
    if (tableau.length < 5) {
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendChat(
      "Matches Played> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1]
    );
  }
  if (statNumber % 5 == 1) {
    Object.keys(localStorage).forEach(function (key) {
      if (
        ![
          "player_name",
          "view_mode",
          "geo",
          "avatar",
          "player_auth_key",
        ].includes(key)
      ) {
        tableau.push([
          JSON.parse(localStorage.getItem(key))[Ss.NK],
          JSON.parse(localStorage.getItem(key))[Ss.WI],
        ]);
      }
    });
    if (tableau.length < 5) {
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendChat(
      "Victories> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1]
    );
  }
  if (statNumber % 5 == 2) {
    Object.keys(localStorage).forEach(function (key) {
      if (
        ![
          "player_name",
          "view_mode",
          "geo",
          "avatar",
          "player_auth_key",
        ].includes(key)
      ) {
        tableau.push([
          JSON.parse(localStorage.getItem(key))[Ss.NK],
          JSON.parse(localStorage.getItem(key))[Ss.GL],
        ]);
      }
    });
    if (tableau.length < 5) {
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendChat(
      "Gols> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1]
    );
  }
  if (statNumber % 5 == 3) {
    Object.keys(localStorage).forEach(function (key) {
      if (
        ![
          "player_name",
          "view_mode",
          "geo",
          "avatar",
          "player_auth_key",
        ].includes(key)
      ) {
        tableau.push([
          JSON.parse(localStorage.getItem(key))[Ss.NK],
          JSON.parse(localStorage.getItem(key))[Ss.AS],
        ]);
      }
    });
    if (tableau.length < 5) {
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendChat(
      "Assistance> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1]
    );
  }
  if (statNumber % 5 == 4) {
    Object.keys(localStorage).forEach(function (key) {
      if (
        ![
          "player_name",
          "view_mode",
          "geo",
          "avatar",
          "player_auth_key",
        ].includes(key)
      ) {
        tableau.push([
          JSON.parse(localStorage.getItem(key))[Ss.NK],
          JSON.parse(localStorage.getItem(key))[Ss.CS],
        ]);
      }
    });
    if (tableau.length < 5) {
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendChat(
      "CS> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1]
    );
  }
  statNumber++;
}, statInterval * 60 * 1000);

/* EVENTS */

/* PLAYER MOVEMENT */

room.onPlayerJoin = function (player) {
  votekickCount[player.id] = []; //This is needed to hold the amount of the votes against a player.
  console.log("---------------------------------------------------");
  console.log("[📢] Nick: " + player.name);
  console.log("[📢] Conn: " + player.conn);
  console.log("[📢] Auth: " + player.auth);
  extendedP.push([player.id, player.auth, player.conn, false, 0, 0, false]);
  updateRoleOnPlayerIn();
  room.sendAnnouncement(
    "👋🏼 Hola de nuevo, " + player.name + "!",
    null,
    0x5ee7ff,
    "bold"
  );
  if (room.getPlayerList().length > 1 && room.getPlayerList().length < 5) {
    room.sendAnnouncement(
      "Cargando el estadio...",
      player.id,
      0xedc021,
      "bold"
    );
    setTimeout(() => {
      room.sendAnnouncement(
        " ---------------------------------------------------",
        player.id,
        0xedc021,
        "bold"
      );
      room.sendAnnouncement(
        "Bienvenido al host del Santos F.C\nSi quieres entrar al equipo habla con el técnico Romario, diviertete!",
        player.id,
        0xedc021,
        "bold"
      );
      room.sendAnnouncement(
        " ---------------------------------------------------",
        player.id,
        0xedc021,
        "bold"
      );
    }, 2_000);
  }
  if (localStorage.getItem(player.auth) != null) {
    var playerRole = JSON.parse(localStorage.getItem(player.auth))[Ss.RL];
    if (playerRole == "admin" || playerRole == "master") {
      room.setPlayerAdmin(player.id, true);
      room.sendAnnouncement(
        "「Admin」" + player.name + " Entro a la  sala!",
        null,
        0xff7900,
        "bold"
      );
    }
  }
  if (localStorage.getItem(getAuth(player)) == null) {
    stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player", player.name];
    localStorage.setItem(getAuth(player), JSON.stringify(stats));
  }
  //    setTimeout(() => {
  //        if (registro.get(player.name)) room.sendAnnouncement('Login: !login senha', player.id, 0x1B9124, "bold");
  //       else room.sendAnnouncement('Registrar: !register senha', player.id, 0x1B9124, "bold");
  //        room.sendAnnouncement('Login: !login senha', player.id, 0x1B9124, "bold");
  //    }, 2_000);
};

room.onPlayerTeamChange = function (changedPlayer, byPlayer) {
  if (changedPlayer.id == 0) {
    room.setPlayerTeam(0, Team.SPECTATORS);
    return;
  }
  if (getAFK(changedPlayer) && changedPlayer.team != Team.SPECTATORS) {
    room.setPlayerTeam(changedPlayer.id, Team.SPECTATORS);
    room.sendChat(changedPlayer.name + " Está AFK!");
    return;
  }
  updateTeams();
  if (room.getScores() != null) {
    var scores = room.getScores();
    if (
      changedPlayer.team != Team.SPECTATORS &&
      scores.time <= (3 / 4) * scores.timeLimit &&
      Math.abs(scores.blue - scores.red) < 2
    ) {
      changedPlayer.team == Team.RED
        ? allReds.push(changedPlayer)
        : allBlues.push(changedPlayer);
    }
  }
  if (changedPlayer.team == Team.SPECTATORS) {
    setActivity(changedPlayer, 0);
  }
  if (inChooseMode && resettingTeams == false && byPlayer.id == 0) {
    if (Math.abs(TeamR.length - TeamB.length) == teamS.length) {
      deactivateChooseMode();
      resumeGame();
      var b = teamS.length;
      if (TeamR.length > TeamB.length) {
        for (var i = 0; i < b; i++) {
          setTimeout(() => {
            room.setPlayerTeam(teamS[0].id, Team.BLUE);
          }, 200 * i);
        }
      } else {
        for (var i = 0; i < b; i++) {
          setTimeout(() => {
            room.setPlayerTeam(teamS[0].id, Team.RED);
          }, 200 * i);
        }
      }
      return;
    } else if (
      (TeamR.length == maxTeamSize && TeamB.length == maxTeamSize) ||
      (TeamR.length == TeamB.length && teamS.length < 2)
    ) {
      deactivateChooseMode();
      resumeGame();
    } else if (TeamR.length <= TeamB.length && redCaptainChoice != "") {
      // escolha lembrada
      redCaptainChoice == "top"
        ? room.setPlayerTeam(teamS[0].id, Team.RED)
        : redCaptainChoice == "random"
        ? room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.RED)
        : room.setPlayerTeam(teamS[teamS.length - 1].id, Team.RED);
      return;
    } else if (TeamB.length < TeamR.length && blueCaptainChoice != "") {
      blueCaptainChoice == "top"
        ? room.setPlayerTeam(teamS[0].id, Team.BLUE)
        : blueCaptainChoice == "random"
        ? room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE)
        : room.setPlayerTeam(teamS[teamS.length - 1].id, Team.BLUE);
      return;
    } else {
      choosePlayer();
    }
  }
};

room.onPlayerLeave = function (player) {
  delete votekickCount[player.id]; //Delete the votes used against the player.
  delete votekickTimes[player.id]; //Delete the votes used by the player.
  if (
    TeamR.findIndex((red) => red.id == player.id) == 0 &&
    inChooseMode &&
    TeamR.length <= TeamB.length
  ) {
    choosePlayer();
    capLeft = true;
    setTimeout(() => {
      capLeft = false;
    }, 10);
  }
  if (
    TeamB.findIndex((blue) => blue.id == player.id) == 0 &&
    inChooseMode &&
    TeamB.length < TeamR.length
  ) {
    choosePlayer();
    capLeft = true;
    setTimeout(() => {
      capLeft = false;
    }, 10);
  }
  setActivity(player, 0);
  updateRoleOnPlayerOut();
};

room.onPlayerKicked = function (kickedPlayer, reason, ban, byPlayer) {
  ban == true ? banList.push([kickedPlayer.name, kickedPlayer.id]) : null;
};

/* PLAYER ACTIVITY */

room.onPlayerChat = function (player, message) {
  if (message.startsWith("!votekick ") == true) {
    playerFound = false;
    players = room.getPlayerList();
    for (var i = 0; i < players.length; i++) {
      if (message === "!votekick " + players[i].name) {
        if (room.getPlayerList().length < 4) {
          //If there's less than 4 players. Don't do vote because of trolls can easily abuse it.
          room.sendAnnouncement(
            "There's not enough players to do voting.",
            player.id,
            0xff0000,
            "bold",
            2
          );
          return false;
        }
        if (players[i].name == player.name) {
          //You shouldn't vote yourself.
          room.sendAnnouncement(
            "You cannot vote yourself.",
            player.id,
            0xff0000,
            "bold",
            2
          );
          return false;
        }
        if (votedPlayers.has(player.id)) {
          //If you voted a player, then you have to wait the timeout to finish.
          room.sendAnnouncement(
            "Please wait " + votekickTimeout / 1000 + " seconds to vote again.",
            player.id,
            0xff0000,
            "bold",
            2
          );
          return false;
        }
        votedPlayers.add(player.id);
        playerFound = true;
        if (votekickCount[players[i].id].indexOf(players[i]) === -1) {
          votekickCount[players[i].id].push(player);
        }
        votekickTimes[players[i].id] = setTimeout(
          votekickRemove,
          votekickTimeout,
          players[i]
        ); //Start the timeout after the player was voted.
        votekickCheck(players[i]); //Do votekick check for the player who was voted.
      }
    }
    if (playerFound === false) {
      //If there's no such a player, then here is called.
      playersString = "";
      for (i = 0; i < players.length; i++) {
        playersString = playersString + players[i].name + ", ";
      }
      room.sendAnnouncement(
        "There's no such a player. Here is the list for available players: " +
          playersString,
        player.id,
        0xffff00,
        "normal",
        1
      );
    }
    return false;
  }
  if (message === "!ids") {
    let players = room.getPlayerList();
    for (let p of players) {
      room.sendChat(p.name + " tiene el ID: " + p.id);
    }
  }

  if (
    message.length > 1 &&
    message[0].toLowerCase() == "t" &&
    message[1] == " "
  ) {
    if (player.team != 0) {
      room.getPlayerList().forEach((element) => {
        if (element.team == player.team)
          room.sendAnnouncement(
            "[TEAM CHAT] " + player.name + ": " + message.substr(2),
            element.id,
            player.team == 1 ? 16725591 : 3261685,
            "bold",
            0
          );
      });
      return false;
    } else {
      room.sendAnnouncement("You're not on a team.", player.id);
    }
  }
  // SOCCER TEAMS //

  if (message == "!bra") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!bra";
        room.setTeamColors(
          Team.RED,
          0,
          0x3347b3,
          [0x018434, 0xf8de2e, 0xf8de2e]
        );
        room.sendAnnouncement(
          "The captain of the red team, " +
            player.name +
            ", chose the uniform [Brazil]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!bra") {
    if (player.team == 2) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!bra";
        room.setTeamColors(
          Team.BLUE,
          0,
          0x3347b3,
          [0x018434, 0xf8de2e, 0xf8de2e]
        );
        room.sendAnnouncement(
          "The captain of the blue team, " +
            player.name +
            ", chose the uniform [Brazil]! ",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!ger") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!ale";
        room.setTeamColors(
          Team.RED,
          90,
          0xffffff,
          [0x121003, 0xc70000, 0xf5c600]
        );
        room.sendAnnouncement(
          "El capitan del equipo rojo, " +
            player.name +
            ", escogio el uniforme [Germany]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!ger") {
    if (player.team == 2) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!ale";
        room.setTeamColors(
          Team.BLUE,
          90,
          0xffffff,
          [0x121003, 0xc70000, 0xf5c600]
        );
        room.sendAnnouncement(
          "El capitan del equipo azul, " +
            player.name +
            ", escogio el uniforme [Germany]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!arg") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!arg";
        room.setTeamColors(
          Team.RED,
          90,
          0xe3ac42,
          [0x74acdf, 0xffffff, 0x74acdf]
        );
        room.sendAnnouncement(
          "The captain of the red team, " +
            player.name +
            ", chose the uniform [Argentina]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!arg") {
    if (player.team == 2) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!arg";
        room.setTeamColors(
          Team.BLUE,
          90,
          0xe3ac42,
          [0x74acdf, 0xffffff, 0x74acdf]
        );
        room.sendAnnouncement(
          "The captain of the blue team, " +
            player.name +
            ", chose the uniform [Argentina]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!spa") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!esp";
        room.setTeamColors(
          Team.RED,
          0,
          0xdba640,
          [0x7b111a, 0x7b111a, 0x7b111a]
        );
        room.sendAnnouncement(
          "The captain of the red team, " +
            player.name +
            ", chose the uniform [Spain]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!spa") {
    if (player.team == 2) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!esp";
        room.setTeamColors(
          Team.BLUE,
          0,
          0xdba640,
          [0x7b111a, 0x7b111a, 0x7b111a]
        );
        room.sendAnnouncement(
          "The captain of the blue team, " +
            player.name +
            ", chose the uniform [Spain]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!por") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!por";
        room.setTeamColors(
          Team.RED,
          120,
          0xdba640,
          [0x7b111a, 0x7b111a, 0x384f43]
        );
        room.sendAnnouncement(
          "The captain of the red team, " +
            player.name +
            ", escolheu o uniforme de [Portugal]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!por") {
    if (player.team == 2) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!por";
        room.setTeamColors(
          Team.BLUE,
          120,
          0xdba640,
          [0x7b111a, 0x7b111a, 0x384f43]
        );
        room.sendAnnouncement(
          "The captain of the blue team, " +
            player.name +
            ", escolheu o uniforme de [Portugal]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!ita") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!ita";
        room.setTeamColors(
          Team.RED,
          60,
          0xffffff,
          [0x0249a8, 0x0366eb, 0x0082d3]
        );
        room.sendAnnouncement(
          "The captain of the red team, " +
            player.name +
            ", chose the uniform [Italy]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!ita") {
    if (player.team == 2) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!ita";
        room.setTeamColors(
          Team.BLUE,
          60,
          0xffffff,
          [0x0249a8, 0x0366eb, 0x0082d3]
        );
        room.sendAnnouncement(
          "The captain of the blue team, " +
            player.name +
            ", chose the uniform [Italy]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!uru") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!uru";
        room.setTeamColors(
          Team.RED,
          0,
          0xffffff,
          [0x0082d3, 0x0082d3, 0x0082d3]
        );
        room.sendAnnouncement(
          "The captain of the red team, " +
            player.name +
            ", chose the uniform [Uruguay]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!uru") {
    if (player.team == 2) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!uru";
        room.setTeamColors(
          Team.BLUE,
          0,
          0xffffff,
          [0x0082d3, 0x0082d3, 0x0082d3]
        );
        room.sendAnnouncement(
          "The captain of the blue team, " +
            player.name +
            ", chose the uniform [Uruguay]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!fra") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!fra";
        room.setTeamColors(
          Team.RED,
          0,
          0xd19e1f,
          [0x202c46, 0x202c46, 0x202c46]
        );
        room.sendAnnouncement(
          "The captain of the red team, " +
            player.name +
            ", chose the uniform [France]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!fra") {
    if (player.team == 2) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!fra";
        room.setTeamColors(
          Team.BLUE,
          0,
          0xd19e1f,
          [0x202c46, 0x202c46, 0x202c46]
        );
        room.sendAnnouncement(
          "The captain of the blue team, " +
            player.name +
            ", chose the uniform [France]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!eng") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!ing";
        room.setTeamColors(
          Team.RED,
          90,
          0x0f2544,
          [0x408cff, 0xa1c6ff, 0xe0e4e9]
        );
        room.sendAnnouncement(
          "The captain of the red team, " +
            player.name +
            ", chose the uniform [England]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!eng") {
    if (player.team == 2) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!ing";
        room.setTeamColors(
          Team.BLUE,
          90,
          0x0f2544,
          [0x408cff, 0xa1c6ff, 0xe0e4e9]
        );
        room.sendAnnouncement(
          "The captain of the blue team, " +
            player.name +
            ", chose the uniform [England]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!bel") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!bel";
        room.setTeamColors(
          Team.RED,
          90,
          0xd19e1f,
          [0x151619, 0x990011, 0x990011]
        );
        room.sendAnnouncement(
          "The captain of the red team, " +
            player.name +
            ", chose the uniform [Belgium]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!bel") {
    if (player.team == 2) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!bel";
        room.setTeamColors(
          Team.BLUE,
          90,
          0xd19e1f,
          [0x151619, 0x990011, 0x990011]
        );
        room.sendAnnouncement(
          "The captain of the blue team, " +
            player.name +
            ", chose the uniform [Belgium]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!net") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!hol";
        room.setTeamColors(
          Team.RED,
          90,
          0x2b0e09,
          [0xdc6024, 0xdc6024, 0xdc6024]
        );
        room.sendAnnouncement(
          "The captain of the red team, " +
            player.name +
            ", chose the uniform [Netherlands]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }
  if (message == "!net") {
    if (player.team == 2) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!hol";
        room.setTeamColors(
          Team.RED,
          90,
          0x2b0e09,
          [0xdc6024, 0xdc6024, 0xdc6024]
        );
        room.sendAnnouncement(
          "The captain of the blue team, " +
            player.name +
            ", chose the uniform [Netherlands]!",
          null,
          0x30f55f,
          "bold"
        );
      }
    }
  }

  if (message == "!bah") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!bah";
        room.setTeamColors(
          Team.RED,
          0,
          0xffffff,
          [0x0a4ae8, 0xf20533, 0x0a4ae8]
        );
        room.sendAnnouncement(
          player.name +
            "The team captain, " +
            player.name +
            ", chose the uniform BAHIA! ",
          null,
          0x30f55f,
          "bold"
        );
      }
      if (message == "!bah") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!bah";
            room.setTeamColors(
              Team.BLUE,
              0,
              0xffffff,
              [0x0a4ae8, 0xf20533, 0x0a4ae8]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform BAHIA! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!vit") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!vit";
            room.setTeamColors(Team.RED, 90, 0xffffff, [0xff1d0d, 0x000000]);
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform VITÓRIA! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!vit") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!vit";
            room.setTeamColors(Team.BLUE, 90, 0xffffff, [0xff1d0d, 0x000000]);
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform VITÓRIA! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!flu") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!flu";
            room.setTeamColors(
              Team.RED,
              0,
              0xffffff,
              [0x2a524f, 0x871f39, 0x2a524f]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform FLUMINENSE! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!flu") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!flu";
            room.setTeamColors(
              Team.BLUE,
              0,
              0xffffff,
              [0x2a524f, 0x871f39, 0x2a524f]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform FLUMINENSE! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!for") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!for";
            room.setTeamColors(
              Team.RED,
              90,
              0xffffff,
              [0x182587, 0xe32026, 0x182587]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform FORTALEZA! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!for") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!for";
            room.setTeamColors(
              Team.BLUE,
              90,
              0xffffff,
              [0x182587, 0xe32026, 0x182587]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform FORTALEZA! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!cap") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!cap";
            room.setTeamColors(
              Team.RED,
              45,
              0xffffff,
              [0xe8153f, 0x000000, 0xe8153f]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform ATHLETICO PARANAENSE! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!cap") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!cap";
            room.setTeamColors(
              Team.BLUE,
              45,
              0xffffff,
              [0xe8153f, 0x000000, 0xe8153f]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform ATHLETICO PARANAENSE! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!rem") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!rem";
            room.setTeamColors(Team.RED, 90, 0xffffff, [0x000000]);
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform REMO! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!rem") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!rem";
            room.setTeamColors(Team.BLUE, 90, 0xffffff, [0x000000]);
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform REMO! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!cui") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!cui";
            room.setTeamColors(Team.RED, 90, 0xffffff, [0x217430, 0xf4d42f]);
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform CUIABÁ! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!cui") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!cui";
            room.setTeamColors(Team.BLUE, 90, 0xffffff, [0x217430, 0xf4d42f]);
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform CUIABÁ! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!jvn") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!jvn";
            room.setTeamColors(
              Team.RED,
              0,
              0x00964b,
              [0x00964b, 0xffffff, 0x00964b]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform JUVENTUDE! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!jvn") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!jvn";
            room.setTeamColors(
              Team.BLUE,
              0,
              0x00964b,
              [0x00964b, 0xffffff, 0x00964b]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform JUVENTUDE! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!utd3") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!utd3";
            room.setTeamColors(
              Team.RED,
              -37,
              0xf0cf0d,
              [0x1e416d, 0x235287, 0x1463a4]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform MANCHESTER UNITED 3º KIT! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!utd3") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!utd3";
            room.setTeamColors(
              Team.BLUE,
              -37,
              0xf0cf0d,
              [0x1e416d, 0x235287, 0x1463a4]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform MANCHESTER UNITED 3º KIT! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!spo") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!spo";
            room.setTeamColors(
              Team.RED,
              0,
              0xffe600,
              [0xff0d0d, 0x000000, 0xff0d0d]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform SPORT! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!spo") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!spo";
            room.setTeamColors(
              Team.BLUE,
              0,
              0xffe600,
              [0xff0d0d, 0x000000, 0xff0d0d]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform SPORT! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!gol") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!gol";
            room.setTeamColors(Team.RED, 90, 0x23cc4a, [0x0c4519]);
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform GOIÁS! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!gol") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!gol";
            room.setTeamColors(Team.BLUE, 90, 0x23cc4a, [0x0c4519]);
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform GOIÁS! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!vas") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!vas";
            room.setTeamColors(
              Team.RED,
              140,
              0xff1212,
              [0xffffff, 0x002033, 0xffffff]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform VASCO! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!vas") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!vas";
            room.setTeamColors(
              Team.BLUE,
              140,
              0xff1212,
              [0xffffff, 0x002033, 0xffffff]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform VASCO! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!pen") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!pen";
            room.setTeamColors(
              Team.RED,
              90,
              0xffffff,
              [0xfac904, 0x000000, 0xfac904]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform PENHÃROL! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }
      if (message == "!pen") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!pen";
            room.setTeamColors(
              Team.BLUE,
              90,
              0xffffff,
              [0xfac904, 0x000000, 0xfac904]
            );
            room.sendAnnouncement(
              player.name +
                "The team captain, " +
                player.name +
                ", chose the uniform PENHÃROL! ",
              null,
              0x30f55f,
              "bold"
            );
          }
        }
      }

      if (message.toLowerCase().substr(0, 10) == "!register ") {
        setRegister(player, message.substr(10));
        return false;
      }

      // !login senha
      if (message.toLowerCase().substr(0, 7) == "!login ") {
        getLogin(player, message.substr(7));
        return false;
      }
      if (message.length > 65) {
        room.sendAnnouncement("", player.id);
        return false;
      }
      messageHistory.push(player.id);
      messageCounter++;
      if (messageCounter === 3) {
        if (
          messageHistory[messageHistory.length - 1] === player.id &&
          messageHistory[messageHistory.length - 2] === player.id &&
          messageHistory[messageHistory.length - 3] === player.id
        ) {
          room.sendChat("Spam alert.", player.id);
        }
      }
      if (messageCounter === 6) {
        if (
          messageHistory[messageHistory.length - 1] === player.id &&
          messageHistory[messageHistory.length - 2] === player.id &&
          messageHistory[messageHistory.length - 3] === player.id &&
          messageHistory[messageHistory.length - 4] === player.id &&
          messageHistory[messageHistory.length - 5] === player.id &&
          messageHistory[messageHistory.length - 6] === player.id
        ) {
          room.kickPlayer(player.id, "Moderate your messages", true);
        }
      }
      if (
        messageHistory[messageHistory.length - 1] !==
        messageHistory[messageHistory.length - 2]
      ) {
        messageCounter = 1;
      }
      if (player.name === "hitler" && player.name === "hitler") {
        messageCounter = 1;
      }
    }
  }
  messageHistory.push(player.id);
  messageCounter++;
  if (messageCounter === 1545) {
    if (
      messageHistory[messageHistory.length - 1] === player.id &&
      messageHistory[messageHistory.length - 2] === player.id &&
      messageHistory[messageHistory.length - 3] === player.id &&
      messageHistory[messageHistory.length - 4] === player.id
    ) {
      room.sendChat(":)", player.id);
    }
  }
  // ban player if 6 messages are typed in a row (disabled)
  msg = message;
  message = message;
  originalMessage = message;
  message = message.split(/ +/);
  player.team != Team.SPECTATORS ? setActivity(player, 0) : null;
  if (["!help", "!ajuda"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement(
      "[📄] Comandos : !me, !showme, !games, !wins, !goals, !assists, !cs, !afks, !mutes, !bans.",
      player.id,
      0x309d2b,
      "bold"
    );
    player.admin
      ? room.sendAnnouncement(
          "[📄] Admin : !mute <duration = 3> #<id>, !unmute all/#<id>, !clearbans <number = all>, !slow <duration>, !endslow",
          player.id,
          0x309d2b,
          "bold"
        )
      : null;
  }

  if (["!chooseadm"].includes(message[0].toLowerCase())) {
    if (message[1] == "on") {
      room.sendAnnouncement(
        player.name + " Activado el modo de reclutamiento!",
        null,
        0x55bae2,
        "normal"
      );
      choose = true;
    } else if (message[1] == "off") {
      room.sendAnnouncement(
        player.name + " Deshabilitado el modo de reclutamiento.",
        null,
        0xf2a000,
        "normal"
      );
      choose = false;
    }
  }

  // if (["!uni", "!unis"].includes(message[0].toLowerCase())) {
  //   room.sendAnnouncement(
  //     "_______________________________________",
  //     player.id,
  //     Cor.Amarelo,
  //     "bold"
  //   );
  //   room.sendAnnouncement("Equipos de futbol:", player.id, Cor.Amarelo, "bold");
  //   room.sendAnnouncement(
  //     "Brazil [!bra], Germany [!ger], Argentina [!arg], Spain [!spa], Portugal [!por]",
  //     player.id,
  //     Cor.Branco,
  //     "normal"
  //   );
  //   room.sendAnnouncement(
  //     "Italy [!ita], Uruguay [!uru], France [!fra], England [!eng], Belgium [!bel], Netherlands [!net]",
  //     player.id,
  //     Cor.Branco,
  //     "normal"
  //   );
  //   room.sendAnnouncement(
  //     "_______________________________________",
  //     player.id,
  //     Cor.Amarelo,
  //     "bold"
  //   );
  //   //            room.sendAnnouncement("Times Sulamericanos:", player.id, Cor.Amarelo, "bold");
  //   //            room.sendAnnouncement("Corinthians <cor>, São Paulo <spfc>, Palmeiras <pal>, Santos <sfc>, Flamengo <fla>, Grêmio <gre>", player.id, Cor.Branco, "normal");
  //   //           room.sendAnnouncement("Vasco <vas>, Fluminense <flu>, Internacional <int>, Cruzeiro <cru>, Boca Juniors <boc>, River Plate <riv>", player.id, Cor.Branco, "normal");
  //   //            room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "bold");
  //   //            room.sendAnnouncement("Times Europeus:", player.id, Cor.Amarelo, "bold");
  //   //            room.sendAnnouncement("Manchester City <mci>, Borussia Dortmund <bor>, Paris Saint-Germain <psg>, Real Madrid <rea>, Inter de Milão <intM>", player.id, Cor.Branco, "normal");
  //   //            room.sendAnnouncement("Barcelona <bar>, Atlético de Madrid <atm>, Liverpool <liv>, Chelsea <che>, Juventus <juv>, Bayern de Munique <bay>, Milan <mil>", player.id, Cor.Branco, "normal");
  //   //            room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "bold");
  // }
  if (["!ranks"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement(
      "_______________________________________",
      player.id,
      Cor.Amarelo,
      "bold"
    );
    room.sendAnnouncement("Rankin por gol:", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement(
      "Principante - [⚽:2] | Promesa - [⚽:5] | Prodigio - [⚽:8]",
      player.id,
      0xbc5e00,
      "normal"
    );
    room.sendAnnouncement(
      "Killer - [⚽:10] | Titular - [⚽:15] | Campeón - [⚽:20]",
      player.id,
      0xa2a2a2,
      "normal"
    );
    room.sendAnnouncement(
      "Leyenda - [⚽:30] | Prime - [⚽:35] | Goat - [⚽:40]",
      player.id,
      0xeac274,
      "normal"
    );
    room.sendAnnouncement(
      "Escribe '!ranks2' para ver mas",
      player.id,
      Cor.Amarelo,
      "bold"
    );
    room.sendAnnouncement(
      "_______________________________________",
      player.id,
      Cor.Amarelo,
      "bold"
    );
  }
  if (["!ranks2"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement(
      "_______________________________________",
      player.id,
      Cor.Amarelo,
      "bold"
    );
    room.sendAnnouncement(
      "Ranking por goles (2 page):",
      player.id,
      Cor.Amarelo,
      "bold"
    );
    room.sendAnnouncement(
      "Platinum I - [⚽:50] | Platinum II - [⚽:55] | Platinum III - [⚽:60]",
      player.id,
      0x62aee3,
      "normal"
    );
    room.sendAnnouncement(
      "Diamond I - [⚽:80] | Diamond II - [⚽:120] | Diamond III - [⚽:150]",
      player.id,
      0x7cd3fa,
      "normal"
    );
    room.sendAnnouncement(
      "Diamond VI - [⚽:200]",
      player.id,
      0x7cd3fa,
      "normal"
    );
    room.sendAnnouncement(
      "Last rank: Legend of x3 - [⚽:500]",
      player.id,
      0xf77104,
      "bold"
    );
    room.sendAnnouncement(
      "_______________________________________",
      player.id,
      Cor.Amarelo,
      "bold"
    );
  } else if (["!afk"].includes(message[0].toLowerCase())) {
    if (players.length != 1 && player.team != Team.SPECTATORS) {
      if (player.team == Team.RED && streak > 0 && room.getScores() == null) {
        room.setPlayerTeam(player.id, Team.SPECTATORS);
      } else {
        room.sendAnnouncement(
          "You can't go AFK while playing!",
          player.id,
          0xff7b08
        );
        return false;
      }
    } else if (players.length == 1 && !getAFK(player)) {
      room.setPlayerTeam(player.id, Team.SPECTATORS);
    }
    setAFK(player, !getAFK(player));
    room.sendAnnouncement(
      player.name + (getAFK(player) ? " Está AFK!" : " Ya no está AFK!"),
      null,
      getAFK(player) ? 0xff7b08 : 0x8fff8f
    );
    getAFK(player) ? updateRoleOnPlayerOut() : updateRoleOnPlayerIn();
    localStorage.getItem(getAuth(player))
      ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
      : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player"]);
    setTimeout(() => {
      if (getAFK(player) && stats[Ss.RL] != "vip") {
        room.kickPlayer(player.id, "AFK timeout", false);
      }
    }, 30 * 60 * 1000);
    return false;
  } else if (["!afks", "!afklist"].includes(message[0].toLowerCase())) {
    var cstm = "[PV] AFK List : ";
    for (var i = 0; i < extendedP.length; i++) {
      if (
        room.getPlayer(extendedP[i][eP.ID]) != null &&
        getAFK(room.getPlayer(extendedP[i][eP.ID]))
      ) {
        if (
          140 - cstm.length <
          (room.getPlayer(extendedP[i][eP.ID]).name + ", ").length
        ) {
          room.sendChat(cstm, player.id);
          cstm = "... ";
        }
        cstm += room.getPlayer(extendedP[i][eP.ID]).name + ", ";
      }
    }
    if (cstm == "[PV] LAFK List: ") {
      room.sendChat("[PV] There is no one on the AFK list!", player.id);
      return false;
    }
    cstm = cstm.substring(0, cstm.length - 2);
    cstm += ".";
    room.sendChat(cstm, player.id);
  } else if (["!me"].includes(message[0].toLowerCase())) {
    var stats;
    localStorage.getItem(getAuth(player))
      ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
      : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00"]);
    room.sendAnnouncement(
      "[📄] Stats from " +
        player.name +
        ": 🎮 Matches played: " +
        stats[Ss.GA] +
        ", ✅ Victories: " +
        stats[Ss.WI] +
        ", ❌ Defeats: " +
        stats[Ss.LS] +
        ", WR: " +
        stats[Ss.WR] +
        "%, ⚽️ Goals: " +
        stats[Ss.GL] +
        ", 👟 Assistance: " +
        stats[Ss.AS] +
        ", 🤚 GK: " +
        stats[Ss.GK] +
        ", 🤚 Vallas: " +
        stats[Ss.CS] +
        ", 🤚 CS%: " +
        stats[Ss.CP] +
        "%",
      player.id,
      0x73ec59,
      "bold"
    );
    room.sendAnnouncement(
      "「👓」 Este mensaje solo lo puedes ver tu, si quieres mostrar tus estadisticas escribe '!showme'!",
      player.id,
      0xff7900,
      "bold"
    );
  } else if (["!showme"].includes(message[0].toLowerCase())) {
    var stats;
    localStorage.getItem(getAuth(player))
      ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
      : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00"]);
    room.sendAnnouncement(
      "[📄] El jugador " +
        player.name +
        " ha mostrado sus estadisticas! '!showme'!",
      null,
      0xff7900,
      "bold"
    );
    room.sendAnnouncement(
      "[📄] Stats from " +
        player.name +
        ": 🎮 Matches played: " +
        stats[Ss.GA] +
        ", ✅ Victories: " +
        stats[Ss.WI] +
        ", ❌ Defeats: " +
        stats[Ss.LS] +
        ", WR: " +
        stats[Ss.WR] +
        "%, ⚽️ Goals: " +
        stats[Ss.GL] +
        ", 👟 Assistance: " +
        stats[Ss.AS] +
        ", 🤚 GK: " +
        stats[Ss.GK] +
        ", 🤚 Vallas: " +
        stats[Ss.CS] +
        ", 🤚 CS%: " +
        stats[Ss.CP] +
        "%",
      null,
      0x73ec59,
      "bold"
    );
  } else if (["!games"].includes(message[0].toLowerCase())) {
    var tableau = [];
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (
          ![
            "player_name",
            "view_mode",
            "geo",
            "avatar",
            "player_auth_key",
          ].includes(key)
        ) {
          tableau.push([
            JSON.parse(localStorage.getItem(key))[Ss.NK],
            JSON.parse(localStorage.getItem(key))[Ss.GA],
          ]);
        }
      });
    } catch {}
    if (tableau.length < 5) {
      room.sendAnnouncement(
        "[PV] No se jugaron suficientes partidas",
        player.id,
        0xff0000
      );
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendAnnouncement(
      "[📄] 🎮 Matches Played > #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1],
      player.id,
      0x73ec59
    );

    return false;
  } else if (["!wins"].includes(message[0].toLowerCase())) {
    var tableau = [];
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (
          ![
            "player_name",
            "view_mode",
            "geo",
            "avatar",
            "player_auth_key",
          ].includes(key)
        ) {
          tableau.push([
            JSON.parse(localStorage.getItem(key))[Ss.NK],
            JSON.parse(localStorage.getItem(key))[Ss.WI],
          ]);
        }
      });
    } catch {}
    if (tableau.length < 5) {
      room.sendAnnouncement(
        "[PV] Didn't play enough games",
        player.id,
        0x73ec59
      );
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendAnnouncement(
      "[📄] ✅ Victories> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1],
      player.id,
      0x73ec59
    );

    return false;
  } else if (["!goats"].includes(message[0].toLowerCase())) {
    var tableau = [];
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (
          ![
            "player_name",
            "view_mode",
            "geo",
            "avatar",
            "player_auth_key",
          ].includes(key) &&
          JSON.parse(localStorage.getItem(key))[Ss.WI] > 400
        ) {
          tableau.push([
            JSON.parse(localStorage.getItem(key))[Ss.NK],
            JSON.parse(localStorage.getItem(key))[Ss.WI],
          ]);
        }
      });
    } catch {}
    if (tableau.length < 5) {
      room.sendAnnouncement(
        "[PV] Didn't play enough games",
        player.id,
        0x73ec59
      );
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendAnnouncement(
      "[📄] ✅ GOATS> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1],
      player.id,
      0x73ec59
    );

    return false;
  } else if (["!goals"].includes(message[0].toLowerCase())) {
    var tableau = [];
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (
          ![
            "player_name",
            "view_mode",
            "geo",
            "avatar",
            "player_auth_key",
          ].includes(key)
        ) {
          tableau.push([
            JSON.parse(localStorage.getItem(key))[Ss.NK],
            JSON.parse(localStorage.getItem(key))[Ss.GL],
          ]);
        }
      });
    } catch {}
    if (tableau.length < 5) {
      room.sendAnnouncement(
        "[📄] Didn't play enough games",
        player.id,
        0x73ec59
      );
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendAnnouncement(
      "[📄] ⚽️ Goals> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1],
      player.id,
      0x73ec59
    );

    return false;
  } else if (["!assists"].includes(message[0].toLowerCase())) {
    var tableau = [];
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (
          ![
            "player_name",
            "view_mode",
            "geo",
            "avatar",
            "player_auth_key",
          ].includes(key)
        ) {
          tableau.push([
            JSON.parse(localStorage.getItem(key))[Ss.NK],
            JSON.parse(localStorage.getItem(key))[Ss.AS],
          ]);
        }
      });
    } catch {}
    if (tableau.length < 5) {
      room.sendAnnouncement("[PV] Didn't play enough games", player.id);
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendAnnouncement(
      "[📄] 👟 Assists> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1],
      player.id,
      0x73ec59
    );

    return false;
  } else if (["!cs"].includes(message[0].toLowerCase())) {
    var tableau = [];
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (
          ![
            "player_name",
            "view_mode",
            "geo",
            "avatar",
            "player_auth_key",
          ].includes(key)
        ) {
          tableau.push([
            JSON.parse(localStorage.getItem(key))[Ss.NK],
            JSON.parse(localStorage.getItem(key))[Ss.CS],
          ]);
        }
      });
    } catch {}
    if (tableau.length < 5) {
      room.sendAnnouncement(
        "[PV] Didn't play enough games",
        player.id,
        0x73ec59
      );
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendAnnouncement(
      "[📄] 🤚 Undefeated matches> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1],
      player.id,
      0x73ec59
    );

    return false;
  } else if (["!loginadm"].includes(message[0].toLowerCase())) {
    if (message[1] == adminPassword) {
      room.setPlayerAdmin(player.id, true);
      var stats;
      localStorage.getItem(getAuth(player))
        ? (stats = JSON.parse(localStorage.getItem(getAuth(player))))
        : (stats = [
            0,
            0,
            0,
            0,
            "0.00",
            0,
            0,
            0,
            0,
            "0.00",
            "player",
            player.name,
          ]);
      if (stats[Ss.RL] != "master") {
        stats[Ss.RL] = "master";
        room.sendAnnouncement(
          player.name + " Entró como administrador!",
          null,
          0xff7900,
          2
        );
        localStorage.setItem(getAuth(player), JSON.stringify(stats));
      }
    }
  } else if (["!mutes", "!mutelist"].includes(message[0].toLowerCase())) {
    var cstm = "[PV] List of muteds: ";
    for (var i = 0; i < extendedP.length; i++) {
      if (
        room.getPlayer(extendedP[i][eP.ID]) != null &&
        getMute(room.getPlayer(extendedP[i][eP.ID]))
      ) {
        if (
          140 - cstm.length <
          (
            room.getPlayer(extendedP[i][eP.ID]).name +
            "[" +
            extendedP[i][eP.ID] +
            "], "
          ).length
        ) {
          room.sendChat(cstm, player.id);
          cstm = "... ";
        }
        cstm +=
          room.getPlayer(extendedP[i][eP.ID]).name +
          "[" +
          extendedP[i][eP.ID] +
          "], ";
      }
    }
    if (cstm == "[PV] Lista de muteados: ") {
      room.sendChat("[PV] No hay nadie muteado!", player.id);
      return false;
    }
    cstm = cstm.substring(0, cstm.length - 2);
    cstm += ".";
    room.sendChat(cstm, player.id);
  } else if (["!mute"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      updateTeams();
      var timeOut;
      if (!Number.isNaN(Number.parseInt(message[1])) && message.length > 1) {
        if (Number.parseInt(message[1]) > 0) {
          timeOut = Number.parseInt(message[1]) * 60 * 1000;
        } else {
          timeOut = 3 * 60 * 1000;
        }
        if (message[2].length > 1 && message[2][0] == "#") {
          message[2] = message[2].substring(1, message[2].length);
          if (
            !Number.isNaN(Number.parseInt(message[2])) &&
            room.getPlayer(Number.parseInt(message[2])) != null
          ) {
            if (
              room.getPlayer(Number.parseInt(message[2])).admin ||
              getMute(room.getPlayer(Number.parseInt(message[2])))
            ) {
              return false;
            }
            setTimeout(
              function (player) {
                setMute(player, false);
              },
              timeOut,
              room.getPlayer(Number.parseInt(message[2]))
            );
            setMute(room.getPlayer(Number.parseInt(message[2])), true);
            room.sendChat(
              room.getPlayer(Number.parseInt(message[2])).name +
                " was mutated for " +
                timeOut / 60000 +
                " minutes!"
            );
          }
        }
      } else if (Number.isNaN(Number.parseInt(message[1]))) {
        if (message[1].length > 1 && message[1][0] == "#") {
          message[1] = message[1].substring(1, message[1].length);
          if (
            !Number.isNaN(Number.parseInt(message[1])) &&
            room.getPlayer(Number.parseInt(message[1])) != null
          ) {
            if (
              room.getPlayer(Number.parseInt(message[1])).admin ||
              getMute(room.getPlayer(Number.parseInt(message[1])))
            ) {
              return false;
            }
            setTimeout(
              function (player) {
                setMute(player, false);
              },
              3 * 60 * 1000,
              room.getPlayer(Number.parseInt(message[1]))
            );
            setMute(room.getPlayer(Number.parseInt(message[1])), true);
            room.sendChat(
              room.getPlayer(Number.parseInt(message[1])).name +
                " was mutated for 3 minutes!"
            );
          }
        }
      }
    }
  } else if (["!unmute"].includes(message[0].toLowerCase())) {
    if (player.admin && message.length >= 2) {
      if (message[1] == "all") {
        extendedP.forEach((ePlayer) => {
          ePlayer[eP.MUTE] = false;
        });
        room.sendChat("All were demutated");
      } else if (
        !Number.isNaN(Number.parseInt(message[1])) &&
        room.getPlayer(Number.parseInt(message[1])) != null &&
        getMute(room.getPlayer(Number.parseInt(message[1])))
      ) {
        setMute(room.getPlayer(Number.parseInt(message[1])), false);
        room.sendChat(
          room.getPlayer(Number.parseInt(message[1])).name +
            " has been unmuted!"
        );
      } else if (Number.isNaN(Number.parseInt(message[1]))) {
        if (message[1].length > 1 && message[1][0] == "#") {
          message[1] = message[1].substring(1, message[1].length);
          if (
            !Number.isNaN(Number.parseInt(message[1])) &&
            room.getPlayer(Number.parseInt(message[1])) != null &&
            getMute(room.getPlayer(Number.parseInt(message[1])))
          ) {
            setMute(room.getPlayer(Number.parseInt(message[1])), false);
            room.sendChat(
              room.getPlayer(Number.parseInt(message[1])).name +
                " has been unmuted!"
            );
          }
        }
      }
    }
  } else if (["!banlist", "!bans"].includes(message[0].toLowerCase())) {
    if (banList.length == 0) {
      room.sendChat("[PV] There is no one on the banned list!", player.id);
      return false;
    }
    var cstm = "[PV] Banned list: ";
    for (var i = 0; i < banList.length; i++) {
      if (
        140 - cstm.length <
        (banList[i][0] + "[" + banList[i][1] + "], ").length
      ) {
        room.sendChat(cstm, player.id);
        cstm = "... ";
      }
      cstm += banList[i][0] + "[" + banList[i][1] + "], ";
    }
    cstm = cstm.substring(0, cstm.length - 2);
    cstm += ".";
    room.sendChat(cstm, player.id);
  } else if (["!clearbans"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      if (message.length == 1) {
        room.clearBans();
        room.sendChat("Bans removed!");
        banList = [];
      }
      if (message.length == 2) {
        if (!Number.isNaN(Number.parseInt(message[1]))) {
          if (Number.parseInt(message[1]) > 0) {
            ID = Number.parseInt(message[1]);
            room.clearBan(ID);
            if (banList.length != banList.filter((array) => array[1] != ID)) {
              room.sendChat(
                banList.filter((array) => array[1] == ID)[0][0] +
                  " has been banned from the host!"
              );
            }
            setTimeout(() => {
              banList = banList.filter((array) => array[1] != ID);
            }, 20);
          }
        }
      }
    }
  } else if (
    ["!bb", "!bye", "!cya", "!gn"].includes(message[0].toLowerCase())
  ) {
    room.kickPlayer(player.id, "👋 Nos vemos despues !", false);
  } else if (["!dc", "!disc", "!discord"].includes(message[0].toLowerCase())) {
    let user = message.author; // Asegúrate de obtener el ID del usuario de la forma correcta para tu contexto
    let now = Date.now();

    // Comprobar si el usuario ha usado el comando en los últimos 2 minutos
    if (lastUsed[user] && now - lastUsed[user] < 2 * 60 * 1000) {
      room.sendAnnouncement(
        "Por favor espera 2 minutos antes de usar este comando de nuevo.",
        null,
        0xf6ff43,
        "bold"
      );
    } else {
      // Actualizar la última vez que se usó el comando
      lastUsed[user] = now;

      // El resto de tu código...
      room.sendAnnouncement(
        "                                        ▒█▀▀▄ ▀█▀ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▄ ",
        null,
        0x9250fd,
        "bold"
      );
      // ...resto de los anuncios

      room.sendAnnouncement(
        "                                        ▒█░▒█ ▒█░ ░▀▀▀▄▄ ▒█░░░ ▒█░░▒█ ▒█▄▄▀ ▒█░▒█ ",
        null,
        0x8466fd,
        "bold"
      );
      room.sendAnnouncement(
        "                                        ▒█▄▄▀ ▄█▄ ▒█▄▄▄█ ▒█▄▄█ ▒█▄▄▄█ ▒█░▒█ ▒█▄▄▀ ",
        null,
        0x7b73fd,
        "bold"
      );
      room.sendAnnouncement(
        "                                        💬 Discord Link: ➡ (Proximamente) ⬅",
        null,
        0xf6ff43,
        "bold"
      );
    }
  }

  if (xingo.includes(message[0])) {
    room.kickPlayer(player.id, "❌ Nada de eso mijo, moderese.", false);
    room.sendAnnouncement(
      centerText("Player " + player.name + " talked shit"),
      player.id,
      Cor.Warn,
      "italic"
    );
    return false;
  }
  if (xingo.includes(message[1])) {
    room.kickPlayer(player.id, "❌ Nada de eso mijo, moderese.", false);
    room.sendAnnouncement(
      centerText("Player " + player.name + " talked shit"),
      player.id,
      Cor.Warn,
      "italic"
    );
    return false;
  }
  if (xingo.includes(message[2])) {
    room.kickPlayer(player.id, "❌ Nada de eso mijo, moderese.", false);
    room.sendAnnouncement(
      centerText("Player " + player.name + " talked shit"),
      player.id,
      Cor.Warn,
      "italic"
    );
    return false;
  }
  if (xingo.includes(message[3])) {
    room.kickPlayer(player.id, "❌ Nada de eso mijo, moderese.", false);
    room.sendAnnouncement(
      centerText("Player " + player.name + " talked shit"),
      player.id,
      Cor.Warn,
      "italic"
    );
    return false;
  }
  if (xingo.includes(message[4])) {
    room.kickPlayer(player.id, "❌ Nada de eso mijo, moderese.", false);
    room.sendAnnouncement(
      centerText("Player " + player.name + " talked shit"),
      player.id,
      Cor.Warn,
      "italic"
    );
    return false;
  }
  if (xingo.includes(message[5])) {
    room.kickPlayer(player.id, "❌ Nada de eso mijo, moderese.", false);
    room.sendAnnouncement(
      centerText("Player " + player.name + " talked shit"),
      player.id,
      Cor.Warn,
      "italic"
    );
    return false;
  }
  if (regex.includes(message[0])) {
    room.sendAnnouncement(
      "No swearing, " + player.name,
      player.id,
      Cor.Warn,
      "italic",
      2
    );
    return false;
  }
  if (regex.includes(message[1])) {
    room.sendAnnouncement(
      "No swearing, " + player.name,
      player.id,
      Cor.Warn,
      "italic",
      2
    );
    return false;
  }
  if (regex.includes(message[2])) {
    room.sendAnnouncement(
      "No swearing, " + player.name,
      player.id,
      Cor.Warn,
      "italic",
      2
    );
    return false;
  }
  if (regex.includes(message[3])) {
    room.sendAnnouncement(
      "No swearing, " + player.name,
      player.id,
      Cor.Warn,
      "italic",
      2
    );
    return false;
  }
  if (regex.includes(message[4])) {
    room.sendAnnouncement(
      "No swearing, " + player.name,
      player.id,
      Cor.Warn,
      "italic",
      2
    );
    return false;
  }
  if (regex.includes(message[5])) {
    room.sendAnnouncement(
      "No swearing, " + player.name,
      player.id,
      Cor.Warn,
      "italic",
      2
    );
    return false;
  }

  if (link.includes(message[0])) {
    room.sendAnnouncement(
      "You cannot send links here, " + player.name,
      player.id,
      Cor.Warn,
      "italic",
      2
    );
    return false;
  }

  if (link.includes(message[1])) {
    room.sendAnnouncement(
      "You cannot send links here, " + player.name,
      player.id,
      Cor.Warn,
      "italic",
      2
    );
    return false;
  }

  if (link.includes(message[2])) {
    room.sendAnnouncement(
      "You cannot send links here, " + player.name,
      player.id,
      Cor.Warn,
      "italic",
      2
    );
    return false;
  }

  if (link.includes(message[3])) {
    room.sendAnnouncement(
      "You cannot send links here, " + player.name,
      player.id,
      Cor.Warn,
      "italic",
      2
    );
    return false;
  }

  if (link.includes(message[4])) {
    room.sendAnnouncement(
      "You cannot send links here, " + player.name,
      player.id,
      Cor.Warn,
      "italic",
      2
    );
    return false;
  }

  if (link.includes(message[5])) {
    room.sendAnnouncement(
      "You cannot send links here, " + player.name,
      player.id,
      Cor.Warn,
      "italic",
      2
    );
    return false;
  }

  if (link.includes(message[6])) {
    room.sendAnnouncement(
      "You cannot send links here, " + player.name,
      player.id,
      Cor.Warn,
      "italic",
      2
    );
    return false;
  }

  if (link.includes(message[7])) {
    room.sendAnnouncement(
      "You cannot send links here, " + player.name,
      player.id,
      Cor.Warn,
      "italic",
      2
    );
    return false;
  }

  if (message[0][0] == "!") {
    // the command used in the chat does not appear
    return false;
  }

  if (TeamR.length != 0 && TeamB.length != 0 && inChooseMode) {
    // to choose the team
    if (player.id == TeamR[0].id || player.id == TeamB[0].id) {
      // here we care if it is one of the captains choosing
      if (TeamR.length <= TeamB.length && player.id == TeamR[0].id) {
        // here we care if it's red turn && red cap talking
        if (["top", "auto"].includes(message[0].toLowerCase())) {
          room.setPlayerTeam(teamS[0].id, Team.RED);
          redCaptainChoice = "top";
          clearTimeout(timeOutCap);
          room.sendAnnouncement(
            player.name + " escogio los primeros de la lista!",
            null,
            0x55bae2,
            "normal"
          );
          return false;
        } else if (["random", "rand"].includes(message[0].toLowerCase())) {
          var r = getRandomInt(teamS.length);
          room.setPlayerTeam(teamS[r].id, Team.RED);
          redCaptainChoice = "random";
          clearTimeout(timeOutCap);
          room.sendAnnouncement(
            player.name + " escogio equipo aleatorio",
            null,
            0x55bae2,
            "normal"
          );
          return false;
        } else if (["bottom", "bot"].includes(message[0].toLowerCase())) {
          room.setPlayerTeam(teamS[teamS.length - 1].id, Team.RED);
          redCaptainChoice = "bottom";
          clearTimeout(timeOutCap);
          room.sendAnnouncement(
            player.name + " escogio a los ultimos de la fila!",
            null,
            0x55bae2,
            "normal"
          );
          return false;
        } else if (!Number.isNaN(Number.parseInt(message[0]))) {
          if (
            Number.parseInt(message[0]) > teamS.length ||
            Number.parseInt(message[0]) < 1
          ) {
            room.sendAnnouncement(
              "[⚠️] Oops! El numero que escogiste es invalido.",
              player.id,
              null,
              0xfaca29,
              "normal"
            );
            return false;
          } else {
            room.setPlayerTeam(
              teamS[Number.parseInt(message[0]) - 1].id,
              Team.RED
            );
            room.sendAnnouncement(
              player.name +
                " ha pickeado a: " +
                teamS[Number.parseInt(message[0]) - 1].name +
                " !",
              null,
              0x55bae2,
              "normal"
            );
            return false;
          }
        }
      }
      if (TeamR.length > TeamB.length && player.id == TeamB[0].id) {
        // here we care if it's red turn && red cap talking
        if (["top", "auto"].includes(message[0].toLowerCase())) {
          room.setPlayerTeam(teamS[0].id, Team.BLUE);
          blueCaptainChoice = "top";
          clearTimeout(timeOutCap);
          room.sendAnnouncement(
            player.name + " escogio a los primeros de la lista!",
            null,
            0x55bae2,
            "normal"
          );
          return false;
        } else if (["random", "rand"].includes(message[0].toLowerCase())) {
          room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
          blueCaptainChoice = "random";
          clearTimeout(timeOutCap);
          room.sendAnnouncement(
            player.name + " escogio equipo aleatorio",
            null,
            0x55bae2,
            "normal"
          );
          return false;
        } else if (["bottom", "bot"].includes(message[0].toLowerCase())) {
          room.setPlayerTeam(teamS[teamS.length - 1].id, Team.BLUE);
          blueCaptainChoice = "bottom";
          clearTimeout(timeOutCap);
          room.sendAnnouncement(
            player.name + " escogio a los ultimos de la fila!",
            null,
            0x55bae2,
            "normal"
          );
          return false;
        } else if (!Number.isNaN(Number.parseInt(message[0]))) {
          if (
            Number.parseInt(message[0]) > teamS.length ||
            Number.parseInt(message[0]) < 1
          ) {
            room.sendAnnouncement(
              "[⚠️] Oops! El numero que elegiste es invalido.",
              player.id,
              null,
              0xfaca29,
              "normal"
            );
            return false;
          } else {
            room.setPlayerTeam(
              teamS[Number.parseInt(message[0]) - 1].id,
              Team.BLUE
            );
            room.sendAnnouncement(
              player.name +
                " Ha pickeado a: " +
                teamS[Number.parseInt(message[0]) - 1].name +
                "!",
              null,
              0x55bae2,
              "normal"
            );
            return false;
          }
        }
      }
    }
  }

  if (getMute(player)) {
    room.sendChat("Has sido muteado", player.id);
    return false;
  }
  if (slowMode > 0) {
    if (!player.admin) {
      if (!SMSet.has(player.id)) {
        SMSet.add(player.id);
        setTimeout(
          (number) => {
            SMSet.delete(number);
          },
          slowMode * 1000,
          player.id
        );
      } else {
        return false;
      }
    }
  }
  if (localStorage.getItem(getAuth(player))) {
    stats = JSON.parse(localStorage.getItem(getAuth(player)));
    var announcement = "";
    var chatColor = "";
    if (stats[Ss.GL] > 500) {
      announcement +=
        "[👑] - [⚽: " + stats[Ss.GL] + "]  ·「The Legend of x3」";
      chatColor = "0xf77104";
    } else if (stats[Ss.GL] > 200) {
      announcement += "[💎] - [⚽: " + stats[Ss.GL] + "]  ·「Diamond IV」";
      chatColor = "0x7cd3fa";
    } else if (stats[Ss.GL] > 150) {
      announcement += "[💎] - [⚽: " + stats[Ss.GL] + "]  ·「Diamond III」";
      chatColor = "0x7cd3fa";
    } else if (stats[Ss.GL] > 120) {
      announcement += "[💎] - [⚽: " + stats[Ss.GL] + "]  ·「Diamond II」";
      chatColor = "0x7cd3fa";
    } else if (stats[Ss.GL] > 80) {
      announcement += "[💎] - [⚽: " + stats[Ss.GL] + "]  ·「Diamond I」";
      chatColor = "0x7cd3fa";
    } else if (stats[Ss.GL] > 60) {
      announcement += "[⚽: " + stats[Ss.GL] + "]  ·「Platinum III」";
      chatColor = "0x62AEE3";
    } else if (stats[Ss.GL] > 55) {
      announcement += "[⚽: " + stats[Ss.GL] + "]  ·「Platinum II」";
      chatColor = "0x62AEE3";
    } else if (stats[Ss.GL] > 50) {
      announcement += "[⚽: " + stats[Ss.GL] + "]  ·「Platinum I」";
      chatColor = "0x62AEE3";
    } else if (stats[Ss.GL] > 40) {
      announcement += "[⚽: " + stats[Ss.GL] + "]  ·「Goat」";
      chatColor = "0xEAC274";
    } else if (stats[Ss.GL] > 35) {
      announcement += "[⚽: " + stats[Ss.GL] + "]  ·「Prime」";
      chatColor = "0xEAC274";
    } else if (stats[Ss.GL] > 30) {
      announcement += "[⚽: " + stats[Ss.GL] + "]  ·「Leyenda」";
      chatColor = "0xEAC274";
    } else if (stats[Ss.GL] > 20) {
      announcement += "[⚽: " + stats[Ss.GL] + "]  ·「Campeon」";
      chatColor = "0xA2A2A2";
    } else if (stats[Ss.GL] > 15) {
      announcement += "[⚽: " + stats[Ss.GL] + "]  ·「Titular」";
      chatColor = "0xA2A2A2";
    } else if (stats[Ss.GL] > 10) {
      announcement += "[⚽: " + stats[Ss.GL] + "]  ·「Killer」";
      chatColor = "0xA2A2A2";
    } else if (stats[Ss.GL] > 8) {
      announcement += "[⚽: " + stats[Ss.GL] + "]  ·「Prodigio」";
      chatColor = "0xbc5e00";
    } else if (stats[Ss.GL] > 5) {
      announcement += "[⚽: " + stats[Ss.GL] + "]  ·「Promesa」";
      chatColor = "0xbc5e00";
    } else if (stats[Ss.GL] > 2) {
      announcement += "[⚽: " + stats[Ss.GL] + "]  ·「Principiante」";
      chatColor = "0xbc5e00";
    } else {
      announcement += "「Meme nuevo」";
      chatColor = "0xEBEBEB";
    }
    console.log(announcement);
    console.log(chatColor);
    console.log(originalMessage);
    announcement += player.name + ": " + originalMessage;
    room.sendAnnouncement(announcement, null, chatColor);
    return false;
  } else {
    room.sendAnnouncement(
      `❌ ${player.name}: ${originalMessage}`,
      null,
      0xabaea7
    );
    return false;
  }
};

room.onPlayerActivity = function (player) {
  setActivity(player, 0);
};

room.onPlayerBallKick = function (player) {
  if (lastPlayersTouched[0] == null || player.id != lastPlayersTouched[0].id) {
    !activePlay ? (activePlay = true) : null;
    lastTeamTouched = player.team;
    lastPlayersTouched[1] = lastPlayersTouched[0];
    lastPlayersTouched[0] = player;
  }
};

/* GAME MANAGEMENT */

room.onGameStart = function (byPlayer) {
  game = new Game(Date.now(), room.getScores(), []);
  countAFK = true;
  activePlay = false;
  goldenGoal = false;
  endGameVariable = false;
  lastPlayersTouched = [null, null];
  Rposs = 0;
  Bposs = 0;
  GKList = [];
  allReds = [];
  allBlues = [];
  room.sendAnnouncement(
    centerText("🥅 EMPEZÓ EL PARTIDO 🥅"),
    null,
    Cor.White,
    "bold"
  );

  //room.sendAnnouncement(centerText("For exclusive uniforms, use '!uni2'"), null, 0xFFAE00, "bold");
  room.sendAnnouncement(
    centerText("[💬] Usa 't' despues de tu mensaje para hablar con tu equipo!"),
    null,
    0x5ee7ff
  );
  if (TeamR.length == maxTeamSize && TeamB.length == maxTeamSize) {
    for (var i = 0; i < maxTeamSize; i++) {
      allReds.push(TeamR[i]);
      allBlues.push(TeamB[i]);
    }
  }
  for (var i = 0; i < extendedP.length; i++) {
    extendedP[i][eP.GK] = 0;
    extendedP[i][eP.ACT] = 0;
    room.getPlayer(extendedP[i][eP.ID]) == null ? extendedP.splice(i, 1) : null;
  }
  deactivateChooseMode();
};

room.onGameStop = function (byPlayer) {
  if (byPlayer.id == 0 && endGameVariable) {
    updateTeams();
    if (inChooseMode) {
      if (players.length == 2 * maxTeamSize) {
        inChooseMode = false;
        resetBtn();
        for (var i = 0; i < maxTeamSize; i++) {
          setTimeout(() => {
            randomBtn();
          }, 400 * i);
        }
        setTimeout(() => {
          room.startGame();
        }, 2000);
      } else {
        if (lastWinner == Team.RED) {
          blueToSpecBtn();
        } else if (lastWinner == Team.BLUE) {
          redToSpecBtn();
          blueToRedBtn();
        } else {
          resetBtn();
        }
        setTimeout(() => {
          topBtn();
        }, 500);
      }
    } else {
      if (players.length == 2) {
        if (lastWinner == Team.BLUE) {
          room.setPlayerTeam(TeamB[0].id, Team.RED);
          room.setPlayerTeam(TeamR[0].id, Team.BLUE);
        }
        setTimeout(() => {
          room.startGame();
        }, 2000);
      } else if (players.length == 3 || players.length >= 2 * maxTeamSize + 1) {
        if (lastWinner == Team.RED) {
          blueToSpecBtn();
        } else {
          redToSpecBtn();
          blueToRedBtn();
        }
        setTimeout(() => {
          topBtn();
        }, 200);
        setTimeout(() => {
          room.startGame();
        }, 2000);
      } else if (players.length == 4) {
        resetBtn();
        setTimeout(() => {
          randomBtn();
          setTimeout(() => {
            randomBtn();
          }, 500);
        }, 500);
        setTimeout(() => {
          room.startGame();
        }, 2000);
      } else if (players.length == 5 || players.length >= 2 * maxTeamSize + 1) {
        if (lastWinner == Team.RED) {
          blueToSpecBtn();
        } else {
          redToSpecBtn();
          blueToRedBtn();
        }
        setTimeout(() => {
          topBtn();
        }, 200);
        activateChooseMode();
      } else if (players.length == 6) {
        resetBtn();
        setTimeout(() => {
          randomBtn();
          setTimeout(() => {
            randomBtn();
            setTimeout(() => {
              randomBtn();
            }, 500);
          }, 500);
        }, 500);
        setTimeout(() => {
          room.startGame();
        }, 2000);
      }
    }
  }
};

room.onGamePause = function (byPlayer) {};

room.onGameUnpause = function (byPlayer) {
  if (
    (TeamR.length == 4 && TeamB.length == 4 && inChooseMode) ||
    (TeamR.length == TeamB.length && teamS.length < 2 && inChooseMode)
  ) {
    deactivateChooseMode();
  }
};

room.onTeamGoal = function (team) {
  teamgoaler = team;
  let assistencia = "";
  let goleador = "";
  let goalMaker = lastPlayersTouched[0].id;
  activePlay = false;
  countAFK = false;
  const scores = room.getScores();
  game.scores = scores;
  if (lastPlayersTouched[0] != null && lastPlayersTouched[0].team == team) {
    if (lastPlayersTouched[1] != null && lastPlayersTouched[1].team == team) {
      var frasegol = frasesGols[(Math.random() * frasesGols.length) | 0];
      var fraseasis = frasesasis[(Math.random() * frasesasis.length) | 0];
      //	room.sendAnnouncement("⚽👥 " + getTime(scores) + frasegol + lastPlayersTouched[0].name + fraseasis + lastPlayersTouched[1].name + " | Velocidade do chute: " + ballSpeed.toPrecision(4).toString() + "km/h " + (team == Team.RED ? "🔴" : "🔵"),null,(team == Team.RED ? Cor.Vermelho : 0x5ec0f1),'bold');
      room.sendAnnouncement(
        centerText("GOLAAAAAAAAAAAAZO"),
        null,
        Cor.Verde,
        "bold"
      );
      room.sendAnnouncement(
        centerText("         ⚽ Gol de " + lastPlayersTouched[0].name + " ⚽"),
        null,
        Cor.White,
        "bold"
      );
      room.sendAnnouncement(
        centerText("👟 Asistencia: " + lastPlayersTouched[1].name + " 👟"),
        null,
        Cor.White,
        "bold"
      );
      room.sendAnnouncement(
        centerText(
          "Velocidad de tiro: " + ballSpeed.toPrecision(4).toString() + " km/h"
        ),
        null,
        Cor.White,
        "normal"
      );
      game.goals.push(
        new Goal(
          scores.time,
          team,
          lastPlayersTouched[0],
          lastPlayersTouched[1]
        )
      );
    } else {
      var frasegol = frasesGols[(Math.random() * frasesGols.length) | 0];
      ///	room.sendAnnouncement("⚽ " + getTime(scores) + frasegol + lastPlayersTouched[0].name + "! | Velocidade do chute: " + ballSpeed.toPrecision(4).toString() + "km/h " + (team == Team.RED ? "🔴" : "🔵"),null,(team == Team.RED ? Cor.Vermelho : 0x5ec0f1),'bold');
      room.sendAnnouncement(
        centerText("GOLAAAAAAAAAZO A LO ROMARIO"),
        null,
        Cor.Verde,
        "bold"
      );
      room.sendAnnouncement(
        centerText(
          "         ⚽ Golaaaaaaaazo de " + lastPlayersTouched[0].name + " ⚽"
        ),
        null,
        Cor.White,
        "bold"
      );
      room.sendAnnouncement(
        centerText(
          "Velocidad de tiro: " + ballSpeed.toPrecision(4).toString() + " km/h"
        ),
        null,
        Cor.White,
        "normal"
      );
      game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], null));
    }
    setTimeout(function () {
      room.setPlayerAvatar(goalMaker, "🎯");
      setTimeout(function () {
        room.setPlayerAvatar(goalMaker, "⚽");
        setTimeout(function () {
          room.setPlayerAvatar(goalMaker, null);
        }, 3000);
      }, 1200);
    }, 1);

    if (lastPlayersTouched[1] != null && lastPlayersTouched[1].team == team) {
      let goalAssist = lastPlayersTouched[1].id;
      assistencia = lastPlayersTouched[1];
      setTimeout(function () {
        room.setPlayerAvatar(goalAssist, "🤝");
        setTimeout(function () {
          room.setPlayerAvatar(goalAssist, "👟");
          setTimeout(function () {
            room.setPlayerAvatar(goalAssist, null);
          }, 2500);
        }, 1000);
      }, 1);
    }
  } else {
    var fraseautogol =
      frasesautogol[(Math.random() * frasesautogol.length) | 0];
    //	room.sendAnnouncement("🤡 " + getTime(scores) + fraseautogol + lastPlayersTouched[0].name + "! | Velocidade do chute: " + ballSpeed.toPrecision(4).toString() + "km/h " + (team == Team.RED ? "🔴" : "🔵"),null,(team == Team.RED ? Cor.Vermelho : 0x5ec0f1),'bold');
    room.sendAnnouncement(
      centerText("🤦‍♂️ QUE SE METE EN PROPIA EL MEME !! 🤦‍♂️"),
      null,
      Cor.Yellow,
      "bold"
    );
    room.sendAnnouncement(
      centerText("🤡 Autogol de " + lastPlayersTouched[0].name + " 🤡"),
      null,
      Cor.White,
      "bold"
    );
    room.sendAnnouncement(
      centerText(
        "Velocidad de tiro: " + ballSpeed.toPrecision(4).toString() + " km/h"
      ),
      null,
      Cor.White,
      "normal"
    );
    game.goals.push(new Goal(scores.time, team, null, null));
    setTimeout(function () {
      room.setPlayerAvatar(goalMaker, "🤦‍♂️");
      setTimeout(function () {
        room.setPlayerAvatar(goalMaker, "🤡");
        setTimeout(function () {
          room.setPlayerAvatar(goalMaker, null);
        }, 3000);
      }, 1000);
    }, 1);

    golcontra(lastPlayersTouched[0]);
  }

  if (
    scores.scoreLimit != 0 &&
    (scores.red == scores.scoreLimit ||
      (scores.blue == scores.scoreLimit && scores.blue > 0) ||
      goldenGoal == true)
  ) {
    endGame(team);
    goldenGoal = false;
    setTimeout(() => {
      room.stopGame();
    }, 1000);
  }
};

room.onPositionsReset = function () {
  countAFK = true;
  lastPlayersTouched = [null, null];
};

/* SEVERAL */

room.onRoomLink = function (url) {};

room.onPlayerAdminChange = function (changedPlayer, byPlayer) {
  if (getMute(changedPlayer) && changedPlayer.admin) {
    room.sendChat(changedPlayer.name + " was unmuted.");
    setMute(changedPlayer, false);
  }
  if (
    byPlayer.id != 0 &&
    localStorage.getItem(getAuth(byPlayer)) &&
    JSON.parse(localStorage.getItem(getAuth(byPlayer)))[Ss.RL] == "admin"
  ) {
    room.sendChat(
      "No puedes nombrar a un jugador como administrador!",
      byPlayer.id
    );
    room.setPlayerAdmin(changedPlayer.id, false);
  }
};

room.onStadiumChange = function (newStadiumName, byPlayer) {};

room.onGameTick = function () {
  checkTime();
  getLastTouchOfTheBall();
  getStats();
  handleInactivity();
};

Botdivulga = setInterval(function () {
  room.sendAnnouncement(
    "Quieres entrar al equipo oficial del Santos? Considera entrar al discord del Santos F.C ☕☕",
    null,
    0xffffff,
    "bold"
  );
}, BotdivulgaTime);

msg1 = setInterval(function () {
  room.sendAnnouncement(
    "No memees o te iras baneado!",
    null,
    0xff8a4a,
    "normal"
  );
}, msg1Time);


votekickInfoInterval = setInterval(function(){room.sendAnnouncement("You can type !votekick [player_name] (for example: !votekick IvanBre) to kick a player in the room by voting. The voting system does not work if there are less than 4 people in the room.",null,0xFFFFFF,"normal",1);},votekickInfoIntervalTime);