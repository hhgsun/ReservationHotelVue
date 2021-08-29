<template>
  <header class="py-3 mb-3 border-bottom bg-white sticky-top">
    <div
      class="container-fluid d-grid gap-3 align-items-center"
      style="grid-template-columns: 1fr 2fr"
    >
      <div class="dropdown">
        <a
          href="#"
          class="
            d-flex
            align-items-center
            col-lg-4
            mb-2 mb-lg-0
            link-dark
            text-decoration-none
            dropdown-toggle
          "
          id="dropdownNavLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            alt="Hotel Reservation"
            src="../assets/logo.png"
            height="32"
            class="me-2"
          />
          <small class="text-muted me-1">HOTEL RESERVATION</small>
        </a>
        <ul
          class="dropdown-menu text-small shadow"
          aria-labelledby="dropdownNavLink"
          data-popper-placement="bottom-end"
        >
          <li>
            <a class="dropdown-item" href="#" aria-current="page">Overview</a>
          </li>
          <router-link class="dropdown-item" exact-active-class="active" to="/"
            >Home</router-link
          >
          <router-link
            class="dropdown-item"
            exact-active-class="active"
            to="/about"
            >About</router-link
          >
          <router-link class="dropdown-item" exact-active-class="active" to="/hotels"
            >Hotels</router-link
          >
          <li><a class="dropdown-item" href="#">Inventory</a></li>
          <li><a class="dropdown-item" href="#">Customers</a></li>
          <li><a class="dropdown-item" href="#">Products</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#">Reports</a></li>
          <li><a class="dropdown-item" href="#">Analytics</a></li>
        </ul>
      </div>

      <div class="d-flex align-items-center ms-auto">
        <!-- <form class="w-100 me-3">
          <input
            type="search"
            class="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </form> -->

        <div class="flex-shrink-0 dropdown">
          <a
            href="#"
            class="d-block link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
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
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
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