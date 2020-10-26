<template>
  <v-app id="inspire">
    <h1>hejka</h1>
    <v-navigation-drawer width="25%" v-model="drawer" app clipped>
      <div class="punktacja"><center>Punktacja</center></div>
      <div id="czat" class="czat">
        <center>Siemaneczko!</center>
        <div v-for="msgg in messages" :key="msgg">
          <div style="color: green; float: left; margin-right: 12px">
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
      <div class="gameBoard">
        <center>
          <div class="dashBoard">
            <h1>
              <div
                style="
                  color: white;
                  width: auto;

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

            <v-btn @click="setBoard" color="blue" dark large
              >Rozpocznij gre!</v-btn
            >
          </div>
          <br />
          <br />
          <div class="board">
            <div v-if="startGame">
              <div
                style="display: inline-block"
                v-for="n in this.boardWidth"
                :key="n"
              >
                <div
                  :class="{
                    active: item.clicked,
                    noactive: !item.clicked && boardWidth < 11,
                    bombactive: item.bombActive,
                    smalldivs: boardWidth >= 11,
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
            <div v-if="!startGame">SAPER</div>
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
export default {
  name: "saper",

  data: () => ({
    msg: "",
    user: "",
    firstLoop: 1,
    blockedGame: false,
    currentUser: "",
    drawer: null,
    boardWidth: 20,
    board: [],
    startGame: false,
    messages: [],
  }),
  mounted() {
    this.socket.on("recmsg", (message) => {
      console.log("heloo");
      if (message) {
        this.messages.push(message);
      }
    });
  },
  methods: {
    sendMessage() {
      console.log(this.msg);
      let formMSG = {
        username: this.$route.params.user + " : ",
        mess: this.msg,
      };

      this.socket.emit("msg", formMSG);
    },
    handler: function (item) {
      this.startGame = !this.startGame;
      this.startGame = !this.startGame;
      item.check == "x" ? (item.check = "") : (item.check = "x");
    },
    setBoard() {
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
            bomb: Math.floor(Math.random() * 9),
            id: Math.random(),
            clicked: false,
            bombActive: false,
            otherBombs: 0,
            showOtherBombs: "",
            check: "",
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
      if (item.check == false) {
        this.firstLoop++;
        console.log("dziwka");

        console.log(this.currentUser);
        console.log(this.firstLoop);
        if (this.currentUser == this.$route.params.user || this.firstLoop < 3) {
          this.socket.emit("QUE", "xd");
          //wywala za tabilces
          this.startGame = !this.startGame;
          this.startGame = !this.startGame;
          if (item.otherBombs != 0) {
            item.showOtherBombs = item.otherBombs;
          }
          if (bomb == 1) {
            item.bombActive = true;
          } else {
            item.clicked = true;
          }

          if (item.otherBombs == 0) {
            let x = item.x;
            let y = item.y;
            let stop = false;
            let stop2 = false;
            let stop3 = false;
            let stop4 = false;
            for (let z = 0; z < 40; z++) {
              stop = false;
              stop2 = false;
              stop3 = false;
              stop4 = false;
              console.log(x, y);
              if (z % this.boardWidth == 0) {
                x = item.x;
                y = item.y;
              }
              if (y - 1 != 0) {
                if (
                  y - 1 != -1 &&
                  this.board[x][y - 1].otherBombs == 0 &&
                  z <= this.boardWidth &&
                  z != 0
                ) {
                  y = y - 1;
                }
              }
              if (
                y + 1 != this.boardWidth &&
                z != 0 &&
                z > this.boardWidth &&
                z <= 20 &&
                this.board[x][y + 1].otherBombs == 0
              ) {
                y = y + 1;
              }
              if (
                x + 1 != this.boardWidth &&
                z > 20 &&
                z != 0 &&
                z <= 30 &&
                this.board[x + 1][y].otherBombs == 0
              ) {
                x = x + 1;
              }
              if (
                x - 1 != -1 &&
                z > 30 &&
                z != 0 &&
                z <= 40 &&
                this.board[x - 1][y].otherBombs == 0
              ) {
                x = x - 1;
              }
              for (let i = 1; i < this.boardWidth; i++) {
                for (let j = 1; j < this.boardWidth; j++) {
                  if (stop == false && this.board[x][y - i]) {
                    //lewo
                    if (this.board[x][y - i].otherBombs != 0) {
                      this.board[x][y - i].showOtherBombs = this.board[x][
                        y - i
                      ].otherBombs;
                      stop = true;
                    }
                    this.board[x][y - i].clicked = true;
                    let stop12 = false;
                    let stop13 = false;
                    for (let u = 0; u < this.boardWidth; u++) {
                      if (
                        //lewo gora
                        stop12 == false &&
                        x + u != this.boardWidth &&
                        y - 1 != -1 &&
                        this.board[x + u][y - i]
                      ) {
                        if (this.board[x + u][y - i].otherBombs != 0) {
                          this.board[x + u][y - i].showOtherBombs = this.board[
                            x + u
                          ][y - i].otherBombs;
                          stop12 = true;
                        }
                        this.board[x + u][y - i].clicked = true;
                      } else {
                        stop12 = true;
                      }
                      if (
                        //lewo dol
                        stop13 == false &&
                        x - u != -1 &&
                        this.board[x - u][y - i]
                      ) {
                        if (this.board[x - u][y - i].otherBombs != 0) {
                          this.board[x - u][y - i].showOtherBombs = this.board[
                            x - u
                          ][y - i].otherBombs;
                          stop13 = true;
                        }
                        this.board[x - u][y - i].clicked = true;
                      } else {
                        stop13 = true;
                      }
                    }
                  } else {
                    stop = true;
                  }
                  if (stop2 == false && this.board[x][y + i]) {
                    //prawo
                    if (this.board[x][y + i].otherBombs != 0) {
                      this.board[x][y + i].showOtherBombs = this.board[x][
                        y + i
                      ].otherBombs;
                      stop2 = true;
                    }
                    this.board[x][y + i].clicked = true;
                    let stop22 = false;
                    let stop23 = false;
                    for (let u = 0; u < this.boardWidth; u++) {
                      //cos tu jest nie halo za tablice i nie bierze wszystkich w lewo
                      if (
                        //prawo dol
                        stop22 == false &&
                        x + u != this.boardWidth &&
                        this.board[x + u][y + i]
                      ) {
                        if (this.board[x + u][y + i].otherBombs != 0) {
                          this.board[x + u][y + i].showOtherBombs = this.board[
                            x + u
                          ][y + i].otherBombs;
                          stop22 = true;
                        }
                        this.board[x + u][y + i].clicked = true;
                      } else {
                        stop22 = true;
                      }
                      if (
                        //prawo gora
                        stop23 == false &&
                        x - u != -1 &&
                        this.board[x - u][y + i]
                      ) {
                        if (this.board[x - u][y + i].otherBombs != 0) {
                          this.board[x - u][y + i].showOtherBombs = this.board[
                            x - u
                          ][y + i].otherBombs;
                          stop23 = true;
                        }
                        this.board[x - u][y + i].clicked = true;
                      } else {
                        stop23 = true;
                      }
                    }
                  } else {
                    stop2 = true;
                  }
                  if (
                    stop3 == false &&
                    x + i != this.boardWidth &&
                    this.board[x + i][y]
                  ) {
                    //dol
                    if (this.board[x + i][y].otherBombs != 0) {
                      this.board[x + i][y].showOtherBombs = this.board[x + i][
                        y
                      ].otherBombs;
                      stop3 = true;
                    }
                    this.board[x + i][y].clicked = true;
                    let stop32 = false;
                    let stop33 = false;
                    for (let u = 0; u < this.boardWidth; u++) {
                      if (
                        //dol lewo
                        stop32 == false &&
                        y - u != -1 &&
                        this.board[x + i][y - u]
                      ) {
                        if (this.board[x + i][y - u].otherBombs != 0) {
                          this.board[x + i][y - u].showOtherBombs = this.board[
                            x + i
                          ][y - u].otherBombs;
                          stop32 = true;
                        }
                        this.board[x + i][y - u].clicked = true;
                      } else {
                        stop32 = true;
                      }
                      if (
                        //dol prawo
                        stop33 == false &&
                        y + u != this.boardWidth &&
                        this.board[x + i][y + u]
                      ) {
                        if (this.board[x + i][y + u].otherBombs != 0) {
                          this.board[x + i][y + u].showOtherBombs = this.board[
                            x + i
                          ][y + u].otherBombs;
                          stop33 = true;
                        }
                        this.board[x + i][y + u].clicked = true;
                      } else {
                        stop33 = true;
                      }
                    }
                  } else {
                    stop3 = true;
                  }
                  if (stop4 == false && x - i != -1 && this.board[x - i][y]) {
                    //gora
                    if (this.board[x - i][y].otherBombs != 0) {
                      this.board[x - i][y].showOtherBombs = this.board[x - i][
                        y
                      ].otherBombs;
                      stop4 = true;
                    }
                    this.board[x - i][y].clicked = true;
                    let stop42 = false;
                    let stop43 = false;
                    for (let u = 0; u < this.boardWidth; u++) {
                      if (
                        stop42 == false &&
                        y - u != 0 &&
                        this.board[x - i][y - u]
                      ) {
                        //gora lewo
                        if (this.board[x - i][y - u].otherBombs != 0) {
                          this.board[x - i][y - u].showOtherBombs = this.board[
                            x - i
                          ][y - u].otherBombs;
                          stop42 = true;
                        }
                        this.board[x - i][y - u].clicked = true;
                      } else {
                        stop42 = true;
                      }
                      if (
                        //gora prawo
                        stop43 == false &&
                        y + u != this.boardWidth &&
                        this.board[x - i][y + u]
                      ) {
                        if (this.board[x - i][y + u].otherBombs != 0) {
                          this.board[x - i][y + u].showOtherBombs = this.board[
                            x - i
                          ][y + u].otherBombs;
                          stop43 = true;
                        }
                        this.board[x - i][y + u].clicked = true;
                      } else {
                        stop43 = true;
                      }
                    }
                  } else {
                    stop4 = true;
                  }
                }
              }
            }
          }
          this.socket.emit("plansza", this.board);
          this.blockedGame = !this.blockedGame;
        }
      }
    },
  },
  created() {
    this.$vuetify.theme.dark = true;
    this.socket = io("http://localhost:3000");

    this.socket.emit("userInfo", this.$route.params.user);
  },
};
</script>
<style>
.dashBoard {
  width: 100%;
}
.punktacja {
  width: 100%;
  height: 40%;
  background-color: grey;
  font-size: 25px;
  float: left;
  overflow-y: scroll;
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
.noactive {
  background-color: rgb(66, 66, 66);
  border: solid;
  font-size: 22px !important;
  padding: 5px !important;
  width: 80px !important;
  height: 80px !important;
}
.bombactive {
  background-color: red;
}
.smalldivs {
  font-size: 25px !important;
  display: flex !important;
  padding: 4px !important;
  border: solid;
  background-color: rgb(66, 66, 66);
  width: 50px !important;
  height: 50px !important;
}
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
  /* background-color: white; */
  clear: both;
  display: flex !important;

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
  background-color: rgb(160, 160, 160);
  font-size: 30px;
  overflow-y: scroll;
}
.czatInput {
  font-family: "Comic Neue", cursive;
  padding: 14px 0px 14px;
  text-align: center;
  float: left;
  width: 100%;
  height: 10%;
  background-color: rgb(58, 58, 58);
}
.inputGame {
  position: relative;
  color: black !important;
  margin-right: 20px;
  background: rgb(173, 173, 173);
  width: 56%;

  padding: 20px;
  height: 0px;
  font-size: 100%;
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
