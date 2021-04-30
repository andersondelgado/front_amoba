<template>
  <div id="app" class="flex flex-col h-full min-h-screen mx-auto p-4 bg-gray-300">
      <header>
          <div id="nav">
          </div>
      </header>
    <router-view/>
  </div>
</template>
<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
