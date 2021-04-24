<template>
  <v-app id="inspire">
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
      <svg id="svg1" width="1900" height="1000">
        <g fill="#383838">
          <!-- <img src="./PNG/2C.png" /> -->
          <rect x="0" y="0" rx="22" width="1800" height="800" />
        </g>
      </svg>
      <div class="board">
        <img
          style="width: 200px"
          @click="zoom = true"
          :class="{ bigPhoto: zoom }"
          src="./PNG/2H.png"
        />
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
//import Vue from "vue";
//import VueChatScroll from "vue-chat-scroll";
//Vue.use(VueChatScroll);
export default {
  name: "gallery",
  data: () => ({
    game: "gallery",
    player: new Audio(),
    zoom: false,
  }),
  methods: {
    showPhoto(zoom) {
      if (zoom == true) {
        return { width: 900 };
      }
    },
  },
};
</script>
<style scoped>
.bigphoto {
  width: 500px !important;
}
.board {
  /* margin: 10%; */
  position: absolute;
  top: 20px;
  left: 40px;
  padding: 10%;
  width: 100%;
  height: 100%;
  max-width: 100%;
  z-index: 3;
  /* background-color: red; */
}
img {
  z-index: 4;
}
#svg1 {
  position: fixed;
  top: 90px;
  left: 50px;
  z-index: 0;
}
img {
  opacity: 0.3;
}
img:hover {
  opacity: 1;
}
</style>
