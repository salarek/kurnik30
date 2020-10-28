<template>
  <v-app id="inspire">
    <v-navigation-drawer width="25%" v-model="drawer" app clipped>
      <div class="punktacja">
        <div class="punktacjaContent">
          <center>Punktacja - Najwięcej porażek</center>
          <br />
          <div style="color: red" v-for="all in allUsers" :key="all.msg">
            {{ all }}
          </div>
        </div>
      </div>
      <div id="czat" class="czat" v-chat-scroll>
        <center>Siemaneczko!</center>
        <div v-for="msgg in messages" :key="msgg.msg">
          <div class="chatFormat">
            <b>{{ msgg.username }}</b>
          </div>
          {{ msgg.mess }}
        </div>
      </div>

      <div class="czatInput">
        <form id="czatIn">
          <input
            class="inputGame"
            id="msg"
            v-model="msg"
            type="text"
            placeholder="Wpisz"
            required
            autocomplete="off"
            @keyup.enter="sendMessage()"
          />
          <v-btn color="blue" @click="sendMessage()">send</v-btn>
        </form>
      </div>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Kurnik 3.0 </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-btn
        style="margin-top: 20px; width:20px; background-color: #121212"
        @click="stopPlaying()"
      >
        <img
          v-if="this.play == false"
          style="width:50px; "
          src="./PNG/musicoff.jpg"
        />
        <img
          v-if="this.play == true"
          style="width:50px; "
          src="./PNG/music.jpg"
        />
      </v-btn>
      <v-row style="color: green; width: auto; float: right" justify="center">
        <v-dialog v-model="dialog" scrollable max-width="400px">
          <template v-slot:activator="{ on, attrs }">
            <v-hover>
              <v-btn color="blue" dark v-bind="attrs" v-on="on">
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </v-hover>
          </template>
          <v-card>
            <v-card-title>Wybierz poziom trudności</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 220px">
              <v-radio-group v-model="difficulty2" column>
                <v-radio label="Latwy" value="30"></v-radio>
                <v-radio label="Sredni" value="17"></v-radio>
                <v-radio label="Trudny" value="8"></v-radio>
                <v-radio label="Bardzo trudny" value="5"></v-radio>
                <v-radio label="Niemozliwy" value="2"></v-radio>
              </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>

            <v-text-field
              v-model.number="boardWidth2"
              label="Podaj rozmiar planszy: <od 4 do 30>"
              required
            ></v-text-field>

            <v-card-actions>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveSettings">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <div class="gameBoard">
        <center>
          <div class="dashBoard">
            <h1>
              <div
                style="
                
                position: fixed;
                  color: white;
                  width: auto;
                  right: 50px;
                  top: 100px;
                  display: inline-block;
                "
              >
                KOLEJ GRACZA:
                <div
                  style="
                    color: green;
                    width: auto;
                    float: right;
                    margin-left: 10px;
                  "
                >
                  {{ currentUser }}
                </div>
              </div>
            </h1>

            <v-btn
              style="
                color: white;
                width: auto;
                margin-top: 40px;
                display: inline-block;
              "
              @click="setBoard"
              color="blue"
              dark
              large
              >Rozpocznij gre!</v-btn
            >
          </div>

          <br />
          <br />
          <div class="board">
            <div v-if="startGame">
              <div
                style="display: inline-block"
                v-for="n in boardWidth"
                :key="n"
              >
                <div
                  :class="{
                    active: item.clicked,
                    //noactive: !item.clicked && boardWidth < 1,
                    bombactive: item.bombActive,
                    //smalldivs: !item.clicked, //boardWidth >= 11,
                  }"
                  @click="isBomb(item.bomb, item)"
                  @contextmenu.prevent="handler(item)"
                  class="divs"
                  v-for="item in board[n - 1]"
                  :key="item.id"
                >
                  <center>{{ item.showOtherBombs }}{{ item.check }}</center>
                </div>
                <div
                  :class="{
                    emptyDiv2: boardWidth >= 11,
                    emptyDiv: boardWidth < 11,
                  }"
                ></div>
              </div>
            </div>
            <div v-if="!startGame"></div>
          </div>
        </center>
      </div>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import io from "socket.io-client";
import $ from "jquery";
import Vue from "vue";
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);
export default {
  name: "saper",
  data: () => ({
    player: new Audio(),

    difficulty: 9,
    difficulty2: "",
    dialog: false,
    msg: "",
    user: "",
    firstLoop: 0,
    chatColor: "",
    blockedGame: false,
    gameOver: false,
    currentUser: "",
    drawer: null,
    boardWidth: 20,
    boardWidth2: 20,
    allUsers: {},
    points: 0,
    board: [],
    play: true,
    startGame: false,
    messages: [],
  }),
  mounted() {
    this.socket.on("allUsers", (users) => {
      this.allUsers = users;
    });
    this.socket.on("settingsRec", (boardWidthR, difficultyR, startGameR) => {
      this.startGame = startGameR;
      this.difficulty = difficultyR;
      this.boardWidth = boardWidthR;
    });
    this.socket.on("recmsg", (message) => {
      this.chatColor = "#";
      var randomHex = "123456ABCDEF";
      for (var i = 0; i < 6; i++) {
        this.chatColor += randomHex[Math.floor(Math.random() * 10)];
      }

      console.log(this.chatColor);
      $(".chatFormat").css("color", this.chatColor);
      console.log("heloo");
      if (message) {
        $(".chatFormat").css("color", this.chatColor);
        this.messages.push(message);
        $(".chatFormat").css("color", this.chatColor);
      }
    });
    this.socket.on("gameOverRec", (msg) => {
      this.gameOver = msg;
    });
  },
  methods: {
    stopPlaying() {
      if (this.play == true) {
        this.player.pause();
        this.play = false;
      } else {
        this.player.play();
        this.play = true;
      }
    },
    saveSettings() {
      if (this.boardWidth2 > 40) {
        this.boardWidth2 = 40;
        //alert("za duza tablica");
      }
      if (this.boardWidth2 < 4) {
        this.boardWidth2 = 4;
        //alert("za duza tablica");
      }

      this.boardWidth = this.boardWidth2;
      this.dialog = false;
      this.difficulty = this.difficulty2;
      this.startGame = !this.startGame;
      this.socket.emit(
        "sendSettings",
        this.boardWidth,
        this.difficulty,
        this.startGame
      );
    },

    sendMessage() {
      console.log(this.msg);
      if (this.msg) {
        let formMSG = {
          username: this.$route.params.user + " : ",
          mess: this.msg,
        };
        this.msg = "";

        this.socket.emit("msg", formMSG);
      }
    },
    handler: function(item) {
      this.startGame = !this.startGame;
      this.startGame = !this.startGame;
      item.check == "x" ? (item.check = "") : (item.check = "x");
    },
    setBoard() {
      this.gameOver = false;
      this.socket.emit("gameOver", this.gameOver);
      console.log(this.boardWidth);
      console.log(this.difficulty);
      this.startGame = !this.startGame;
      this.socket.on("queUser", (currUser) => {
        console.log("JESTEM WYWOLANY2");
        this.currentUser = currUser;
      });
      this.socket.on("planszaBroadcast", (boardFromServer) => {
        console.log("JESTEM WYWOLANY");
        if (boardFromServer) {
          this.board = boardFromServer;
        }
        this.blockedGame = !this.blockedGame;
      });
      for (let i = 0; i < this.boardWidth; i++) {
        this.board[i] = new Array();
        for (let j = 0; j < this.boardWidth; j++) {
          this.board[i][j] = {
            x: i,
            y: j,
            bomb: Math.floor(Math.random() * this.difficulty),
            id: Math.random(),
            clicked: false,
            bombActive: false,
            otherBombs: 0,
            showOtherBombs: "",
            check: "",
            clearblock: false,
          };
        }
      }
      for (let i = 0; i < this.boardWidth; i++) {
        for (let j = 0; j < this.boardWidth; j++) {
          if (j != 0 && this.board[i][j - 1].bomb == 1) {
            this.board[i][j].otherBombs++;
          }
          if (j != this.boardWidth - 1 && this.board[i][j + 1].bomb == 1) {
            this.board[i][j].otherBombs++;
          }
          if (
            i != this.boardWidth - 1 &&
            j != 0 &&
            this.board[i + 1][j - 1].bomb == 1
          ) {
            this.board[i][j].otherBombs++;
          }
          if (
            i != this.boardWidth - 1 &&
            j != this.boardWidth - 1 &&
            this.board[i + 1][j + 1].bomb == 1
          ) {
            this.board[i][j].otherBombs++;
          }
          if (i != 0 && j != 0 && this.board[i - 1][j - 1].bomb == 1) {
            this.board[i][j].otherBombs++;
          }
          if (
            i != 0 &&
            j != this.boardWidth - 1 &&
            this.board[i - 1][j + 1].bomb == 1
          ) {
            this.board[i][j].otherBombs++;
          }
          if (i != 0 && this.board[i - 1][j].bomb == 1) {
            this.board[i][j].otherBombs++;
          }
          if (i != this.boardWidth - 1 && this.board[i + 1][j].bomb == 1) {
            this.board[i][j].otherBombs++;
          }
        }
      }
      this.socket.emit("plansza", this.board);
    },
    isBomb(bomb, item) {
      //this.board[item.x][item.y + 1].clicked = true;
      if (this.gameOver == false) {
        if (item.clicked == false) {
          this.firstLoop++;
          console.log("dziwka");

          console.log(this.currentUser);
          console.log(this.firstLoop);
          if (
            this.currentUser == this.$route.params.user ||
            this.firstLoop < 2
          ) {
            this.socket.emit("QUE", "xd");
            //wywala za tabilces
            this.startGame = !this.startGame;
            this.startGame = !this.startGame;
            if (item.otherBombs != 0) {
              item.showOtherBombs = item.otherBombs;
            }
            if (bomb == 1) {
              this.gameOver = true;
              item.bombActive = true;
              let formMSG = {
                username: "BOT: ",
                mess: "KONIEC GRY! Przegral gracz: " + this.$route.params.user,
              };
              this.points++;
              this.socket.emit(
                "sendPoints",
                this.points,
                this.$route.params.user
              );

              this.socket.emit("msg", formMSG);
              this.socket.emit("gameOver", this.gameOver);
            } else {
              item.clicked = true;
            }

            if (item.otherBombs == 0) {
              let x = item.x;
              let y = item.y;
              while (x < this.boardWidth && this.board[x][y].otherBombs == 0) {
                this.board[x][y].clicked = true;
                this.board[x][y].clearblock = true;
                x++;
              }
              x = item.x;
              while (x >= 0 && this.board[x][y].otherBombs == 0) {
                this.board[x][y].clicked = true;
                this.board[x][y].clearblock = true;
                x--;
              }
              x = item.x;

              for (let d = item.y; d >= 0; d--) {
                if (y > 0) {
                  y--; //?
                }
                for (let a = 0; a < this.boardWidth; a++) {
                  if (this.board[a][y + 1].clearblock == true) {
                    x = a;
                    while (
                      x < this.boardWidth &&
                      this.board[x][y].otherBombs == 0
                    ) {
                      this.board[x][y].clicked = true;
                      this.board[x][y].clearblock = true;
                      x++;
                    }
                    x = a;
                    while (x >= 0 && this.board[x][y].otherBombs == 0) {
                      this.board[x][y].clicked = true;
                      this.board[x][y].clearblock = true;
                      x--;
                    }
                  }
                }
              }
              x = item.x;

              for (let d = y; d < this.boardWidth; d++) {
                if (y < this.boardWidth - 1) {
                  y++; //?
                }
                for (let a = 0; a < this.boardWidth; a++) {
                  if (this.board[a][y - 1].clearblock == true) {
                    x = a;
                    while (
                      x < this.boardWidth &&
                      this.board[x][y].otherBombs == 0
                    ) {
                      this.board[x][y].clicked = true;
                      this.board[x][y].clearblock = true;
                      x++;
                    }
                    x = a;
                    while (x >= 0 && this.board[x][y].otherBombs == 0) {
                      this.board[x][y].clicked = true;
                      this.board[x][y].clearblock = true;
                      x--;
                    }
                  }
                }
              }
              for (let i = 1; i < this.boardWidth - 1; i++) {
                for (let j = 1; j < this.boardWidth - 1; j++) {
                  if (this.board[i][j].clearblock == true) {
                    if (this.board[i][j - 1].otherBombs != 0) {
                      this.board[i][j - 1].showOtherBombs = this.board[i][
                        j - 1
                      ].otherBombs;
                      this.board[i][j - 1].clicked = true;
                    }
                    if (this.board[i][j + 1].otherBombs != 0) {
                      this.board[i][j + 1].showOtherBombs = this.board[i][
                        j + 1
                      ].otherBombs;
                      this.board[i][j + 1].clicked = true;
                    }
                    if (this.board[i + 1][j].otherBombs != 0) {
                      this.board[i + 1][j].showOtherBombs = this.board[i + 1][
                        j
                      ].otherBombs;
                      this.board[i + 1][j].clicked = true;
                    }
                    if (this.board[i - 1][j].otherBombs != 0) {
                      this.board[i - 1][j].showOtherBombs = this.board[i - 1][
                        j
                      ].otherBombs;
                      this.board[i - 1][j].clicked = true;
                    }

                    if (this.board[i + 1][j - 1].otherBombs != 0) {
                      this.board[i + 1][j - 1].showOtherBombs = this.board[
                        i + 1
                      ][j - 1].otherBombs;
                      this.board[i + 1][j - 1].clicked = true;
                    }

                    if (this.board[i + 1][j + 1].otherBombs != 0) {
                      this.board[i + 1][j + 1].showOtherBombs = this.board[
                        i + 1
                      ][j + 1].otherBombs;
                      this.board[i + 1][j + 1].clicked = true;
                    }

                    if (this.board[i - 1][j + 1].otherBombs != 0) {
                      this.board[i - 1][j + 1].showOtherBombs = this.board[
                        i - 1
                      ][j + 1].otherBombs;
                      this.board[i - 1][j + 1].clicked = true;
                    }

                    if (this.board[i - 1][j - 1].otherBombs != 0) {
                      this.board[i - 1][j - 1].showOtherBombs = this.board[
                        i - 1
                      ][j - 1].otherBombs;
                      this.board[i - 1][j - 1].clicked = true;
                    }
                  }
                }
              }
              for (let z = 0; z < this.boardWidth; z++) {
                if (this.board[z][0].clearblock == true) {
                  if (this.board[z][0 + 1].otherBombs != 0) {
                    this.board[z][0 + 1].showOtherBombs = this.board[z][
                      0 + 1
                    ].otherBombs;
                    this.board[z][0 + 1].clicked = true;
                  }
                }
              }
              for (let z = 0; z < this.boardWidth; z++) {
                if (this.board[z][this.boardWidth - 1].clearblock == true) {
                  if (this.board[z][this.boardWidth - 1 - 1].otherBombs != 0) {
                    this.board[z][
                      this.boardWidth - 1 - 1
                    ].showOtherBombs = this.board[z][
                      this.boardWidth - 1 - 1
                    ].otherBombs;
                    this.board[z][this.boardWidth - 1 - 1].clicked = true;
                  }
                }
              }
              for (let z = 0; z < this.boardWidth; z++) {
                if (this.board[0][z].clearblock == true) {
                  if (this.board[0 + 1][z].otherBombs != 0) {
                    this.board[0 + 1][z].showOtherBombs = this.board[0 + 1][
                      z
                    ].otherBombs;
                    this.board[0 + 1][z].clicked = true;
                  }
                }
              }
              for (let z = 0; z < this.boardWidth; z++) {
                if (this.board[this.boardWidth - 1][z].clearblock == true) {
                  if (this.board[this.boardWidth - 1 - 1][z].otherBombs != 0) {
                    this.board[this.boardWidth - 1 - 1][
                      z
                    ].showOtherBombs = this.board[this.boardWidth - 1 - 1][
                      z
                    ].otherBombs;
                    this.board[this.boardWidth - 1 - 1][z].clicked = true;
                  }
                }
              }
            }
            this.socket.emit("plansza", this.board);
            this.blockedGame = !this.blockedGame;
          }
        }
      }
    },
  },
  created() {
    this.player.src = require("./audio/trauma.mp3");
    this.player.volume = 0.5;
    this.player.play();
    this.$vuetify.theme.dark = true;
    this.socket = io("http://192.168.8.102:3000");

    this.socket.emit("userInfo", this.$route.params.user);
  },
};
</script>
<style>
.punktacjaContent {
  margin: 25px;
}
.dashBoard {
  width: 100%;
}

.emptyDiv2 {
  width: 50px;
  height: 50px;
}
.emptyDiv {
  width: 80px;
  height: 80px;
}
.active {
  background-color: green;
  border: solid;
}
/* .noactive {
  background-color: rgb(66, 66, 66);
  border: solid;
  font-size: 25px !important;
  padding-right: 35px !important;
  width: 80px !important;
  height: 80px !important;
} */
.bombactive {
  background-color: red;
}
/* .smalldivs {
  font-size: 25px !important;
  display: flex !important;
  padding-left: 15px !important;
  border: solid;
  background-color: rgb(66, 66, 66);
  width: 50px !important;
  height: 50px !important;
} */
.board {
  float: left;
  width: 98%;
  height: 98%;
  max-width: 98%;
  overflow-x: scroll;
  overflow-y: scroll;
  overflow: auto;
  white-space: nowrap;
}
.divs {
  background-color: rgb(36, 36, 36);
  clear: both;

  /* margin: 1px; */
  color: black;
  border-style: solid;
  border-color: black;
}
.divs:hover {
  cursor: pointer;
  background-color: rgb(20, 139, 250) !important;
}

.gameBoard {
  font-family: "Comic Neue", cursive;
  margin-left: 2%;
  width: auto !important;
  height: auto;
}

.czat {
  font-family: "Comic Neue", cursive;

  padding: 14px 5% 14px;
  text-align: left;
  float: left;
  color: black;
  width: 100%;
  height: 50%;
  background-color: rgb(233, 233, 233);
  font-size: 20px;
  overflow-y: scroll;
}
.czatInput {
  font-family: "Comic Neue", cursive;
  padding: 14px 0px 14px;
  text-align: center;
  float: left;
  width: 100%;
  height: 15%;
  background-color: rgb(68, 68, 68);
  overflow-y: scroll;
}
.inputGame {
  color: black !important;
  margin-right: 20px;
  background: rgb(255, 255, 255);
  width: 56%;

  padding: 20px;
  height: 0px;
  font-size: 100%;
}
.chatFormat {
  /* color: chatColor; */
  float: left;
  margin-right: 12px;
  color: green;
}
.punktacja {
  width: 100%;
  height: 35%;
  background-color: rgb(68, 68, 68);
  font-size: 20px;
  float: left;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  width: 15px;
  height: 15px;
}
::-webkit-scrollbar-track-piece {
  background-color: #000000;
}
::-webkit-scrollbar-thumb:vertical {
  height: 30px;
  background-color: #519aec;
}
::-webkit-scrollbar-thumb:horizontal {
  height: 30px;
  background-color: #519aec;
}
</style>
