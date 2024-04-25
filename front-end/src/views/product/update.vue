<template>
  <NavBar />
  <div class="container">
    <div class="text-center">
      <router-link to="/product">Quay lại</router-link>
    </div>
    <form action="" @submit.prevent="save()">
      <div class="row">
        <div class="col-md-4 p-0">
          <div class="text-end">
            <p class="text-title">Tên sách</p>
            <p class="text-title">Giá sách</p>
            <p class="text-title">Số lượng sách</p>
            <p class="text-title">Năm xuất bản</p>
            <p class="text-title">Tác giả</p>
            <p class="text-title">hình ảnh</p>
            <p class="text-title">Nhà xuất bản</p>
          </div>
        </div>
        <div class="col-md-4 p-0">
          <div class="d-flex flex-column">
            <div class="feedback-invalid">{{ error.name }}</div>
            <div class="pb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Tên sách"
                v-model="book.name"
                v-bind:class="{ 'is-invalid': error.name }"
                @blur="validate()"
              />
            </div>
            <div class="feedback-invalid">{{ error.price }}</div>
            <div class="pb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Giá sách"
                v-model="book.price"
                v-bind:class="{ 'is-invalid': error.price }"
                @blur="validate()"
              />
            </div>
            <div class="feedback-invalid">{{ error.number }}</div>
            <div class="pb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Số lượng"
                v-model="book.number"
                v-bind:class="{ 'is-invalid': error.number }"
                @blur="validate()"
              />
            </div>
            <div class="pb-3">
              <input
                type="date"
                class="form-control"
                placeholder="Năm xuất bản"
                v-model="book.year"
                v-bind:class="{ 'is-invalid': error.year }"
                @blur="validate()"
              />
            </div>
            <div class="pb-3">
              <input
                type="text"
                class="form-control"
                placeholder="tác giả"
                v-model="book.author"
                v-bind:class="{ 'is-invalid': error.year }"
                @blur="validate()"
              />
            </div>
            <div class="pb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Dán liên kết hình ảnh vào"
                v-model="book.img"
                v-bind:class="{ 'is-invalid': error.year }"
                @blur="validate()"
              />
            </div>
            <div class="pb-3">
              <select class="form-control" v-model="selectedPublishing">
                <option
                  v-for="pub in publishing"
                  :key="pub._id"
                  :value="pub._id"
                >
                  {{ pub.publishing }}
                </option>
              </select>
            </div>

            <div>
              Đã chọn nhà xuất bản:
              <span class="text-success">{{
                book.publishing ? book.publishing.publishing : ""
              }}</span>
            </div>
            <div class="row py-5">
              <div class="col-md-6">
                <input type="submit" class="btn btn-primary" value="Cập nhật" />
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
  name: "product.edit",
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
        publishing: "",
        author: "",
        img: "",
      },
      publishing: [],
    };
  },
  created() {
    let productId = this.$route.params.id;
    if (productId) {
      this.getBook(productId);
      this.getPublishing();
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
        this.book.publishing = this.selectedPublishing;
        if (this.$route.params.id) {
          this.$request
            .put(`http://localhost:8000/v1/book/${this.book._id}`, this.book)
            .then((res) => {
              if (res.data.success) {
                this.$router.push({ name: "product.list" });
                return;
              }
              alert("Something went wrong");
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          return;
        }
      }
    },
    getBook(bookId) {
      this.$request
        .get(`http://localhost:8000/v1/book/${bookId}`)
        .then((res) => {
          this.book = res.data;
        });
    },
    getPublishing() {
      this.$request.get("http://localhost:8000/v1/publishing/").then((res) => {
        this.publishing = res.data;
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
.text-title {
  padding: 7px;
}
</style>
