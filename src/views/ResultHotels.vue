<template>
  <div class="result-hotels-view">
    {{ this.$route.params }}

    <div v-for="(hotel, key) in hotels" :key="key" class="card p-5">
      {{ hotel }}
      <button @click="selectHotel(hotel)">Seç</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultHotels",
  data() {
    return {
      hotels: [],
    };
  },
  created() {
    this.$store.dispatch("searchHotel", this.$route.params).then(() => {
      this.hotels = this.$store.state.searchResultHotels;
    });
  },
  methods: {
    selectHotel(hotel) {
      console.log(hotel);
    },
  },
};
</script>

<style>
</style>