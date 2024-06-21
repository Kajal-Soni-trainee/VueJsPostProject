<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="../assets/twitter-icon.svg"
          alt=""
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        />
        Twitter
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Post</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/albums">Albums</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/todos">Todos</a>
          </li>
        </ul>
      </div>
      <div>
        <ul class="navbar-nav d-flex flex-row align-items-center">
          <li class="nav-item pl-2 pr-2">
            <button class="btn btn-secondary btn-outline-light" type="button">
              Register
            </button>
          </li>
          <li class="nav-item pl-2 pr-2">
            <button
              data-toggle="modal"
              data-target="#loginModal"
              class="btn btn-secondary btn-outline-light"
              type="button"
            >
              Login
            </button>
          </li>
          <li class="nav-item pl-2 pr-2">
            <button class="btn btn-secondary btn-outline-light" type="button">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
};
</script>
<script setup></script>
<style scoped></style>
