<template>
  <div id="event-form" :class="{active: active}" :style="{top: top, left: left}">
    <h4>Add an event</h4>
    <p v-if="date">{{date.format('dddd, MMM Do')}}</p>
    <div class="text">
      <input
        v-focus
        type="text"
        v-model="description"
        placeholder="Dinnder..."
        @keyup.enter="create"
      />
    </div>
    <div class="buttons">
      <button @click="create">Create</button>
    </div>
    <button id="close-button" @click="close">&#10005;</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      description: ""
    };
  },
  computed: {
    top() {
      return `${this.$store.state.eventFormPosY}px`;
    },
    left() {
      return `${this.$store.state.eventFormPosX}px`;
    },
    active() {
      return this.$store.state.eventFormActive;
    },
    date() {
      return this.$store.state.eventFormDate;
    }
  },
  methods: {
    close() {
      this.$store.commit("eventFormActive", false);
      this.description = "";
    },
    create() {
      if (this.description.length > 0) {
        this.$store.dispatch("addEvent", this.description).then(result =>{
          this.close();
          this.description = "";
        })
      }
    }
  },
  directives: {
    focus: {
      update(el) {
        // call focus method on element(modal) that is open
        el.focus();
      }
    }
  },
  created() {
    // close modal with escape key
    document.addEventListener("keyup", event => {
      if (event.key === "Escape") {
        this.close();
      }
    });
  }
};
</script>