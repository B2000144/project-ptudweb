<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="card p-4">
      <h2 class="text-center mb-4">Đăng nhập</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Tên người dùng"
            v-model="username"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            placeholder="Mật khẩu"
            v-model="password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin.login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      let result = await this.$request.post(
        "http://localhost:8000/v1/auth/login",
        {
          username: this.username,
          password: this.password,
        }
      );
      console.warn(result);
      if (result.status == 200) {
        localStorage.setItem("user-info", JSON.stringify(result.data));
        this.$router.push({ name: "product.list" });
      }
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "product.list" });
    }
  },
};
</script>

<style></style>
