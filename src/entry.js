// Shared FIle for WebEntery and ServerEntery
import Vue from 'vue';
import App from './components/App.vue';
import store from './store';
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

// Defince $moment property
Object.defineProperty(Vue.prototype, '$moment', {get() {return this.$root.moment;} });


export default function (events) {
  // Aggregate all state with initial states
  const initialState = Object.assign({}, store.state, {events});
  store.replaceState(initialState);

  return new Vue({
    store,
    data: {
      moment
    },
    components: {
      App
    },
    render(createElement) {
      // V-Node
      return createElement(
        'div',
        {attrs: {id: 'app'}},
        [createElement('app')]
      );
    }
  });
}