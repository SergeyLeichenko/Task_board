<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <a
      class="navbar-brand mx-2"
      href="#"
    >Tasks</a>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

        <li class="nav-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-star"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"
            />
          </svg>
        </li>

        <li class="nav-item">
          <a
            class="nav-link"
            aria-current="page"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-lock-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"
              />
            </svg>
            Private</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dash
          </a>
          <ul class="dropdown-menu">
            <li><a
                class="dropdown-item"
                href="#"
              >Action</a></li>
            <li><a
                class="dropdown-item"
                href="#"
              >Another action</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a
                class="dropdown-item"
                href="#"
              >Something else here</a></li>
          </ul>
        </li>

        <li class="nav-item">
          <button
            type="button"
            class="nav-link nav-link-btn"
            @click="$emit('open-create-column')"
          >
            Create new column</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.nav-item {
  margin-left: 20px;
}

.nav-item :where(a, button):hover {
  font-weight: 700;
}
.nav-link-btn {
  background: transparent;
}

.bi-star {
  margin-top: 12px;
}

.bi-lock-fill {
  margin-bottom: 5px;
}

.bg-body-tertiary {
  opacity: 0.7;
}
</style>