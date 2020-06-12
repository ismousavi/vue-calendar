import Vuex from 'vuex';
import Vue from 'vue';
import Axios from 'axios';
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    currentYear: 2020,
    currentMonth: 6,
    eventFormPosX: 0,
    eventFormPosY: 0,
    eventFormActive: false,
    events: [],
    eventFormDate: null
  },
  mutations: {
    setCurrentMonth(state, payload) {
      state.currentMonth = payload;
    },
    setCurrentYear(state, payload) {
      state.currentYear = payload;
    },
    eventFormPos(state, payload) {
      state.eventFormPosX = payload.x;
      state.eventFormPosY = payload.y;
    },
    eventFormActive(state, payload) {
      state.eventFormActive = payload;
    },
    async addEvent(state, payload) {
      state.events.push(payload);
    },
    eventFormDate(state, payload) {
      state.eventFormDate = payload;
    }
  },
  actions: {
    addEvent(context, payload) {
      // in Context we can access to  mutation, state...

      return new Promise((resolve, reject) => {

        const obj = {
          description: payload,
          date: context.state.eventFormDate
        };

        Axios.post('/add_event', obj).then(res => {
          if (res.status === 200) {
            context.commit('addEvent', obj);
            console.log(res.data);

            resolve();
          }
          reject();
        });

      });

    }
  }
});
