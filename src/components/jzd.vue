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
      <v-toolbar-title
        >Kurnik 3.0

        <v-btn style="margin-left: 500px" color="black" dark large to="/">
          Start
        </v-btn>
        <v-btn style="margin-left: 10px" color="black" dark large to="/">
          Aktualnosci
        </v-btn>
        <v-btn style="margin-left: 10px" color="black" dark large to="/">
          Informacje
        </v-btn>
        <v-btn style="margin-left: 10px" color="black" dark large to="/">
          Kontakt
        </v-btn>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <div class="board" id="board">
        <canvas
          @mouseup="(drag = false), resetConnect()"
          @mousedown="setStartPosition($event)"
          @mousemove="moveLine($event)"
          id="myCanvas"
          style="background: blue"
          ref="canvas"
          :width="windowWidth"
          :height="windowHeight"
          >fdsfdsf</canvas
        >
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
  name: "jzd",
  data: () => ({
    game: "jzd",
    player: new Audio(),
    drawer: null,
    allUsers: {},
    points: 0,
    msg: "",
    messages: [],
    chatColor: "",
    drag: false,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    windowHeight: 100,
    windowWidth: 100,
    connected: false,
    canvas: null,
  }),
  mounted() {
    this.socket.on("JzdplanszaBroadcast", (boardFromServer) => {
      console.log("JESTEM WYWOLANY");
      if (boardFromServer) {
        let ctx = this.canvas;
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.moveTo(boardFromServer.x1, boardFromServer.y1);
        ctx.lineTo(boardFromServer.x2, boardFromServer.y2);
        ctx.stroke();
        ctx.closePath();
        console.log("boardformzerser", boardFromServer.x1, boardFromServer.x2);
      }
    });
    var c = document.getElementById("myCanvas");
    this.canvas = c.getContext("2d");
    const board = document.getElementById("board");
    if (board) {
      const boardRectHeight = board.getBoundingClientRect().height;
      const boardRectWidth = board.getBoundingClientRect().width;
      console.log("HEIGHT", boardRectHeight);
      this.windowHeight = boardRectHeight;
      this.windowWidth = boardRectWidth;
    }

    this.socket.on("allUsers", (users) => {
      this.allUsers = users;
    });

    this.socket.on("Jzdrecmsg", (message) => {
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
    // this.socket.on("gameOverRec", (msg) => {
    //   this.gameOver = msg;
    // });
  },
  methods: {
    resetConnect() {
      if (!this.connected) {
        this.posX = this.startX;
        this.posY = this.startY;
      }
      this.drag = false;
    },
    endConnect(e) {
      this.posX = e.clientX - e.offsetX + 100;
      this.posY = e.clientY - e.offsetY + 10;
      this.drag = false;
      this.connected = true;
    },
    moveLine(e) {
      if (this.drag == true) {
        this.draw(e);
      }
    },
    drawLine(x1, y1, x2, y2) {
      let ctx = this.canvas;
      let drawPositions = { x1: x1, y1: y1, x2: x2, y2: y2 };
      this.socket.emit("Jzdplansza", drawPositions);
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    },
    draw(e) {
      this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
      this.x = e.offsetX;
      this.y = e.offsetY;
    },
    setStartPosition(e) {
      this.connected = false;
      this.drag = true;
      console.log("pos", e.offsetX, e.offsetY);

      this.startX = e.offsetX;
      this.startY = e.offsetY;

      // let dupa = document.querySelector("svg");
      // dupa.style.zIndex = "1";
    },

    sendMessage() {
      console.log(this.msg);
      if (this.msg) {
        let formMSG = {
          username: this.$route.params.user + " : ",
          mess: this.msg,
        };
        this.msg = "";

        this.socket.emit("Jzdmsg", formMSG);
      }
    },
  },
  created() {
    //const PORT = process.env.PORT || 3000;
    this.player.src = require("./audio/trauma.mp3");
    this.player.volume = 0.5;
    //this.player.play();
    this.$vuetify.theme.dark = true;
    //this.socket = io("https://kurnik30.herokuapp.com:");
    this.socket = io("http://localhost:3000");

    this.socket.emit("userInfo", this.$route.params.user, this.game);
  },
};
</script>
<style scoped>
.board {
  /* margin: 10%; */
  position: relative;
  padding: 2%;
  width: 100%;
  height: 100%;
  /* background-color: red; */
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
.punktacjaContent {
  margin: 25px;
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
