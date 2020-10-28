<template>
  <v-app id="inspire">
    <v-navigation-drawer width="25%" v-model="drawer" app clipped>
      <div class="punktacja"><center>Punktacja</center>
      <div class = "punktacjaContent">
       <div v-for="all in allUsers" :key="all.msg">
        {{all}}
        </div>
      </div>
      </div>
      <div id="czat" class="czat"  v-chat-scroll>
        <center>Siemaneczko!</center>
        <div v-for="msgg in messages" :key="msgg.msg" >
          <div class = "chatFormat">
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
                background-color: black;
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
import $ from 'jquery'
import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
export default {
  name: "saper",


  data: () => ({
    difficulty: 9,
    difficulty2: "",
    dialog: false,
    msg: "",
    user: "",
    firstLoop: 1,
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
    startGame: false,
    messages: [],
  }),
  mounted() {
    this.socket.on("allUsers", (users)=>{
      this.allUsers = users;
      
    });
    this.socket.on("settingsRec", ( boardWidthR, difficultyR, startGameR)=>{
      this.startGame = startGameR;
      this.difficulty = difficultyR;
      this.boardWidth = boardWidthR;
    });
    this.socket.on("recmsg", (message) => {
       this.chatColor = "#";
    var randomHex = "123456ABCDEF";  
    for(var i = 0; i<6;i++){
        this.chatColor+= randomHex[Math.floor(Math.random()*10)]
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
      this.socket.emit("sendSettings", this.boardWidth, this.difficulty, this.startGame);
    },
    
    sendMessage() {
      console.log(this.msg);
      let formMSG = {
        username: this.$route.params.user + " : ",
        mess: this.msg,
      };

      this.socket.emit("msg", formMSG);
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
      if(this.gameOver==false){
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
            this.gameOver = true;
            item.bombActive = true;
            let formMSG = {
              username: "BOT: ",
              mess: "KONIEC GRY! Przegral gracz: "+ this.$route.params.user,
            };
            this.points++;
            this.socket.emit("sendPoints",this.points,this.$route.params.user )

            this.socket.emit("msg", formMSG);
            this.socket.emit("gameOver", this.gameOver);
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
    }
    },
  },
  created() {
    
    
    this.$vuetify.theme.dark = true;
    this.socket = io("http://192.168.8.102:3000");

    this.socket.emit("userInfo", this.$route.params.user);
  },
};
</script>
<style>
.punktacjaContent{
  margin: 20px;
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
.noactive {
  background-color: rgb(66, 66, 66);
  border: solid;
  font-size: 25px !important;
  padding-right: 35px !important;
  width: 80px !important;
  height: 80px !important;
}
.bombactive {
  background-color: red;
}
.smalldivs {
  font-size: 25px !important;
  display: flex !important;
  padding-left: 15px !important;
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
.chatFormat{
  /* color: chatColor; */
   float: left; 
   margin-right: 12px;
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
