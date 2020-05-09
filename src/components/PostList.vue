<template>
  <!--bootstrap takes 12 cols by default, on medium breakpoint it takes 10 -->
  <div class="col-12">
    <!-- list group takes the whole with of the container .. with flush -->
    <div class="list-group list-group-flush">
      <!-- items in item to use flexbox and align -->
      <div class="list-group-item d-flex align-items-start border rounded-0">
        <button class="mr-2 btn btn-sm btn-danger" @click="$emit('remove', post)">
          <font-awesome-icon icon="trash" />
        </button>
        <div class="w-100">
          <div>
            <!-- blur events happen on content editable fields -->
            <font-awesome-icon icon="edit" :class="cardheader(post)" />
            <span class="font-weight-bold text-primary mr-1">Task:</span>
            <span
              :class="cardheader(post)"
              contenteditable="contenteditable"
              @blur="$emit('edit', post.id, 'title', $event.target.innerText)"
            >{{post.title}}</span>
            <span class="float-right">{{formattedDate(post.createdAt)}}</span>
          </div>
          <div class="owner-name">
            <span class="font-weight-bold text-primary mr-1">Owner:</span>
            <span>JohnMorris</span>
          </div>
          <div class="list-view card card-text">
            <span class="font-weight-bold text-primary mr-1">SubTasks:</span>
            <div v-for="(list, index) in post.todolist" :key="index" :class="liststrike(list)">
              <font-awesome-icon icon="edit" />
              <input
                :id="index"
                type="checkbox"
                :value="list.value"
                :checked="list.disabled"
                @click="$emit('edit', post.id, 'todolist', [...post.todolist, { text: list.text, value: list.value, disabled: !list.disabled }])"
              />
              <label
                @click="$emit('edit', post.id, 'todolist', [...post.todolist, { text: list.text, value: list.value, disabled: !list.disabled }])"
                :class="liststrike(list)"
                :for="list.text"
              >{{list.text}}</label>
            </div>
          </div>
          <div class="border">
            <div>
              <span class="font-weight-bold text-primary mr-1">Notes:</span>
              <div
                :class="cardheader(post)"
                contenteditable="contenteditable"
                @blur="$emit('edit', post.id, 'body', $event.target.innerText)"
              >
                <font-awesome-icon icon="edit" />
                {{post.body}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import momemt from "moment";
import { filter } from "lodash";
export default {
  name: "PostList",
  props: ["post", "currentIndex", "total"],
  data() {
    return {
      selected: []
    };
  },
  components: {
    FontAwesomeIcon
  },
  methods: {
    formattedDate(date) {
      return momemt(new Date(date)).format("DD-MMM-YYYY, hh:mm:ss a");
    },
    cardheader(post) {
      let headerClass = "";
      if (post && post.todolist) {
        let todoList = filter(post.todolist, ["disabled", false]);
        if (todoList.length > 0) {
          headerClass = "";
        } else {
          headerClass = "headerClass";
        }
      }
      return headerClass;
    },
    liststrike(list) {
      let headerClass = "";
      if (list && list["disabled"]) {
        headerClass = "headerClass";
      }
      return headerClass;
    }
  },
  watch: {
    currentIndex: {
      handler() {
        this.$emit('incrementCounter', this.currentIndex)
        if (this.currentIndex == this.total) {
          this.$emit('finishLoading')
        }
      }
    }
  },
}
</script>

<style  scoped>
.list-group-item {
  margin: 5px;
}
.headerClass {
  text-decoration: line-through;
  color: lightcoral;
}
.card-header {
  padding-bottom: 5px;
}
.card-text {
  padding-top: 5px;
  padding-bottom: 5px;
}
.card-header-text {
  padding-top: 5px;
  padding-bottom: 5px;
}
label {
  padding-right: 5;
  padding-left: 5px;
}
input {
  padding-right: 5px;
  padding-left: 5px;
}
</style>
