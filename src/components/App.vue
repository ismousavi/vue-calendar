<template>
  <div>
    <div id="header">
      <div>
        <h1>Vue.js Calendar</h1>
      </div>
      <div>
        <current-month></current-month>
      </div>
    </div>

    <transition name="fade">
      <div id="day-bar">
        <div v-for="day in weeks[0]" :key="day">{{day.format('ddd')}}</div>
      </div>
    </transition>

    <div id="calendar">
      <div v-for="week in weeks" :key="week" class="calendar-week">
        <!-- week {{weeks.indexOf(week) + 1}} -->
        <calendar-day v-for="day in week" :key="day" :day="day"></calendar-day>
      </div>
    </div>

    <event-form></event-form>
  </div>
</template>

<script>
import CalendarDay from "./CalendarDay.vue";
import CurrentMonth from "./CurrentMonth.vue";
import EventForm from "./EventForm.vue";

export default {
  computed: {
    days() {
      // Generating all days in current month

      let days = [];
      let currentDay = this.$moment(`${this.year}-${this.month}-1`, "YYYY-M-D");

      // month in javascript is zero base
      while (currentDay.month() + 1 === this.month) {
        days.push(currentDay);
        currentDay = this.$moment(currentDay).add(1, "days");
      }

      const SUNDAY = 0;
      const MONDYA = 1;

      // Set currentDay to the first day of days array
      currentDay = this.$moment(days[0]);
      // Add Previous day
      while (currentDay.day() !== MONDYA) {
        currentDay = this.$moment(currentDay).subtract(1, "days");
        days.unshift(currentDay);
      }

      // Set currentDay ro the last day of days array
      currentDay = this.$moment(days[days.length - 1]);

      while (currentDay.day() !== SUNDAY) {
        currentDay = this.$moment(currentDay).add(1, "days");
        days.push(currentDay);
      }

      return days;
    },
    weeks() {
      // Divide day into week

      let weeks = [];
      let week = [];

      for (let day of this.days) {
        week.push(day);
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }
      return weeks;
    },
    month() {
      return this.$store.state.currentMonth;
    },
    year() {
      return this.$store.state.currentYear;
    }
  },
  components: {
    CalendarDay,
    CurrentMonth,
    EventForm
  }
};
</script>

