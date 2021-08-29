<template>
  <div class="hotel-edit-modal">
    <div
      class="modal"
      :class="$store.state.modalOpen ? 'd-block' : 'd-none'"
      id="hotelEditModal"
      tabindex="-1"
      aria-labelledby="hotelEditModalLabel"
      aria-hidden="false"
      aria-modal="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit="submitForm">
            <div class="modal-header p-5 pb-4 border-bottom-0">
              <h2 class="fw-bold mb-0">Yeni Otel Ekle</h2>
              <button
                type="button"
                class="btn-close"
                @click="$store.commit('modalOpen')"
              ></button>
            </div>
            <div class="modal-body p-5 pt-0">
              <div class="form-floating mb-3">
                <input
                  class="form-control rounded-4"
                  v-model="formData.title"
                  required
                />
                <label>Otel Adı</label>
              </div>
              <div class="form-floating mb-3">
                <textarea
                  class="form-control rounded-4"
                  v-model="formData.desc"
                ></textarea>
                <label>Otel Hakkında</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="number"
                  class="form-control rounded-4"
                  required
                  v-model="formData.roomNumber"
                />
                <label>Oda Sayısı</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="number"
                  class="form-control rounded-4"
                  required
                  v-model="formData.price"
                />
                <label>Gecelik Fiyat</label>
              </div>
              <div class="form-floating mb-3">
                <select class="form-select" required v-model="formData.city">
                  <option v-for="(city, key) in cities" :key="key">
                    {{ city }}
                  </option>
                </select>
                <label>Şehir</label>
              </div>
              <div class="form-floating mb-3">
                <textarea
                  class="form-control rounded-4"
                  required
                  v-model="formData.features"
                ></textarea>
                <label>
                  Otelin En İyi Özellikleri (özellikleri virgül ile ayırınız)
                </label>
              </div>
            </div>
            <div class="modal-footer">
              <button
                v-if="formData.id != null"
                type="button"
                class="btn btn-danger me-auto"
                @click="deleteHotel"
              >
                SİL
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                @click="$store.commit('modalOpen')"
              >
                İPTAL
              </button>
              <button
                v-if="formData.id == null"
                type="submit"
                class="btn btn-primary"
              >
                GÖNDER
              </button>
              <button v-else type="submit" class="btn btn-primary">
                KAYDET
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cities from "../utils/cities";

export default {
  name: "HotelEditModal",
  props: {
    formData: {},
  },
  data() {
    return {
      cities: [],
    };
  },
  created() {
    this.cities = cities;
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      if (this.formData.id == null) {
        this.$store.dispatch("addHotel", this.formData).then(() => {
          this.$emit("changeData");
          this.$store.commit("modalOpen");
        });
      } else {
        this.$store.dispatch("updateHotel", this.formData).then(() => {
          this.$emit("changeData");
          this.$store.commit("modalOpen");
        });
      }
    },
    deleteHotel() {
      const c = confirm("Silmek istediğinize emin misiniz?");
      if (c) {
        this.$store.dispatch("deleteHotel", this.formData.id);
        this.$emit("changeData");
        this.$store.commit("modalOpen");
      }
    },
  },
};
</script>

<style>
.hotel-edit-modal .modal {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>