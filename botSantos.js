/* VARIABLES */
var acronymHome = "bah";
var acronymGuest = "vit";
const Uniform = { COUNTRY: 0, CLUBLA: 1, CLUBEU: 2 };
/* ROOM */

const roomName = "☕ Santos F.C Hax4v4 ☕";
const maxPlayers = 25;
const roomPublic = true;
const token = ""; // Insert token here

var roomWebhook = ""; // this webhook is used to send the details of the room (chat, join, leave) ; it should be in a private discord channel
var gameWebhook = ""; // this webhook is used to send the summary of the games ; it should be in a public discord channel
var fetchRecordingVariable = true;
var timeLimit = 4;
var scoreLimit = 3;

var gameConfig = {
  roomName: roomName,
  maxPlayers: maxPlayers,
  public: roomPublic,
  noPlayer: true,
};

if (typeof token == "string" && token.length == 39) {
  gameConfig.token = token;
}

var room = HBInit(gameConfig);

var uniforms = {
  /* SELEÇÕES */
  ale: {
    name: "Alemanha",
    type: Uniform.COUNTRY,
    emoji: "⚫🔴🟡",
    angle: 90,
    textcolor: 0x000000,
    color1: 0xffffff,
    color2: 0xffffff,
    color3: 0xffffff,
    angle2: 0,
    textcolor2: 0xec1e31,
    color21: 0x232522,
    color22: 0x232522,
    color23: 0x232522,
  },
  arg: {
    name: "Argentina",
    type: Uniform.COUNTRY,
    emoji: "🔵⚪🔵",
    angle: 90,
    textcolor: 0x1f374b,
    color1: 0x75aadb,
    color2: 0xffffff,
    color3: 0x75aadb,
    angle2: 0,
    textcolor2: 0x9f8334,
    color21: 0x103a73,
    color22: 0x103a73,
    color23: 0x103a73,
  },
  bra: {
    name: "Brasil",
    type: Uniform.COUNTRY,
    emoji: "⚫🔴🟡",
    angle: 360,
    textcolor: 0x27965a,
    color1: 0xdbb71b,
    color2: 0xdbb71b,
    color3: 0xdbb71b,
    angle2: 0,
    textcolor2: 0xdbb71b,
    color21: 0x1c56b4,
    color22: 0x1c56b4,
    color23: 0x1c56b4,
  },
  esp: {
    name: "Espanha",
    type: Uniform.COUNTRY,
    emoji: "🟢🟡🔵",
    angle: 90,
    textcolor: 0xffff00,
    color1: 0xff0000,
    color2: 0xff0000,
    color3: 0xff0000,
    angle2: 0,
    textcolor2: 0xe4524a,
    color21: 0xefefef,
    color22: 0xefefef,
    color23: 0xefefef,
  },
  por: {
    name: "Portugal",
    type: Uniform.COUNTRY,
    emoji: "🟢🔴🔴",
    angle: 0,
    textcolor: 0x289e1f,
    color1: 0xff0000,
    color2: 0xff0000,
    color3: 0xff0000,
    angle2: 90,
    textcolor2: 0x0f303d,
    color21: 0x48776f,
    color22: 0x73cfb6,
    color23: 0x73cfb6,
  },
  ita: {
    name: "Italia",
    type: Uniform.COUNTRY,
    emoji: "🟢⚪🔴",
    angle: 0,
    textcolor: 0xffffff,
    color1: 0x3646a9,
    color2: 0x3646a9,
    color3: 0x3646a9,
    angle2: 90,
    textcolor2: 0xdfc396,
    color21: 0x12282e,
    color22: 0x17433b,
    color23: 0x17433b,
  },
  uru: {
    name: "Uruguai",
    type: Uniform.COUNTRY,
    emoji: "⚪🔵⚪",
    angle: 0,
    textcolor: 0x212124,
    color1: 0x66a5d4,
    color2: 0x66a5d4,
    color3: 0x66a5d4,
    angle2: 0,
    textcolor2: 0x6ca0cf,
    color21: 0xe5e5e7,
    color22: 0xe5e5e7,
    color23: 0xe5e5e7,
  },
  fra: {
    name: "França",
    type: Uniform.COUNTRY,
    emoji: "🔵⚪🔴",
    angle: 90,
    textcolor: 0xf5f9f6,
    color1: 0x265ecf,
    color2: 0x384355,
    color3: 0x384355,
    angle2: 0,
    textcolor2: 0x3243b4,
    color21: 0xf5f9f6,
    color22: 0xf5f9f6,
    color23: 0xf5f9f6,
  },
  ing: {
    name: "Inglaterra",
    type: Uniform.COUNTRY,
    emoji: "⚪🔴⚪",
    angle: 0,
    textcolor: 0x0549a0,
    color1: 0xdedfe4,
    color2: 0xdedfe4,
    color3: 0xdedfe4,
    angle2: 0,
    textcolor2: 0xe92715,
    color21: 0x2858ab,
    color22: 0x2858ab,
    color23: 0x2858ab,
  },
  bel: {
    name: "Bélgica",
    type: Uniform.COUNTRY,
    emoji: "⚫🔴🟡",
    angle: 0,
    textcolor: 0xca9144,
    color1: 0xc4212a,
    color2: 0xc4212a,
    color3: 0xc4212a,
    angle2: 0,
    textcolor2: 0x37312b,
    color21: 0xefc02e,
    color22: 0xefc02e,
    color23: 0xefc02e,
  },

  /* CLUBES LA */
  bah: {
    name: "Bahia",
    type: Uniform.CLUBLA,
    emoji: "🔵⚪🔴",
    angle: 0,
    textcolor: 0xffdd00,
    color1: 0xd10125,
    color2: 0xe3dfe4,
    color3: 0x1c3e94,
    angle2: 270,
    textcolor2: 0xd10125,
    color21: 0xe3dfe4,
    color22: 0xe3dfe4,
    color23: 0x1c3e94,
  },
  vit: {
    name: "Vitória",
    type: Uniform.CLUBLA,
    emoji: "🔴⚫🔴",
    angle: 90,
    textcolor: 0xffffff,
    color1: 0xff1d0d,
    color2: 0x000000,
    color3: 0x000000,
    angle2: 90,
    textcolor2: 0x000000,
    color21: 0xff1d0d,
    color22: 0xffffff,
    color23: 0xffffff,
  },
  pal: {
    name: "Palmeiras",
    type: Uniform.CLUBLA,
    emoji: "🟢⚪🟢",
    angle: 0,
    textcolor: 0xe3e7eb,
    color1: 0x224a40,
    color2: 0x224a40,
    color3: 0x224a40,
    angle2: 0,
    textcolor2: 0x004738,
    color21: 0xf4f6fa,
    color22: 0xf4f6fa,
    color23: 0xf4f6fa,
  },
  cor: {
    name: "Corinthians",
    type: Uniform.CLUBLA,
    emoji: "⚪⚫⚪",
    angle: 0,
    textcolor: 0x000000,
    color1: 0xffffff,
    color2: 0xffffff,
    color3: 0xffffff,
    angle2: 0,
    textcolor2: 0xffffff,
    color21: 0x000000,
    color22: 0x000000,
    color23: 0x000000,
  },
  san: {
    name: "Santos",
    type: Uniform.CLUBLA,
    emoji: "⚪⚫⚪",
    angle: 0,
    textcolor: 0xb69754,
    color1: 0xffffff,
    color2: 0xffffff,
    color3: 0xffffff,
    angle2: 0,
    textcolor2: 0xb69754,
    color21: 0x000000,
    color22: 0xffffff,
    color23: 0x000000,
  },
  sao: {
    name: "São Paulo",
    type: Uniform.CLUBLA,
    emoji: "🔴⚪⚫",
    angle: 90,
    textcolor: 0x000000,
    color1: 0xff0a0a,
    color2: 0xffffff,
    color3: 0x000000,
    angle2: 90,
    textcolor2: 0xffffff,
    color21: 0xce393b,
    color22: 0xce393b,
    color23: 0xce393b,
  },
  fla: {
    name: "Flamengo",
    type: Uniform.CLUBLA,
    emoji: "🔴⚫🔴",
    angle: 90,
    textcolor: 0xfcf1ed,
    color1: 0xba1719,
    color2: 0x1a1613,
    color3: 0xba1719,
    angle2: 90,
    textcolor2: 0xba1719,
    color21: 0x1a1613,
    color22: 0x1a1613,
    color23: 0x1a1613,
  },
  flu: {
    name: "Fluminense",
    type: Uniform.CLUBLA,
    emoji: "🔴⚪🟢",
    angle: 0,
    textcolor: 0xfcfaff,
    color1: 0x005c38,
    color2: 0x9b030c,
    color3: 0x005c38,
    angle2: 0,
    textcolor2: 0x920f2e,
    color21: 0xe4dadb,
    color22: 0xe4dadb,
    color23: 0xe4dadb,
  },
  vas: {
    name: "Vasco",
    type: Uniform.CLUBLA,
    emoji: "⚫⚪⚫",
    angle: 135,
    textcolor: 0xff0000,
    color1: 0xffffff,
    color2: 0x000000,
    color3: 0xffffff,
    angle2: 135,
    textcolor2: 0xff0000,
    color21: 0x000000,
    color22: 0xffffff,
    color23: 0x000000,
  },
  bot: {
    name: "Botafogo",
    type: Uniform.CLUBLA,
    emoji: "⚫⚪⚫",
    angle: 0,
    textcolor: 0xffffff,
    color1: 0xffffff,
    color2: 0x000000,
    color3: 0xffffff,
    angle2: 0,
    textcolor2: 0xffffff,
    color21: 0x000000,
    color22: 0x3c3a3f,
    color23: 0x000000,
  },
  gre: {
    name: "Gremio",
    type: Uniform.CLUBLA,
    emoji: "🔵⚪⚫",
    angle: 0,
    textcolor: 0xffffff,
    color1: 0x75acff,
    color2: 0x000000,
    color3: 0x75acff,
    angle2: 0,
    textcolor2: 0x4a87b7,
    color21: 0xffffff,
    color22: 0xffffff,
    color23: 0xffffff,
  },
  int: {
    name: "Internacional",
    type: Uniform.CLUBLA,
    emoji: "🔴⚪🔴",
    angle: 0,
    textcolor: 0xebe5e0,
    color1: 0xd3051f,
    color2: 0xd3051f,
    color3: 0xd3051f,
    angle2: 0,
    textcolor2: 0xe30222,
    color21: 0xebe5e0,
    color22: 0xebe5e0,
    color23: 0xebe5e0,
  },
  cru: {
    name: "Cruzeiro",
    type: Uniform.CLUBLA,
    emoji: "🔵⚪🔵",
    angle: 0,
    textcolor: 0xffffff,
    color1: 0x023286,
    color2: 0x023286,
    color3: 0x023286,
    angle2: 0,
    textcolor2: 0x101b51,
    color21: 0xffffff,
    color22: 0xffffff,
    color23: 0xffffff,
  },
  atl: {
    name: "Atlético-MG",
    type: Uniform.CLUBLA,
    emoji: "⚫⚪⚫",
    angle: 0,
    textcolor: 0xc91926,
    color1: 0x000000,
    color2: 0xffffff,
    color3: 0x000000,
    angle2: 90,
    textcolor2: 0xc91926,
    color21: 0x000000,
    color22: 0xffffff,
    color23: 0xffffff,
  },
  spo: {
    name: "Sport",
    type: Uniform.CLUBLA,
    emoji: "⚫🔴⚫",
    angle: 90,
    textcolor: 0xbcae46,
    color1: 0xbe2b2d,
    color2: 0x020906,
    color3: 0xbe2b2d,
    angle2: 90,
    textcolor2: 0xb6a043,
    color21: 0x111317,
    color22: 0xe5e0e2,
    color23: 0xe5e0e2,
  },
  riv: {
    name: "River Plate",
    type: Uniform.CLUBLA,
    emoji: "🔴⚪🔴",
    angle: 45,
    textcolor: 0x000000,
    color1: 0xfffafa,
    color2: 0xff0000,
    color3: 0xfffafa,
    angle2: 45,
    textcolor2: 0xffffff,
    color21: 0xaf1d27,
    color22: 0xea382c,
    color23: 0xaf1d27,
  },
  boc: {
    name: "Boca Juniors",
    type: Uniform.CLUBLA,
    emoji: "🔵🟡🔵",
    angle: 90,
    textcolor: 0xffffff,
    color1: 0x05009c,
    color2: 0xe0b60d,
    color3: 0x05009c,
    angle2: 90,
    textcolor2: 0xffffff,
    color21: 0xe0b60d,
    color22: 0x05009c,
    color23: 0xe0b60d,
  },
  /* CLUBES EU */
  /*
	"che": {
		"name": 'Chelsea',
		"type": Uniform.CLUBEU,
		"angle": 90,
		"textcolor": 0xFFFFFF,
		"color1": 0x0000CD,
		"color2": 0x0000CD,
		"color3": 0x0000CD,
	},
	"rea": {
		"name": 'Real Madrid',
		"type": Uniform.CLUBEU,
		"angle": 0,
		"textcolor": 0xDAA520,
		"color1": 0xFFFAFA,
		"color2": 0xFFFAFA,
		"color3": 0xFFFAFA,
	},
	"juv": {
		"name": 'Juventus',
		"type": Uniform.CLUBEU,
		"angle": 180,
		"textcolor": 0xDAA520,
		"color1": 0x000000,
		"color2": 0xFFFFFF,
		"color3": 0x000000,
	},
	"bay": {
		"name": 'Bayern de Munique',
		"type": Uniform.CLUBEU,
		"angle": 30,
		"textcolor": 0xFFD700,
		"color1": 0xFF0000,
		"color2": 0xF20000,
		"color3": 0xFF0000,
	},
	"bar": {
		"name": 'Barcelona',
		"type": Uniform.CLUBEU,
		"angle": 0,
		"textcolor": 0xFFD700,
		"color1": 0x00008B,
		"color2": 0x8B0000,
		"color3": 0x00008B,
	},
	"psg": {
		"name": 'Paris Sant-Germain',
		"type": Uniform.CLUBEU,
		"angle": 180,
		"textcolor": 0xFFFFFF,
		"color1": 0x000080,
		"color2": 0xB22222,
		"color3": 0x000080,
	},*/
};

room.setTeamColors(
  1,
  uniforms[acronymHome].angle,
  uniforms[acronymHome].textcolor,
  [
    uniforms[acronymHome].color1,
    uniforms[acronymHome].color2,
    uniforms[acronymHome].color3,
  ]
);

room.setTeamColors(
  2,
  uniforms[acronymGuest].angle,
  uniforms[acronymGuest].textcolor,
  [
    uniforms[acronymGuest].color1,
    uniforms[acronymGuest].color2,
    uniforms[acronymGuest].color3,
  ]
);

const trainingMap = `{"name":"AF 3v3 Official by Vit\u00e3o \u00ae from HaxMaps","width":710,"height":300,"bg":{"kickOffRadius":80,"color":"1D2431"},"vertexes":[{"x":-600,"y":-85,"bCoef":0.1,"cMask":["ball"]},{"x":-635,"y":-85,"bCoef":0.1,"cMask":["ball"]},{"x":-634,"y":-86,"bCoef":0.1,"cMask":["ball"]},{"x":-634,"y":86,"bCoef":0.1,"cMask":["ball"]},{"x":-635,"y":85,"bCoef":0.1,"cMask":["ball"]},{"x":-600,"y":85,"bCoef":0.1,"cMask":["ball"]},{"x":600,"y":85,"bCoef":0.1,"cMask":["ball"]},{"x":635,"y":85,"bCoef":0.1,"cMask":["ball"]},{"x":634,"y":86,"bCoef":0.1,"cMask":["ball"]},{"x":634,"y":-86,"bCoef":0.1,"cMask":["ball"]},{"x":635,"y":-85,"bCoef":0.1,"cMask":["ball"]},{"x":600,"y":-85,"bCoef":0.1,"cMask":["ball"]},{"x":-600,"y":-271.5,"cMask":["ball"]},{"x":-600,"y":-85,"cMask":["ball"]},{"x":-600,"y":85,"cMask":["ball"]},{"x":-600,"y":271.5,"cMask":["ball"]},{"x":-600,"y":270,"cMask":["ball"]},{"x":600,"y":270,"cMask":["ball"]},{"x":600,"y":271.5,"cMask":["ball"]},{"x":600,"y":85,"cMask":["ball"]},{"x":600,"y":-85,"cMask":["ball"]},{"x":600,"y":-271.5,"cMask":["ball"]},{"x":600,"y":-270,"cMask":["ball"]},{"x":-600,"y":-270,"cMask":["ball"]},{"x":-600,"y":-85,"cMask":[]},{"x":-600,"y":85,"cMask":[]},{"x":600,"y":85,"cMask":[]},{"x":600,"y":-85,"cMask":[]},{"x":-310,"y":268,"cMask":[]},{"x":-310,"y":-268,"cMask":[]},{"x":310,"y":-268,"cMask":[]},{"x":310,"y":268,"cMask":[]},{"x":-420,"y":-1,"cMask":[]},{"x":-420,"y":1,"cMask":[]},{"x":-420,"y":-2,"cMask":[]},{"x":-420,"y":2,"cMask":[]},{"x":0,"y":-80,"cMask":["red","blue"],"cGroup":["redKO"]},{"x":0,"y":80,"cMask":["red","blue"],"cGroup":["redKO"]},{"x":0,"y":-300,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":300,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-268,"cMask":[]},{"x":0,"y":-80,"cMask":[]},{"x":0,"y":268,"cMask":[]},{"x":0,"y":80,"cMask":[]},{"x":420,"y":-1,"cMask":[]},{"x":420,"y":1,"cMask":[]},{"x":420,"y":-2,"cMask":[]},{"x":420,"y":2,"cMask":[]},{"x":-310,"y":-135,"cMask":[]},{"x":-310,"y":135,"cMask":[]},{"x":310,"y":135,"cMask":[]},{"x":310,"y":-135,"cMask":[]},{"x":-598,"y":125,"cMask":[]},{"x":-530,"y":125,"cMask":[]},{"x":-530,"y":-125,"cMask":[]},{"x":-598,"y":-125,"cMask":[]},{"x":-530,"y":126.5,"cMask":[]},{"x":-530,"y":-126.5,"cMask":[]},{"x":598,"y":125,"cMask":[]},{"x":530,"y":125,"cMask":[]},{"x":530,"y":-125,"cMask":[]},{"x":598,"y":-125,"cMask":[]},{"x":530,"y":126.5,"cMask":[]},{"x":530,"y":-126.5,"cMask":[]},{"x":-50,"y":30,"cMask":[]},{"x":-25,"y":-30,"cMask":[]},{"x":11,"y":30,"cMask":[]},{"x":20,"y":-30,"cMask":[]},{"x":-42.5,"y":30,"cMask":[]},{"x":-17.5,"y":-30,"cMask":[]},{"x":-52,"y":30,"cMask":[]},{"x":-27,"y":-30,"cMask":[]},{"x":-40.5,"y":30,"cMask":[]},{"x":-15.5,"y":-30,"cMask":[]},{"x":-33,"y":30,"cMask":[]},{"x":-8,"y":-30,"cMask":[]},{"x":-31,"y":30,"cMask":[]},{"x":-6,"y":-30,"cMask":[]},{"x":-29,"y":30,"cMask":[]},{"x":-4,"y":-30,"cMask":[]},{"x":-27,"y":30,"cMask":[]},{"x":-2,"y":-30,"cMask":[]},{"x":-25,"y":30,"cMask":[]},{"x":0,"y":-30,"cMask":[]},{"x":5,"y":30,"cMask":[]},{"x":0,"y":-30,"cMask":[]},{"x":3,"y":30,"cMask":[]},{"x":-2,"y":-30,"cMask":[]},{"x":1,"y":30,"cMask":[]},{"x":-4,"y":-30,"cMask":[]},{"x":-1,"y":30,"cMask":[]},{"x":-6,"y":-30,"cMask":[]},{"x":-3,"y":30,"cMask":[]},{"x":-8,"y":-30,"cMask":[]},{"x":-21,"y":19,"cMask":[]},{"x":-5,"y":19,"cMask":[]},{"x":-21,"y":17,"cMask":[]},{"x":-5,"y":17,"cMask":[]},{"x":-21,"y":15,"cMask":[]},{"x":-5,"y":15,"cMask":[]},{"x":-21,"y":13,"cMask":[]},{"x":-5,"y":13,"cMask":[]},{"x":-21,"y":11,"cMask":[]},{"x":-5,"y":11,"cMask":[]},{"x":13,"y":30,"cMask":[]},{"x":22,"y":-30,"cMask":[]},{"x":15,"y":30,"cMask":[]},{"x":24,"y":-30,"cMask":[]},{"x":17,"y":30,"cMask":[]},{"x":26,"y":-30,"cMask":[]},{"x":19,"y":30,"cMask":[]},{"x":28,"y":-30,"cMask":[]},{"x":19,"y":-29,"cMask":[]},{"x":49,"y":-29,"cMask":[]},{"x":19,"y":-27,"cMask":[]},{"x":49,"y":-27,"cMask":[]},{"x":19,"y":-25,"cMask":[]},{"x":49,"y":-25,"cMask":[]},{"x":19,"y":-23,"cMask":[]},{"x":49,"y":-23,"cMask":[]},{"x":19,"y":-21,"cMask":[]},{"x":49,"y":-21,"cMask":[]},{"x":23,"y":-6,"cMask":[]},{"x":42,"y":-6,"cMask":[]},{"x":23,"y":-4,"cMask":[]},{"x":42,"y":-4,"cMask":[]},{"x":23,"y":-2,"cMask":[]},{"x":42,"y":-2,"cMask":[]},{"x":23,"y":0,"cMask":[]},{"x":42,"y":0,"cMask":[]},{"x":23,"y":2,"cMask":[]},{"x":42,"y":2,"cMask":[]},{"x":-52,"y":27,"cMask":[]},{"x":-27,"y":-33,"cMask":[]},{"x":9,"y":27,"cMask":[]},{"x":18,"y":-33,"cMask":[]},{"x":-44.5,"y":27,"cMask":[]},{"x":-19.5,"y":-33,"cMask":[]},{"x":-54,"y":27,"cMask":[]},{"x":-29,"y":-33,"cMask":[]},{"x":-42.5,"y":27,"cMask":[]},{"x":-17.5,"y":-33,"cMask":[]},{"x":-35,"y":27,"cMask":[]},{"x":-10,"y":-33,"cMask":[]},{"x":-33,"y":27,"cMask":[]},{"x":-8,"y":-33,"cMask":[]},{"x":-31,"y":27,"cMask":[]},{"x":-6,"y":-33,"cMask":[]},{"x":-29,"y":27,"cMask":[]},{"x":-4,"y":-33,"cMask":[]},{"x":-27,"y":27,"cMask":[]},{"x":-2,"y":-33,"cMask":[]},{"x":3,"y":27,"cMask":[]},{"x":-2,"y":-33,"cMask":[]},{"x":1,"y":27,"cMask":[]},{"x":-4,"y":-33,"cMask":[]},{"x":-1,"y":27,"cMask":[]},{"x":-6,"y":-33,"cMask":[]},{"x":-3,"y":27,"cMask":[]},{"x":-8,"y":-33,"cMask":[]},{"x":-5,"y":27,"cMask":[]},{"x":-10,"y":-33,"cMask":[]},{"x":-23,"y":16,"cMask":[]},{"x":-7,"y":16,"cMask":[]},{"x":-23,"y":14,"cMask":[]},{"x":-7,"y":14,"cMask":[]},{"x":-23,"y":12,"cMask":[]},{"x":-7,"y":12,"cMask":[]},{"x":-23,"y":10,"cMask":[]},{"x":-7,"y":10,"cMask":[]},{"x":-23,"y":8,"cMask":[]},{"x":-7,"y":8,"cMask":[]},{"x":11,"y":27,"cMask":[]},{"x":20,"y":-33,"cMask":[]},{"x":13,"y":27,"cMask":[]},{"x":22,"y":-33,"cMask":[]},{"x":15,"y":27,"cMask":[]},{"x":24,"y":-33,"cMask":[]},{"x":17,"y":27,"cMask":[]},{"x":26,"y":-33,"cMask":[]},{"x":17,"y":-32,"cMask":[]},{"x":47,"y":-32,"cMask":[]},{"x":17,"y":-30,"cMask":[]},{"x":47,"y":-30,"cMask":[]},{"x":17,"y":-28,"cMask":[]},{"x":47,"y":-28,"cMask":[]},{"x":17,"y":-26,"cMask":[]},{"x":47,"y":-26,"cMask":[]},{"x":17,"y":-24,"cMask":[]},{"x":47,"y":-24,"cMask":[]},{"x":21,"y":-9,"cMask":[]},{"x":40,"y":-9,"cMask":[]},{"x":21,"y":-7,"cMask":[]},{"x":40,"y":-7,"cMask":[]},{"x":21,"y":-5,"cMask":[]},{"x":40,"y":-5,"cMask":[]},{"x":21,"y":-3,"cMask":[]},{"x":40,"y":-3,"cMask":[]},{"x":21,"y":-1,"cMask":[]},{"x":40,"y":-1,"cMask":[]}],"segments":[{"v0":0,"v1":1,"bias":10,"bCoef":0.1,"cMask":["ball"],"color":"717F98"},{"v0":3,"v1":2,"bias":-10,"bCoef":0.1,"curve":35,"curveF":3.1715948023632126,"cMask":["ball"],"color":"717F98"},{"v0":4,"v1":5,"bias":10,"bCoef":0.1,"cMask":["ball"],"color":"717F98"},{"v0":6,"v1":7,"bias":10,"bCoef":0.1,"cMask":["ball"],"color":"717F98"},{"v0":9,"v1":8,"bias":-10,"bCoef":0.1,"curve":35,"curveF":3.1715948023632126,"cMask":["ball"],"color":"717F98"},{"v0":10,"v1":11,"bias":10,"bCoef":0.1,"cMask":["ball"],"color":"717F98"},{"v0":12,"v1":13,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":14,"v1":15,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":16,"v1":17,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":18,"v1":19,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":20,"v1":21,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":22,"v1":23,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":24,"v1":25,"cMask":[],"color":"3B424F"},{"v0":26,"v1":27,"cMask":[],"color":"3B424F"},{"v0":28,"v1":29,"cMask":[],"color":"161C26"},{"v0":30,"v1":31,"cMask":[],"color":"161C26"},{"v0":33,"v1":32,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":32,"v1":33,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":35,"v1":34,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":34,"v1":35,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":38,"v1":36,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":39,"v1":37,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":37,"v1":36,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["blueKO"]},{"v0":36,"v1":37,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["redKO"]},{"v0":40,"v1":41,"cMask":[],"color":"161C26"},{"v0":42,"v1":43,"cMask":[],"color":"161C26"},{"v0":43,"v1":41,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":41,"v1":43,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":45,"v1":44,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":44,"v1":45,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":47,"v1":46,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":46,"v1":47,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":48,"v1":49,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"161C26"},{"v0":50,"v1":51,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"161C26"},{"v0":52,"v1":53,"cMask":[],"color":"161C26"},{"v0":54,"v1":55,"cMask":[],"color":"161C26"},{"v0":56,"v1":57,"cMask":[],"color":"161C26"},{"v0":58,"v1":59,"cMask":[],"color":"161C26"},{"v0":60,"v1":61,"cMask":[],"color":"161C26"},{"v0":62,"v1":63,"cMask":[],"color":"161C26"},{"v0":64,"v1":65,"cMask":[],"color":"9101D"},{"v0":66,"v1":67,"cMask":[],"color":"9101D"},{"v0":68,"v1":69,"cMask":[],"color":"9101D"},{"v0":70,"v1":71,"cMask":[],"color":"9101D"},{"v0":72,"v1":73,"cMask":[],"color":"9101D"},{"v0":74,"v1":75,"cMask":[],"color":"9101D"},{"v0":76,"v1":77,"cMask":[],"color":"9101D"},{"v0":78,"v1":79,"cMask":[],"color":"9101D"},{"v0":80,"v1":81,"cMask":[],"color":"9101D"},{"v0":82,"v1":83,"cMask":[],"color":"9101D"},{"v0":84,"v1":85,"cMask":[],"color":"9101D"},{"v0":86,"v1":87,"cMask":[],"color":"9101D"},{"v0":88,"v1":89,"cMask":[],"color":"9101D"},{"v0":90,"v1":91,"cMask":[],"color":"9101D"},{"v0":92,"v1":93,"cMask":[],"color":"9101D"},{"v0":94,"v1":95,"cMask":[],"color":"9101D"},{"v0":96,"v1":97,"cMask":[],"color":"9101D"},{"v0":98,"v1":99,"cMask":[],"color":"9101D"},{"v0":100,"v1":101,"cMask":[],"color":"9101D"},{"v0":102,"v1":103,"cMask":[],"color":"9101D"},{"v0":104,"v1":105,"cMask":[],"color":"9101D"},{"v0":106,"v1":107,"cMask":[],"color":"9101D"},{"v0":108,"v1":109,"cMask":[],"color":"9101D"},{"v0":110,"v1":111,"cMask":[],"color":"9101D"},{"v0":112,"v1":113,"cMask":[],"color":"9101D"},{"v0":114,"v1":115,"cMask":[],"color":"9101D"},{"v0":116,"v1":117,"cMask":[],"color":"9101D"},{"v0":118,"v1":119,"cMask":[],"color":"9101D"},{"v0":120,"v1":121,"cMask":[],"color":"9101D"},{"v0":122,"v1":123,"cMask":[],"color":"9101D"},{"v0":124,"v1":125,"cMask":[],"color":"9101D"},{"v0":126,"v1":127,"cMask":[],"color":"9101D"},{"v0":128,"v1":129,"cMask":[],"color":"9101D"},{"v0":130,"v1":131,"cMask":[],"color":"9101D"},{"v0":132,"v1":133,"cMask":[],"color":"333945"},{"v0":134,"v1":135,"cMask":[],"color":"333945"},{"v0":136,"v1":137,"cMask":[],"color":"333945"},{"v0":138,"v1":139,"cMask":[],"color":"333945"},{"v0":140,"v1":141,"cMask":[],"color":"333945"},{"v0":142,"v1":143,"cMask":[],"color":"333945"},{"v0":144,"v1":145,"cMask":[],"color":"333945"},{"v0":146,"v1":147,"cMask":[],"color":"333945"},{"v0":148,"v1":149,"cMask":[],"color":"333945"},{"v0":150,"v1":151,"cMask":[],"color":"333945"},{"v0":152,"v1":153,"cMask":[],"color":"333945"},{"v0":154,"v1":155,"cMask":[],"color":"333945"},{"v0":156,"v1":157,"cMask":[],"color":"333945"},{"v0":158,"v1":159,"cMask":[],"color":"333945"},{"v0":160,"v1":161,"cMask":[],"color":"333945"},{"v0":162,"v1":163,"cMask":[],"color":"333945"},{"v0":164,"v1":165,"cMask":[],"color":"333945"},{"v0":166,"v1":167,"cMask":[],"color":"333945"},{"v0":168,"v1":169,"cMask":[],"color":"333945"},{"v0":170,"v1":171,"cMask":[],"color":"333945"},{"v0":172,"v1":173,"cMask":[],"color":"333945"},{"v0":174,"v1":175,"cMask":[],"color":"333945"},{"v0":176,"v1":177,"cMask":[],"color":"333945"},{"v0":178,"v1":179,"cMask":[],"color":"333945"},{"v0":180,"v1":181,"cMask":[],"color":"333945"},{"v0":182,"v1":183,"cMask":[],"color":"333945"},{"v0":184,"v1":185,"cMask":[],"color":"333945"},{"v0":186,"v1":187,"cMask":[],"color":"333945"},{"v0":188,"v1":189,"cMask":[],"color":"333945"},{"v0":190,"v1":191,"cMask":[],"color":"333945"},{"v0":192,"v1":193,"cMask":[],"color":"333945"},{"v0":194,"v1":195,"cMask":[],"color":"333945"},{"v0":196,"v1":197,"cMask":[],"color":"333945"},{"v0":198,"v1":199,"cMask":[],"color":"333945"}],"planes":[{"normal":[0,1],"dist":-300},{"normal":[0,-1],"dist":-300},{"normal":[1,0],"dist":-710},{"normal":[-1,0],"dist":-710},{"normal":[-1,0],"dist":-310,"bCoef":0,"cMask":["c1"]},{"normal":[1,0],"dist":-310,"bCoef":0,"cMask":["c0"]}],"goals":[{"p0":[-608.3,-85],"p1":[-608.3,85],"team":"red"},{"p0":[608.3,85],"p1":[608.3,-85],"team":"blue"}],"discs":[{"radius":5.8,"bCoef":0.412,"invMass":1.5,"color":"FFA500","cGroup":["ball","kick","score"]},{"pos":[-600,85],"radius":5.4,"invMass":0,"color":"3B424F"},{"pos":[-600,-85],"radius":5.4,"invMass":0,"color":"3B424F"},{"pos":[600,85],"radius":5.4,"invMass":0,"color":"3B424F"},{"pos":[600,-85],"radius":5.4,"invMass":0,"color":"3B424F"}],"playerPhysics":{"bCoef":0,"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":4.545},"ballPhysics":"disc0","spawnDistance":366.5}`;
const bigMap = `{"name":"AF Official 4v4 by Vitão ®","width":810,"height":350,"bg":{"kickOffRadius":80,"color":"1D2431"},"vertexes":[{"x":-700,"y":-85,"bCoef":0.1,"cMask":["ball"]},{"x":-735,"y":-85,"bCoef":0.1,"cMask":["ball"]},{"x":-734,"y":-86,"bCoef":0.1,"cMask":["ball"]},{"x":-734,"y":86,"bCoef":0.1,"cMask":["ball"]},{"x":-735,"y":85,"bCoef":0.1,"cMask":["ball"]},{"x":-700,"y":85,"bCoef":0.1,"cMask":["ball"]},{"x":700,"y":85,"bCoef":0.1,"cMask":["ball"]},{"x":735,"y":85,"bCoef":0.1,"cMask":["ball"]},{"x":734,"y":86,"bCoef":0.1,"cMask":["ball"]},{"x":734,"y":-86,"bCoef":0.1,"cMask":["ball"]},{"x":735,"y":-85,"bCoef":0.1,"cMask":["ball"]},{"x":700,"y":-85,"bCoef":0.1,"cMask":["ball"]},{"x":-700,"y":-321.5,"cMask":["ball"]},{"x":-700,"y":-85,"cMask":["ball"]},{"x":-700,"y":85,"cMask":["ball"]},{"x":-700,"y":321.5,"cMask":["ball"]},{"x":-700,"y":320,"cMask":["ball"]},{"x":700,"y":320,"cMask":["ball"]},{"x":700,"y":321.5,"cMask":["ball"]},{"x":700,"y":85,"cMask":["ball"]},{"x":700,"y":-85,"cMask":["ball"]},{"x":700,"y":-321.5,"cMask":["ball"]},{"x":700,"y":-320,"cMask":["ball"]},{"x":-700,"y":-320,"cMask":["ball"]},{"x":-700,"y":-85,"cMask":[]},{"x":-700,"y":85,"cMask":[]},{"x":700,"y":85,"cMask":[]},{"x":700,"y":-85,"cMask":[]},{"x":-360,"y":318,"cMask":[]},{"x":-360,"y":-318,"cMask":[]},{"x":360,"y":-318,"cMask":[]},{"x":360,"y":318,"cMask":[]},{"x":-500,"y":-1,"cMask":[]},{"x":-500,"y":1,"cMask":[]},{"x":-500,"y":-2,"cMask":[]},{"x":-500,"y":2,"cMask":[]},{"x":0,"y":-80,"cMask":["red","blue"],"cGroup":["redKO"]},{"x":0,"y":80,"cMask":["red","blue"],"cGroup":["redKO"]},{"x":0,"y":-350,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":350,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-318,"cMask":[]},{"x":0,"y":-80,"cMask":[]},{"x":0,"y":318,"cMask":[]},{"x":0,"y":80,"cMask":[]},{"x":500,"y":-1,"cMask":[]},{"x":500,"y":1,"cMask":[]},{"x":500,"y":-2,"cMask":[]},{"x":500,"y":2,"cMask":[]},{"x":-360,"y":-135,"cMask":[]},{"x":-360,"y":135,"cMask":[]},{"x":360,"y":135,"cMask":[]},{"x":360,"y":-135,"cMask":[]},{"x":-698,"y":125,"cMask":[]},{"x":-630,"y":125,"cMask":[]},{"x":-630,"y":-125,"cMask":[]},{"x":-698,"y":-125,"cMask":[]},{"x":-630,"y":126.5,"cMask":[]},{"x":-630,"y":-126.5,"cMask":[]},{"x":698,"y":125,"cMask":[]},{"x":630,"y":125,"cMask":[]},{"x":630,"y":-125,"cMask":[]},{"x":698,"y":-125,"cMask":[]},{"x":630,"y":126.5,"cMask":[]},{"x":630,"y":-126.5,"cMask":[]},{"x":-50,"y":30,"cMask":[]},{"x":-25,"y":-30,"cMask":[]},{"x":11,"y":30,"cMask":[]},{"x":20,"y":-30,"cMask":[]},{"x":-42.5,"y":30,"cMask":[]},{"x":-17.5,"y":-30,"cMask":[]},{"x":-52,"y":30,"cMask":[]},{"x":-27,"y":-30,"cMask":[]},{"x":-40.5,"y":30,"cMask":[]},{"x":-15.5,"y":-30,"cMask":[]},{"x":-33,"y":30,"cMask":[]},{"x":-8,"y":-30,"cMask":[]},{"x":-31,"y":30,"cMask":[]},{"x":-6,"y":-30,"cMask":[]},{"x":-29,"y":30,"cMask":[]},{"x":-4,"y":-30,"cMask":[]},{"x":-27,"y":30,"cMask":[]},{"x":-2,"y":-30,"cMask":[]},{"x":-25,"y":30,"cMask":[]},{"x":0,"y":-30,"cMask":[]},{"x":5,"y":30,"cMask":[]},{"x":0,"y":-30,"cMask":[]},{"x":3,"y":30,"cMask":[]},{"x":-2,"y":-30,"cMask":[]},{"x":1,"y":30,"cMask":[]},{"x":-4,"y":-30,"cMask":[]},{"x":-1,"y":30,"cMask":[]},{"x":-6,"y":-30,"cMask":[]},{"x":-3,"y":30,"cMask":[]},{"x":-8,"y":-30,"cMask":[]},{"x":-21,"y":19,"cMask":[]},{"x":-5,"y":19,"cMask":[]},{"x":-21,"y":17,"cMask":[]},{"x":-5,"y":17,"cMask":[]},{"x":-21,"y":15,"cMask":[]},{"x":-5,"y":15,"cMask":[]},{"x":-21,"y":13,"cMask":[]},{"x":-5,"y":13,"cMask":[]},{"x":-21,"y":11,"cMask":[]},{"x":-5,"y":11,"cMask":[]},{"x":13,"y":30,"cMask":[]},{"x":22,"y":-30,"cMask":[]},{"x":15,"y":30,"cMask":[]},{"x":24,"y":-30,"cMask":[]},{"x":17,"y":30,"cMask":[]},{"x":26,"y":-30,"cMask":[]},{"x":19,"y":30,"cMask":[]},{"x":28,"y":-30,"cMask":[]},{"x":19,"y":-29,"cMask":[]},{"x":49,"y":-29,"cMask":[]},{"x":19,"y":-27,"cMask":[]},{"x":49,"y":-27,"cMask":[]},{"x":19,"y":-25,"cMask":[]},{"x":49,"y":-25,"cMask":[]},{"x":19,"y":-23,"cMask":[]},{"x":49,"y":-23,"cMask":[]},{"x":19,"y":-21,"cMask":[]},{"x":49,"y":-21,"cMask":[]},{"x":23,"y":-6,"cMask":[]},{"x":42,"y":-6,"cMask":[]},{"x":23,"y":-4,"cMask":[]},{"x":42,"y":-4,"cMask":[]},{"x":23,"y":-2,"cMask":[]},{"x":42,"y":-2,"cMask":[]},{"x":23,"y":0,"cMask":[]},{"x":42,"y":0,"cMask":[]},{"x":23,"y":2,"cMask":[]},{"x":42,"y":2,"cMask":[]},{"x":-52,"y":27,"cMask":[]},{"x":-27,"y":-33,"cMask":[]},{"x":9,"y":27,"cMask":[]},{"x":18,"y":-33,"cMask":[]},{"x":-44.5,"y":27,"cMask":[]},{"x":-19.5,"y":-33,"cMask":[]},{"x":-54,"y":27,"cMask":[]},{"x":-29,"y":-33,"cMask":[]},{"x":-42.5,"y":27,"cMask":[]},{"x":-17.5,"y":-33,"cMask":[]},{"x":-35,"y":27,"cMask":[]},{"x":-10,"y":-33,"cMask":[]},{"x":-33,"y":27,"cMask":[]},{"x":-8,"y":-33,"cMask":[]},{"x":-31,"y":27,"cMask":[]},{"x":-6,"y":-33,"cMask":[]},{"x":-29,"y":27,"cMask":[]},{"x":-4,"y":-33,"cMask":[]},{"x":-27,"y":27,"cMask":[]},{"x":-2,"y":-33,"cMask":[]},{"x":3,"y":27,"cMask":[]},{"x":-2,"y":-33,"cMask":[]},{"x":1,"y":27,"cMask":[]},{"x":-4,"y":-33,"cMask":[]},{"x":-1,"y":27,"cMask":[]},{"x":-6,"y":-33,"cMask":[]},{"x":-3,"y":27,"cMask":[]},{"x":-8,"y":-33,"cMask":[]},{"x":-5,"y":27,"cMask":[]},{"x":-10,"y":-33,"cMask":[]},{"x":-23,"y":16,"cMask":[]},{"x":-7,"y":16,"cMask":[]},{"x":-23,"y":14,"cMask":[]},{"x":-7,"y":14,"cMask":[]},{"x":-23,"y":12,"cMask":[]},{"x":-7,"y":12,"cMask":[]},{"x":-23,"y":10,"cMask":[]},{"x":-7,"y":10,"cMask":[]},{"x":-23,"y":8,"cMask":[]},{"x":-7,"y":8,"cMask":[]},{"x":11,"y":27,"cMask":[]},{"x":20,"y":-33,"cMask":[]},{"x":13,"y":27,"cMask":[]},{"x":22,"y":-33,"cMask":[]},{"x":15,"y":27,"cMask":[]},{"x":24,"y":-33,"cMask":[]},{"x":17,"y":27,"cMask":[]},{"x":26,"y":-33,"cMask":[]},{"x":17,"y":-32,"cMask":[]},{"x":47,"y":-32,"cMask":[]},{"x":17,"y":-30,"cMask":[]},{"x":47,"y":-30,"cMask":[]},{"x":17,"y":-28,"cMask":[]},{"x":47,"y":-28,"cMask":[]},{"x":17,"y":-26,"cMask":[]},{"x":47,"y":-26,"cMask":[]},{"x":17,"y":-24,"cMask":[]},{"x":47,"y":-24,"cMask":[]},{"x":21,"y":-9,"cMask":[]},{"x":40,"y":-9,"cMask":[]},{"x":21,"y":-7,"cMask":[]},{"x":40,"y":-7,"cMask":[]},{"x":21,"y":-5,"cMask":[]},{"x":40,"y":-5,"cMask":[]},{"x":21,"y":-3,"cMask":[]},{"x":40,"y":-3,"cMask":[]},{"x":21,"y":-1,"cMask":[]},{"x":40,"y":-1,"cMask":[]}],"segments":[{"v0":0,"v1":1,"bias":10,"bCoef":0.1,"cMask":["ball"],"color":"717F98"},{"v0":3,"v1":2,"bias":-10,"bCoef":0.1,"curve":35,"curveF":3.1715948023632126,"cMask":["ball"],"color":"717F98"},{"v0":4,"v1":5,"bias":10,"bCoef":0.1,"cMask":["ball"],"color":"717F98"},{"v0":6,"v1":7,"bias":10,"bCoef":0.1,"cMask":["ball"],"color":"717F98"},{"v0":9,"v1":8,"bias":-10,"bCoef":0.1,"curve":35,"curveF":3.1715948023632126,"cMask":["ball"],"color":"717F98"},{"v0":10,"v1":11,"bias":10,"bCoef":0.1,"cMask":["ball"],"color":"717F98"},{"v0":12,"v1":13,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":14,"v1":15,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":16,"v1":17,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":18,"v1":19,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":20,"v1":21,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":22,"v1":23,"bias":10,"cMask":["ball"],"color":"717F98"},{"v0":24,"v1":25,"cMask":[],"color":"3B424F"},{"v0":26,"v1":27,"cMask":[],"color":"3B424F"},{"v0":28,"v1":29,"cMask":[],"color":"161C26"},{"v0":30,"v1":31,"cMask":[],"color":"161C26"},{"v0":33,"v1":32,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":32,"v1":33,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":35,"v1":34,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":34,"v1":35,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":38,"v1":36,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":39,"v1":37,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":37,"v1":36,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["blueKO"]},{"v0":36,"v1":37,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["redKO"]},{"v0":40,"v1":41,"cMask":[],"color":"161C26"},{"v0":42,"v1":43,"cMask":[],"color":"161C26"},{"v0":43,"v1":41,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":41,"v1":43,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":45,"v1":44,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":44,"v1":45,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":47,"v1":46,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":46,"v1":47,"curve":180,"curveF":6.123233995736766e-17,"cMask":[],"color":"161C26"},{"v0":48,"v1":49,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"161C26"},{"v0":50,"v1":51,"curve":89.99999999999999,"curveF":1.0000000000000002,"cMask":[],"color":"161C26"},{"v0":52,"v1":53,"cMask":[],"color":"161C26"},{"v0":54,"v1":55,"cMask":[],"color":"161C26"},{"v0":56,"v1":57,"cMask":[],"color":"161C26"},{"v0":58,"v1":59,"cMask":[],"color":"161C26"},{"v0":60,"v1":61,"cMask":[],"color":"161C26"},{"v0":62,"v1":63,"cMask":[],"color":"161C26"},{"v0":64,"v1":65,"cMask":[],"color":"9101D"},{"v0":66,"v1":67,"cMask":[],"color":"9101D"},{"v0":68,"v1":69,"cMask":[],"color":"9101D"},{"v0":70,"v1":71,"cMask":[],"color":"9101D"},{"v0":72,"v1":73,"cMask":[],"color":"9101D"},{"v0":74,"v1":75,"cMask":[],"color":"9101D"},{"v0":76,"v1":77,"cMask":[],"color":"9101D"},{"v0":78,"v1":79,"cMask":[],"color":"9101D"},{"v0":80,"v1":81,"cMask":[],"color":"9101D"},{"v0":82,"v1":83,"cMask":[],"color":"9101D"},{"v0":84,"v1":85,"cMask":[],"color":"9101D"},{"v0":86,"v1":87,"cMask":[],"color":"9101D"},{"v0":88,"v1":89,"cMask":[],"color":"9101D"},{"v0":90,"v1":91,"cMask":[],"color":"9101D"},{"v0":92,"v1":93,"cMask":[],"color":"9101D"},{"v0":94,"v1":95,"cMask":[],"color":"9101D"},{"v0":96,"v1":97,"cMask":[],"color":"9101D"},{"v0":98,"v1":99,"cMask":[],"color":"9101D"},{"v0":100,"v1":101,"cMask":[],"color":"9101D"},{"v0":102,"v1":103,"cMask":[],"color":"9101D"},{"v0":104,"v1":105,"cMask":[],"color":"9101D"},{"v0":106,"v1":107,"cMask":[],"color":"9101D"},{"v0":108,"v1":109,"cMask":[],"color":"9101D"},{"v0":110,"v1":111,"cMask":[],"color":"9101D"},{"v0":112,"v1":113,"cMask":[],"color":"9101D"},{"v0":114,"v1":115,"cMask":[],"color":"9101D"},{"v0":116,"v1":117,"cMask":[],"color":"9101D"},{"v0":118,"v1":119,"cMask":[],"color":"9101D"},{"v0":120,"v1":121,"cMask":[],"color":"9101D"},{"v0":122,"v1":123,"cMask":[],"color":"9101D"},{"v0":124,"v1":125,"cMask":[],"color":"9101D"},{"v0":126,"v1":127,"cMask":[],"color":"9101D"},{"v0":128,"v1":129,"cMask":[],"color":"9101D"},{"v0":130,"v1":131,"cMask":[],"color":"9101D"},{"v0":132,"v1":133,"cMask":[],"color":"333945"},{"v0":134,"v1":135,"cMask":[],"color":"333945"},{"v0":136,"v1":137,"cMask":[],"color":"333945"},{"v0":138,"v1":139,"cMask":[],"color":"333945"},{"v0":140,"v1":141,"cMask":[],"color":"333945"},{"v0":142,"v1":143,"cMask":[],"color":"333945"},{"v0":144,"v1":145,"cMask":[],"color":"333945"},{"v0":146,"v1":147,"cMask":[],"color":"333945"},{"v0":148,"v1":149,"cMask":[],"color":"333945"},{"v0":150,"v1":151,"cMask":[],"color":"333945"},{"v0":152,"v1":153,"cMask":[],"color":"333945"},{"v0":154,"v1":155,"cMask":[],"color":"333945"},{"v0":156,"v1":157,"cMask":[],"color":"333945"},{"v0":158,"v1":159,"cMask":[],"color":"333945"},{"v0":160,"v1":161,"cMask":[],"color":"333945"},{"v0":162,"v1":163,"cMask":[],"color":"333945"},{"v0":164,"v1":165,"cMask":[],"color":"333945"},{"v0":166,"v1":167,"cMask":[],"color":"333945"},{"v0":168,"v1":169,"cMask":[],"color":"333945"},{"v0":170,"v1":171,"cMask":[],"color":"333945"},{"v0":172,"v1":173,"cMask":[],"color":"333945"},{"v0":174,"v1":175,"cMask":[],"color":"333945"},{"v0":176,"v1":177,"cMask":[],"color":"333945"},{"v0":178,"v1":179,"cMask":[],"color":"333945"},{"v0":180,"v1":181,"cMask":[],"color":"333945"},{"v0":182,"v1":183,"cMask":[],"color":"333945"},{"v0":184,"v1":185,"cMask":[],"color":"333945"},{"v0":186,"v1":187,"cMask":[],"color":"333945"},{"v0":188,"v1":189,"cMask":[],"color":"333945"},{"v0":190,"v1":191,"cMask":[],"color":"333945"},{"v0":192,"v1":193,"cMask":[],"color":"333945"},{"v0":194,"v1":195,"cMask":[],"color":"333945"},{"v0":196,"v1":197,"cMask":[],"color":"333945"},{"v0":198,"v1":199,"cMask":[],"color":"333945"}],"planes":[{"normal":[0,1],"dist":-350},{"normal":[0,-1],"dist":-350},{"normal":[1,0],"dist":-810},{"normal":[-1,0],"dist":-810},{"normal":[-1,0],"dist":-360,"bCoef":0,"cMask":["c1"]},{"normal":[1,0],"dist":-360,"bCoef":0,"cMask":["c0"]}],"goals":[{"p0":[-708.3,-85],"p1":[-708.3,85],"team":"red"},{"p0":[708.3,85],"p1":[708.3,-85],"team":"blue"}],"discs":[{"radius":5.8,"bCoef":0.412,"invMass":1.5,"color":"FFA500","cGroup":["ball","kick","score"]},{"pos":[-700,85],"radius":5.4,"invMass":0,"color":"3B424F"},{"pos":[-700,-85],"radius":5.4,"invMass":0,"color":"3B424F"},{"pos":[700,85],"radius":5.4,"invMass":0,"color":"3B424F"},{"pos":[700,-85],"radius":5.4,"invMass":0,"color":"3B424F"}],"playerPhysics":{"bCoef":0,"acceleration":0.11,"kickingAcceleration":0.083,"kickStrength":4.545},"ballPhysics":"disc0","spawnDistance":366.5}`;
var currentStadium = "training";
var bigMapObj = JSON.parse(trainingMap);

room.setScoreLimit(scoreLimit);
room.setTimeLimit(timeLimit);
room.setTeamsLock(true);
room.setKickRateLimit(6, 0, 0);

var masterPassword = 1603;
var roomPassword = "";

/* OPTIONS */

var drawTimeLimit = Infinity;
var teamSize = 4;
var maxAdmins = 0;
var disableBans = false;
var debugMode = false;
var afkLimit = debugMode ? Infinity : 12;

var defaultSlowMode = 0.5;
var chooseModeSlowMode = 1;
var slowMode = defaultSlowMode;
var SMSet = new Set();

var hideClaimMessage = true;
var mentionPlayersUnpause = true;

/* OBJECTS */

class Goal {
  constructor(time, team, striker, assist) {
    this.time = time;
    this.team = team;
    this.striker = striker;
    this.assist = assist;
  }
}

class Game {
  constructor() {
    this.date = Date.now();
    this.scores = room.getScores();
    this.playerComp = getStartingLineups();
    this.goals = [];
    this.rec = room.startRecording();
    this.touchArray = [];
  }
}

class PlayerComposition {
  constructor(player, auth, timeEntry, timeExit) {
    this.player = player;
    this.auth = auth;
    this.timeEntry = timeEntry;
    this.timeExit = timeExit;
    this.inactivityTicks = 0;
    this.GKTicks = 0;
  }
}

class MutePlayer {
  constructor(name, id, auth) {
    this.id = MutePlayer.incrementId();
    this.name = name;
    this.playerId = id;
    this.auth = auth;
    this.unmuteTimeout = null;
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1;
    else this.latestId++;
    return this.latestId;
  }

  setDuration(minutes) {
    this.unmuteTimeout = setTimeout(() => {
      room.sendAnnouncement(
        `You have been unmuted.`,
        this.playerId,
        announcementColor,
        "bold",
        HaxNotification.CHAT
      );
      this.remove();
    }, minutes * 60 * 1000);
    muteArray.add(this);
  }

  remove() {
    this.unmuteTimeout = null;
    muteArray.removeById(this.id);
  }
}

class MuteList {
  constructor() {
    this.list = [];
  }

  add(mutePlayer) {
    this.list.push(mutePlayer);
    return mutePlayer;
  }

  getById(id) {
    var index = this.list.findIndex((mutePlayer) => mutePlayer.id === id);
    if (index !== -1) {
      return this.list[index];
    }
    return null;
  }

  getByPlayerId(id) {
    var index = this.list.findIndex((mutePlayer) => mutePlayer.playerId === id);
    if (index !== -1) {
      return this.list[index];
    }
    return null;
  }

  getByAuth(auth) {
    var index = this.list.findIndex((mutePlayer) => mutePlayer.auth === auth);
    if (index !== -1) {
      return this.list[index];
    }
    return null;
  }

  removeById(id) {
    var index = this.list.findIndex((mutePlayer) => mutePlayer.id === id);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  }

  removeByAuth(auth) {
    var index = this.list.findIndex((mutePlayer) => mutePlayer.auth === auth);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  }
}

class BallTouch {
  constructor(player, time, goal, position) {
    this.player = player;
    this.time = time;
    this.goal = goal;
    this.position = position;
  }
}

class HaxStatistics {
  constructor(playerName = "") {
    this.playerName = playerName;
    this.games = 0;
    this.wins = 0;
    this.winrate = "0.00%";
    this.playtime = 0;
    this.goals = 0;
    this.assists = 0;
    this.CS = 0;
    this.ownGoals = 0;
  }
}

/* PLAYERS */

const Team = { SPECTATORS: 0, RED: 1, BLUE: 2 };
const State = { PLAY: 0, PAUSE: 1, STOP: 2 };
const Role = { PLAYER: 0, ADMIN_TEMP: 1, ADMIN_PERM: 2, MASTER: 3 };
const HaxNotification = { NONE: 0, CHAT: 1, MENTION: 2 };
const Situation = { STOP: 0, KICKOFF: 1, PLAY: 2, GOAL: 3 };

var gameState = State.STOP;
var playSituation = Situation.STOP;
var goldenGoal = false;

var playersAll = [];
var players = [];
var teamRed = [];
var teamBlue = [];
var teamSpec = [];

var teamRedStats = [];
var teamBlueStats = [];

var banList = [];

/* STATS */

var possession = [0, 0];
var actionZoneHalf = [0, 0];
var lastWinner = Team.SPECTATORS;
var streak = 0;

/* AUTH */

var authArray = [];
var adminList = [
  // ['INSERT_AUTH_HERE_1', 'NICK_OF_ADMIN_1'],
  // ['INSERT_AUTH_HERE_2', 'NICK_OF_ADMIN_2'],
];
var masterList = [
  // 'INSERT_MASTER_AUTH_HERE',
  // 'INSERT_MASTER_AUTH_HERE_2'
];

/* COMMANDS */

var commands = {
  help: {
    aliases: ["commands"],
    roles: Role.PLAYER,
    desc: `
	This command shows all the available commands. It also can show the description of a command in particular.
Example: \'!help bb\' will show the description of the \'bb\' command.`,
    function: helpCommand,
  },
  claim: {
    aliases: [],
    roles: Role.PLAYER,
    desc: false,
    function: masterCommand,
  },
  afk: {
    aliases: [],
    roles: Role.PLAYER,
    desc: `
        This command makes you go AFK.
    It has constraints: 1 minute minimum of AFK time, 5 minutes maximum and 10 minutes cooldown.`,
    function: afkCommand,
  },
  afks: {
    aliases: ["afklist"],
    roles: Role.PLAYER,
    desc: `
        This command shows all the players that are AFK.`,
    function: afkListCommand,
  },
  bb: {
    aliases: ["bye", "gn", "cya"],
    roles: Role.PLAYER,
    desc: `
	This command makes you leave instantly (use recommended).`,
    function: leaveCommand,
  },
  me: {
    aliases: ["stat", "stats"],
    roles: Role.PLAYER,
    desc: `
        This command shows your global stats in the room.`,
    function: globalStatsCommand,
  },
  rename: {
    aliases: [],
    roles: Role.PLAYER,
    desc: `
        This command allows you to rename yourself for the leaderboard.`,
    function: renameCommand,
  },
  games: {
    aliases: [],
    roles: Role.PLAYER,
    desc: `
        This command shows the top 5 players with the most games in the room.`,
    function: statsLeaderboardCommand,
  },
  wins: {
    aliases: [],
    roles: Role.PLAYER,
    desc: `
        This command shows the top 5 players with the most wins in the room.`,
    function: statsLeaderboardCommand,
  },
  goals: {
    aliases: [],
    roles: Role.PLAYER,
    desc: `
        This command shows the top 5 players with the most goals in the room.`,
    function: statsLeaderboardCommand,
  },
  assists: {
    aliases: [],
    roles: Role.PLAYER,
    desc: `
        This command shows the top 5 players with the most assists in the room.`,
    function: statsLeaderboardCommand,
  },
  cs: {
    aliases: [],
    roles: Role.PLAYER,
    desc: `
        This command shows the top 5 players with the most CS in the room.`,
    function: statsLeaderboardCommand,
  },
  playtime: {
    aliases: [],
    roles: Role.PLAYER,
    desc: `
        This command shows the top 5 players with the most time played in the room.`,
    function: statsLeaderboardCommand,
  },
  training: {
    aliases: [],
    roles: Role.ADMIN_TEMP,
    desc: `
        This command loads the classic training stadium.`,
    function: stadiumCommand,
  },
  classic: {
    aliases: [],
    roles: Role.ADMIN_TEMP,
    desc: `
        This command loads the classic stadium.`,
    function: stadiumCommand,
  },
  big: {
    aliases: [],
    roles: Role.ADMIN_TEMP,
    desc: `
        This command loads the big stadium.`,
    function: stadiumCommand,
  },
  rr: {
    aliases: [],
    roles: Role.ADMIN_TEMP,
    desc: `
    This command restarts the game.`,
    function: restartCommand,
  },
  rrs: {
    aliases: [],
    roles: Role.ADMIN_TEMP,
    desc: `
    This command swaps the teams and restarts the game.`,
    function: restartSwapCommand,
  },
  swap: {
    aliases: ["s"],
    roles: Role.ADMIN_TEMP,
    desc: `
    This command swaps the teams when the game is stopped.`,
    function: swapCommand,
  },
  kickred: {
    aliases: ["kickr"],
    roles: Role.ADMIN_TEMP,
    desc: `
    This command kicks all the players from the red team, including the player that entered the command. You can give as an argument the reason of the kick.`,
    function: kickTeamCommand,
  },
  kickblue: {
    aliases: ["kickb"],
    roles: Role.ADMIN_TEMP,
    desc: `
    This command kicks all the players from the blue team, including the player that entered the command. You can give as an argument the reason of the kick.`,
    function: kickTeamCommand,
  },
  kickspec: {
    aliases: ["kicks"],
    roles: Role.ADMIN_TEMP,
    desc: `
    This command kicks all the players from the spectators team, including the player that entered the command. You can give as an argument the reason of the kick.`,
    function: kickTeamCommand,
  },
  mute: {
    aliases: ["m"],
    roles: Role.ADMIN_TEMP,
    desc: `
        This command allows to mute a player. He won't be able to talk for a certain duration, and can be unmuted at any time by admins.
    It takes 2 arguments:
    Argument 1: #<id> where <id> is the id of the player targeted. This won't work if the player is an admin.
    Argument 2 (optional): <duration> where <duration> is the duration of the mute in minutes. If no value is provided, the mute lasts for the default duration, ${muteDuration} minutes.
    Example: !mute #3 20 will mute the player with id 3 for 20 minutes.`,
    function: muteCommand,
  },
  unmute: {
    aliases: ["um"],
    roles: Role.ADMIN_TEMP,
    desc: `
        This command allows to unmute someone.
    It takes 1 argument:
    Argument 1: #<id> where <id> is the id of the muted player.
    OR
    Argument 1: <number> where <number> is the number associated with the mute given by the 'muteList' command.
    Example: !unmute #300 will unmute the player with id 300,
             !unmute 8 will unmute the n°8 player according to the 'muteList' command.`,
    function: unmuteCommand,
  },
  mutes: {
    aliases: [],
    roles: Role.ADMIN_TEMP,
    desc: `
        This command shows the list of muted players.`,
    function: muteListCommand,
  },
  clearbans: {
    aliases: [],
    roles: Role.MASTER,
    desc: `
	This command unbans everyone. It also can unban one player in particular, by adding his ID as an argument.`,
    function: clearbansCommand,
  },
  bans: {
    aliases: ["banlist"],
    roles: Role.MASTER,
    desc: `
    This command shows all the players that were banned and their IDs.`,
    function: banListCommand,
  },
  admins: {
    aliases: ["adminlist"],
    roles: Role.MASTER,
    desc: `
    This command shows all the players that are permanent admins.`,
    function: adminListCommand,
  },
  setadmin: {
    aliases: ["admin"],
    roles: Role.MASTER,
    desc: `
    This command allows to set someone as admin. He will be able to connect as admin, and can be removed at any time by masters.
It takes 1 argument:
Argument 1: #<id> where <id> is the id of the player targeted.
Example: !setadmin #3 will give admin to the player with id 3.`,
    function: setAdminCommand,
  },
  removeadmin: {
    aliases: ["unadmin"],
    roles: Role.MASTER,
    desc: `
	This command allows to remove someone as admin.
It takes 1 argument:
Argument 1: #<id> where <id> is the id of the player targeted.
OR
Argument 1: <number> where <number> is the number associated with the admin given by the 'admins' command.
Example: !removeadmin #300 will remove admin to the player with id 300,
         !removeadmin 2 will remove the admin n°2 according to the 'admins' command.`,
    function: removeAdminCommand,
  },
  password: {
    aliases: ["pw"],
    roles: Role.MASTER,
    desc: `
        This command allows to add a password to the room.
    It takes 1 argument:
    Argument 1: <password> where <password> is the password you want for the room.
    
    To remove the room password, simply enter '!password'.`,
    function: passwordCommand,
  },
};

/* GAME */

var lastTouches = Array(2).fill(null);
var lastTeamTouched;

var speedCoefficient = 100 / (5 * (0.99 ** 60 + 1));
var ballSpeed = 0;
var playerRadius = 15;
var ballRadius = 10;
var triggerDistance = playerRadius + ballRadius + 0.01;

/* COLORS */

var welcomeColor = 0xc4ff65;
var announcementColor = 0xffefd6;
var infoColor = 0xbebebe;
var privateMessageColor = 0xffc933;
var redColor = 0xff4c4c;
var blueColor = 0x62cbff;
var warningColor = 0xffa135;
var errorColor = 0xa40000;
var successColor = 0x75ff75;
var defaultColor = null;

/* AUXILIARY */

var checkTimeVariable = false;
var checkStadiumVariable = true;
var endGameVariable = false;
var cancelGameVariable = false;
var kickFetchVariable = false;

var chooseMode = false;
var timeOutCap;
var capLeft = false;
var redCaptainChoice = "";
var blueCaptainChoice = "";
var chooseTime = 20;

var AFKSet = new Set();
var AFKMinSet = new Set();
var AFKCooldownSet = new Set();
var minAFKDuration = 0;
var maxAFKDuration = 30;
var AFKCooldown = 0;

var muteArray = new MuteList();
var muteDuration = 5;

var removingPlayers = false;
var insertingPlayers = false;

var stopTimeout;
var startTimeout;
var unpauseTimeout;
var removingTimeout;
var insertingTimeout;

var emptyPlayer = {
  id: 0,
};
stadiumCommand(emptyPlayer, "!training");

var game = new Game();

/* FUNCTIONS */

/* AUXILIARY FUNCTIONS */

if (typeof String.prototype.replaceAll != "function") {
  String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
  };
}

function getDate() {
  let d = new Date();
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}

/* MATH FUNCTIONS */

function getRandomInt(max) {
  // returns a random number between 0 and max-1
  return Math.floor(Math.random() * Math.floor(max));
}

function pointDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

/* TIME FUNCTIONS */

function getHoursStats(time) {
  return Math.floor(time / 3600);
}

function getMinutesGame(time) {
  var t = Math.floor(time / 60);
  return `${Math.floor(t / 10)}${Math.floor(t % 10)}`;
}

function getMinutesReport(time) {
  return Math.floor(Math.round(time) / 60);
}

function getMinutesEmbed(time) {
  var t = Math.floor(Math.round(time) / 60);
  return `${Math.floor(t / 10)}${Math.floor(t % 10)}`;
}

function getMinutesStats(time) {
  return Math.floor(time / 60) - getHoursStats(time) * 60;
}

function getSecondsGame(time) {
  var t = Math.floor(time - Math.floor(time / 60) * 60);
  return `${Math.floor(t / 10)}${Math.floor(t % 10)}`;
}

function getSecondsReport(time) {
  var t = Math.round(time);
  return Math.floor(t - getMinutesReport(t) * 60);
}

function getSecondsEmbed(time) {
  var t = Math.round(time);
  var t2 = Math.floor(t - Math.floor(t / 60) * 60);
  return `${Math.floor(t2 / 10)}${Math.floor(t2 % 10)}`;
}

function getTimeGame(time) {
  return `[${getMinutesGame(time)}:${getSecondsGame(time)}]`;
}

function getTimeEmbed(time) {
  return `[${getMinutesEmbed(time)}:${getSecondsEmbed(time)}]`;
}

function getTimeStats(time) {
  if (getHoursStats(time) > 0) {
    return `${getHoursStats(time)}h${getMinutesStats(time)}m`;
  } else {
    return `${getMinutesStats(time)}m`;
  }
}

function getGoalGame() {
  return game.scores.red + game.scores.blue;
}

/* REPORT FUNCTIONS */

function findFirstNumberCharString(str) {
  let str_number = str[str.search(/[0-9]/g)];
  return str_number === undefined ? "0" : str_number;
}

function getIdReport() {
  var d = new Date();
  return `${d.getFullYear() % 100}${d.getMonth() < 9 ? "0" : ""}${
    d.getMonth() + 1
  }${d.getDate() < 10 ? "0" : ""}${d.getDate()}${
    d.getHours() < 10 ? "0" : ""
  }${d.getHours()}${d.getMinutes() < 10 ? "0" : ""}${d.getMinutes()}${
    d.getSeconds() < 10 ? "0" : ""
  }${d.getSeconds()}${findFirstNumberCharString(roomName)}`;
}

function getRecordingName(game) {
  let d = new Date();
  let redCap =
    game.playerComp[0][0] != undefined
      ? game.playerComp[0][0].player.name
      : "Red";
  let blueCap =
    game.playerComp[1][0] != undefined
      ? game.playerComp[1][0].player.name
      : "Blue";
  let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  let month = d.getMonth() < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  let year =
    d.getFullYear() % 100 < 10
      ? "0" + (d.getFullYear() % 100)
      : d.getFullYear() % 100;
  let hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  let minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  return `${day}-${month}-${year}-${hour}h${minute}-${redCap}vs${blueCap}.hbr2`;
}

function fetchRecording(game) {
  if (gameWebhook != "") {
    let form = new FormData();
    form.append(
      null,
      new File([game.rec], getRecordingName(game), { type: "text/plain" })
    );
    form.append(
      "payload_json",
      JSON.stringify({
        username: roomName,
      })
    );

    fetch(gameWebhook, {
      method: "POST",
      body: form,
    }).then((res) => res);
  }
}

/* FEATURE FUNCTIONS */

function getCommand(commandStr) {
  if (commands.hasOwnProperty(commandStr)) return commandStr;
  for (const [key, value] of Object.entries(commands)) {
    for (let alias of value.aliases) {
      if (alias == commandStr) return key;
    }
  }
  return false;
}

function getPlayerComp(player) {
  if (player == null || player.id == 0) return null;
  var comp = game.playerComp;
  var index = comp[0].findIndex((c) => c.auth == authArray[player.id][0]);
  if (index != -1) return comp[0][index];
  index = comp[1].findIndex((c) => c.auth == authArray[player.id][0]);
  if (index != -1) return comp[1][index];
  return null;
}

function getTeamArray(team, includeAFK = true) {
  if (team == Team.RED) return teamRed;
  if (team == Team.BLUE) return teamBlue;
  if (includeAFK) {
    return playersAll.filter((p) => p.team === Team.SPECTATORS);
  }
  return teamSpec;
}

function sendAnnouncementTeam(message, team, color, style, mention) {
  for (let player of team) {
    room.sendAnnouncement(message, player.id, color, style, mention);
  }
}

function teamChat(player, message) {
  var msgArray = message.split(/ +/).slice(1);
  var emoji =
    player.team == Team.RED ? "🔴" : player.team == Team.BLUE ? "🔵" : "⚪";
  var message = `${emoji} [TEAM] ${player.name}: ${msgArray.join(" ")}`;
  var team = getTeamArray(player.team, true);
  var color =
    player.team == Team.RED
      ? redColor
      : player.team == Team.BLUE
      ? blueColor
      : null;
  var style = "bold";
  var mention = HaxNotification.CHAT;
  sendAnnouncementTeam(message, team, color, style, mention);
}

function playerChat(player, message) {
  var msgArray = message.split(/ +/);
  var playerTargetIndex = playersAll.findIndex(
    (p) => p.name.replaceAll(" ", "_") == msgArray[0].substring(2)
  );
  if (playerTargetIndex == -1) {
    room.sendAnnouncement(
      `Invalid player, make sure the name you entered is correct.`,
      player.id,
      errorColor,
      "bold",
      null
    );
    return false;
  }
  var playerTarget = playersAll[playerTargetIndex];
  if (player.id == playerTarget.id) {
    room.sendAnnouncement(
      `You can't send a PM to yourself!`,
      player.id,
      errorColor,
      "bold",
      null
    );
    return false;
  }
  var messageFrom = `📝 [PM with ${playerTarget.name}] ${
    player.name
  }: ${msgArray.slice(1).join(" ")}`;

  var messageTo = `📝 [PM with ${player.name}] ${player.name}: ${msgArray
    .slice(1)
    .join(" ")}`;

  room.sendAnnouncement(
    messageFrom,
    player.id,
    privateMessageColor,
    "bold",
    HaxNotification.CHAT
  );
  room.sendAnnouncement(
    messageTo,
    playerTarget.id,
    privateMessageColor,
    "bold",
    HaxNotification.CHAT
  );
}

/* PHYSICS FUNCTIONS */

function calculateStadiumVariables() {
  if (checkStadiumVariable && teamRed.length + teamBlue.length > 0) {
    checkStadiumVariable = false;
    setTimeout(() => {
      let ballDisc = room.getDiscProperties(0);
      let playerDisc = room.getPlayerDiscProperties(
        teamRed.concat(teamBlue)[0].id
      );
      ballRadius = ballDisc.radius;
      playerRadius = playerDisc.radius;
      triggerDistance = ballRadius + playerRadius + 0.01;
      speedCoefficient =
        100 / (5 * ballDisc.invMass * (ballDisc.damping ** 60 + 1));
    }, 1);
  }
}

function checkGoalKickTouch(array, index, goal) {
  if (array != null && array.length >= index + 1) {
    var obj = array[index];
    if (obj != null && obj.goal != null && obj.goal == goal) return obj;
  }
  return null;
}

/* BUTTONS */

function topButton() {
  if (teamSpec.length > 0) {
    if (teamRed.length == teamBlue.length && teamSpec.length > 1) {
      room.setPlayerTeam(teamSpec[0].id, Team.RED);
      room.setPlayerTeam(teamSpec[1].id, Team.BLUE);
    } else if (teamRed.length < teamBlue.length)
      room.setPlayerTeam(teamSpec[0].id, Team.RED);
    else room.setPlayerTeam(teamSpec[0].id, Team.BLUE);
  }
}

function randomButton() {
  if (teamSpec.length > 0) {
    if (teamRed.length == teamBlue.length && teamSpec.length > 1) {
      var r = getRandomInt(teamSpec.length);
      room.setPlayerTeam(teamSpec[r].id, Team.RED);
      teamSpec = teamSpec.filter((spec) => spec.id != teamSpec[r].id);
      room.setPlayerTeam(teamSpec[getRandomInt(teamSpec.length)].id, Team.BLUE);
    } else if (teamRed.length < teamBlue.length)
      room.setPlayerTeam(teamSpec[getRandomInt(teamSpec.length)].id, Team.RED);
    else
      room.setPlayerTeam(teamSpec[getRandomInt(teamSpec.length)].id, Team.BLUE);
  }
}

function blueToSpecButton() {
  clearTimeout(removingTimeout);
  removingPlayers = true;
  removingTimeout = setTimeout(() => {
    removingPlayers = false;
  }, 100);
  for (var i = 0; i < teamBlue.length; i++) {
    room.setPlayerTeam(teamBlue[teamBlue.length - 1 - i].id, Team.SPECTATORS);
  }
}

function redToSpecButton() {
  clearTimeout(removingTimeout);
  removingPlayers = true;
  removingTimeout = setTimeout(() => {
    removingPlayers = false;
  }, 100);
  for (var i = 0; i < teamRed.length; i++) {
    room.setPlayerTeam(teamRed[teamRed.length - 1 - i].id, Team.SPECTATORS);
  }
}

function resetButton() {
  clearTimeout(removingTimeout);
  removingPlayers = true;
  removingTimeout = setTimeout(() => {
    removingPlayers = false;
  }, 100);
  for (let i = 0; i < Math.max(teamRed.length, teamBlue.length); i++) {
    if (Math.max(teamRed.length, teamBlue.length) - teamRed.length - i > 0)
      room.setPlayerTeam(teamBlue[teamBlue.length - 1 - i].id, Team.SPECTATORS);
    else if (
      Math.max(teamRed.length, teamBlue.length) - teamBlue.length - i >
      0
    )
      room.setPlayerTeam(teamRed[teamRed.length - 1 - i].id, Team.SPECTATORS);
    else break;
  }
  for (let i = 0; i < Math.min(teamRed.length, teamBlue.length); i++) {
    room.setPlayerTeam(
      teamBlue[Math.min(teamRed.length, teamBlue.length) - 1 - i].id,
      Team.SPECTATORS
    );
    room.setPlayerTeam(
      teamRed[Math.min(teamRed.length, teamBlue.length) - 1 - i].id,
      Team.SPECTATORS
    );
  }
}

function swapButton() {
  clearTimeout(removingTimeout);
  removingPlayers = true;
  removingTimeout = setTimeout(() => {
    removingPlayers = false;
  }, 100);
  for (let player of teamBlue) {
    room.setPlayerTeam(player.id, Team.RED);
  }
  for (let player of teamRed) {
    room.setPlayerTeam(player.id, Team.BLUE);
  }
}

/* COMMAND FUNCTIONS */

/* PLAYER COMMANDS */

function leaveCommand(player, message) {
  room.kickPlayer(player.id, "Bye !", false);
}

function helpCommand(player, message) {
  var msgArray = message.split(/ +/).slice(1);
  if (msgArray.length == 0) {
    var commandString = "Comandos del jugador :";
    for (const [key, value] of Object.entries(commands)) {
      if (value.desc && value.roles == Role.PLAYER)
        commandString += ` !${key},`;
    }
    commandString =
      commandString.substring(0, commandString.length - 1) + ".\n";
    if (getRole(player) >= Role.ADMIN_TEMP) {
      commandString += `Comandos de administrador :`;
      for (const [key, value] of Object.entries(commands)) {
        if (value.desc && value.roles == Role.ADMIN_TEMP)
          commandString += ` !${key},`;
      }
      if (commandString.slice(commandString.length - 1) == ":")
        commandString += ` None,`;
      commandString =
        commandString.substring(0, commandString.length - 1) + ".\n";
    }
    if (getRole(player) >= Role.MASTER) {
      commandString += `Comandos de master  :`;
      for (const [key, value] of Object.entries(commands)) {
        if (value.desc && value.roles == Role.MASTER)
          commandString += ` !${key},`;
      }
      if (commandString.slice(commandString.length - 1) == ":")
        commandString += ` None,`;
      commandString =
        commandString.substring(0, commandString.length - 1) + ".\n";
    }
    commandString +=
      "\nPara obtener informacion de un comando en especifico, escribe ''!help <Nombre del comando>'.";
    room.sendAnnouncement(
      commandString,
      player.id,
      infoColor,
      "bold",
      HaxNotification.CHAT
    );
  } else if (msgArray.length >= 1) {
    var commandName = getCommand(msgArray[0].toLowerCase());
    if (commandName != false && commands[commandName].desc != false)
      room.sendAnnouncement(
        `\'${commandName}\' command :\n${commands[commandName].desc}`,
        player.id,
        infoColor,
        "bold",
        HaxNotification.CHAT
      );
    else
      room.sendAnnouncement(
        `El comando que estas intentando usar no existe, escribe \'!help\'`,
        player.id,
        errorColor,
        "bold",
        HaxNotification.CHAT
      );
  }
}

function globalStatsCommand(player, message) {
  var stats = new HaxStatistics(player.name);
  if (localStorage.getItem(authArray[player.id][0])) {
    stats = JSON.parse(localStorage.getItem(authArray[player.id][0]));
  }
  var statsString = printPlayerStats(stats);
  room.sendAnnouncement(
    statsString,
    player.id,
    infoColor,
    "bold",
    HaxNotification.CHAT
  );
}

function renameCommand(player, message) {
  var msgArray = message.split(/ +/).slice(1);
  if (localStorage.getItem(authArray[player.id][0])) {
    var stats = JSON.parse(localStorage.getItem(authArray[player.id][0]));
    if (msgArray.length == 0) {
      stats.playerName = player.name;
    } else {
      stats.playerName = msgArray.join(" ");
    }
    localStorage.setItem(authArray[player.id][0], JSON.stringify(stats));
    room.sendAnnouncement(
      `You successfully renamed yourself ${stats.playerName} !`,
      player.id,
      successColor,
      "bold",
      HaxNotification.CHAT
    );
  } else {
    room.sendAnnouncement(
      `You haven't played a game in this room yet !`,
      player.id,
      errorColor,
      "bold",
      HaxNotification.CHAT
    );
  }
}

function statsLeaderboardCommand(player, message) {
  var key = message.split(/ +/)[0].substring(1).toLowerCase();
  printRankings(key, player.id);
}

function afkCommand(player, message) {
  if (player.team == Team.SPECTATORS || players.length == 1) {
    if (AFKSet.has(player.id)) {
      if (AFKMinSet.has(player.id)) {
        room.sendAnnouncement(
          `There is a minimum of ${minAFKDuration} minute of AFK time. Don't abuse the command !`,
          player.id,
          errorColor,
          "bold",
          HaxNotification.CHAT
        );
      } else {
        AFKSet.delete(player.id);
        room.sendAnnouncement(
          `🌅 ${player.name} ya no esta AFK !`,
          null,
          announcementColor,
          "bold",
          null
        );
        updateTeams();
        handlePlayersJoin();
      }
    } else {
      if (AFKCooldownSet.has(player.id)) {
        room.sendAnnouncement(
          `You can only go AFK every ${AFKCooldown} minutes. Don't abuse the command !`,
          player.id,
          errorColor,
          "bold",
          HaxNotification.CHAT
        );
      } else {
        AFKSet.add(player.id);
        if (!player.admin) {
          AFKMinSet.add(player.id);
          AFKCooldownSet.add(player.id);
          setTimeout(
            (id) => {
              AFKMinSet.delete(id);
            },
            minAFKDuration * 60 * 1000,
            player.id
          );
          setTimeout(
            (id) => {
              AFKSet.delete(id);
            },
            maxAFKDuration * 60 * 1000,
            player.id
          );
          setTimeout(
            (id) => {
              AFKCooldownSet.delete(id);
            },
            AFKCooldown * 60 * 1000,
            player.id
          );
        }
        room.setPlayerTeam(player.id, Team.SPECTATORS);
        room.sendAnnouncement(
          `😴 ${player.name} esta AFK !`,
          null,
          announcementColor,
          "bold",
          null
        );
        updateTeams();
        handlePlayersLeave();
      }
    }
  } else {
    room.sendAnnouncement(
      `No te puedes quedar AFK en medio de una partida !`,
      player.id,
      errorColor,
      "bold",
      HaxNotification.CHAT
    );
  }
}

function afkListCommand(player, message) {
  if (AFKSet.size == 0) {
    room.sendAnnouncement(
      "😴 No hay nadie en la lista de AFKS.",
      player.id,
      announcementColor,
      "bold",
      null
    );
    return;
  }
  var cstm = "😴 AFK list : ";
  AFKSet.forEach((_, value) => {
    var p = room.getPlayer(value);
    if (p != null) cstm += p.name + `, `;
  });
  cstm = cstm.substring(0, cstm.length - 2) + ".";
  room.sendAnnouncement(cstm, player.id, announcementColor, "bold", null);
}

function masterCommand(player, message) {
  var msgArray = message.split(/ +/).slice(1);
  if (parseInt(msgArray[0]) == masterPassword) {
    if (!masterList.includes(authArray[player.id][0])) {
      room.setPlayerAdmin(player.id, true);
      adminList = adminList.filter((a) => a[0] != authArray[player.id][0]);
      masterList.push(authArray[player.id][0]);
      room.sendAnnouncement(
        `${player.name} is now a room master !`,
        null,
        announcementColor,
        "bold",
        HaxNotification.CHAT
      );
    } else {
      room.sendAnnouncement(
        `Ya eres administrador !`,
        player.id,
        errorColor,
        "bold",
        HaxNotification.CHAT
      );
    }
  }
}

/* ADMIN COMMANDS */

function restartCommand(player, message) {
  instantRestart();
}

function restartSwapCommand(player, message) {
  room.stopGame();
  swapButton();
  startTimeout = setTimeout(() => {
    room.startGame();
  }, 10);
}

function swapCommand(player, message) {
  if (playSituation == Situation.STOP) {
    swapButton();
    room.sendAnnouncement(
      "✔️ Teams swapped !",
      null,
      announcementColor,
      "bold",
      null
    );
  } else {
    room.sendAnnouncement(
      `Please stop the game before swapping.`,
      player.id,
      errorColor,
      "bold",
      HaxNotification.CHAT
    );
  }
}

function kickTeamCommand(player, message) {
  var msgArray = message.split(/ +/);
  var reasonString = `Team kick by ${player.name}`;
  if (msgArray.length > 1) {
    reasonString = msgArray.slice(1).join(" ");
  }
  if (["!kickred", "!kickr"].includes(msgArray[0].toLowerCase())) {
    for (let i = 0; i < teamRed.length; i++) {
      setTimeout(() => {
        room.kickPlayer(teamRed[0].id, reasonString, false);
      }, i * 20);
    }
  } else if (["!kickblue", "!kickb"].includes(msgArray[0].toLowerCase())) {
    for (let i = 0; i < teamBlue.length; i++) {
      setTimeout(() => {
        room.kickPlayer(teamBlue[0].id, reasonString, false);
      }, i * 20);
    }
  } else if (["!kickspec", "!kicks"].includes(msgArray[0].toLowerCase())) {
    for (let i = 0; i < teamSpec.length; i++) {
      setTimeout(() => {
        room.kickPlayer(teamSpec[0].id, reasonString, false);
      }, i * 20);
    }
  }
}

function stadiumCommand(player, message) {
  var msgArray = message.split(/ +/);
  if (gameState == State.STOP) {
    if (["!classic"].includes(msgArray[0].toLowerCase())) {
      if (JSON.parse(classicMap).name == "Classic") {
        room.setDefaultStadium("Classic");
      } else {
        room.setCustomStadium(classicMap);
      }
      currentStadium = "classic";
    } else if (["!big"].includes(msgArray[0].toLowerCase())) {
      if (JSON.parse(bigMap).name == "Big") {
        room.setDefaultStadium("Big");
      } else {
        room.setCustomStadium(bigMap);
      }
      currentStadium = "big";
    } else if (["!training"].includes(msgArray[0].toLowerCase())) {
      room.setCustomStadium(trainingMap);
      currentStadium = "training";
    } else {
      room.sendAnnouncement(
        `Stadium not recognized.`,
        player.id,
        errorColor,
        "bold",
        HaxNotification.CHAT
      );
    }
  } else {
    room.sendAnnouncement(
      `Please stop the game before using this command.`,
      player.id,
      errorColor,
      "bold",
      HaxNotification.CHAT
    );
  }
}

function muteCommand(player, message) {
  var msgArray = message.split(/ +/).slice(1);
  if (msgArray.length > 0) {
    if (msgArray[0].length > 0 && msgArray[0][0] == "#") {
      msgArray[0] = msgArray[0].substring(1, msgArray[0].length);
      if (room.getPlayer(parseInt(msgArray[0])) != null) {
        var playerMute = room.getPlayer(parseInt(msgArray[0]));
        var minutesMute = muteDuration;
        if (msgArray.length > 1 && parseInt(msgArray[1]) > 0) {
          minutesMute = parseInt(msgArray[1]);
        }
        if (!playerMute.admin) {
          var muteObj = new MutePlayer(
            playerMute.name,
            playerMute.id,
            authArray[playerMute.id][0]
          );
          muteObj.setDuration(minutesMute);
          room.sendAnnouncement(
            `${playerMute.name} has been muted for ${minutesMute} minutes.`,
            null,
            announcementColor,
            "bold",
            null
          );
        } else {
          room.sendAnnouncement(
            `You can't mute an admin.`,
            player.id,
            errorColor,
            "bold",
            HaxNotification.CHAT
          );
        }
      } else {
        room.sendAnnouncement(
          `No hay ningún jugador con dicha identificación en la sala. Ingrese "!help mute" para obtener más información.`,
          player.id,
          errorColor,
          "bold",
          HaxNotification.CHAT
        );
      }
    } else {
      room.sendAnnouncement(
        `
        Formato incorrecto para su argumento. Ingrese "!help mute" para obtener más información.`,
        player.id,
        errorColor,
        "bold",
        HaxNotification.CHAT
      );
    }
  } else {
    room.sendAnnouncement(
      `Wrong number of arguments. Enter "!help mute" for more information.`,
      player.id,
      errorColor,
      "bold",
      HaxNotification.CHAT
    );
  }
}

function unmuteCommand(player, message) {
  var msgArray = message.split(/ +/).slice(1);
  if (msgArray.length > 0) {
    if (msgArray[0].length > 0 && msgArray[0][0] == "#") {
      msgArray[0] = msgArray[0].substring(1, msgArray[0].length);
      if (room.getPlayer(parseInt(msgArray[0])) != null) {
        var playerUnmute = room.getPlayer(parseInt(msgArray[0]));
        if (muteArray.getByPlayerId(playerUnmute.id) != null) {
          var muteObj = muteArray.getByPlayerId(playerUnmute.id);
          muteObj.remove();
          room.sendAnnouncement(
            `${playerUnmute.name} has been unmuted !`,
            null,
            announcementColor,
            "bold",
            HaxNotification.CHAT
          );
        } else {
          room.sendAnnouncement(
            `This player isn't muted !`,
            player.id,
            errorColor,
            "bold",
            HaxNotification.CHAT
          );
        }
      } else {
        room.sendAnnouncement(
          `
          No hay ningún jugador con dicha identificación en la sala. Ingrese "!ayudar a activar el silencio" para obtener más información.`,
          player.id,
          errorColor,
          "bold",
          HaxNotification.CHAT
        );
      }
    } else if (
      msgArray[0].length > 0 &&
      parseInt(msgArray[0]) > 0 &&
      muteArray.getById(parseInt(msgArray[0])) != null
    ) {
      var playerUnmute = muteArray.getById(parseInt(msgArray[0]));
      playerUnmute.remove();
      room.sendAnnouncement(
        `${playerUnmute.name} has been unmuted !`,
        null,
        announcementColor,
        "bold",
        HaxNotification.CHAT
      );
    } else {
      room.sendAnnouncement(
        `Incorrect format for your argument. Enter "!help unmute" for more information.`,
        player.id,
        errorColor,
        "bold",
        HaxNotification.CHAT
      );
    }
  } else {
    room.sendAnnouncement(
      `Wrong number of arguments. Enter "!help unmute" for more information.`,
      player.id,
      errorColor,
      "bold",
      HaxNotification.CHAT
    );
  }
}

function muteListCommand(player, message) {
  if (muteArray.list.length == 0) {
    room.sendAnnouncement(
      "🔇 No hay nadie en la lista de muteados",
      player.id,
      announcementColor,
      "bold",
      null
    );
    return false;
  }
  var cstm = "🔇 Mute list : ";
  for (let mute of muteArray.list) {
    cstm += mute.name + `[${mute.id}], `;
  }
  cstm = cstm.substring(0, cstm.length - 2) + ".";
  room.sendAnnouncement(cstm, player.id, announcementColor, "bold", null);
}

/* MASTER COMMANDS */

function clearbansCommand(player, message) {
  var msgArray = message.split(/ +/).slice(1);
  if (msgArray.length == 0) {
    room.clearBans();
    room.sendAnnouncement(
      "✔️ Bans cleared !",
      null,
      announcementColor,
      "bold",
      null
    );
    banList = [];
  } else if (msgArray.length == 1) {
    if (parseInt(msgArray[0]) > 0) {
      var ID = parseInt(msgArray[0]);
      room.clearBan(ID);
      if (banList.length != banList.filter((p) => p[1] != ID).length) {
        room.sendAnnouncement(
          `✔️ ${
            banList.filter((p) => p[1] == ID)[0][0]
          } has been unbanned from the room !`,
          null,
          announcementColor,
          "bold",
          null
        );
      } else {
        room.sendAnnouncement(
          `The ID you entered doesn't have a ban associated to. Enter "!help clearbans" for more information.`,
          player.id,
          errorColor,
          "bold",
          HaxNotification.CHAT
        );
      }
      banList = banList.filter((p) => p[1] != ID);
    } else {
      room.sendAnnouncement(
        `Invalid ID entered. Enter "!help clearbans" for more information.`,
        player.id,
        errorColor,
        "bold",
        HaxNotification.CHAT
      );
    }
  } else {
    room.sendAnnouncement(
      `Wrong number of arguments. Enter "!help clearbans" for more information.`,
      player.id,
      errorColor,
      "bold",
      HaxNotification.CHAT
    );
  }
}

function banListCommand(player, message) {
  if (banList.length == 0) {
    room.sendAnnouncement(
      "📢 No hay nadie en la lista de baneados",
      player.id,
      announcementColor,
      "bold",
      null
    );
    return false;
  }
  var cstm = "📢 Ban list : ";
  for (let ban of banList) {
    cstm += ban[0] + `[${ban[1]}], `;
  }
  cstm = cstm.substring(0, cstm.length - 2) + ".";
  room.sendAnnouncement(cstm, player.id, announcementColor, "bold", null);
}

function adminListCommand(player, message) {
  if (adminList.length == 0) {
    room.sendAnnouncement(
      "📢 No hay nadie en la lista de administradores",
      player.id,
      announcementColor,
      "bold",
      null
    );
    return false;
  }
  var cstm = "📢 Admin list : ";
  for (let i = 0; i < adminList.length; i++) {
    cstm += adminList[i][1] + `[${i}], `;
  }
  cstm = cstm.substring(0, cstm.length - 2) + ".";
  room.sendAnnouncement(cstm, player.id, announcementColor, "bold", null);
}

function setAdminCommand(player, message) {
  var msgArray = message.split(/ +/).slice(1);
  if (msgArray.length > 0) {
    if (msgArray[0].length > 0 && msgArray[0][0] == "#") {
      msgArray[0] = msgArray[0].substring(1, msgArray[0].length);
      if (room.getPlayer(parseInt(msgArray[0])) != null) {
        var playerAdmin = room.getPlayer(parseInt(msgArray[0]));

        if (
          !adminList.map((a) => a[0]).includes(authArray[playerAdmin.id][0])
        ) {
          if (!masterList.includes(authArray[playerAdmin.id][0])) {
            room.setPlayerAdmin(playerAdmin.id, true);
            adminList.push([authArray[playerAdmin.id][0], playerAdmin.name]);
            room.sendAnnouncement(
              `${playerAdmin.name} is now a room admin !`,
              null,
              announcementColor,
              "bold",
              HaxNotification.CHAT
            );
          } else {
            room.sendAnnouncement(
              `This player is a master already !`,
              player.id,
              errorColor,
              "bold",
              HaxNotification.CHAT
            );
          }
        } else {
          room.sendAnnouncement(
            `This player is a permanent admin already !`,
            player.id,
            errorColor,
            "bold",
            HaxNotification.CHAT
          );
        }
      } else {
        room.sendAnnouncement(
          `
          No hay ningún jugador con dicha identificación en la sala. Ingrese "!help setadmin" para obtener más información.`,
          player.id,
          errorColor,
          "bold",
          HaxNotification.CHAT
        );
      }
    } else {
      room.sendAnnouncement(
        `Incorrect format for your argument. Enter "!help setadmin" for more information.`,
        player.id,
        errorColor,
        "bold",
        HaxNotification.CHAT
      );
    }
  } else {
    room.sendAnnouncement(
      `Wrong number of arguments. Enter "!help setadmin" for more information.`,
      player.id,
      errorColor,
      "bold",
      HaxNotification.CHAT
    );
  }
}

function removeAdminCommand(player, message) {
  var msgArray = message.split(/ +/).slice(1);
  if (msgArray.length > 0) {
    if (msgArray[0].length > 0 && msgArray[0][0] == "#") {
      msgArray[0] = msgArray[0].substring(1, msgArray[0].length);
      if (room.getPlayer(parseInt(msgArray[0])) != null) {
        var playerAdmin = room.getPlayer(parseInt(msgArray[0]));

        if (adminList.map((a) => a[0]).includes(authArray[playerAdmin.id][0])) {
          room.setPlayerAdmin(playerAdmin.id, false);
          adminList = adminList.filter(
            (a) => a[0] != authArray[playerAdmin.id][0]
          );
          room.sendAnnouncement(
            `${playerAdmin.name} is not a room admin anymore !`,
            null,
            announcementColor,
            "bold",
            HaxNotification.CHAT
          );
        } else {
          room.sendAnnouncement(
            `This player isn't a permanent admin !`,
            player.id,
            errorColor,
            "bold",
            HaxNotification.CHAT
          );
        }
      } else {
        room.sendAnnouncement(
          `No hay ningún jugador con dicha identificación en la sala. Ingrese "!help removeadmin" para obtener más información.
          `,
          player.id,
          errorColor,
          "bold",
          HaxNotification.CHAT
        );
      }
    } else if (
      msgArray[0].length > 0 &&
      parseInt(msgArray[0]) < adminList.length
    ) {
      var index = parseInt(msgArray[0]);
      var playerAdmin = adminList[index];
      if (
        playersAll.findIndex((p) => authArray[p.id][0] == playerAdmin[0]) != -1
      ) {
        // check if there is the removed admin in the room
        var indexRem = playersAll.findIndex(
          (p) => authArray[p.id][0] == playerAdmin[0]
        );
        room.setPlayerAdmin(playersAll[indexRem].id, false);
      }
      adminList.splice(index);
      room.sendAnnouncement(
        `${playerAdmin[1]} is not a room admin anymore !`,
        null,
        announcementColor,
        "bold",
        HaxNotification.CHAT
      );
    } else {
      room.sendAnnouncement(
        `Incorrect format for your argument. Enter "!help removeadmin" for more information.`,
        player.id,
        errorColor,
        "bold",
        HaxNotification.CHAT
      );
    }
  } else {
    room.sendAnnouncement(
      `Wrong number of arguments. Enter "!help removeadmin" for more information.`,
      player.id,
      errorColor,
      "bold",
      HaxNotification.CHAT
    );
  }
}

function passwordCommand(player, message) {
  var msgArray = message.split(/ +/).slice(1);
  if (msgArray.length > 0) {
    if (msgArray.length == 1 && msgArray[0] == "") {
      roomPassword = "";
      room.setPassword(null);
      room.sendAnnouncement(
        `The room password has been removed.`,
        player.id,
        announcementColor,
        "bold",
        HaxNotification.CHAT
      );
    }
    roomPassword = msgArray.join(" ");
    room.setPassword(roomPassword);
    room.sendAnnouncement(
      `The room password has been set to ${roomPassword}`,
      player.id,
      announcementColor,
      "bold",
      HaxNotification.CHAT
    );
  } else {
    if (roomPassword != "") {
      roomPassword = "";
      room.setPassword(null);
      room.sendAnnouncement(
        `The room password has been removed.`,
        player.id,
        announcementColor,
        "bold",
        HaxNotification.CHAT
      );
    } else {
      room.sendAnnouncement(
        `The room currently does not have a password. Enter "!help password" for more information.`,
        player.id,
        errorColor,
        "bold",
        HaxNotification.CHAT
      );
    }
  }
}

/* GAME FUNCTIONS */

function checkTime() {
  const scores = room.getScores();
  if (game != undefined) game.scores = scores;
  if (
    Math.abs(scores.time - scores.timeLimit) <= 0.01 &&
    scores.timeLimit != 0 &&
    playSituation == Situation.PLAY
  ) {
    if (scores.red != scores.blue) {
      if (!checkTimeVariable) {
        checkTimeVariable = true;
        setTimeout(() => {
          checkTimeVariable = false;
        }, 3000);
        scores.red > scores.blue ? endGame(Team.RED) : endGame(Team.BLUE);
        stopTimeout = setTimeout(() => {
          room.stopGame();
        }, 2000);
      }
      return;
    }
    if (drawTimeLimit != 0) {
      goldenGoal = true;
      room.sendAnnouncement(
        "⚽ First goal wins !",
        null,
        announcementColor,
        "bold",
        HaxNotification.CHAT
      );
    }
  }
  if (
    Math.abs(scores.time - drawTimeLimit * 60 - scores.timeLimit) <= 0.01 &&
    scores.timeLimit != 0
  ) {
    if (!checkTimeVariable) {
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

function instantRestart() {
  room.stopGame();
  startTimeout = setTimeout(() => {
    room.startGame();
  }, 10);
}

function resumeGame() {
  startTimeout = setTimeout(() => {
    room.startGame();
  }, 1000);
  setTimeout(() => {
    room.pauseGame(false);
  }, 500);
}

function endGame(winner) {
  if (players.length >= 2 * teamSize - 1) activateChooseMode();
  const scores = room.getScores();
  game.scores = scores;
  lastWinner = winner;
  endGameVariable = true;
  if (winner == Team.RED) {
    streak++;
    room.sendAnnouncement(
      `✨ Equipo rojo gana ${scores.red} - ${scores.blue} ! record: ${streak}`,
      null,
      redColor,
      "bold",
      HaxNotification.CHAT
    );
  } else if (winner == Team.BLUE) {
    streak = 1;
    room.sendAnnouncement(
      `✨ Equipo azul gana ${scores.blue} - ${scores.red} ! record: ${streak}`,
      null,
      blueColor,
      "bold",
      HaxNotification.CHAT
    );
  } else {
    streak = 0;
    room.sendAnnouncement(
      "💤 Draw limit reached !",
      null,
      announcementColor,
      "bold",
      HaxNotification.CHAT
    );
  }
  let possessionRedPct =
    (possession[0] / (possession[0] + possession[1])) * 100;
  let possessionBluePct = 100 - possessionRedPct;
  let possessionString = `🔴 ${possessionRedPct.toFixed(
    0
  )}% - ${possessionBluePct.toFixed(0)}% 🔵`;
  let actionRedPct =
    (actionZoneHalf[0] / (actionZoneHalf[0] + actionZoneHalf[1])) * 100;
  let actionBluePct = 100 - actionRedPct;
  let actionString = `🔴 ${actionRedPct.toFixed(0)}% - ${actionBluePct.toFixed(
    0
  )}% 🔵`;
  let CSString = getCSString(scores);
  room.sendAnnouncement(
    `📊 Posesion: 🔴 ${possessionString}\n` +
      `📊 Zona de accion: 🔴 ${actionString}\n` +
      `${CSString}`,
    null,
    announcementColor,
    "bold",
    HaxNotification.NONE
  );
  updateStats();
}

/* CHOOSING FUNCTIONS */

function activateChooseMode() {
  chooseMode = true;
  slowMode = chooseModeSlowMode;
  room.sendAnnouncement(
    `🐢 
    Modo lento cambiado para elegir la duración del modo de: ${chooseModeSlowMode}s.`,
    null,
    announcementColor,
    "bold",
    HaxNotification.CHAT
  );
}

function deactivateChooseMode() {
  chooseMode = false;
  clearTimeout(timeOutCap);
  if (slowMode != defaultSlowMode) {
    slowMode = defaultSlowMode;
    room.sendAnnouncement(
      `🐢 
      Modo lento cambiado para elegir la duración del modo de: ${defaultSlowMode}s.`,
      null,
      announcementColor,
      "bold",
      HaxNotification.CHAT
    );
  }
  redCaptainChoice = "";
  blueCaptainChoice = "";
}

function getSpecList(player) {
  if (player == null) return null;
  var cstm = "Players : ";
  for (let i = 0; i < teamSpec.length; i++) {
    cstm += teamSpec[i].name + `[${i + 1}], `;
  }
  cstm = cstm.substring(0, cstm.length - 2) + ".";
  room.sendAnnouncement(
    cstm,
    player.id,
    infoColor,
    "bold",
    HaxNotification.CHAT
  );
}

function choosePlayer() {
  clearTimeout(timeOutCap);
  let captain;
  if (teamRed.length <= teamBlue.length && teamRed.length != 0) {
    captain = teamRed[0];
  } else if (teamBlue.length < teamRed.length && teamBlue.length != 0) {
    captain = teamBlue[0];
  }
  if (captain != null) {
    room.sendAnnouncement(
      "Para elegir un jugador, ingrese su número en la lista proporcionada o use 'arriba', 'aleatorio' o 'abajo'.",
      captain.id,
      infoColor,
      "bold",
      HaxNotification.MENTION
    );
    timeOutCap = setTimeout(
      (player) => {
        room.sendAnnouncement(
          `Hurry up ${player.name}, only ${Number.parseInt(
            String(chooseTime / 2)
          )} seconds left to choose !`,
          player.id,
          warningColor,
          "bold",
          HaxNotification.MENTION
        );
        timeOutCap = setTimeout(
          (player) => {
            room.kickPlayer(player.id, "You didn't choose in time !", false);
          },
          chooseTime * 500,
          captain
        );
      },
      chooseTime * 1000,
      captain
    );
  }
  if (teamRed.length != 0 && teamBlue.length != 0) {
    getSpecList(teamRed.length <= teamBlue.length ? teamRed[0] : teamBlue[0]);
  }
}

function chooseModeFunction(player, message) {
  var msgArray = message.split(/ +/);
  if (player.id == teamRed[0].id || player.id == teamBlue[0].id) {
    if (teamRed.length <= teamBlue.length && player.id == teamRed[0].id) {
      if (["top", "auto"].includes(msgArray[0].toLowerCase())) {
        room.setPlayerTeam(teamSpec[0].id, Team.RED);
        redCaptainChoice = "top";
        clearTimeout(timeOutCap);
        room.sendAnnouncement(
          `${player.name} escogio Top !`,
          null,
          announcementColor,
          "bold",
          HaxNotification.CHAT
        );
      } else if (["random", "rand"].includes(msgArray[0].toLowerCase())) {
        var r = getRandomInt(teamSpec.length);
        room.setPlayerTeam(teamSpec[r].id, Team.RED);
        redCaptainChoice = "random";
        clearTimeout(timeOutCap);
        room.sendAnnouncement(
          `${player.name} esocgio Random !`,
          null,
          announcementColor,
          "bold",
          HaxNotification.CHAT
        );
      } else if (["bottom", "bot"].includes(msgArray[0].toLowerCase())) {
        room.setPlayerTeam(teamSpec[teamSpec.length - 1].id, Team.RED);
        redCaptainChoice = "bottom";
        clearTimeout(timeOutCap);
        room.sendAnnouncement(
          `${player.name} escogio Bottom !`,
          null,
          announcementColor,
          "bold",
          HaxNotification.CHAT
        );
      } else if (!Number.isNaN(Number.parseInt(msgArray[0]))) {
        if (
          Number.parseInt(msgArray[0]) > teamSpec.length ||
          Number.parseInt(msgArray[0]) < 1
        ) {
          room.sendAnnouncement(
            `Your number is invalid !`,
            player.id,
            errorColor,
            "bold",
            HaxNotification.CHAT
          );
        } else {
          room.setPlayerTeam(
            teamSpec[Number.parseInt(msgArray[0]) - 1].id,
            Team.RED
          );
          room.sendAnnouncement(
            `${player.name} escogio ${
              teamSpec[Number.parseInt(msgArray[0]) - 1].name
            } !`,
            null,
            announcementColor,
            "bold",
            HaxNotification.CHAT
          );
        }
      } else return false;
      return true;
    }
    if (teamRed.length > teamBlue.length && player.id == teamBlue[0].id) {
      if (["top", "auto"].includes(msgArray[0].toLowerCase())) {
        room.setPlayerTeam(teamSpec[0].id, Team.BLUE);
        blueCaptainChoice = "top";
        clearTimeout(timeOutCap);
        room.sendAnnouncement(
          `${player.name} escogio Top !`,
          null,
          announcementColor,
          "bold",
          HaxNotification.CHAT
        );
      } else if (["random", "rand"].includes(msgArray[0].toLowerCase())) {
        room.setPlayerTeam(
          teamSpec[getRandomInt(teamSpec.length)].id,
          Team.BLUE
        );
        blueCaptainChoice = "random";
        clearTimeout(timeOutCap);
        room.sendAnnouncement(
          `${player.name} escogio Random !`,
          null,
          announcementColor,
          "bold",
          HaxNotification.CHAT
        );
      } else if (["bottom", "bot"].includes(msgArray[0].toLowerCase())) {
        room.setPlayerTeam(teamSpec[teamSpec.length - 1].id, Team.BLUE);
        blueCaptainChoice = "bottom";
        clearTimeout(timeOutCap);
        room.sendAnnouncement(
          `${player.name} escogio Bottom !`,
          null,
          announcementColor,
          "bold",
          HaxNotification.CHAT
        );
      } else if (!Number.isNaN(Number.parseInt(msgArray[0]))) {
        if (
          Number.parseInt(msgArray[0]) > teamSpec.length ||
          Number.parseInt(msgArray[0]) < 1
        ) {
          room.sendAnnouncement(
            `Your number is invalid !`,
            player.id,
            errorColor,
            "bold",
            HaxNotification.CHAT
          );
        } else {
          room.setPlayerTeam(
            teamSpec[Number.parseInt(msgArray[0]) - 1].id,
            Team.BLUE
          );
          room.sendAnnouncement(
            `${player.name} escogio ${
              teamSpec[Number.parseInt(msgArray[0]) - 1].name
            } !`,
            null,
            announcementColor,
            "bold",
            HaxNotification.CHAT
          );
        }
      } else return false;
      return true;
    }
  }
}

function checkCaptainLeave(player) {
  if (
    (teamRed.findIndex((red) => red.id == player.id) == 0 &&
      chooseMode &&
      teamRed.length <= teamBlue.length) ||
    (teamBlue.findIndex((blue) => blue.id == player.id) == 0 &&
      chooseMode &&
      teamBlue.length < teamRed.length)
  ) {
    choosePlayer();
    capLeft = true;
    setTimeout(() => {
      capLeft = false;
    }, 10);
  }
}

function slowModeFunction(player, message) {
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
      return true;
    }
  }
  return false;
}

/* PLAYER FUNCTIONS */

function updateTeams() {
  playersAll = room.getPlayerList();
  players = playersAll.filter((p) => !AFKSet.has(p.id));
  teamRed = players.filter((p) => p.team == Team.RED);
  teamBlue = players.filter((p) => p.team == Team.BLUE);
  teamSpec = players.filter((p) => p.team == Team.SPECTATORS);
}

function updateAdmins(excludedPlayerID = 0) {
  if (
    players.length != 0 &&
    players.filter((p) => p.admin).length < maxAdmins
  ) {
    let playerArray = players.filter(
      (p) => p.id != excludedPlayerID && !p.admin
    );
    let arrayID = playerArray.map((player) => player.id);
    room.setPlayerAdmin(Math.min(...arrayID), true);
  }
}

function getRole(player) {
  return (
    !!masterList.find((a) => a == authArray[player.id][0]) * 2 +
    !!adminList.find((a) => a[0] == authArray[player.id][0]) * 1 +
    player.admin * 1
  );
}

function ghostKickHandle(oldP, newP) {
  var teamArrayId = getTeamArray(oldP.team, true).map((p) => p.id);
  teamArrayId.splice(
    teamArrayId.findIndex((id) => id == oldP.id),
    1,
    newP.id
  );

  room.kickPlayer(oldP.id, "Ghost kick", false);
  room.setPlayerTeam(newP.id, oldP.team);
  room.setPlayerAdmin(newP.id, oldP.admin);
  room.reorderPlayers(teamArrayId, true);

  if (oldP.team != Team.SPECTATORS && playSituation != Situation.STOP) {
    var discProp = room.getPlayerDiscProperties(oldP.id);
    room.setPlayerDiscProperties(newP.id, discProp);
  }
}

/* ACTIVITY FUNCTIONS */

function handleActivityPlayer(player) {
  let pComp = getPlayerComp(player);
  if (pComp != null) {
    pComp.inactivityTicks++;
    if (pComp.inactivityTicks == 60 * ((2 / 3) * afkLimit)) {
      room.sendAnnouncement(
        `⛔ ${
          player.name
        }, Si no te mueves o envias un mensaje en los proximos ${Math.floor(
          afkLimit / 3
        )} segundos, serás expulsado de la sala !`,
        player.id,
        warningColor,
        "bold",
        HaxNotification.MENTION
      );
      return;
    }
    if (pComp.inactivityTicks >= 60 * afkLimit) {
      pComp.inactivityTicks = 0;
      if (game.scores.time <= afkLimit - 0.5) {
        setTimeout(() => {
          !chooseMode ? instantRestart() : room.stopGame();
        }, 10);
      }
      room.kickPlayer(player.id, "AFK", false);
    }
  }
}

function handleActivityPlayerTeamChange(changedPlayer) {
  if (changedPlayer.team == Team.SPECTATORS) {
    let pComp = getPlayerComp(changedPlayer);
    if (pComp != null) pComp.inactivityTicks = 0;
  }
}

function handleActivityStop() {
  for (let player of players) {
    let pComp = getPlayerComp(player);
    if (pComp != null) pComp.inactivityTicks = 0;
  }
}

function handleActivity() {
  if (gameState === State.PLAY && players.length > 1) {
    for (let player of teamRed) {
      handleActivityPlayer(player);
    }
    for (let player of teamBlue) {
      handleActivityPlayer(player);
    }
  }
}

/* LINEUP FUNCTIONS */

function getStartingLineups() {
  var compositions = [[], []];
  for (let player of teamRed) {
    compositions[0].push(
      new PlayerComposition(player, authArray[player.id][0], [0], [])
    );
  }
  for (let player of teamBlue) {
    compositions[1].push(
      new PlayerComposition(player, authArray[player.id][0], [0], [])
    );
  }
  return compositions;
}

function handleLineupChangeTeamChange(changedPlayer) {
  if (gameState != State.STOP) {
    var playerLineup;
    if (changedPlayer.team == Team.RED) {
      // player gets in red team
      var redLineupAuth = game.playerComp[0].map((p) => p.auth);
      var ind = redLineupAuth.findIndex(
        (auth) => auth == authArray[changedPlayer.id][0]
      );
      if (ind != -1) {
        // Player goes back in
        playerLineup = game.playerComp[0][ind];
        if (playerLineup.timeExit.includes(game.scores.time)) {
          // gets subbed off then in at the exact same time -> no sub
          playerLineup.timeExit = playerLineup.timeExit.filter(
            (t) => t != game.scores.time
          );
        } else {
          playerLineup.timeEntry.push(game.scores.time);
        }
      } else {
        playerLineup = new PlayerComposition(
          changedPlayer,
          authArray[changedPlayer.id][0],
          [game.scores.time],
          []
        );
        game.playerComp[0].push(playerLineup);
      }
    } else if (changedPlayer.team == Team.BLUE) {
      // player gets in blue team
      var blueLineupAuth = game.playerComp[1].map((p) => p.auth);
      var ind = blueLineupAuth.findIndex(
        (auth) => auth == authArray[changedPlayer.id][0]
      );
      if (ind != -1) {
        // Player goes back in
        playerLineup = game.playerComp[1][ind];
        if (playerLineup.timeExit.includes(game.scores.time)) {
          // gets subbed off then in at the exact same time -> no sub
          playerLineup.timeExit = playerLineup.timeExit.filter(
            (t) => t != game.scores.time
          );
        } else {
          playerLineup.timeEntry.push(game.scores.time);
        }
      } else {
        playerLineup = new PlayerComposition(
          changedPlayer,
          authArray[changedPlayer.id][0],
          [game.scores.time],
          []
        );
        game.playerComp[1].push(playerLineup);
      }
    }
    if (teamRed.some((r) => r.id == changedPlayer.id)) {
      // player leaves red team
      var redLineupAuth = game.playerComp[0].map((p) => p.auth);
      var ind = redLineupAuth.findIndex(
        (auth) => auth == authArray[changedPlayer.id][0]
      );
      playerLineup = game.playerComp[0][ind];
      if (playerLineup.timeEntry.includes(game.scores.time)) {
        // gets subbed off then in at the exact same time -> no sub
        if (game.scores.time == 0) {
          game.playerComp[0].splice(ind, 1);
        } else {
          playerLineup.timeEntry = playerLineup.timeEntry.filter(
            (t) => t != game.scores.time
          );
        }
      } else {
        playerLineup.timeExit.push(game.scores.time);
      }
    } else if (teamBlue.some((r) => r.id == changedPlayer.id)) {
      // player leaves blue team
      var blueLineupAuth = game.playerComp[1].map((p) => p.auth);
      var ind = blueLineupAuth.findIndex(
        (auth) => auth == authArray[changedPlayer.id][0]
      );
      playerLineup = game.playerComp[1][ind];
      if (playerLineup.timeEntry.includes(game.scores.time)) {
        // gets subbed off then in at the exact same time -> no sub
        if (game.scores.time == 0) {
          game.playerComp[1].splice(ind, 1);
        } else {
          playerLineup.timeEntry = playerLineup.timeEntry.filter(
            (t) => t != game.scores.time
          );
        }
      } else {
        playerLineup.timeExit.push(game.scores.time);
      }
    }
  }
}

function handleLineupChangeLeave(player) {
  if (playSituation != Situation.STOP) {
    if (player.team == Team.RED) {
      // player gets in red team
      var redLineupAuth = game.playerComp[0].map((p) => p.auth);
      var ind = redLineupAuth.findIndex(
        (auth) => auth == authArray[player.id][0]
      );
      var playerLineup = game.playerComp[0][ind];
      if (playerLineup.timeEntry.includes(game.scores.time)) {
        // gets subbed off then in at the exact same time -> no sub
        if (game.scores.time == 0) {
          game.playerComp[0].splice(ind, 1);
        } else {
          playerLineup.timeEntry = playerLineup.timeEntry.filter(
            (t) => t != game.scores.time
          );
        }
      } else {
        playerLineup.timeExit.push(game.scores.time);
      }
    } else if (player.team == Team.BLUE) {
      // player gets in blue team
      var blueLineupAuth = game.playerComp[1].map((p) => p.auth);
      var ind = blueLineupAuth.findIndex(
        (auth) => auth == authArray[player.id][0]
      );
      var playerLineup = game.playerComp[1][ind];
      if (playerLineup.timeEntry.includes(game.scores.time)) {
        // gets subbed off then in at the exact same time -> no sub
        if (game.scores.time == 0) {
          game.playerComp[1].splice(ind, 1);
        } else {
          playerLineup.timeEntry = playerLineup.timeEntry.filter(
            (t) => t != game.scores.time
          );
        }
      } else {
        playerLineup.timeExit.push(game.scores.time);
      }
    }
  }
}

/* TEAM BALANCE FUNCTIONS */

function balanceTeams() {
  if (!chooseMode) {
    if (players.length == 0) {
      room.stopGame();
      room.setScoreLimit(scoreLimit);
      room.setTimeLimit(timeLimit);
    } else if (players.length == 1 && teamRed.length == 0) {
      instantRestart();
      setTimeout(() => {
        stadiumCommand(emptyPlayer, `!training`);
      }, 5);
      room.setPlayerTeam(players[0].id, Team.RED);
    } else if (
      Math.abs(teamRed.length - teamBlue.length) == teamSpec.length &&
      teamSpec.length > 0
    ) {
      const n = Math.abs(teamRed.length - teamBlue.length);
      if (players.length == 2) {
        instantRestart();
        setTimeout(() => {
          stadiumCommand(emptyPlayer, `!classic`);
        }, 5);
      }
      if (teamRed.length > teamBlue.length) {
        for (var i = 0; i < n; i++) {
          room.setPlayerTeam(teamSpec[i].id, Team.BLUE);
        }
      } else {
        for (var i = 0; i < n; i++) {
          room.setPlayerTeam(teamSpec[i].id, Team.RED);
        }
      }
    } else if (Math.abs(teamRed.length - teamBlue.length) > teamSpec.length) {
      const n = Math.abs(teamRed.length - teamBlue.length);
      if (players.length == 1) {
        instantRestart();
        setTimeout(() => {
          stadiumCommand(emptyPlayer, `!training`);
        }, 5);
        room.setPlayerTeam(players[0].id, Team.RED);
        return;
      } else if (teamSize > 2 && players.length == 5) {
        instantRestart();
        setTimeout(() => {
          stadiumCommand(emptyPlayer, `!classic`);
        }, 5);
      }
      if (players.length == teamSize * 2 - 1) {
        teamRedStats = [];
        teamBlueStats = [];
      }
      if (teamRed.length > teamBlue.length) {
        for (var i = 0; i < n; i++) {
          room.setPlayerTeam(
            teamRed[teamRed.length - 1 - i].id,
            Team.SPECTATORS
          );
        }
      } else {
        for (var i = 0; i < n; i++) {
          room.setPlayerTeam(
            teamBlue[teamBlue.length - 1 - i].id,
            Team.SPECTATORS
          );
        }
      }
    } else if (
      Math.abs(teamRed.length - teamBlue.length) < teamSpec.length &&
      teamRed.length != teamBlue.length
    ) {
      room.pauseGame(true);
      activateChooseMode();
      choosePlayer();
    } else if (
      teamSpec.length >= 2 &&
      teamRed.length == teamBlue.length &&
      teamRed.length < teamSize
    ) {
      if (teamRed.length == 2) {
        instantRestart();
        setTimeout(() => {
          stadiumCommand(emptyPlayer, `!big`);
        }, 5);
      }
      topButton();
    }
  }
}

function handlePlayersJoin() {
  if (chooseMode) {
    if (teamSize > 2 && players.length == 6) {
      setTimeout(() => {
        stadiumCommand(emptyPlayer, `!big`);
      }, 5);
    }
    getSpecList(teamRed.length <= teamBlue.length ? teamRed[0] : teamBlue[0]);
  }
  balanceTeams();
}

function handlePlayersLeave() {
  if (gameState != State.STOP) {
    var scores = room.getScores();
    if (
      players.length >= 2 * teamSize &&
      scores.time >= (5 / 6) * game.scores.timeLimit &&
      teamRed.length != teamBlue.length
    ) {
      var rageQuitCheck = false;
      if (teamRed.length < teamBlue.length) {
        if (scores.blue - scores.red == 2) {
          endGame(Team.BLUE);
          rageQuitCheck = true;
        }
      } else {
        if (scores.red - scores.blue == 2) {
          endGame(Team.RED);
          rageQuitCheck = true;
        }
      }
      if (rageQuitCheck) {
        room.sendAnnouncement(
          "Ragequit detected, game ended.",
          null,
          infoColor,
          "bold",
          HaxNotification.MENTION
        );
        stopTimeout = setTimeout(() => {
          room.stopGame();
        }, 100);
        return;
      }
    }
  }
  if (chooseMode) {
    if (teamSize > 2 && players.length == 5) {
      setTimeout(() => {
        stadiumCommand(emptyPlayer, `!classic`);
      }, 5);
    }
    if (teamRed.length == 0 || teamBlue.length == 0) {
      room.setPlayerTeam(
        teamSpec[0].id,
        teamRed.length == 0 ? Team.RED : Team.BLUE
      );
      return;
    }
    if (Math.abs(teamRed.length - teamBlue.length) == teamSpec.length) {
      deactivateChooseMode();
      resumeGame();
      var b = teamSpec.length;
      if (teamRed.length > teamBlue.length) {
        for (var i = 0; i < b; i++) {
          clearTimeout(insertingTimeout);
          insertingPlayers = true;
          setTimeout(() => {
            room.setPlayerTeam(teamSpec[0].id, Team.BLUE);
          }, 5 * i);
        }
        insertingTimeout = setTimeout(() => {
          insertingPlayers = false;
        }, 5 * b);
      } else {
        for (var i = 0; i < b; i++) {
          clearTimeout(insertingTimeout);
          insertingPlayers = true;
          setTimeout(() => {
            room.setPlayerTeam(teamSpec[0].id, Team.RED);
          }, 5 * i);
        }
        insertingTimeout = setTimeout(() => {
          insertingPlayers = false;
        }, 5 * b);
      }
      return;
    }
    if (streak == 0 && gameState == State.STOP) {
      if (Math.abs(teamRed.length - teamBlue.length) == 2) {
        var teamIn = teamRed.length > teamBlue.length ? teamRed : teamBlue;
        room.setPlayerTeam(teamIn[teamIn.length - 1].id, Team.SPECTATORS);
      }
    }
    if (teamRed.length == teamBlue.length && teamSpec.length < 2) {
      deactivateChooseMode();
      resumeGame();
      return;
    }

    if (capLeft) {
      choosePlayer();
    } else {
      getSpecList(teamRed.length <= teamBlue.length ? teamRed[0] : teamBlue[0]);
    }
  }
  balanceTeams();
}

function handlePlayersTeamChange(byPlayer) {
  if (chooseMode && !removingPlayers && byPlayer == null) {
    if (Math.abs(teamRed.length - teamBlue.length) == teamSpec.length) {
      deactivateChooseMode();
      resumeGame();
      var b = teamSpec.length;
      if (teamRed.length > teamBlue.length) {
        for (var i = 0; i < b; i++) {
          clearTimeout(insertingTimeout);
          insertingPlayers = true;
          setTimeout(() => {
            room.setPlayerTeam(teamSpec[0].id, Team.BLUE);
          }, 5 * i);
        }
        insertingTimeout = setTimeout(() => {
          insertingPlayers = false;
        }, 5 * b);
      } else {
        for (var i = 0; i < b; i++) {
          clearTimeout(insertingTimeout);
          insertingPlayers = true;
          setTimeout(() => {
            room.setPlayerTeam(teamSpec[0].id, Team.RED);
          }, 5 * i);
        }
        insertingTimeout = setTimeout(() => {
          insertingPlayers = false;
        }, 5 * b);
      }
      return;
    } else if (
      (teamRed.length == teamSize && teamBlue.length == teamSize) ||
      (teamRed.length == teamBlue.length && teamSpec.length < 2)
    ) {
      deactivateChooseMode();
      resumeGame();
    } else if (teamRed.length <= teamBlue.length && redCaptainChoice != "") {
      if (redCaptainChoice == "top") {
        room.setPlayerTeam(teamSpec[0].id, Team.RED);
      } else if (redCaptainChoice == "random") {
        var r = getRandomInt(teamSpec.length);
        room.setPlayerTeam(teamSpec[r].id, Team.RED);
      } else {
        room.setPlayerTeam(teamSpec[teamSpec.length - 1].id, Team.RED);
      }
      return;
    } else if (teamBlue.length < teamRed.length && blueCaptainChoice != "") {
      if (blueCaptainChoice == "top") {
        room.setPlayerTeam(teamSpec[0].id, Team.BLUE);
      } else if (blueCaptainChoice == "random") {
        var r = getRandomInt(teamSpec.length);
        room.setPlayerTeam(teamSpec[r].id, Team.BLUE);
      } else {
        room.setPlayerTeam(teamSpec[teamSpec.length - 1].id, Team.BLUE);
      }
      return;
    } else {
      choosePlayer();
    }
  }
}

function handlePlayersStop(byPlayer) {
  if (byPlayer == null && endGameVariable) {
    if (chooseMode) {
      if (players.length == 2 * teamSize) {
        chooseMode = false;
        resetButton();
        for (var i = 0; i < teamSize; i++) {
          clearTimeout(insertingTimeout);
          insertingPlayers = true;
          setTimeout(() => {
            randomButton();
          }, 200 * i);
        }
        insertingTimeout = setTimeout(() => {
          insertingPlayers = false;
        }, 200 * teamSize);
        startTimeout = setTimeout(() => {
          room.startGame();
        }, 2000);
      } else {
        if (lastWinner == Team.RED) {
          blueToSpecButton();
        } else if (lastWinner == Team.BLUE) {
          redToSpecButton();
          setTimeout(() => {
            swapButton();
          }, 10);
        } else {
          resetButton();
        }
        clearTimeout(insertingTimeout);
        insertingPlayers = true;
        setTimeout(() => {
          topButton();
        }, 300);
        insertingTimeout = setTimeout(() => {
          insertingPlayers = false;
        }, 300);
      }
    } else {
      if (players.length == 2) {
        if (lastWinner == Team.BLUE) {
          swapButton();
        }
        startTimeout = setTimeout(() => {
          room.startGame();
        }, 2000);
      } else if (players.length == 3 || players.length >= 2 * teamSize + 1) {
        if (lastWinner == Team.RED) {
          blueToSpecButton();
        } else {
          redToSpecButton();
          setTimeout(() => {
            swapButton();
          }, 5);
        }
        clearTimeout(insertingTimeout);
        insertingPlayers = true;
        setTimeout(() => {
          topButton();
        }, 200);
        insertingTimeout = setTimeout(() => {
          insertingPlayers = false;
        }, 300);
        startTimeout = setTimeout(() => {
          room.startGame();
        }, 2000);
      } else if (players.length == 4) {
        resetButton();
        clearTimeout(insertingTimeout);
        insertingPlayers = true;
        setTimeout(() => {
          randomButton();
          setTimeout(() => {
            randomButton();
          }, 500);
        }, 500);
        insertingTimeout = setTimeout(() => {
          insertingPlayers = false;
        }, 2000);
        startTimeout = setTimeout(() => {
          room.startGame();
        }, 2000);
      } else if (players.length == 5 || players.length >= 2 * teamSize + 1) {
        if (lastWinner == Team.RED) {
          blueToSpecButton();
        } else {
          redToSpecButton();
          setTimeout(() => {
            swapButton();
          }, 5);
        }
        clearTimeout(insertingTimeout);
        insertingPlayers = true;
        insertingTimeout = setTimeout(() => {
          insertingPlayers = false;
        }, 200);
        setTimeout(() => {
          topButton();
        }, 200);
        activateChooseMode();
      } else if (players.length == 6) {
        resetButton();
        clearTimeout(insertingTimeout);
        insertingPlayers = true;
        insertingTimeout = setTimeout(() => {
          insertingPlayers = false;
        }, 1500);
        setTimeout(() => {
          randomButton();
          setTimeout(() => {
            randomButton();
            setTimeout(() => {
              randomButton();
            }, 500);
          }, 500);
        }, 500);
        startTimeout = setTimeout(() => {
          room.startGame();
        }, 2000);
      }
    }
  }
}

/* STATS FUNCTIONS */

/* GK FUNCTIONS */

function handleGKTeam(team) {
  if (team == Team.SPECTATORS) {
    return null;
  }
  let teamArray = team == Team.RED ? teamRed : teamBlue;
  let playerGK = teamArray.reduce((prev, current) => {
    if (team == Team.RED) {
      return prev?.position.x < current.position.x ? prev : current;
    } else {
      return prev?.position.x > current.position.x ? prev : current;
    }
  }, null);
  let playerCompGK = getPlayerComp(playerGK);
  return playerCompGK;
}

function handleGK() {
  let redGK = handleGKTeam(Team.RED);
  if (redGK != null) {
    redGK.GKTicks++;
  }
  let blueGK = handleGKTeam(Team.BLUE);
  if (blueGK != null) {
    blueGK.GKTicks++;
  }
}

function getGK(team) {
  if (team == Team.SPECTATORS) {
    return null;
  }
  let teamArray = team == Team.RED ? game.playerComp[0] : game.playerComp[1];
  let playerGK = teamArray.reduce((prev, current) => {
    return prev?.GKTicks > current.GKTicks ? prev : current;
  }, null);
  return playerGK;
}

function getCS(scores) {
  let playersNameCS = [];
  let redGK = getGK(Team.RED);
  let blueGK = getGK(Team.BLUE);
  if (redGK != null && scores.blue == 0) {
    playersNameCS.push(redGK.player.name);
  }
  if (blueGK != null && scores.red == 0) {
    playersNameCS.push(blueGK.player.name);
  }
  return playersNameCS;
}

function getCSString(scores) {
  let playersCS = getCS(scores);
  if (playersCS.length == 0) {
    return "🥅 No CS";
  } else if (playersCS.length == 1) {
    return `🥅 ${playersCS[0]} had a CS.`;
  } else {
    return `🥅 ${playersCS[0]} and ${playersCS[1]} had a CS.`;
  }
}

/* GLOBAL STATS FUNCTIONS */

function getLastTouchOfTheBall() {
  const ballPosition = room.getBallPosition();
  updateTeams();
  let playerArray = [];
  for (let player of players) {
    if (player.position != null) {
      var distanceToBall = pointDistance(player.position, ballPosition);
      if (distanceToBall < triggerDistance) {
        if (playSituation == Situation.KICKOFF) playSituation = Situation.PLAY;
        playerArray.push([player, distanceToBall]);
      }
    }
  }
  if (playerArray.length != 0) {
    let playerTouch = playerArray.sort((a, b) => a[1] - b[1])[0][0];
    if (
      lastTeamTouched == playerTouch.team ||
      lastTeamTouched == Team.SPECTATORS
    ) {
      if (
        lastTouches[0] == null ||
        (lastTouches[0] != null && lastTouches[0].player.id != playerTouch.id)
      ) {
        game.touchArray.push(
          new BallTouch(
            playerTouch,
            game.scores.time,
            getGoalGame(),
            ballPosition
          )
        );
        lastTouches[0] = checkGoalKickTouch(
          game.touchArray,
          game.touchArray.length - 1,
          getGoalGame()
        );
        lastTouches[1] = checkGoalKickTouch(
          game.touchArray,
          game.touchArray.length - 2,
          getGoalGame()
        );
      }
    }
    lastTeamTouched = playerTouch.team;
  }
}

function getBallSpeed() {
  var ballProp = room.getDiscProperties(0);
  return (
    Math.sqrt(ballProp.xspeed ** 2 + ballProp.yspeed ** 2) * speedCoefficient
  );
}

function getGameStats() {
  if (playSituation == Situation.PLAY && gameState == State.PLAY) {
    lastTeamTouched == Team.RED ? possession[0]++ : possession[1]++;
    var ballPosition = room.getBallPosition();
    ballPosition.x < 0 ? actionZoneHalf[0]++ : actionZoneHalf[1]++;
    handleGK();
  }
}

/* GOAL ATTRIBUTION FUNCTIONS */

function getGoalAttribution(team) {
  var goalAttribution = Array(2).fill(null);
  if (lastTouches[0] != null) {
    if (lastTouches[0].player.team == team) {
      // Direct goal scored by player
      if (lastTouches[1] != null && lastTouches[1].player.team == team) {
        goalAttribution = [lastTouches[0].player, lastTouches[1].player];
      } else {
        goalAttribution = [lastTouches[0].player, null];
      }
    } else {
      // Own goal
      goalAttribution = [lastTouches[0].player, null];
    }
  }
  return goalAttribution;
}

function getGoalString(team) {
  var goalString;
  var scores = game.scores;
  var goalAttribution = getGoalAttribution(team);
  if (goalAttribution[0] != null) {
    if (goalAttribution[0].team == team) {
      if (goalAttribution[1] != null && goalAttribution[1].team == team) {
        goalString = `⚽ ${getTimeGame(scores.time)} Golaaaaaaaaaazo de ${
          goalAttribution[0].name
        } ! asistido por el crack ${
          goalAttribution[1].name
        }. Velocidad de gol : ${ballSpeed.toFixed(2)}km/h.`;
        game.goals.push(
          new Goal(scores.time, team, goalAttribution[0], goalAttribution[1])
        );
      } else {
        goalString = `⚽ ${getTimeGame(scores.time)} Golaaaaaaaaaaazo de ${
          goalAttribution[0].name
        } ! Velocidad de : ${ballSpeed.toFixed(2)}km/h.`;
        game.goals.push(new Goal(scores.time, team, goalAttribution[0], null));
      }
    } else {
      goalString = `😂 ${getTimeGame(scores.time)} Que meme que eres, matate ${
        goalAttribution[0].name
      } ! Velocidad de gol : ${ballSpeed.toFixed(2)}km/h.`;
      game.goals.push(new Goal(scores.time, team, goalAttribution[0], null));
    }
  } else {
    goalString = `⚽ ${getTimeGame(scores.time)} Goal for ${
      team == Team.RED ? "red" : "blue"
    } team ! Goal speed : ${ballSpeed.toFixed(2)}km/h.`;
    game.goals.push(new Goal(scores.time, team, null, null));
  }

  return goalString;
}

/* ROOM STATS FUNCTIONS */

function updatePlayerStats(player, teamStats) {
  var stats = new HaxStatistics(player.name);
  var pComp = getPlayerComp(player);
  if (localStorage.getItem(authArray[player.id][0])) {
    stats = JSON.parse(localStorage.getItem(authArray[player.id][0]));
  }
  stats.games++;
  if (lastWinner == teamStats) stats.wins++;
  stats.winrate = ((100 * stats.wins) / (stats.games || 1)).toFixed(1) + `%`;
  stats.goals += getGoalsPlayer(pComp);
  stats.assists += getAssistsPlayer(pComp);
  stats.ownGoals += getOwnGoalsPlayer(pComp);
  stats.CS += getCSPlayer(pComp);
  stats.playtime += getGametimePlayer(pComp);
  localStorage.setItem(authArray[player.id][0], JSON.stringify(stats));
}

function updateStats() {
  if (
    players.length >= 2 * teamSize &&
    (game.scores.time >= (5 / 6) * game.scores.timeLimit ||
      game.scores.red == game.scores.scoreLimit ||
      game.scores.blue == game.scores.scoreLimit) &&
    teamRedStats.length >= teamSize &&
    teamBlueStats.length >= teamSize
  ) {
    for (let player of teamRedStats) {
      updatePlayerStats(player, Team.RED);
    }
    for (let player of teamBlueStats) {
      updatePlayerStats(player, Team.BLUE);
    }
  }
}

function printRankings(statKey, id = 0) {
  var leaderboard = [];
  statKey = statKey == "cs" ? "CS" : statKey;
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.length == 43)
      leaderboard.push([
        JSON.parse(localStorage.getItem(key)).playerName,
        JSON.parse(localStorage.getItem(key))[statKey],
      ]);
  }
  if (leaderboard.length < 5) {
    if (id != 0) {
      room.sendAnnouncement(
        "No se encontraron partidas jugadas !",
        id,
        errorColor,
        "bold",
        HaxNotification.CHAT
      );
    }
    return;
  }
  leaderboard.sort(function (a, b) {
    return b[1] - a[1];
  });
  var rankingString = `${statKey.charAt(0).toUpperCase() + statKey.slice(1)}> `;
  for (let i = 0; i < 5; i++) {
    let playerName = leaderboard[i][0];
    let playerStat = leaderboard[i][1];
    if (statKey == "playtime") playerStat = getTimeStats(playerStat);
    rankingString += `#${i + 1} ${playerName} : ${playerStat}, `;
  }
  rankingString = rankingString.substring(0, rankingString.length - 2);
  room.sendAnnouncement(
    rankingString,
    id,
    infoColor,
    "bold",
    HaxNotification.CHAT
  );
}

/* GET STATS FUNCTIONS */

function getGamePlayerStats(player) {
  var stats = new HaxStatistics(player.name);
  var pComp = getPlayerComp(player);
  stats.goals += getGoalsPlayer(pComp);
  stats.assists += getAssistsPlayer(pComp);
  stats.ownGoals += getOwnGoalsPlayer(pComp);
  stats.playtime += getGametimePlayer(pComp);
  stats.CS += getCSPlayer(pComp);
  return stats;
}

function getGametimePlayer(pComp) {
  if (pComp == null) return 0;
  var timePlayer = 0;
  for (let j = 0; j < pComp.timeEntry.length; j++) {
    if (pComp.timeExit.length < j + 1) {
      timePlayer += game.scores.time - pComp.timeEntry[j];
    } else {
      timePlayer += pComp.timeExit[j] - pComp.timeEntry[j];
    }
  }
  return Math.floor(timePlayer);
}

function getGoalsPlayer(pComp) {
  if (pComp == null) return 0;
  var goalPlayer = 0;
  for (let goal of game.goals) {
    if (goal.striker != null && goal.team === pComp.player.team) {
      if (authArray[goal.striker.id][0] == pComp.auth) {
        goalPlayer++;
      }
    }
  }
  return goalPlayer;
}

function getOwnGoalsPlayer(pComp) {
  if (pComp == null) return 0;
  var goalPlayer = 0;
  for (let goal of game.goals) {
    if (goal.striker != null && goal.team !== pComp.player.team) {
      if (authArray[goal.striker.id][0] == pComp.auth) {
        goalPlayer++;
      }
    }
  }
  return goalPlayer;
}

function getAssistsPlayer(pComp) {
  if (pComp == null) return 0;
  var assistPlayer = 0;
  for (let goal of game.goals) {
    if (goal.assist != null) {
      if (authArray[goal.assist.id][0] == pComp.auth) {
        assistPlayer++;
      }
    }
  }
  return assistPlayer;
}

function getGKPlayer(pComp) {
  if (pComp == null) return 0;
  let GKRed = getGK(Team.RED);
  if (pComp.auth == GKRed?.auth) {
    return Team.RED;
  }
  let GKBlue = getGK(Team.BLUE);
  if (pComp.auth == GKBlue?.auth) {
    return Team.BLUE;
  }
  return Team.SPECTATORS;
}

function getCSPlayer(pComp) {
  if (pComp == null || game.scores == null) return 0;
  if (getGKPlayer(pComp) == Team.RED && game.scores.blue == 0) {
    return 1;
  } else if (getGKPlayer(pComp) == Team.BLUE && game.scores.red == 0) {
    return 1;
  }
  return 0;
}

function actionReportCountTeam(goals, team) {
  let playerActionSummaryTeam = [];
  let indexTeam = team == Team.RED ? 0 : 1;
  let indexOtherTeam = team == Team.RED ? 1 : 0;
  for (let goal of goals[indexTeam]) {
    if (goal[0] != null) {
      if (playerActionSummaryTeam.find((a) => a[0].id == goal[0].id)) {
        let index = playerActionSummaryTeam.findIndex(
          (a) => a[0].id == goal[0].id
        );
        playerActionSummaryTeam[index][1]++;
      } else {
        playerActionSummaryTeam.push([goal[0], 1, 0, 0]);
      }
      if (goal[1] != null) {
        if (playerActionSummaryTeam.find((a) => a[0].id == goal[1].id)) {
          let index = playerActionSummaryTeam.findIndex(
            (a) => a[0].id == goal[1].id
          );
          playerActionSummaryTeam[index][2]++;
        } else {
          playerActionSummaryTeam.push([goal[1], 0, 1, 0]);
        }
      }
    }
  }
  if (goals[indexOtherTeam].length == 0) {
    let playerCS = getGK(team)?.player;
    if (playerCS != null) {
      if (playerActionSummaryTeam.find((a) => a[0].id == playerCS.id)) {
        let index = playerActionSummaryTeam.findIndex(
          (a) => a[0].id == playerCS.id
        );
        playerActionSummaryTeam[index][3]++;
      } else {
        playerActionSummaryTeam.push([playerCS, 0, 0, 1]);
      }
    }
  }

  playerActionSummaryTeam.sort(
    (a, b) => a[1] + a[2] + a[3] - (b[1] + b[2] + b[3])
  );
  return playerActionSummaryTeam;
}

/* PRINT FUNCTIONS */

function printPlayerStats(stats) {
  let statsString = "";
  for (let [key, value] of Object.entries(stats)) {
    if (key == "playerName") statsString += `${value}: `;
    else {
      if (key == "playtime") value = getTimeStats(value);
      let reCamelCase = /([A-Z](?=[a-z]+)|[A-Z]+(?![a-z]))/g;
      let statName = key.replaceAll(reCamelCase, " $1").trim();
      statsString += `${
        statName.charAt(0).toUpperCase() + statName.slice(1)
      }: ${value}, `;
    }
  }
  statsString = statsString.substring(0, statsString.length - 2);
  return statsString;
}

/* FETCH FUNCTIONS */

function fetchGametimeReport(game) {
  var fieldGametimeRed = {
    name: "🔴        **RED TEAM STATS**",
    value: "⌛ __**Game Time:**__\n\n",
    inline: true,
  };
  var fieldGametimeBlue = {
    name: "🔵       **BLUE TEAM STATS**",
    value: "⌛ __**Game Time:**__\n\n",
    inline: true,
  };
  var redTeamTimes = game.playerComp[0].map((p) => [
    p.player,
    getGametimePlayer(p),
  ]);
  var blueTeamTimes = game.playerComp[1].map((p) => [
    p.player,
    getGametimePlayer(p),
  ]);

  for (let time of redTeamTimes) {
    var minutes = getMinutesReport(time[1]);
    var seconds = getSecondsReport(time[1]);
    fieldGametimeRed.value +=
      `> **${time[0].name}:** ${minutes > 0 ? `${minutes}m` : ""}` +
      `${seconds > 0 || minutes == 0 ? `${seconds}s` : ""}\n`;
  }
  fieldGametimeRed.value += `\n${
    blueTeamTimes.length - redTeamTimes.length > 0
      ? "\n".repeat(blueTeamTimes.length - redTeamTimes.length)
      : ""
  }`;
  fieldGametimeRed.value += "=====================";

  for (let time of blueTeamTimes) {
    var minutes = getMinutesReport(time[1]);
    var seconds = getSecondsReport(time[1]);
    fieldGametimeBlue.value +=
      `> **${time[0].name}:** ${minutes > 0 ? `${minutes}m` : ""}` +
      `${seconds > 0 || minutes == 0 ? `${seconds}s` : ""}\n`;
  }
  fieldGametimeBlue.value += `\n${
    redTeamTimes.length - blueTeamTimes.length > 0
      ? "\n".repeat(redTeamTimes.length - blueTeamTimes.length)
      : ""
  }`;
  fieldGametimeBlue.value += "=====================";

  return [fieldGametimeRed, fieldGametimeBlue];
}

function fetchActionsSummaryReport(game) {
  var fieldReportRed = {
    name: "🔴        **RED TEAM STATS**",
    value: "📊 __**Player Stats:**__\n\n",
    inline: true,
  };
  var fieldReportBlue = {
    name: "🔵       **BLUE TEAM STATS**",
    value: "📊 __**Player Stats:**__\n\n",
    inline: true,
  };
  var goals = [[], []];
  for (let i = 0; i < game.goals.length; i++) {
    goals[game.goals[i].team - 1].push([
      game.goals[i].striker,
      game.goals[i].assist,
    ]);
  }
  var redActions = actionReportCountTeam(goals, Team.RED);
  if (redActions.length > 0) {
    for (let act of redActions) {
      fieldReportRed.value +=
        `> **${act[0].team != Team.RED ? "[OG] " : ""}${act[0].name}:**` +
        `${act[1] > 0 ? ` ${act[1]}G` : ""}` +
        `${act[2] > 0 ? ` ${act[2]}A` : ""}` +
        `${act[3] > 0 ? ` ${act[3]}CS` : ""}\n`;
    }
  }
  var blueActions = actionReportCountTeam(goals, Team.BLUE);
  if (blueActions.length > 0) {
    for (let act of blueActions) {
      fieldReportBlue.value +=
        `> **${act[0].team != Team.BLUE ? "[OG] " : ""}${act[0].name}:**` +
        `${act[1] > 0 ? ` ${act[1]}G` : ""}` +
        `${act[2] > 0 ? ` ${act[2]}A` : ""}` +
        `${act[3] > 0 ? ` ${act[3]}CS` : ""}\n`;
    }
  }

  fieldReportRed.value += `\n${
    blueActions.length - redActions.length > 0
      ? "\n".repeat(blueActions.length - redActions.length)
      : ""
  }`;
  fieldReportRed.value += "=====================";

  fieldReportBlue.value += `\n${
    redActions.length - blueActions.length > 0
      ? "\n".repeat(redActions.length - blueActions.length)
      : ""
  }`;
  fieldReportBlue.value += "=====================";

  return [fieldReportRed, fieldReportBlue];
}

function fetchSummaryEmbed(game) {
  var fetchEndgame = [fetchGametimeReport, fetchActionsSummaryReport];
  var logChannel = gameWebhook;
  var fields = [
    {
      name: "🔴        **RED TEAM STATS**",
      value: "=====================\n\n",
      inline: true,
    },
    {
      name: "🔵       **BLUE TEAM STATS**",
      value: "=====================\n\n",
      inline: true,
    },
  ];
  for (let i = 0; i < fetchEndgame.length; i++) {
    var fieldsReport = fetchEndgame[i](game);
    fields[0].value += fieldsReport[0].value + "\n\n";
    fields[1].value += fieldsReport[1].value + "\n\n";
  }
  fields[0].value = fields[0].value.substring(0, fields[0].value.length - 2);
  fields[1].value = fields[1].value.substring(0, fields[1].value.length - 2);

  var possR = possession[0] / (possession[0] + possession[1]);
  var possB = 1 - possR;
  var possRString = (possR * 100).toFixed(0).toString();
  var possBString = (possB * 100).toFixed(0).toString();
  var zoneR = actionZoneHalf[0] / (actionZoneHalf[0] + actionZoneHalf[1]);
  var zoneB = 1 - zoneR;
  var zoneRString = (zoneR * 100).toFixed(0).toString();
  var zoneBString = (zoneB * 100).toFixed(0).toString();
  var win =
    (game.scores.red > game.scores.blue) * 1 +
    (game.scores.blue > game.scores.red) * 2;
  var objectBodyWebhook = {
    embeds: [
      {
        title: `📝 MATCH REPORT #${getIdReport()}`,
        description:
          `**${getTimeEmbed(game.scores.time)}** ` +
          (win == 1 ? "**Red Team** " : "Red Team ") +
          game.scores.red +
          " - " +
          game.scores.blue +
          (win == 2 ? " **Blue Team**" : " Blue Team") +
          "\n```c\nPossession: " +
          possRString +
          "% - " +
          possBString +
          "%" +
          "\nAction Zone: " +
          zoneRString +
          "% - " +
          zoneBString +
          "%\n```\n\n",
        color: 9567999,
        fields: fields,
        footer: {
          text: `Recording: ${getRecordingName(game)}`,
        },
        timestamp: new Date().toISOString(),
      },
    ],
    username: roomName,
  };
  if (logChannel != "") {
    fetch(logChannel, {
      method: "POST",
      body: JSON.stringify(objectBodyWebhook),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res);
  }
}

/* EVENTS */

/* PLAYER MOVEMENT */

room.onPlayerJoin = function (player) {
  authArray[player.id] = [player.auth, player.conn];
  if (roomWebhook != "") {
    fetch(roomWebhook, {
      method: "POST",
      body: JSON.stringify({
        content:
          `[${getDate()}] ➡️ JOIN (${
            playersAll.length + 1
          }/${maxPlayers})\n**` +
          `${player.name}** [${authArray[player.id][0]}] {${
            authArray[player.id][1]
          }}`,
        username: roomName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res);
  }
  room.sendAnnouncement(
    `👋 Bienvenido ${player.name} !\nIngresa "t" antes de tu mensaje para usar el chat del equipo y "@@" seguido del nombre de un jugador para enviarle un mensaje privado.`,
    player.id,
    welcomeColor,
    "bold",
    HaxNotification.CHAT
  );
  updateTeams();
  updateAdmins();
  if (masterList.findIndex((auth) => auth == player.auth) != -1) {
    room.sendAnnouncement(
      `Master ${player.name} se ha conectado a la sala !`,
      null,
      announcementColor,
      "bold",
      HaxNotification.CHAT
    );
    room.setPlayerAdmin(player.id, true);
  } else if (
    adminList.map((a) => a[0]).findIndex((auth) => auth == player.auth) != -1
  ) {
    room.sendAnnouncement(
      `Admin ${player.name} se ha conectado a la sala !`,
      null,
      announcementColor,
      "bold",
      HaxNotification.CHAT
    );
    room.setPlayerAdmin(player.id, true);
  }
  var sameAuthCheck = playersAll.filter(
    (p) => p.id != player.id && authArray[p.id][0] == player.auth
  );
  if (sameAuthCheck.length > 0 && !debugMode) {
    var oldPlayerArray = playersAll.filter(
      (p) => p.id != player.id && authArray[p.id][0] == player.auth
    );
    for (let oldPlayer of oldPlayerArray) {
      ghostKickHandle(oldPlayer, player);
    }
  }
  handlePlayersJoin();
};

room.onPlayerTeamChange = function (changedPlayer, byPlayer) {
  handleLineupChangeTeamChange(changedPlayer);
  if (AFKSet.has(changedPlayer.id) && changedPlayer.team != Team.SPECTATORS) {
    room.setPlayerTeam(changedPlayer.id, Team.SPECTATORS);
    room.sendAnnouncement(
      `${changedPlayer.name} is AFK !`,
      null,
      errorColor,
      "bold",
      HaxNotification.CHAT
    );
    return;
  }
  updateTeams();
  if (gameState != State.STOP) {
    if (
      changedPlayer.team != Team.SPECTATORS &&
      game.scores.time <= (3 / 4) * game.scores.timeLimit &&
      Math.abs(game.scores.blue - game.scores.red) < 2
    ) {
      changedPlayer.team == Team.RED
        ? teamRedStats.push(changedPlayer)
        : teamBlueStats.push(changedPlayer);
    }
  }
  handleActivityPlayerTeamChange(changedPlayer);
  handlePlayersTeamChange(byPlayer);
};

room.onPlayerLeave = function (player) {
  setTimeout(() => {
    if (!kickFetchVariable) {
      if (roomWebhook != "") {
        var stringContent =
          `[${getDate()}] ⬅️ LEAVE (${playersAll.length}/${maxPlayers})\n**${
            player.name
          }**` + `[${authArray[player.id][0]}] {${authArray[player.id][1]}}`;
        fetch(roomWebhook, {
          method: "POST",
          body: JSON.stringify({
            content: stringContent,
            username: roomName,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res);
      }
    } else kickFetchVariable = false;
  }, 10);
  handleLineupChangeLeave(player);
  checkCaptainLeave(player);
  updateTeams();
  updateAdmins();
  handlePlayersLeave();
};

room.onPlayerKicked = function (kickedPlayer, reason, ban, byPlayer) {
  kickFetchVariable = true;
  if (roomWebhook != "") {
    var stringContent =
      `[${getDate()}] ⛔ ${ban ? "BAN" : "KICK"} (${
        playersAll.length
      }/${maxPlayers})\n` +
      `**${kickedPlayer.name}** [${authArray[kickedPlayer.id][0]}] {${
        authArray[kickedPlayer.id][1]
      }} was ${ban ? "banned" : "kicked"}` +
      `${
        byPlayer != null
          ? " by **" +
            byPlayer.name +
            "** [" +
            authArray[byPlayer.id][0] +
            "] {" +
            authArray[byPlayer.id][1] +
            "}"
          : ""
      }`;
    fetch(roomWebhook, {
      method: "POST",
      body: JSON.stringify({
        content: stringContent,
        username: roomName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res);
  }
  if (
    (ban &&
      ((byPlayer != null &&
        (byPlayer.id == kickedPlayer.id || getRole(byPlayer) < Role.MASTER)) ||
        getRole(kickedPlayer) == Role.MASTER)) ||
    disableBans
  ) {
    room.clearBan(kickedPlayer.id);
    return;
  }
  if (byPlayer != null && getRole(byPlayer) < Role.ADMIN_PERM) {
    room.sendAnnouncement(
      "No tienes permitido kikear/banear otros jugadores !",
      byPlayer.id,
      errorColor,
      "bold",
      HaxNotification.CHAT
    );
    room.setPlayerAdmin(byPlayer.id, false);
    return;
  }
  if (ban) banList.push([kickedPlayer.name, kickedPlayer.id]);
};

/* PLAYER ACTIVITY */

room.onPlayerChat = function (player, message) {
  if (gameState !== State.STOP && player.team != Team.SPECTATORS) {
    let pComp = getPlayerComp(player);
    if (pComp != null) pComp.inactivityTicks = 0;
  }
  let msgArray = message.split(/ +/);
  if (!hideClaimMessage || msgArray[0] != "!claim") {
    if (roomWebhook != "")
      fetch(roomWebhook, {
        method: "POST",
        body: JSON.stringify({
          content: `[${getDate()}] 💬 CHAT\n**${
            player.name
          }** : ${message.replace("@", "@ ")}`,
          username: roomName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res);
  }
  if (msgArray[0][0] == "!") {
    let command = getCommand(msgArray[0].slice(1).toLowerCase());
    if (command != false && commands[command].roles <= getRole(player))
      commands[command].function(player, message);
    else
      room.sendAnnouncement(
        `The command you tried to enter does not exist for you. Please enter '!help' to get the available commands to you.`,
        player.id,
        errorColor,
        "bold",
        HaxNotification.CHAT
      );
    return false;
  }
  if (msgArray[0].toLowerCase() == "t") {
    teamChat(player, message);
    return false;
  }
  if (msgArray[0].substring(0, 2) === "@@") {
    playerChat(player, message);
    return false;
  }
  if (chooseMode && teamRed.length * teamBlue.length != 0) {
    var choosingMessageCheck = chooseModeFunction(player, message);
    if (choosingMessageCheck) return false;
  }
  if (slowMode > 0) {
    var filter = slowModeFunction(player, message);
    if (filter) return false;
  }
  if (!player.admin && muteArray.getByAuth(authArray[player.id][0]) != null) {
    room.sendAnnouncement(
      `Estas muteado !`,
      player.id,
      errorColor,
      "bold",
      HaxNotification.CHAT
    );
    return false;
  }
};

room.onPlayerActivity = function (player) {
  if (gameState !== State.STOP) {
    let pComp = getPlayerComp(player);
    if (pComp != null) pComp.inactivityTicks = 0;
  }
};

room.onPlayerBallKick = function (player) {
  if (playSituation != Situation.GOAL) {
    var ballPosition = room.getBallPosition();
    if (
      game.touchArray.length == 0 ||
      player.id != game.touchArray[game.touchArray.length - 1].player.id
    ) {
      if (playSituation == Situation.KICKOFF) playSituation = Situation.PLAY;
      lastTeamTouched = player.team;
      game.touchArray.push(
        new BallTouch(player, game.scores.time, getGoalGame(), ballPosition)
      );
      lastTouches[0] = checkGoalKickTouch(
        game.touchArray,
        game.touchArray.length - 1,
        getGoalGame()
      );
      lastTouches[1] = checkGoalKickTouch(
        game.touchArray,
        game.touchArray.length - 2,
        getGoalGame()
      );
    }
  }
};

/* GAME MANAGEMENT */

room.onGameStart = function (byPlayer) {
  clearTimeout(startTimeout);
  if (byPlayer != null) clearTimeout(stopTimeout);
  game = new Game();
  possession = [0, 0];
  actionZoneHalf = [0, 0];
  gameState = State.PLAY;
  endGameVariable = false;
  goldenGoal = false;
  playSituation = Situation.KICKOFF;
  lastTouches = Array(2).fill(null);
  lastTeamTouched = Team.SPECTATORS;
  teamRedStats = [];
  teamBlueStats = [];
  if (teamRed.length == teamSize && teamBlue.length == teamSize) {
    for (var i = 0; i < teamSize; i++) {
      teamRedStats.push(teamRed[i]);
      teamBlueStats.push(teamBlue[i]);
    }
  }
  calculateStadiumVariables();
};

room.onGameStop = function (byPlayer) {
  clearTimeout(stopTimeout);
  clearTimeout(unpauseTimeout);
  if (byPlayer != null) clearTimeout(startTimeout);
  game.rec = room.stopRecording();
  if (
    !cancelGameVariable &&
    game.playerComp[0].length + game.playerComp[1].length > 0 &&
    ((game.scores.timeLimit != 0 &&
      ((game.scores.time >= 0.5 * game.scores.timeLimit &&
        game.scores.time < 0.75 * game.scores.timeLimit &&
        game.scores.red != game.scores.blue) ||
        game.scores.time >= 0.75 * game.scores.timeLimit)) ||
      endGameVariable)
  ) {
    fetchSummaryEmbed(game);
    if (fetchRecordingVariable) {
      setTimeout(
        (gameEnd) => {
          fetchRecording(gameEnd);
        },
        500,
        game
      );
    }
  }
  cancelGameVariable = false;
  gameState = State.STOP;
  playSituation = Situation.STOP;
  updateTeams();
  handlePlayersStop(byPlayer);
  handleActivityStop();
};

room.onGamePause = function (byPlayer) {
  if (mentionPlayersUnpause && gameState == State.PAUSE) {
    if (byPlayer != null) {
      room.sendAnnouncement(
        `Game paused by ${byPlayer.name} !`,
        null,
        defaultColor,
        "bold",
        HaxNotification.NONE
      );
    } else {
      room.sendAnnouncement(
        `Game paused !`,
        null,
        defaultColor,
        "bold",
        HaxNotification.NONE
      );
    }
  }
  clearTimeout(unpauseTimeout);
  gameState = State.PAUSE;
};

room.onGameUnpause = function (byPlayer) {
  unpauseTimeout = setTimeout(() => {
    gameState = State.PLAY;
  }, 2000);
  if (mentionPlayersUnpause) {
    if (byPlayer != null) {
      room.sendAnnouncement(
        `Game unpaused by ${byPlayer.name} !`,
        null,
        defaultColor,
        "bold",
        HaxNotification.NONE
      );
    } else {
      room.sendAnnouncement(
        `Game unpaused !`,
        null,
        defaultColor,
        "bold",
        HaxNotification.NONE
      );
    }
  }
  if (
    (teamRed.length == teamSize && teamBlue.length == teamSize && chooseMode) ||
    (teamRed.length == teamBlue.length && teamSpec.length < 2 && chooseMode)
  ) {
    deactivateChooseMode();
  }
};

room.onTeamGoal = function (team) {
  const scores = room.getScores();
  game.scores = scores;
  playSituation = Situation.GOAL;
  ballSpeed = getBallSpeed();
  var goalString = getGoalString(team);
  for (let player of teamRed) {
    var playerComp = getPlayerComp(player);
    team == Team.RED
      ? playerComp.goalsScoredTeam++
      : playerComp.goalsConcededTeam++;
  }
  for (let player of teamBlue) {
    var playerComp = getPlayerComp(player);
    team == Team.BLUE
      ? playerComp.goalsScoredTeam++
      : playerComp.goalsConcededTeam++;
  }
  room.sendAnnouncement(
    goalString,
    null,
    team == Team.RED ? redColor : blueColor,
    null,
    HaxNotification.CHAT
  );
  if (roomWebhook != "") {
    fetch(roomWebhook, {
      method: "POST",
      body: JSON.stringify({
        content: `[${getDate()}] ${goalString}`,
        username: roomName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res);
  }
  if (
    (scores.scoreLimit != 0 &&
      (scores.red == scores.scoreLimit || scores.blue == scores.scoreLimit)) ||
    goldenGoal
  ) {
    endGame(team);
    goldenGoal = false;
    stopTimeout = setTimeout(() => {
      room.stopGame();
    }, 1000);
  }
};

room.onPositionsReset = function () {
  lastTouches = Array(2).fill(null);
  lastTeamTouched = Team.SPECTATORS;
  playSituation = Situation.KICKOFF;
};

/* MISCELLANEOUS */

room.onRoomLink = function (url) {
  console.log(`${url}\nmasterPassword : ${masterPassword}`);
  if (roomWebhook != "") {
    fetch(roomWebhook, {
      method: "POST",
      body: JSON.stringify({
        content: `[${getDate()}] 🔗 LINK ${url}\nmasterPassword : ${masterPassword}`,
        username: roomName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res);
  }
};

room.onPlayerAdminChange = function (changedPlayer, byPlayer) {
  updateTeams();
  if (!changedPlayer.admin && getRole(changedPlayer) >= Role.ADMIN_TEMP) {
    room.setPlayerAdmin(changedPlayer.id, true);
    return;
  }
  updateAdmins(
    byPlayer != null && !changedPlayer.admin && changedPlayer.id == byPlayer.id
      ? changedPlayer.id
      : 0
  );
};

room.onKickRateLimitSet = function (min, rate, burst, byPlayer) {
  if (byPlayer != null) {
    room.sendAnnouncement(
      `It is not allowed to change the kickrate limit. It must stay at "6-0-0".`,
      player.id,
      errorColor,
      "bold",
      HaxNotification.CHAT
    );
    room.setKickRateLimit(6, 0, 0);
  }
};

room.onStadiumChange = function (newStadiumName, byPlayer) {
  if (byPlayer !== null) {
    if (getRole(byPlayer) < Role.MASTER && currentStadium != "other") {
      room.sendAnnouncement(
        `You can't change stadium manually ! Please use the stadium commands.`,
        byPlayer.id,
        errorColor,
        "bold",
        HaxNotification.CHAT
      );
      stadiumCommand(emptyPlayer, `!${currentStadium}`);
    } else {
      room.sendAnnouncement(
        `Map changed. After you're done with this map, please use the stadium commands.`,
        byPlayer.id,
        infoColor,
        "bold",
        HaxNotification.CHAT
      );
      currentStadium = "other";
    }
  }
  checkStadiumVariable = true;
};

room.onGameTick = function () {
  checkTime();
  getLastTouchOfTheBall();
  getGameStats();
  handleActivity();
};
