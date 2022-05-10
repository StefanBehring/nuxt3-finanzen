<template>
  <div class="pageview">
    <nav>
      <div class="nav-logo">
        <h1>Finanzen</h1>
      </div>
      <div class="menu">
        <div class="menu-item">
          <NuxtLink to="/">Index</NuxtLink>
        </div>
        <div class="menu-item">
          <NuxtLink to="/aktien/">Aktien</NuxtLink>
        </div>
        <div class="menu-item">
          <NuxtLink to="/about">About</NuxtLink>
        </div>
      </div>
      <div class="nav-bottom">
        <p>&copy; 2022</p>
        <p>Stefan Behring</p>
      </div>
    </nav>
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="css" scoped>
.pageview {
  display: grid;
  grid-template-columns: 20rem 1fr;
}

li {
  list-style-type: none;
}
</style>
