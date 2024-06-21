<template>
  <div
    class="d-flex flex-row flex-wrap justify-content-center align-items-center"
  >
    <div class="card w-50 col-md-4 m-2" v-for="todo in todos" :key="todo.id">
      <div class="card-body">
        <h5 class="card-title">{{ todo.title }}</h5>
        <div class="d-flex flex-row align-items-center">
          <h5 class="card-text">Status:</h5>
          <h5
            v-if="todo.completed"
            class="bg-success text-light p-1 rounded mx-2"
          >
            Completed
          </h5>
          <h5 v-else class="bg-warning text-light p-1 border rounded mx-2">
            Pending
          </h5>
        </div>
        <div class="float-right d-flex flex-row align-items-items">
          <p
            v-if="!todo.completed"
            class="btn btn-dark btn-outline-light rounded mx-1"
          >
            Completed
          </p>
          <p class="btn btn-dark btn-outline-light border rounded mx-1">
            Delete
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { fetchTodosByUserId } from "@/composable/apis";
import { shallowRef, onMounted } from "vue";
import { useRoute } from "vue-router";
const todos = shallowRef(null);
const route = useRoute();
const id = route.query.id;
onMounted(async () => {
  const todoObj = await fetchTodosByUserId(id);
  todos.value = todoObj;
});
</script>
<style scoped></style>
