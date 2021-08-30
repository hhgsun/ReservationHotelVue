<template>
  <div class="login-modal">
    <div
      class="modal"
      :class="$store.state.loginModalOpen ? 'd-block' : 'd-none'"
      id="hotelEditModal"
      tabindex="-1"
      aria-labelledby="hotelEditModalLabel"
      aria-hidden="false"
      aria-modal="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content rounded-6 shadow">
          <div class="modal-header border-bottom-0">
            <h5 class="modal-title">Giriş Yap</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="$store.commit('loginModalOpen')"
            ></button>
          </div>
          <div class="modal-body py-0">
            <p>
              Bu işleme devam edebilmeniz için oturum açmanız gerekiyor.
            </p>
          </div>
          <div class="modal-footer flex-column border-top-0">
            <button
              type="button"
              class="btn btn-lg btn-primary w-100 mx-0 mb-2"
              @click="loginHandler"
            >
              GOOGLE İLE OTURUM AÇ
            </button>
            <button
              type="button"
              class="btn btn-lg btn-light w-100 mx-0"
              @click="$store.commit('loginModalOpen')"
            >
              VAZGEÇ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginModal",
  methods: {
    loginHandler() {
      this.$store.dispatch("login").then(uid => {
        console.log("uid:", uid);
      });
    },
  },
};
</script>

<style>
.login-modal .modal {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>