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

        <v-btn style="margin-left: 500px;" color="black" dark large to="/">
          <!-- <router-link to="/blackjack">ELO</router-link>
              <router-view /> -->
          Start
        </v-btn>
        <v-btn style="margin-left: 10px;" color="black" dark large to="/">
          <!-- <router-link to="/blackjack">ELO</router-link>
              <router-view /> -->
          Aktualnosci
        </v-btn>
        <v-btn style="margin-left: 10px;" color="black" dark large to="/">
          <!-- <router-link to="/blackjack">ELO</router-link>
              <router-view /> -->
          Informacje
        </v-btn>
        <v-btn style="margin-left: 10px;" color="black" dark large to="/">
          <!-- <router-link to="/blackjack">ELO</router-link>
              <router-view /> -->
          Kontakt
        </v-btn>
      </v-toolbar-title>
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
          <div class="board"></div>
        </center>
      </div>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script>
//import io from "socket.io-client";
//import $ from "jquery";
import Vue from "vue";
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);
export default {
  name: "dotworld",
  data: () => ({
    game: "dotworld",
    player: new Audio(),
    dialog: false,
    drawer: null,
    msg: "",
    user: "",
    chatColor: "",
    allUsers: {},
    points: 0,
    play: true,
    messages: [],
  }),
};
</script>
<style>
.punktacjaContent {
  margin: 25px;
}
.dashBoard {
  width: 100%;
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
