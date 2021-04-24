<template>
  <div>
    <gallery />
  </div>
</template>

<script>
import gallery from "@/components/gallery.vue";

export default {
  name: "galleryView",
  components: {
    gallery,
  },
  data() {
    return {
      drawer: null,
    };
  },

  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
