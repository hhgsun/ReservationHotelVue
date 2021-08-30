<template>
  <div class="container">
    <div class="search-box p-4 p-md-5 mb-4 rounded text-md-start">
      <div class="col-md-6 px-0">
        <h1 class="display-4 fst-italic">Tatilin keyfini bizimle yaşayın</h1>
        <p class="fs-6 text-muted my-3">
          Fiyatlarımız her bütçeye uygun, zira sunduğumuz hizmetin kapsamına
          birden fazla seçenek giriyor. Herşey dahil otel seçeneklerimiz kadar,
          beş yıldızlı otel, pansiyon ve butik otel seçeneklerimiz de bulunuyor.
        </p>
      </div>
      <!-- .col -->

      <form @submit="handlerSearch">
        <div class="row mt-4">
          <div class="col-12 col-md-4 mt-2">
            <label class="text-muted small mb-1">Konum</label>
            <input
              class="form-control form-control-lg"
              list="datalistOptions"
              id="citiesSearch"
              placeholder="Şehir seçin"
              v-model="searchData.city"
              required
            />
            <datalist id="datalistOptions">
              <option v-for="(city, key) in cities" :key="key" :value="city" />
            </datalist>
          </div>
          <div class="col-12 col-md-3 mt-2">
            <label class="text-muted small mb-1">Başlangıç Tarihi</label>
            <input
              type="date"
              aria-label="First name"
              class="form-control form-control-lg"
              v-model="searchData.start"
              required
            />
          </div>
          <div class="col-12 col-md-3 mt-2">
            <label class="text-muted small mb-1">Bitiş Tarihi</label>
            <input
              type="date"
              aria-label="First name"
              class="form-control form-control-lg"
              v-model="searchData.end"
              required
            />
          </div>
          <div class="col-12 col-md-2 d-flex pt-4">
            <button type="submit" class="btn btn-dark btn-lg w-100 mt-auto">
              Ara
            </button>
          </div>
        </div>
      </form>

    </div>
    <!-- .search-box -->
  </div>
</template>

<script>
import cities from "../utils/cities";
export default {
  name: "SearchBox",
  data() {
    return {
      cities: [],
      searchData: {
        city: "İSTANBUL",
      },
    };
  },
  created() {
    for (const key in cities) {
      if (Object.hasOwnProperty.call(cities, key)) {
        this.cities[key] = cities[key].toUpperCase();
      }
    }
  },
  methods: {
    handlerSearch(e) {
      e.preventDefault();
      console.log(this.searchData);
      this.$router.push(`/result/${this.searchData.city}/${this.searchData.start}/${this.searchData.end}`);
    },
  },
};
</script>

<style>
.search-box {
  background-image: url("~@/assets/search-box-bg.jpg");
  backdrop-filter: grayscale(1);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  background-color: #fbf4e1;
}
.search-box h1 {
  font-family: "Playfair Display", Georgia, "Times New Roman",
    serif /*rtl:Amiri, Georgia, "Times New Roman", serif*/;
}
</style>