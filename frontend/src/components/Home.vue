<template>
  <div>
    <div
      class="myForm d-flex flex-row justify-content-center align-items-center my-4"
    >
      <form style="width: 100rem" class="border border-info rounded p-3">
        <div class="form-group">
          <label class="form-label" for="title">Title</label>
          <input
            class="form-control"
            type="text"
            name="title"
            id="title"
            v-model="title"
          />
          <p class="text-danger"></p>
        </div>
        <div class="form-group">
          <label class="form-label" for="postBody">Post</label>
          <textarea
            class="form-control"
            name="postBody"
            id="postBody"
            v-model="postBody"
          ></textarea>
          <p class="text-danger"></p>
        </div>
        <div>
          <p @click="addPost()" class="btn btn-primary float-right">Add Post</p>
        </div>
      </form>
    </div>
    <div class="cards d-flex flex-column align-items-center">
      <div
        class="card my-3"
        style="width: 100rem"
        v-for="post in paginationData"
        :key="post.id"
      >
        <template v-for="user in users" :key="user.id">
          <h5 class="card-header" v-if="user.id == post.userId">
            @{{ user.name }}
          </h5>
        </template>

        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">
            {{ post.body }}
          </p>
          <p @click="showComments(post.id)" class="btn btn-primary">Comments</p>
        </div>
      </div>
      <div class="float-right">
        <P class="btn btn-primary" @click="next()">Next</P>
      </div>
    </div>
  </div>
</template>
<script setup>
import { shallowRef, ref, onBeforeMount, computed } from "vue";
import { useRouter } from "vue-router";
import { fetchAllPosts, fetchUsers } from "@/composable/apis";
onBeforeMount(async () => {
  let postData = await fetchAllPosts();
  posts.value = postData;
  let userData = await fetchUsers();
  users.value = userData;
  console.log(posts.value);
  console.log(users.value);
});
const posts = shallowRef([]);
const users = shallowRef([]);
const router = useRouter();
const startIdx = ref(0);
const limit = ref(10);
const postBody = ref(null);
const title = ref(null);
const totalLength = computed(() => {
  return posts.value.length - 1;
});

const paginationData = computed(() => {
  return posts.value.slice(startIdx.value, startIdx.value + limit.value - 1);
});

function next() {
  if (startIdx.value + limit.value - 1 < totalLength.value) {
    startIdx.value = startIdx.value + limit.value;
  }
}
function showComments(postId) {
  console.log(postId);
  router.push({ name: "Comment", query: { id: postId } });
}

function validate() {
  let errorCount = 0;
  const titleDiv = document.getElementById("title").parentElement;
  const postDiv = document.getElementById("postBody").parentElement;
  if (title.value == "") {
    titleDiv.getElementsByTagName("p")[0].innerHTML =
      "Please give some title to your post ";
    errorCount++;
  } else {
    titleDiv.getElementsByTagName("p")[0].innerHTML = "";
  }
  if (postBody.value == "") {
    postDiv.getElementsByTagName("p")[0].innerHTML = "Please enter some post";
    errorCount++;
  } else {
    postDiv.getElementsByTagName("p")[0].innerHTML = "";
  }
  if (errorCount == 0) {
    return true;
  } else {
    return false;
  }
}
async function addPost() {
  if (validate()) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title.value,
        body: postBody.value,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let dataObj = await response.json();
    if (dataObj) {
      title.value = "";
      postBody.value = "";
    }
  }
}
</script>
<style scoped></style>
