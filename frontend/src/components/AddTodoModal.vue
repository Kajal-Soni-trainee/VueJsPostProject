<template>
  <teleport to="body">
    <div
      class="modal fade"
      id="todoFormModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label" for="title">Task</label>
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                v-model="title"
              />
              <p class="text-danger"></p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="addTask()">
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup>
import { ref, defineProps } from "vue";
const title = ref("");
const props = defineProps(["userId"]);
async function addTask() {
  if (validate()) {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: title.value,
        userId: props.userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const dataObj = await response.json();
    if (dataObj) {
      title.value = "";
    }
  }
}
function validate() {
  let errorCount = 0;
  const titleDiv = document.getElementById("title").parentElement;

  if (title.value == "") {
    titleDiv.getElementsByTagName("p")[0].innerHTML = "Please enter some task";
    errorCount++;
  } else {
    titleDiv.getElementsByTagName("p")[0].innerHTML = "";
  }
  if (errorCount == 0) {
    return true;
  } else {
    return false;
  }
}
</script>
<style scoped></style>
