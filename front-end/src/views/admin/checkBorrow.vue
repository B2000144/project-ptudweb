<template>
  <Nav />
  <div class="container">
    <div class="text-center py-5">
      <span class="title">Thư viện trường học</span>
    </div>
    <div class="card-deck mb-3 text-center">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sinh viên</th>
            <th>Sách đã mượn</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(borrow, index) in borrows">
            <td>{{ index + 1 }}</td>
            <td>{{ borrow.name }}</td>
            <td>{{ borrow.namebook }}</td>
            <td>{{ borrow.dateborrow }}</td>
            <td>{{ borrow.datereturn }}</td>
            <td>
              <button @click="onDelete(borrow._id)" class="btn btn-warning">
                <span>Đã trả sách</span>
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
  name: "checkBorrow",
  components: {
    Nav,
  },
  data() {
    return {
      borrows: [],
    };
  },
  created() {
    this.getAllBorrows();
  },
  methods: {
    getAllBorrows() {
      const allBorrows = this.$request
        .get("http://localhost:8000/v1/borrow/")
        .then((res) => {
          this.borrows = res.data;
        });
    },
    onDelete(borrowId) {
      this.$swal
        .fire({
          title: "Bạn chắc chắn sinh viên này đã trả sách ?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Chắc chắn",
          denyButtonText: `Không`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$request
              .delete(`http://localhost:8000/v1/borrow/${borrowId}`)
              .then((res) => {
                if (res.data.success) {
                  this.$swal.fire("Đã xóa ra khỏi danh sách!", "", "success");
                  this.getAllBorrows();
                }
              });
          }
        });
    },
  },
};
</script>

<style></style>
