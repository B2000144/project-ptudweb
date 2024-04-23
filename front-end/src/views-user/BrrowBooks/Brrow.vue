<template>
  <Nav />
  <div class="container py-5">
    <div class="text-center"></div>
    <form action="" @submit.prevent="save()">
      <div class="row d-flex justify-content-center">
        <div class="col-md-4">
          <div class="d-flex flex-column">
            <span class="text-center py-2 title"
              >Tên sách: {{ books.name }}</span
            >
            <span class="text-start">Tên đọc giả</span>
            <input
              type="text"
              class="form-control"
              placeholder="Nhập tên đọc giả"
              v-model="borrow.name"
            />
            <span class="text-start pt-2">năm sinh đọc giả</span>
            <input
              type="date"
              class="form-control"
              v-model="borrow.birth"
              placeholder="năm sinh"
            />
            <span class="text-start pt-2">địa chỉ</span>
            <input
              type="text"
              class="form-control"
              v-model="borrow.address"
              placeholder="địa chỉ"
            />
            <span class="text-start pt-2">Số điện thoại</span>
            <input
              type="text"
              class="form-control"
              v-model="borrow.phone"
              placeholder="Nhập số điện thoại"
            />
            <span class="text-start pt-2">Ngày mượn sách</span>
            <input
              type="date"
              v-model="borrow.dateborrow"
              class="form-control"
              placeholder="ngày mượn"
            />
            <span class="text-start pt-2">ngày trả sách</span>
            <input
              type="date"
              v-model="borrow.datereturn"
              class="form-control"
              placeholder="ngày trả"
            />
            <div class="row py-3">
              <div class="col-md-6">
                <input
                  type="submit"
                  class="btn btn-success"
                  value="Đăng ký mượn sách"
                />
              </div>
              <div class="col-md-6">
                <input type="submit" class="btn btn-danger" value="Hủy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Nav from "../nav/Nav.vue";
export default {
  components: { Nav },
  name: "BrrowBook",
  data() {
    return {
      books: {
        name: "",
      },
      borrow: {
        name: "",
        namebook: "",
        birth: "",
        address: "",
        phone: "",
        dateborrow: "",
        datereturn: "",
      },
    };
  },
  created() {
    let BookId = this.$route.params.id;
    this.getBook(BookId);
  },
  methods: {
    async save() {
      let result = await this.$request.post(
        "http://localhost:8000/v1/borrow/",
        this.borrow
      );
      console.warn(result);
      if (result.status == 200) {
        this.$router.push("/");
      }
    },
    getBook(BookId) {
      this.$request
        .get(`http://localhost:8000/v1/book/${BookId}`)
        .then((res) => {
          this.books = res.data;
          this.borrow.namebook = res.data.name;
        });
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
}
</style>
