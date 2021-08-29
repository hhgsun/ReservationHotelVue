<template>
  <div class="hotels-view">
    <hotel-edit-modal
      v-if="selectHotel"
      :formData="selectHotel"
      v-on:changeData="changeDataRefresh"
    />

    <div class="container">
      <button class="btn btn-small btn-dark" @click="addNewHotel">
        Yeni Ekle
      </button>

      <div
        v-for="hotel in $store.state.hotels"
        :key="hotel.id"
        class="py-2 border-bottom"
      >
        {{ hotel }}

        <a class="btn btn-outline-dark" @click="selectModal(hotel)">Düzenle</a>
      </div>
    </div>
  </div>
</template>

<script>
import HotelEditModal from "../components/HotelEditModal.vue";
export default {
  components: { HotelEditModal },
  name: "Hotels",
  data() {
    return {
      hotels: [],
      selectHotel: {},
    };
  },
  mounted() {
    this.hotels = this.$store.state.hotels;
    this.$store.dispatch("getAllHotels");
  },
  methods: {
    addNewHotel() {
      this.selectHotel = {};
      this.$store.commit("modalOpen");
    },
    selectModal(hotel) {
      this.selectHotel = Object.assign({}, hotel);
      this.$store.commit("modalOpen");
    },
    changeDataRefresh() {
      this.$set(this.hotels, this.$store.state.hotels);
    },
  },
};
</script>

<style>
</style>