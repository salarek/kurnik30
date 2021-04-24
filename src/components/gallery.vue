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
      <div class="board">
        <svg id="svg1" width="95%" height="82%">
          <g fill="#383838">
            <!-- <img src="./PNG/2C.png" /> -->
            <rect x="0" y="0" rx="22" width="100%" height="100%" />
          </g>
        </svg>

        <div class="mainImageBox">
          <img style="width:30%;opacity: 1" :src="image" />
        </div>
        <div class="miniatures">
          <div
            v-for="(image, index) in images"
            :key="image.index"
            @click="chooseImage(index)"
          >
            <img style="float: left" :src="image.image" />
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

    currentImageIndex: 0,
    images: [
      {
        id: 1,
        image: "/img/2C.136dab43.png",
      },
      {
        id: 2,
        image: "/img/2D.1451de5d.png",
      },
      {
        id: 3,
        image: "/img/2C.136dab43.png",
      },
      {
        id: 2,
        image: "/img/2D.1451de5d.png",
      },
      {
        id: 3,
        image: "/img/2C.136dab43.png",
      },
      {
        id: 2,
        image: "/img/2D.1451de5d.png",
      },
      {
        id: 3,
        image: "/img/2C.136dab43.png",
      },
      {
        id: 2,
        image: "/img/2D.1451de5d.png",
      },
      {
        id: 3,
        image: "/img/2C.136dab43.png",
      },
      {
        id: 2,
        image: "/img/2D.1451de5d.png",
      },
      {
        id: 3,
        image: "/img/2C.136dab43.png",
      },
      {
        id: 2,
        image: "/img/2D.1451de5d.png",
      },
      {
        id: 3,
        image: "/img/2C.136dab43.png",
      },
      {
        id: 2,
        image: "/img/2D.1451de5d.png",
      },
      {
        id: 3,
        image: "/img/2C.136dab43.png",
      },
    ],
  }),
  methods: {
    chooseImage(index) {
      this.currentImageIndex = index;
    },
  },
  computed: {
    image() {
      return this.images[this.currentImageIndex].image;
    },
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
.mainImageBox {
  display: flex;
  left: 20%;
  position: absolute;
  top: 7%;
  justify-content: center;
  width: 60%;
}
.miniatures {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 72%;
  left: 4%;
  width: 90%;
  height: 20%;
}
#svg1 {
  position: fixed;
  z-index: 0;
}
img {
  opacity: 0.2;
  width: 100%;
  z-index: 2;
}
img:hover {
  opacity: 1;
}
</style>
