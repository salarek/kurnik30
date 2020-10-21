<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Kurnik 3.0</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div class="con">
        <v-btn @click="setBoard" dark large>Stworz tablice</v-btn>
        <v-btn @click="startGame = !startGame" color="error" dark large
          >Graj</v-btn
        >

        <div v-if="startGame">
          <div v-for="n in this.boardWidth" :key="n">
            <div class="emptyDiv"></div>

            <div
              :class="{
                active: item.clicked,
                noactive: !item.clicked,
                bombactive: item.bombActive,
              }"
              @click="isBomb(item.bomb, item)"
              @contextmenu.prevent="handler(item)"
              class="divs"
              v-for="item in board[n - 1]"
              :key="item.id"
            >
              <center>{{ item.showOtherBombs }}{{ item.check }}</center>
            </div>
          </div>
        </div>
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
  props: {
    source: String,
  },
  data: () => ({
    blockedGame: false,
    drawer: null,
    boardWidth: 10,
    board: [],
    startGame: false,
  }),
  methods: {
    handler: function(item) {
      this.startGame = !this.startGame;
      this.startGame = !this.startGame;
      item.check == "x" ? (item.check = "") : (item.check = "x");
    },
    setBoard() {
      this.socket.on("planszaBroadcast", (boardFromServer) => {
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
        this.socket.emit("plansza", this.board);
      }
    },
    isBomb(bomb, item) {
      if (!this.blockedGame) {
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
    },
  },
  created() {
    this.$vuetify.theme.dark = true;
    this.socket = io("http://192.168.2.139:3000");
  },
};
</script>
<style>
.emptyDiv {
  width: 80px;
  height: 80px;
}
.active {
  background-color: green;
  border: solid;
}
.noactive {
  background-color: grey;
  border: solid;
}
.bombactive {
  background-color: red;
}
.divs {
  /* background-color: white; */
  float: left;
  padding: 5px;
  /* margin: 1px; */
  width: 80px;
  height: 80px;
  color: black;
  font-size: 40px;
  border-style: solid;
  border-color: black;
}
.divs:hover {
  background-color: blue;
}
.con {
  width: 1800px;
  height: 800px;
}
</style>
