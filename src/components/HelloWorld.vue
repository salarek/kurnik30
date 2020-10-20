<template>
  <div class="hello">
    <button @click="sendMessage('ore ore')">send message</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data: function () {
    return {
      connection: null,
    };
  },
  methods: {
    sendMessage: function (message) {
      console.log(this.connection);
      this.connection.send(message);
    },
  },
  created() {
    console.log("starting connection");
    this.connection = new WebSocket("wss://echo.websocket.org");
    this.connection.onopen = function (event) {
      console.log(event);
      console.log("siemaneczko ziomeczki");
    };
    this.connection.onmessage = function (event) {
      console.log(event);
    };
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
