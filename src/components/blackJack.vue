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
      <button @click="drawCard(1)">Dobierz karte</button>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    cardValue: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    playerSummary: 0,
    oponnentSummary: 0,
    drawer: null,
  }),
  watch: {
    Check: "endCheck",
  },
  methods: {
    drawCard(who) {
      let rand = Math.floor(Math.random() * 9);
      if (who == 1) {
        this.playerSummary += this.cardValue[rand];
        console.log(this.playerSummary);
      } else if (who == 2) {
        this.oponnentSummary += this.cardValue[rand];
        console.log(this.oponnentSummary);
      }
    },
    endCheck() {
      if (this.playerSummary > 21) {
        console.log("suma punktow przed wyzerowaniem: " + this.playerSummary);
        this.playerSummary = 0;
        console.log("Punkty zostały wyzerowane!");
      }
    },
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
</style>
