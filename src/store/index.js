import Vue from 'vue'
import Vuex from 'vuex'
import db from '../db';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hotels: [],
    searchResultHotels: [],
    modalOpen: false,
  },
  mutations: {
    setAllHotels(state, hotels) {
      state.hotels = hotels;
    },
    addHotel(state, hotel) {
      state.hotels.push(hotel);
    },
    updateHotel(state, hotel) {
      let index = state.hotels.findIndex(h => h.id === hotel.id);
      if (index != -1) {
        state.hotels[index] = hotel;
      }
    },
    deleteHotel(state, hotelId) {
      let index = state.hotels.findIndex(h => h.id === hotelId);
      if (index != -1) {
        state.hotels.splice(index, 1);
      }
    },
    modalOpen(state) {
      state.modalOpen = !state.modalOpen;
    },
    setSearchResultHotels(state, results) {
      state.searchResultHotels = results;
    }
  },
  actions: {
    async getAllHotels({ commit }) {
      const res = await db.firestore().collection("hotels").get();
      let data = [];
      res.forEach(h => {
        data.push({
          id: h.id,
          ...h.data(),
        })
      });
      commit("setAllHotels", data);
      return data;
    },
    async addHotel({ commit }, hotel) {
      const res = await db.firestore().collection("hotels").add(hotel);
      const h = await res.get();
      const newHotel = { id: h.id, ...h.data() }
      commit("addHotel", newHotel);
      return newHotel;
    },
    async updateHotel({ commit }, hotel) {
      const newHotel = {
        title: hotel.title,
        desc: hotel.desc,
        features: hotel.features,
        price: hotel.price,
        city: hotel.city,
        roomNumber: hotel.roomNumber
      };
      await db.firestore().collection("hotels").doc(hotel.id).update(newHotel);
      commit("updateHotel", newHotel);
      return newHotel;
    },
    async deleteHotel({ commit }, hotelId) {
      await db.firestore().collection("hotels").doc(hotelId).delete();
      commit("deleteHotel", hotelId);
    },

    async searchHotel({ commit }, { city }) {
      console.log(city);
      const res = db.firestore().collection("hotels").where("city", "==", city);
      const result = (await res.get()).docs;
      const data = result.map(r => {
        return {
          id: r.id,
          ...r.data()
        }
      });
      commit("setSearchResultHotels", data);
      return data;
    }

  },
})
