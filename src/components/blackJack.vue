<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer v-model="drawer" app clipped>
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
    </v-navigation-drawer> -->

    <v-app-bar app clipped-left>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-toolbar-title>Kurnik 3.0</v-toolbar-title>
    </v-app-bar>

    <!--tutaj umieszczam to co jest widoczne w gierce  -->
    <v-main> </v-main>

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
  data: function() {
    return {
      symbols: ["pik", "kier", "tref", "karo"],
      cardValue: [
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
      ],
      deck: new Array(),
    };
  },
  created: {
    createdeck: "createDeck",
  },
  methods: {
    createDeck: function() {
      for (let i = 0; i < this.cardValue.length; i++) {
        for (let j = 0; j < this.symbols.length; j++) {
          var value = parseInt(this.cardValue[i]);
          if (
            this.cardValue[i] == "J" ||
            this.cardValue[i] == "Q" ||
            this.cardValue[i] == "K"
          ) {
            value = 10;
          } else if (this.cardValue[i] == "A") {
            value = 11;
          }
          console.log(value);
          var card = {
            Symbol: this.symbol[i],
            CardValue: this.CardValue[i],
            Value: value,
          };
          this.deck.push(card);
        }
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
