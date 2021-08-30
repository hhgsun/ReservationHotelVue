import Vue from 'vue'
import Vuex from 'vuex'
import db from '../db';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hotels: [],
    searchResultHotels: [],
    hotelModalOpen: false,
    loginModalOpen: false,
    authData: null,
    currentRezervation: null,
    successUpload: false,
    reservations: [],
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
    hotelModalOpen(state) {
      state.hotelModalOpen = !state.hotelModalOpen;
    },
    loginModalOpen(state, bool = null) {
      if (bool != null) {
        state.loginModalOpen = bool;
      } else {
        state.loginModalOpen = !state.loginModalOpen;
      }
    },
    setSearchResultHotels(state, results) {
      state.searchResultHotels = results;
    },
    newReservation(state, { searchData, hotel }) {
      state.currentRezervation = { searchData: searchData, hotel: hotel };
    },
    setAuthData(state, payload) {
      state.authData = payload;
    },
    setReservations(state, payload) {
      state.reservations = payload;
    }
  },
  actions: {
    async getAllHotels({ commit }) {
      const res = await db.firestore().collection("hotels").get();
      let data = [];
      let self = this;
      res.forEach(async h => {
        const imageUrl = await self.dispatch("getImageUrl", h.data().imgName);
        data.push({
          id: h.id,
          ...h.data(),
          imageUrl: imageUrl
        })
      });
      commit("setAllHotels", data);
      return data;
    },
    async addHotel({ commit, dispatch }, hotel) {
      const newHotel = {
        title: hotel.title,
        city: hotel.city,
        desc: hotel.desc,
        features: hotel.features,
        price: hotel.price,
        roomNumber: hotel.roomNumber,
        imgName: null
      }
      if (hotel.file) {
        await dispatch("uploadImageHotel", hotel.file);
        newHotel["imgName"] = hotel.file.name;
      }
      const res = await db.firestore().collection("hotels").add(newHotel);
      const h = await res.get();
      const dataHotel = { id: h.id, ...h.data() }
      commit("addHotel", dataHotel);
      return dataHotel;
    },
    async updateHotel({ commit, dispatch }, hotel) {
      const newHotel = {
        title: hotel.title,
        desc: hotel.desc,
        features: hotel.features,
        price: hotel.price,
        city: hotel.city,
        roomNumber: hotel.roomNumber
      };
      if (hotel.file) {
        await dispatch("uploadImageHotel", hotel.file);
        newHotel["imgName"] = hotel.file.name;
      }
      await db.firestore().collection("hotels").doc(hotel.id).update(newHotel);
      commit("updateHotel", newHotel);
      return newHotel;
    },
    async deleteHotel({ commit }, hotelId) {
      await db.firestore().collection("hotels").doc(hotelId).delete();
      commit("deleteHotel", hotelId);
    },
    /* */
    async searchHotel({ commit }, searchData) {
      const city = searchData.city;
      const list = [];
      const hotels = await db.firestore().collection("hotels").where("city", "==", city).get();
      let self = this;
      hotels.forEach(async hotel => {
        const revs = await db.firestore().collection("hotels").doc(hotel.id).collection("rezs").get();
        if (revs.docs.length < Number(hotel.data().roomNumber)) {
          const imageUrl = await self.dispatch("getImageUrl", hotel.data().imgName);
          const data = {
            id: hotel.id,
            ...hotel.data(),
            imageUrl: imageUrl
          };
          console.log(data);
          list.push(data);
        }
      });
      commit("setSearchResultHotels", list);
    },
    async newReservation({ state, commit }, { searchData, hotel }) {
      const city = searchData.city;
      const start = new Date(searchData.start);
      const end = new Date(searchData.end);
      const res = await db.firestore().collection("hotels").doc(hotel.id).collection("rezs").add({
        city: city,
        start: start,
        end: end,
        uid: state.authData.uid
      });
      commit("newReservation", { searchData, hotel });
      return res;
    },
    async getUserReservations({ state, commit }) {
      const hotels = await db.firestore().collection("hotels").get();
      const list = [];
      let self = this;
      hotels.docs.forEach(async hotel => {
        const rezs = await hotel.ref.collection("rezs").where("uid", "==", state.authData.uid).get();
        if (rezs.docs.length > 0) {
          rezs.forEach(async rez => {
            const imageUrl = await self.dispatch("getImageUrl", hotel.data().imgName);
            const d = {
              id: rez.id,
              hotel: {
                id: hotel.id,
                imageUrl: imageUrl,
                ...hotel.data()
              },
              ...rez.data()
            };
            list.push(d);
          })
        }
      });
      commit("setReservations", list);
    },
    /* */
    async uploadImageHotel({ state }, file) {
      const storage = getStorage();
      const storageRef = ref(storage, `hotels/${file.name}`);
      return uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot.ref.fullPath);
        state.successUpload = true;
        return snapshot.ref.fullPath;
      });
    },

    async getImageUrl({ state }, fileName) {
      const storage = getStorage();
      const url = await getDownloadURL(ref(storage, `hotels/${fileName}`));
      state.successUpload = true;
      return url;
    },

    /* */
    async checkAuth({ commit }) {
      getAuth().onAuthStateChanged((res) => {
        const user = res;
        if (user != null) {
          db.firestore().collection("users").doc(user.uid).get().then((data) => {
            commit("setAuthData", {
              id: data.id,
              ...data.data()
            })
          })
        } else {
          commit("setAuthData", null);
        }
      });
    },
    async login({ commit }) {
      const auth = getAuth();
      auth.languageCode = "tr";
      const provider = new GoogleAuthProvider();
      return signInWithPopup(auth, provider).then(async (res) => {
        const userData = {
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          emailVerified: res.user.emailVerified,
          uid: res.user.uid
        }
        const queryRegister = await db.firestore().collection("users").where("uid", "==", res.user.uid);
        const isRegister = (await queryRegister.get()).docs.length;
        if (isRegister == 0) {
          await db.firestore().collection("users").doc(res.user.uid).set(userData);
        }
        commit("setAuthData", userData);
        commit("loginModalOpen", null);
        return userData.uid;
      });
    },
    async logOut({ commit }) {
      const auth = getAuth();
      return auth.signOut().then(() => {
        commit("setAuthData", null);
      });
    }

  },
})
