<template>
  <div class="rezervations-view">
    <div class="container">
      <h1 class="mb-4">Rezervasyonlarım</h1>

      <div v-for="(reservation, key) in $store.state.reservations" :key="key" class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4" style="display: flex; height: 250px">
              <img
                :src="reservation.hotel.imageUrl"
                class="img-fluid rounded-start"
                :alt="reservation.hotel.title"
                height="100"
                style="object-fit: cover; width: 100%"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title mb-0">Başlangıç: {{ reservation.start.toDate().toLocaleDateString() }}</h5>
                <h5 class="card-title mb-0">Bitiş: {{ reservation.end.toDate().toLocaleDateString() }}</h5>

                <h5 class="card-title mt-3 mb-0">{{ reservation.hotel.title }}</h5>
                <p class="card-text">{{ reservation.hotel.desc }}</p>
                <p class="card-text">
                  <small class="text-muted d-block"
                    >Fiyat: {{ reservation.hotel.price }}</small
                  >
                  <small class="text-muted d-block"
                    >Oda Sayısı: {{ reservation.hotel.roomNumber }}</small
                  >
                  <small class="text-muted d-block"
                    >Şehir: {{ reservation.hotel.city }}</small
                  >
                  <small class="text-muted d-block"
                    >Özellikler: {{ reservation.hotel.features }}</small
                  >
                </p>
                <div class="d-flex">
                  <!-- <button
                    class="btn btn-dark btn-lg ms-auto"
                  >
                    Seç
                  </button> -->
                </div>
              </div>
            </div>
          </div>
        </div>



    </div>
  </div>
</template>

<script>
export default {
  name: "Rezervations",
  mounted(){
    this.$store.dispatch("getUserReservations");
  }
};
</script>

<style>
</style>