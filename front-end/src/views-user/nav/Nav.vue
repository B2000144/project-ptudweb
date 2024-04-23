<template>
  <nav>
    <ul>
      <router-link to="/"
        ><li><span>Sách</span></li></router-link
      >
      <li><input type="search" value="Tìm kiếm sách" /></li>
      <li><button class="btn btn-primary">Đăng nhập</button></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style scoped>
nav {
  background: #333;
  color: #fff;
  padding: 10px;
}
ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
}
li {
  list-style: none;
  color: #fff;
}
</style>
