<template>
  <div class="col-12">
    <div class="input-group my-3">
      <input
        id="SearchApts"
        placeholder="Search"
        type="text"
        class="form-control"
        aria-label="Search Appointments"
        v-model="searchTerm"
      />

      <div class="input-group-append">
        <button
          type="button"
          class="btn btn-primary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sort by
          <span class="caret"></span>
        </button>

        <div class="dropdown-menu dropdown-menu-right">
          <a href="#" class="dropdown-item d-flex justify-content-between" id="title" 
          @click="$emit('requestKey','title')">
            Title
            <font-awesome-icon icon="check"  v-if="myKey==='title'"/>
          </a>

          <a class="dropdown-item d-flex justify-content-between" href="#" id="createdAt" @click="$emit('requestKey','createdAt')">
            Date
            <font-awesome-icon icon="check" v-if="myKey==='createdAt'"/>
          </a>

          <a href="#" class="dropdown-item d-flex justify-content-between" id="body" @click="$emit('requestKey','body')">
            Body
            <font-awesome-icon icon="check" v-if="myKey==='body'"/>
          </a>

          <div class="dropdown-divider" role="separator"></div>

          <a class="dropdown-item d-flex justify-content-between" href="#" id="asc" @click="$emit('requestDir','asc')">
            Asc
            <font-awesome-icon icon="check" v-if="myDir==='asc'"/>
          </a>

          <a class="dropdown-item d-flex justify-content-between" href="#" id="desc"  @click="$emit('requestDir','desc')">
            Desc
            <font-awesome-icon icon="check" v-if="myDir==='desc'"/>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "SearchPosts",
  data() {
    return {
      searchTerm: ""
    };
  },
  watch: {
    searchTerm: function() {
      this.$emit("searchRecords", this.searchTerm);
    }
  },
  props: ["myKey", "myDir"],
  components: {
    FontAwesomeIcon
  }
};
</script>