<template>
  <div class="result-hotels-view">
    <nav class="navbar navbar-light bg-light my-3 py-3">
      <div class="container">
        <div>
          {{ $route.params.city }} şehrinde 
          <span>{{ $route.params.start }}</span> -
          <span>{{ $route.params.end }}</span> tarihleri arası uygun oteller
        </div>
      </div>
    </nav>
    <div class="container">
      <div v-if="isLoad == false" class="p-5 text-center fs-3 text-muted">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else>
        <div v-for="(hotel, key) in hotels" :key="key" class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4" style="display: flex; height: 250px">
              <img
                :src="hotel.imageUrl"
                class="img-fluid rounded-start"
                :alt="hotel.title"
                height="100"
                style="object-fit: cover; width: 100%"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title mb-0">{{ hotel.title }}</h5>
                <p class="card-text">{{ hotel.desc }}</p>
                <p class="card-text">
                  <small class="text-muted d-block"
                    >Fiyat: {{ hotel.price }}</small
                  >
                  <small class="text-muted d-block"
                    >Oda Sayısı: {{ hotel.roomNumber }}</small
                  >
                  <small class="text-muted d-block"
                    >Şehir: {{ hotel.city }}</small
                  >
                  <small class="text-muted d-block"
                    >Özellikler: {{ hotel.features }}</small
                  >
                </p>
                <div class="d-flex">
                  <button
                    class="btn btn-dark btn-lg ms-auto"
                    @click="selectHotel(hotel)"
                  >
                    Seç
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="hotels != [] && hotels.length == 0">Sonuç Bulunamadı</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultHotels",
  data() {
    return {
      hotels: [],
      isLoad: false,
    };
  },
  created() {
    this.$store.dispatch("searchHotel", this.$route.params).then(() => {
      this.hotels = this.$store.state.searchResultHotels;
      this.isLoad = true;
    });
  },
  methods: {
    selectHotel(hotel) {
      if (this.$store.state.authData == null) {
        this.$store.commit("loginModalOpen");
      } else {
        this.$store
          .dispatch("newReservation", {
            searchData: this.$route.params,
            hotel: hotel,
          })
          .then(() => {
            
            this.$router.push("/reservations");
            //window.location.reload();
          });
      }
    },
  },
};
</script>

<style>
</style>