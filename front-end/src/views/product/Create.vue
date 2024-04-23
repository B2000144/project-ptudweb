<template>
  <NavBar />
  <div class="container">
    <div class="text-center">
      <router-link to="/product">Quay lại</router-link>
    </div>
    <form action="" @submit.prevent="save()">
      <div class="row">
        <div class="col-md-4">
          <div class="text-end">
            <p>Tên sách</p>
            <p>Giá sách</p>
            <p>Số lượng sách</p>
            <p>Năm xuất bản</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="d-flex flex-column">
            <div class="feedback-invalid">{{ error.name }}</div>
            <input
              type="text"
              class="form-control mb-3"
              placeholder="Tên sách"
              v-model="book.name"
              v-bind:class="{ 'is-invalid': error.name }"
              @blur="validate()"
            />
            <div class="feedback-invalid">{{ error.price }}</div>
            <input
              type="text"
              class="form-control mb-3"
              placeholder="Giá sách"
              v-model="book.price"
              v-bind:class="{ 'is-invalid': error.price }"
              @blur="validate()"
            />
            <div class="feedback-invalid">{{ error.number }}</div>
            <input
              type="text"
              class="form-control"
              placeholder="Số lượng"
              v-model="book.number"
              v-bind:class="{ 'is-invalid': error.number }"
              @blur="validate()"
            />
            <input
              type="date"
              class="form-control"
              placeholder="Năm xuất bản"
              v-model="book.year"
              v-bind:class="{ 'is-invalid': error.year }"
              @blur="validate()"
            />
            <div class="row py-5">
              <div class="col-md-6">
                <input type="submit" class="btn btn-primary" value="Thêm" />
              </div>
              <div class="col-md-6">
                <input
                  @click="cancel"
                  type="submit"
                  class="btn btn-danger"
                  value="Hủy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import NavBar from "../nav/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  name: "CreateProduct",
  data() {
    return {
      error: {
        name: "",
        price: "",
        number: "",
        year: "",
      },
      book: {
        name: "",
        price: "",
        number: "",
        year: "",
      },
    };
  },
  created() {
    let productId = this.$route.params.id;
    if (productId) {
      this.getBook(productId);
    }
  },
  methods: {
    validate() {
      let isValid = true;
      this.error = {
        name: "",
        price: "",
        number: "",
        year: "",
      };
      if (!this.book.name) {
        this.error.name = "bắt buộc phải nhập Tên sách";
        isValid = false;
      }
      if (!this.book.price) {
        this.error.price = "bắt buộc phải nhập Giá sách";
        isValid = false;
      }
      if (!this.book.number) {
        this.error.number = "bắt buộc phải nhập năm sản xuất";
        isValid = false;
      }
      return isValid;
    },
    save() {
      if (this.validate()) {
        if (this.$route.params.id) {
          this.$request
            .put(`http://localhost:8000/v1/book/${this.book._id}`, this.book)
            .then((res) => {
              if (res.data.success) {
                this.$router.push({ name: "product.list" }); // trả về trang danh sách
                return;
              }
              alert("Something went wrong");
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          return;
        }
        this.$request
          .post("http://localhost:8000/v1/book/", this.book)
          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
              this.$router.push({ name: "product.list" }); // trả về trang danh sách
              return;
            }
            alert("Something went wrong");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    getBook(bookId) {
      this.$request
        .get(`http://localhost:8000/v1/book/${bookId}`)
        .then((res) => {
          this.book = res.data;
        });
    },
    cancel() {
      this.book.name = "";
      this.book.price = "";
      this.book.number = "";
      this.book.year = "";
    },
  },
};
</script>

<style scoped>
p {
  margin: 15px;
}
</style>
