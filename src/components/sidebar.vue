<template>
  <div class="sidebar" :class="{ 'sidebar-visible': isOpenSidebar, 'sidebar-close': !isOpenSidebar }">
    <div class="header" :class="{ 'header-visible': isOpenSidebar }">
      <div class="logo" v-show="isOpenSidebar">Shopping Web</div>
      <img v-show="!isOpenSidebar" class="avatar" src="../assets/images/redpandass.jpg" alt="Avatar" />
    </div>
    <div class="menu">
      <div class="profile" v-show="isOpenSidebar">
        <img class="avatar" src="../assets/images/redpandass.jpg" alt="Avatar" />
        <h5 class="name">Red Panda</h5>
        <p class="description">Profile</p>
      </div>
      <div class="menu-items">
        <router-link to="/" class="menu-item" v-tooltip.right="'Dashboard'">
          <span class="icon pi pi-eject"></span>
          <span v-show="isOpenSidebar">Home</span>
        </router-link>
        <router-link to="/user" class="menu-item" v-tooltip.right="'User'">
          <span class="icon pi pi-map-marker"></span>
          <span v-show="isOpenSidebar">Shop Location</span>
        </router-link>
        <router-link to="/product" class="menu-item" v-tooltip.right="'Product'">
          <span class="icon pi pi-shopping-cart"></span>
          <span v-show="isOpenSidebar">Product</span>
        </router-link>
        <div class="menu-item" v-tooltip.right="'Setting'">
          <span class="icon pi pi-cog"></span>
          <span v-show="isOpenSidebar">Setting</span>
        </div>
      </div>
      <div class="footer">
        <a href="https://osu.ppy.sh/users/27534494" target="_blank" v-tooltip.right="'About Me'">
          <span class="icon pi pi-user"></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpenSidebar: Boolean
  }
};
</script>

<style scoped>
.sidebar {
  background-color: #111;
  width: 250px;
  transition: width 300ms;
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.sidebar-close {
  width: 70px;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #111;
  transition: opacity 300ms;
  opacity: 1;
}

.header-visible {
  opacity: 1;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}

.avatar {
  padding: 1px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #eee;
}

.menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #222;
}

.profile {
  text-align: center;
  padding: 20px;
}

.name {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
}

.description {
  color: #888;
}

.menu-items {
  padding: 10px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: #ccc;
  cursor: pointer;
  transition: color 300ms;
}

.menu-item:hover {
  color: #fff;
}

.icon {
  margin-right: 10px;
}

.footer {
  text-align: center;
  padding: 10px 20px;
  color: #ccc;
}
</style>
