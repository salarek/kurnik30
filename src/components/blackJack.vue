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

    <!--tutaj umieszczam to co jest widoczne w gierce  -->
    <v-main>
      <div class="blackJack">
        <div class="mainPage">
          <h1>Black Jack</h1>
        </div>
        <div class="Krupier">
          <div class="karty">
            <img src="./PNG/gray_back.png" alt="" />
            <img src="./PNG/gray_back.png" alt="" />
          </div>
          <h2>Suma punktów Krupiera: {{ krupierPoints }}</h2>
        </div>
        <div class="player">
          <h2>Suma punktów Gracza: {{ playerPoints }}</h2>
          <div class="karty">
            <img src="./PNG/KC.png" alt="" />
            <img src="./PNG/AH.png" alt="" />
          </div>
        </div>
        <div class="gamePanel">
          <button>Draw</button>
          <button>Check</button>
        </div>
      </div>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "blackJack",
  props: {
    source: String,
  },
  data: function () {
    return {
      playerPoints: 19,
      krupierPoints: 15,
      deck: [],
    };
  },
  created: {
    create: "createDeck() ",
  },
  methods: {
    createDeck: function () {
      const symbols = ["C", "D", "H", "S"];
      const mark = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
        "A",
      ];
      var pool = [];
      mark.map((m) => {
        symbols.map((s) => {
          pool.push(`${m}${s}`);
        });
      });
      console.log(pool);
      pool = this.deck;
    },
    drawCard() {},
    countPoints() {},
    check() {},
  },
};
</script>
<style>
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
  width: 800px;
  height: 800px;
}
.mainPage {
  text-align: center;
  height: 10%;
}
.karty {
  display: flex;
  justify-content: center;
}
img {
  width: 10%;
}
button {
  background-color: #4caccc; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.gamePanel {
  display: flex;
  justify-content: space-around;
  width: 20%;
  margin-left: 40%;
  margin-top: 3%;
}
.blackJack {
  background-color: green;
  height: 100%;
}
</style>
