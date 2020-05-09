<template>
  <div class="col-12">
    <div class="card textcenter mt-3">
      <div class="card-header bg-primary text-white" @click="toggleModal">
        <!-- on click, hidepanel toggles btw true/false -->
        <font-awesome-icon icon="plus" class="mr-3" @click="toggleModal" />Add Task
      </div>
      <transition name="fade">
        <!-- display-none: we used vbindclass to set div present and not present -->
        <div v-if="isOpen" class="card-body">
          <!-- on formsubmit event submit.prevent prevents the default behavior : prevent is a modifier-->
          <form id="aptForm" @submit.prevent="requestAdd">
            <div class="form-group form-row align-content-center">
              <label class="col-md-2 col-form-label text-md-right" for="title">Title</label>
              <!-- vmodel can track an input field and store the value -->
              <div class="col-md-10">
                <input
                  type="text"
                  class="form-control"
                  name="title"
                  id="title"
                  placeholder="Title"
                  v-model="formData.title"
                />
              </div>
            </div>

            <div class="form-group form-row">
              <label class="col-md-2 col-form-label text-md-right" for="aptDate">Date</label>
              <div class="col-md-4">
                <!-- vmodel can track an input field and store the value -->
                <input type="date" class="form-control" id="aptDate" v-model="formData.aptDate" />
              </div>
              <label class="col-md-2 col-form-label text-md-right" for="aptTime">Time</label>
              <div class="col-md-4">
                <input
                  type="time"
                  class="form-control"
                  name="aptTime"
                  id="aptTime"
                  v-model="formData.aptTime"
                />
              </div>
            </div>
            <div class="col-md-12 border align-content-center">
              Add Subtasks
              <div class="row">
                <div class="col-5">
                  <input
                    placeholder="subtasks"
                    type="text"
                    class="form-control"
                    name="aptList"
                    id="aptList"
                    v-model="checklist"
                  />
                </div>
                <div class="col-1">
                  <div class="row">
                    <button
                      class="btn btn-primary d-block ml-auto"
                      @click.prevent="addList(checklist)"
                    >+</button>
                    <button
                      class="btn btn-primary d-block ml-auto"
                      @click.prevent="removeList(checklist)"
                    >-</button>
                  </div>
                </div>
                <div class="col-5">
                  <b-form-group label="List of subtasks">
                    <div class="row">
                      <b-form-checkbox-group
                        v-model="selected"
                        :options="options"
                        name="flavour-2a"
                      ></b-form-checkbox-group>
                    </div>
                  </b-form-group>
                </div>
              </div>
            </div>
            <div class="form-group form-row align-content-center mt-2">
              <label class="col-md-2 text-md-right" for="aptNotes">Apt. Notes</label>
              <div class="col-md-8">
                <textarea
                  class="form-control"
                  rows="2"
                  cols="50"
                  name="body"
                  id="body"
                  placeholder="Post Body"
                  v-model="formData.body"
                ></textarea>
              </div>
              <div class="col-md-2">
                <button type="submit" class="btn btn-success d-block ml-auto">Add TASK</button>
              </div>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "AddPost",
  data() {
    return {
      checklist: "",
      formData: [],
      hidepanel: true,
      isOpen: false,
      selected: [], // Must be an array reference!
      options: []
    };
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    addList(checklist) {
      this.options.push({ text: checklist, value: checklist, disabled: false });
      this.checklist = "";
    },
    removeList() {
      this.options.pop();
    },
    requestAdd() {
      this.formData = {
        title: this.formData.title,
        createdAt: this.formData.aptDate + " " + this.formData.aptTime,
        body: this.formData.body,
        todolist: this.options
      };
      // send the formdata to parent component
      this.$emit("add", this.formData);
      // reset formdata to clear the form
      this.formData = [];
      // hide the form
      this.hidepanel = true;
      this.toggleModal();
    },
    // we need to this data,
    toggleModal() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style>
</style>