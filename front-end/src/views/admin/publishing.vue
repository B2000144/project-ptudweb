<template>
  <Nav />
  <div class="container">
    <div class="text-center">
      <router-link to="/publishing/create/"><p>Thêm mới</p></router-link>
    </div>
    <div class="card-deck mb-3 text-center">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên Nhà xuất bản</th>
            <th>Địa chỉ</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(book, index) in books">
            <td>{{ index + 1 }}</td>
            <td>{{ book.publishing }}</td>
            <td>{{ book.address }}</td>

            <td>
              <router-link
                :to="{ name: 'Publishing.eidt', params: { id: book._id } }"
                ><button class="btn btn-primary">Sửa</button></router-link
              >
              |
              <button class="btn btn-danger" @click="onDelete(book._id)">
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Nav from "../nav/NavBar.vue";
export default {
  components: { Nav },
  name: "publishing",
  data() {
    return {
      books: [],
    };
  },
  created() {
    this.getAll();
    console.log("Product created");
  },
  methods: {
    getAll() {
      this.$request.get("http://localhost:8000/v1/publishing/").then((res) => {
        this.books = res.data;
      });
    },
    onDelete(productId) {
      this.$swal
        .fire({
          title: "Bạn có muốn xóa",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Có",
          denyButtonText: `Không`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$request
              .delete(`http://localhost:8000/v1/publishing/${productId}`)
              .then((res) => {
                if (res.data.success) {
                  this.$swal.fire("Đã xóa!", "", "success");
                  this.getAll();
                }
              });
          }
        });
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "admin.login" });
    }
  },
};
</script>

<style></style>
