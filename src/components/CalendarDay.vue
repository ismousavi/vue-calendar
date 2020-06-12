<template>
  <div :class="classObject" @click="captureClick">
    {{day.format('D MMM')}}
    <ul class="event-list">
      <transition-group name="fade">
        <li v-for="event in events" :key="event">{{event.description}}</li>
      </transition-group>
    </ul>
  </div>
</template>


<script>
export default {
  props: ["day"],
  computed: {
    classObject() {
      const eventFormDate = this.$store.state.eventFormDate;
      const eventFormActive = this.$store.state.eventFormActive;
      return {
        day: true,
        // today: this.$moment().format("D M") === this.day.format("D M"),
        today: this.$moment().isSame(this.day, "day"),
        // or if is not in this month.
        past: this.day.isBefore(this.$moment(), "day"),
        active: this.day.isSame(eventFormDate, "day") && eventFormActive
      };
    },
    events() {
      return this.$store.state.events.filter(event => {
        return event.date.isSame(this.day, "day");
      });
    }
  },
  methods: {
    captureClick(event) {
      this.$store.commit("eventFormActive", true);
      this.$store.commit("eventFormDate", this.day);
      this.$store.commit("eventFormPos", {
        x: event.clientX,
        y: event.clientY
      });
    }
  }
};
</script>