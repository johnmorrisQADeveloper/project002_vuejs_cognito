<template>
  <div id="main-app" class="container">
    <div v-if="error">{{ errorDetail }}</div>
    <div v-if="!signedIn">
      <amplify-authenticator>
        <amplify-sign-in header-text="My Custom Sign In Text" slot="sign-in"></amplify-sign-in>
        <div>
          My App
          <amplify-greetings></amplify-greetings>
        </div>
      </amplify-authenticator>
    </div>
    <div v-if="signedIn">
      <amplify-sign-out button-text="Custom Text"></amplify-sign-out>
    </div>
    <div v-if="signedIn">
      <search-posts-vue
        @searchRecords="searchPosts"
        :myKey="filterKey"
        :myDir="filterDir"
        @requestKey="changeKey"
        @requestDir="changeDir"
      />
      <AddPostVue @add="addItem" />
      <div class="row justify-content-centre" v-for="(post, index) in filteredApts" :key="index">
        <PostListVue
          @incrementCounter="incrementCounter"
          @finishLoading="finishLoading"
          :currentIndex="index"
          :total="filteredApts.length"
          :post="post"
          @remove="removeItem"
          @edit="editItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import axios from "axios";
import PostListVue from "./components/PostList.vue";
import { without, findIndex, orderBy, find, sortBy } from "lodash";
import AddPostVue from "./components/AddPost.vue";
import SearchPostsVue from "./components/SearchPosts.vue";
import { getAllPost, deletePost, createPost, updatePost } from "./config";
import { AmplifyEventBus } from "aws-amplify-vue";
export default {
  name: "App",
  async created() {
    await this.findUser();
    AmplifyEventBus.$on("authState", async info => {
      console.log(
        `Here is the auth event that was just emitted by an Amplify component: ${info}`
      );
      if (info === "signedIn") {
        await this.findUser();
      } else {
        this.signedIn = false;
      }
    });
  },
  components: {
    PostListVue,
    AddPostVue,
    SearchPostsVue
  },
  data() {
    return {
      title: "Post List",
      posts: [],
      filterKey: "title",
      filterDir: "asc",
      searchTerms: "",
      count: 0,
      error: false,
      errorDetail: "",
      signedIn: false,
      jwt: ''
    };
  },
  beforeMount() {
    AmplifyEventBus.$on("authState", info => {
      console.log(
        `Here is the auth event that was just emitted by an Amplify component: ${info}`
      );
    });
  },
  async mounted() {
    // console.log(await jwt.signInUserSession.accessToken.jwtToken);
    // console.log(signInUserSession);
    

    let data;
    try {
      const post = await axios.get(getAllPost);
      data = post.data;
      this.error = false;
    } catch (error) {
      this.error = true;
      this.errorDetail = error;
    }
    this.posts = data;
  },
  methods: {
    async findUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        this.signedIn = true;
        console.log(user);
        console.log(user.signInUserSession.accessToken.jwtToken);
        this.jwt = user.signInUserSession.accessToken.jwtToken
      } catch (error) {
        this.signedIn = false;
      }
    },
    finishLoading() {},
    incrementCounter(index) {
      this.count = index++;
    },
    changeKey(value) {
      this.filterKey = value;
    },
    changeDir(value) {
      this.filterDir = value;
    },
    searchPosts(terms) {
      this.searchTerms = terms;
    },
    async removeItem(post) {
      await axios.delete(`${deletePost}/${post.id}`, {
        data: { id: post.id },
        headers: { "Content-Type": "application/json" }
      });
      this.posts = without(this.posts, post);
    },
    async editItem(id, field, text) {
      if (field === "todolist") {
        let modifiedListItem = text[text.length - 1];
        const obj = find(text, ["value", modifiedListItem.value]);
        text = sortBy(without(text, obj), ["value"]);
      }
      if (field === "body") {
        console.log(field);
      }
      const index = findIndex(this.posts, {
        id: id
      });
      this.posts[index][field] = text;
      const obj = find(this.posts, ["id", id]);
      console.log(obj);
      await axios({
        method: "put",
        url: `${updatePost}/${id}`,
        data: {
          ...obj
        },
        headers: { "Content-Type": "application/json" }
      });
    },
    async addItem(apt) {
      this.posts.push(apt); // add apt to the appointments array
      axios({
        method: "post",
        url: createPost,
        data: {
          ...apt
        },
        headers: { "Content-Type": "application/json" }
      });
    }
  },
  computed: {
    // filter method in js
    searchApts: function() {
      console.log("om here");
      try {
        return this.posts.filter(item => {
          return (
            item.title.toLowerCase().match(this.searchTerms.toLowerCase()) ||
            item.body.toLowerCase().match(this.searchTerms.toLowerCase())
          );
        });
      } catch (error) {
        return "";
      }
    },
    filteredApts: function() {
      return orderBy(
        this.searchApts,
        item => {
          return item[this.filterKey].toLowerCase();
        },
        this.filterDir
      );
    }
  }
};
</script>

<style>
/* transition  fade in and out*/
.card-header {
  cursor: pointer;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease-out;
}
.fade-leave-to {
  opacity: 0;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
/* slide  view page transition */
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
