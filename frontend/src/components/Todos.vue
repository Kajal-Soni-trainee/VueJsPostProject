<template>
  <div class="p-4">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Full Name</th>
          <th scope="col">User Name</th>
          <th scope="col">Email</th>
          <th scope="col">Todos</th>
          <th scope="col">Add Todo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginationData" :key="user.id">
          <th scope="row">{{ user.name }}</th>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <p class="btn btn-dark" @click="showTodos(user.id)">View Todos</p>
          </td>
          <td>
            <p
              class="btn btn-dark"
              data-toggle="modal"
              data-target="#todoFormModal"
            >
              Add Todo
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <div><p class="btn btn-primary" @click="next()">Next</p></div>
  </div>
  <todoFormModal />
</template>
<script setup>
import fetchData from "../composable/fetch";
import todoFormModal from "../components/AddTodoModal.vue";
import { shallowRef, ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const users = shallowRef([]);
const limit = ref(5);
const startIdx = ref(0);
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
function showTodos(id) {
  router.push({ name: "AllTodos", query: { id: id } });
}
function next() {
  if (nextPage.value < lastPage.value) {
    startIdx.value = startIdx.value + limit.value;
  }
}
onMounted(async () => {
  const userObj = await fetchData("https://jsonplaceholder.typicode.com/users");
  users.value = userObj;
});
</script>
<style scoped></style>
