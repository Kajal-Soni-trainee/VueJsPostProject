<template>
  <div class="d-flex flex-column align-items-center">
    <div
      class="my-5 border border-secondary p-2"
      style="width: 120rem"
      v-for="user in paginationData"
      :key="user.id"
    >
      <h2 class="text-center">{{ user.name }}</h2>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="d-flex flex-row justify-content-center aign-items-center">
          <input
            style="width: 500px"
            type="text"
            name="title"
            id="title"
            class="form-control mx-2"
            placeholder="Enter Album Title"
            v-model="title"
          />

          <p class="btn btn-primary mx-2" @click="createAlbum()">
            Create Album
          </p>
        </div>
        <p class="err text-danger"></p>
      </div>

      <div class="album_div">
        <div class="d-flex flex-row justify-content-center flex-wrap">
          <template v-for="album in albums" :key="album.id">
            <div class="card w-20 col-md-3 m-2" v-if="album.userId == user.id">
              <div class="card-body">
                <h5 class="card-title">Album{{ album.id }}</h5>
                <p class="card-text">
                  {{ album.title }}
                </p>
                <p @click="viewImg(album.id)" class="btn btn-secondary">View</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div><p class="btn btn-primary" @click="next()">Next</p></div>
  </div>
</template>
<script setup>
import { fetchAllAlbums, fetchUsers } from "@/composable/apis";
import { onMounted, shallowRef, ref, computed } from "vue";
import { useRouter } from "vue-router";
const albums = shallowRef([]);
const users = shallowRef([]);
const router = useRouter();
const limit = ref(1);
const startIdx = ref(0);
const title = ref("");
onMounted(async () => {
  const albumObj = await fetchAllAlbums();
  const userObj = await fetchUsers();
  albums.value = albumObj;
  users.value = userObj;
  console.log(albums.value);
  console.log(users.value);
});

const totalLength = computed(() => {
  return users.value.length;
});

const lastPage = computed(() => {
  return Math.ceil(totalLength.value / limit.value);
});
const nextPage = computed(() => {
  return startIdx.value * limit.value + 1;
});
const paginationData = computed(() => {
  return users.value.slice(startIdx.value, startIdx.value + limit.value);
});

function next() {
  if (nextPage.value < lastPage.value) {
    startIdx.value = startIdx.value + limit.value;
  }
}
function viewImg(albumId) {
  router.push({ name: "Photos", query: { id: albumId } });
}
async function createAlbum() {
  if (validate()) {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/albums",
      {
        method: "POST",
        body: JSON.stringify({
          title: title.value,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const dataObj = await response.json();
    if (dataObj) {
      title.value = "";
    }
  }
}
async function validate() {
  const titleDiv = document.getElementById("title").parentElement.parentElement;
  let errorCount = 0;
  if (title.value == "") {
    titleDiv.getElementsByClassName("err")[0].innerHTML =
      "Pease enter your album's title";
    errorCount++;
  } else {
    titleDiv.getElementsByClassName("err")[0].innerHTML = "";
  }
  if (errorCount == 0) {
    return true;
  } else {
    return false;
  }
}


</script>
<style></style>
