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
      <div class="board"></div>
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
  }),
  mounted() {
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
