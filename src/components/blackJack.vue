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
          <button @click="startNewGame()">Start</button>
          <button @click="drawCard()">Draw</button>
          <button @click="check()">Check</button>
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
  data: () => {
    return {
      playerPoints: 0,
      krupierPoints: 0,
      deck: [],
      playerHand: [],
      krupierHand: [],
      playedCard: [], //czy karta była juz zagrana
    };
  },
  beforeMount() {
    this.createDeck();
    this.playerCard = new Array(52).fill(false);
  },
  methods: {
    startNewGame() {
      for (let i = 0; i < 2; i++) {
        this.playerHand.push(this.drawCard());
        this.krupierHand.push(this.drawCard());
      }
      this.playerPoints = this.countPoints(this.playerHand);
      this.krupierPoints = this.countPoints(this.krupierHand);
    },
    createDeck() {
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
      mark.map((m) => {
        symbols.map((s) => {
          this.deck.push(`${m}${s}`);
        });
      });
    },
    drawCard() {
      do {
        var cardIndex = Math.floor(Math.random() * 52);
      } while (this.playedCard[cardIndex]);
      let card = this.deck[cardIndex];
      this.playedCard[cardIndex] = true;
      console.log(card);
      return card;
    },
    countPoints(hand) {
      let value = 0;
      hand.map((e) => {
        let val = e.slice(0, -1);
        if (Number.isNaN(parseInt(val)) && val == "A") {
          val = 11;
        } else if (Number.isNaN(parseInt(val))) {
          val = 10;
        } else {
          val = parseInt(val);
        }
        value += val;
      });
      return value;
    },
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
