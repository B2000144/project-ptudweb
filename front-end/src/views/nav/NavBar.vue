<template>
  <nav class="my-2 my-md-0 mr-md-3">
    <router-link to="/"
      ><span class="nav-item">Trang Người dùng</span></router-link
    >
    <router-link to="/product"><span class="nav-item">Sách</span> </router-link>
    <router-link to="/publishing"
      ><span class="nav-item">Nhà xuất bản</span>
    </router-link>
    <router-link to="/checkBorrow"
      ><span class="nav-item">Sinh viên mượn sách</span>
    </router-link>
    <span @click="logout" class="nav-item logout"
      >Đăng xuất <i class="fa-solid fa-right-from-bracket"></i
    ></span>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: "navbar",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "admin.login" });
    },
  },
};
</script>

<style>
.logout {
  cursor: pointer;
}
.logout:hover {
  color: red;
}
</style>
