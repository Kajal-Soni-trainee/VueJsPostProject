<template>
  <div>
    <div
      class="myForm d-flex flex-row justify-content-center align-items-center my-4"
    >
      <form style="width: 100rem" class="border border-secondary rounded p-3">
        <div class="form-group">
          <label class="form-label" for="name">Name</label>
          <input
            class="form-control"
            type="text"
            name="name"
            id="name"
            v-model="name"
          />
          <p class="text-danger"></p>
        </div>
        <div class="form-group">
          <label class="form-label" for="email">Email</label>
          <input
            class="form-control"
            type="text"
            name="email"
            id="email"
            v-model="email"
          />
          <p class="text-danger"></p>
        </div>
        <div class="form-group">
          <label class="form-label" for="postBody">Comment</label>
          <textarea
            class="form-control"
            name="comment"
            id="comment"
            v-model="comment"
          ></textarea>
          <p class="text-danger"></p>
        </div>
        <div>
          <p @click="addComment()" class="btn btn-dark float-right">
            Add Comment
          </p>
        </div>
      </form>
    </div>
    <div class="d-flex flex-column align-items-center">
      <div
        class="card my-3"
        style="width: 100rem"
        v-for="comment in paginationData"
        :key="comment.id"
      >
        <div class="card-body">
          <h5 class="card-title">@_{{ comment.name }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ comment.email }}</h6>
          <p class="card-text">
            {{ comment.body }}
          </p>
        </div>
      </div>
      <div><p class="btn btn-primary" @click="next">Next</p></div>
    </div>
  </div>
</template>
<script setup>
import { fetchAllCommentsById } from "@/composable/apis";
import { shallowRef, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const postId = route.query.id;
const comments = shallowRef([]);
const startIdx = ref(0);
const limit = ref(3);
onMounted(async () => {
  const data = await fetchAllCommentsById(postId);
  comments.value = data;
  console.log(comments.value);
});
const name = ref("");
const email = ref("");
const comment = ref("");

const totalLength = computed(() => {
  return comments.value.length;
});

const paginationData = computed(() => {
  return comments.value.slice(startIdx.value, limit.value + startIdx.value);
});

const LastPage = computed(() => {
  return Math.ceil(totalLength.value / limit.value);
});
const NextPage = computed(() => {
  return startIdx.value * limit.value + 1;
});
function next() {
  if (NextPage.value < LastPage.value) {
    startIdx.value = startIdx.value + limit.value;
  }
}
async function addComment() {
  console.log(validate());
  if (validate()) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        body: comment.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const dataObj = await response.json();
    if (dataObj) {
      name.value = "";
      email.value = "";
      comment.value = "";
    }
  }
}
function validate() {
  let errorCount = 0;
  const nameDiv = document.getElementById("name").parentElement;
  const emailDiv = document.getElementById("email").parentElement;
  const commentDiv = document.getElementById("comment").parentElement;
  if (name.value == "") {
    errorCount++;
    nameDiv.getElementsByTagName("p")[0].innerHTML = "Please enter your name";
  } else {
    nameDiv.getElementsByTagName("p")[0].innerHTML = "";
  }
  if (email.value == "") {
    errorCount++;
    emailDiv.getElementsByTagName("p")[0].innerHTML = "Please enter your email";
  } else {
    emailDiv.getElementsByTagName("p")[0].innerHTML = "";
  }
  if (comment.value == "") {
    errorCount++;
    commentDiv.getElementsByTagName("p")[0].innerHTML =
      "Please enter your comment";
  } else {
    commentDiv.getElementsByTagName("p")[0].innerHTML = "";
  }
  if (errorCount == 0) {
    return true;
  } else {
    return false;
  }
}
</script>
<style scoped></style>
