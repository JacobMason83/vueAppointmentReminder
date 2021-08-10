<template>
  <div id="main-app" class="container">
    <div class="row justify-content-center">
      <!-- // with the $emit event on the appointment list is called remove we need 
     // to wire up the appointment list to look for it and we will use a local method called removeItem
    // this is automatically sending up the payload and thats the item we want removed  -->
      <add-appointment @add="addItem" />
      <search-appointments
        @searchRecords="searchedApts"
        @myKey="filterKey"
        @myDir="filterDir"
        @requestKey="changeKey"
        @requestDir="changeDir"
      />
      <appointment-list
        :appointments="filteredApts"
        @remove="removeItem"
        @edit="editItem"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppointmentList from "./components/AppointmentList";
import AddAppointment from "./components/AddAppointment";
import SearchAppointments from "./components/SearchAppointments";
import _ from "lodash";

export default {
  name: "MainApp",
  data: function () {
    return {
      appointments: [],
      filterKey: "petName",
      filterDir: "asc",
      searchTerms: "",
      aptIndex: 0,
    };
  },
  components: {
    AppointmentList,
    AddAppointment,
    SearchAppointments,
  },
  // this is a lifecycle hook, this is when its started other lifecycle methods
  mounted() {
    axios.get("./data/appointments.json").then(
      (res) =>
        (this.appointments = res.data.map((item) => {
          item.aptId = this.aptIndex;
          this.aptIndex++;
          return item;
        }))
    );
  },
  computed: {
    searchedApts: function () {
      return this.appointments.filter((item) => {
        return (
          item.petName.toLowerCase().match(this.searchTerms.toLowerCase()) ||
          item.petOwner.toLowerCase().match(this.searchTerms.toLowerCase()) ||
          item.aptNotes.toLowerCase().match(this.searchTerms.toLowerCase())
        );
      });
    },
    filteredApts: function () {
      return _.orderBy(
        this.searchedApts,
        (item) => {
          return item[this.filterKey].toLowerCase();
        },
        this.filterDir
      );
    },
  },
  methods: {
    changeKey: function (value) {
      this.filterKey = value;
    },
    changeDir: function (value) {
      this.filterDir = value;
    },
    // lodash  underscore methods makes it easier to look thru an arry and find the item that is to removed and removes it
    // without a complicated javascript function that could be done, but why tbh
    removeItem: (apt) => {
      this.appointments = _.without(this.appointments, apt);
    },
    // this is a good way to find the apt index of each appt
    editItem: function (id, field, text) {
      const aptIndex = _.findIndex(this.appointments, {
        aptId: id,
      });
      this.appointments[aptIndex][field] = text;
    },
    addItem: function (apt) {
      apt.aptId = this.aptIndex;
      this.aptIndex++;
      this.appointments.push(apt);
    },
    searchAppointments: function (terms) {
      this.searchTerms = terms;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
