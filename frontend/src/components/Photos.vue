<template>
  <div
    class="d-flex flex-row flex-wrap justify-content-center align-items-center p-5"
  >
    <div
      class="card col-md-2 m-2"
      style="width: 18rem"
      v-for="photo in photos"
      :key="photo.id"
    >
      <div class="card-body">
        <img
          class="card-img-top"
          height="150px"
          width="40px"
          :src="photo.url"
          alt="Card image cap"
        />
        <p class="card-text">
          {{ photo.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { shallowRef, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchPhotosByAlbumId } from "@/composable/apis";
const photos = shallowRef(null);
const route = useRoute();
const id = route.query.id;
onMounted(async () => {
  const photoObj = await fetchPhotosByAlbumId(id);
  photos.value = photoObj;
});
</script>
<style scoped></style>
