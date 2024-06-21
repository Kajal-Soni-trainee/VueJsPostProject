<template>
  <Teleport to="body">
    <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
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
            <form>
              <div class="form-group">
                <label for="email">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  v-model="email"
                />
                <p class="text-danger form-control"></p>
                <small id="emailHelp" class="form-text text-muted"
                  >We'll never share your email with anyone else.</small
                >
              </div>
              <div class="form-group">
                <label for="uname">User Name</label>
                <input
                  type="password"
                  class="form-control"
                  id="uname"
                  v-model="uname"
                  placeholder="Password"
                />
                <p class="text-danger form-control"></p>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <p @click="login" class="btn btn-primary">Login</p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import { ref } from "vue";
const email = ref(null);
const uname = ref(null);
function login() {
  console.log(validate());
}
function validate() {
  let errorCount = 0;
  const emailDiv = document.getElementById("email").parentElement;
  const unameDiv = document.getElementById("uname").parentElement;
  if (email.value == "") {
    emailDiv.getElementsByTagName("p").innerHTML = "Please enter your email";
    errorCount++;
  }
  if (uname.value == "") {
    unameDiv.getElementsByTagName("p").innerHTML = "Please enter your username";
    errorCount++;
  }
  if (errorCount == 0) {
    return true;
  } else {
    return false;
  }
}
</script>
<style scoped></style>
