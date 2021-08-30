<template>
  <div class="hotels-view">
    <hotel-edit-modal
      v-if="selectHotel"
      :formData="selectHotel"
      v-on:changeData="changeDataRefresh"
    />

    <div class="container">

      <h1>Tüm Oteller</h1>

      <div class="d-flex">
        <button
          class="btn btn-small btn-dark mb-3 ms-auto"
          @click="addNewHotel"
        >
          Yeni Ekle
        </button>
      </div>

      <div v-for="hotel in $store.state.hotels" :key="hotel.id" class="py-1">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4" style="display: flex; height: 250px;">
              <img
                :src="hotel.imageUrl"
                class="img-fluid rounded-start"
                :alt="hotel.title"
                height="100"
                style="object-fit:cover; width:100%"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title mb-0">{{ hotel.title }}</h5>
                <p class="card-text">{{ hotel.desc }}</p>
                <p class="card-text">
                  <small class="text-muted d-block">Fiyat: {{ hotel.price }}</small>
                  <small class="text-muted d-block">Oda Sayısı: {{ hotel.roomNumber }}</small>
                  <small class="text-muted d-block">Şehir: {{ hotel.city }}</small>
                  <small class="text-muted d-block">Özellikler: {{ hotel.features }}</small>
                </p>
                <a class="btn btn-outline-dark" @click="selectModal(hotel)"
                  >Düzenle</a
                >
              </div>
            </div>
          </div>
        </div>
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
      this.$store.commit("hotelModalOpen");
    },
    selectModal(hotel) {
      this.selectHotel = Object.assign({}, hotel);
      this.$store.commit("hotelModalOpen");
    },
    changeDataRefresh() {
      this.$set(this.hotels, this.$store.state.hotels);
    },
  },
};
</script>

<style>
</style>