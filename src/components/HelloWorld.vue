<template>
  <div class="hello">
    <button @click="sendMessage">Send!</button>
    <button @click="receiveMessage">Receive!</button>
    <p>
      {{ message }}
    </p>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: function () {
    return {
      socket: {},
      message: {},
    };
  },

  created() {
    this.socket = io("http://localhost:3000");
  },
  mounted() {
    this.socket.on("msg", (data) => {
      console.log(data);
    });
  },
  methods: {
    sendMessage() {
      this.socket.emit("msg2", "yourSTARA jedzi taczka");
    },
    receiveMessage() {
      this.socket.on("msg3", (recData) => {
        this.message = recData;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
