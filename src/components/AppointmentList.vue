<template>
  <div class="col-12 col-md-10 col-lg-7">
    <div class="list-group list-group-flush">
      <div
        class="list-group-item d-flex align-items-start"
        v-for="item in appointments"
        :key="item.aptIndex"
      >
        <!-- // what this emit is doing is allowing us to generate an event on the parent component called remove 
      and pass along the item we want remove is the element were looping thru -->
        <button
          class="mr-4 btn btn-sm btn-danger"
          @click="$emit('remove', item)"
        >
          <font-awesome-icon icon="trash" />
        </button>
        <div class="w-100">
          <div class="d-flex justify-content-between">
            <span
              class="h4 text-primary"
              contenteditable="contenteditable"
              @blur="
                $emit('edit', item.aptId, 'petName', $event.target.innerText)
              "
              >{{ item.petName }}</span
            >
            <span class="float-right">{{ formattedDate(item.aptDate) }}</span>
          </div>
          <div class="owner-name">
            <span
              class="font-weight-bold text-primary mr-1"
              contenteditable="contenteditable"
              @blur="
                $emit('edit', item.aptId, 'petOwner', $event.target.innerText)
              "
              >Owner:</span
            >
            <span>{{ item.petOwner }}</span>
          </div>
          <div
            contenteditable="contenteditable"
            @blur="
              $emit('edit', item.aptId, 'aptNotes', $event.target.innerText)
            "
          >
            {{ item.aptNotes }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import moment from "moment";
export default {
  name: "AppointmentList",
  props: ["appointments"],
  // components are the  different components your using in the template
  components: {
    FontAwesomeIcon,
  },
  //methods are like funcitons can return or transform things
  methods: {
    formattedDate: (date) => {
      return moment(new Date(date)).format("MM-DD-YY, h:mm a");
    },
  },
};
</script>