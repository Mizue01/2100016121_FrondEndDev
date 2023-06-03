<template>
  <div class="custom-sidebar">
    <div class="custom-sidebar-header">
      <div class="custom-sidebar-toggle" @click="clickHambuger">
        <i class="pi pi-bars"></i>
      </div>
      <div class="custom-sidebar-search">
        <div class="custom-search-wrapper">
          <InputText type="text" v-model="value" class="custom-search-input" placeholder="Search.." />
        </div>
      </div>
      <div class="custom-sidebar-profile">
        <Avatar icon="pi pi-user" class="custom-profile-avatar" shape="circle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
        <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataOpenSideBar: Boolean,
    clickHambuger: Function
  },
  data() {
    return {
      items: [
        {
          label: 'Logout',
          icon: 'pi pi-refresh',
          command: () => {
            this.$toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
          }
        },
        {
          label: 'Change Password',
          icon: 'pi pi-times',
          command: () => {
            this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
          }
        },
      ]
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  }
}
</script>

<style scoped>
.custom-sidebar {
  width: 100%;
  background-color: #222;
}

.custom-sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: #333;
  padding: 10px;
}

.custom-sidebar-toggle {
  cursor: pointer;
  height: 20px;
}

.custom-sidebar-toggle i {
  color: #fff;
}

.custom-sidebar-search {
  flex: 1;
}

.custom-search-wrapper {
  position: relative;
}

.custom-search-input {
  height: 20px;
  padding-right: 30px;
  font-size: small;
  background-color: rgb(51, 51, 51);
  border-color: rgb(182, 0, 182);
}

.custom-search-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #999;
}

.custom-sidebar-profile {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-profile-text {
  font-size: 14px;
  margin-right: 10px;
  color: #fff;
}

.custom-profile-avatar {
  background-color: #9c27b0;
  color: #fff;
}

/* Additional custom styles */

.custom-profile-text:hover {
  text-decoration: underline;
}

</style>
