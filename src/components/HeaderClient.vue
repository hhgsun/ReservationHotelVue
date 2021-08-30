<template>
  <header class="py-3 mb-3 border-bottom bg-white sticky-top">
    <div
      class="container-fluid d-grid gap-3 align-items-center"
      style="grid-template-columns: 1fr 2fr"
    >
      <div class="dropdown">
        <!-- class="dropdown-toggle"
        id="dropdownNavLink"
        data-bs-toggle="dropdown"
        aria-expanded="false" -->
        <router-link to="/"
          href="#"
          class="
            d-flex
            align-items-center
            col-lg-4
            mb-2 mb-lg-0
            link-dark
            text-decoration-none
            flex-row
          "
        >
          <img
            alt="Hotel Reservation"
            src="../assets/logo.png"
            height="40"
            class="me-2"
          />
          <small class="text-muted me-1">HOTEL RESERVATION</small>
        </router-link>
        <ul
          class="dropdown-menu text-small shadow"
          aria-labelledby="dropdownNavLink"
          data-popper-placement="bottom-end"
        >
          <router-link class="dropdown-item" exact-active-class="active" to="/"
            >Home</router-link
          >
          <router-link
            class="dropdown-item"
            exact-active-class="active"
            to="/about"
            >About</router-link
          >
          <!-- <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#">Reports</a></li> -->
        </ul>
      </div>

      <div class="d-flex align-items-center ms-auto">

        <div class="flex-shrink-0 dropdown">
          <a
            href="#"
            class="d-block link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              v-if="$store.state.authData == null"
              src="../assets/no-avatar.png"
              alt="mdo"
              width="32"
              height="32"
              class="rounded-circle"
            />
            <img
              v-else
              :src="$store.state.authData.photoURL"
              alt="mdo"
              width="32"
              height="32"
              class="rounded-circle"
            />
          </a>
          <ul
            class="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser2"
          >
            <li
              v-if="
                $store.state.authData != null && $store.state.authData.isAdmin
              "
            >
              <router-link
                class="dropdown-item"
                exact-active-class="active"
                to="/hotels"
                >Hotels</router-link
              >
            </li>
            <li v-if="$store.state.authData != null">
              <router-link
                class="dropdown-item"
                exact-active-class="active"
                to="/reservations"
                >Rezervasyonlarım</router-link
              >
            </li>
            <li v-if="$store.state.authData != null">
              <hr class="dropdown-divider" />
            </li>
            <li v-if="$store.state.authData == null">
              <a
                class="dropdown-item"
                href="#"
                @click="$store.commit('loginModalOpen')"
                >Giriş Yap</a
              >
            </li>
            <li v-if="$store.state.authData != null">
              <a
                class="dropdown-item"
                href="#"
                @click="$store.dispatch('logOut')"
                >Çıkış Yap</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderClient",
};
</script>

<style>
</style>