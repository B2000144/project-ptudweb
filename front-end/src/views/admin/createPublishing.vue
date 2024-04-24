<template>
  <Nav />
  <div class="container">
    <div class="text-center">
      <router-link to="/publishing">Quay lại</router-link>
    </div>
    <form action="" @submit.prevent="save()">
      <div class="row">
        <div class="col-md-4">
          <div class="text-end">
            <p>Tên Nhà xuất bản</p>
            <p>Địa chỉ</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="d-flex flex-column">
            <div class="feedback-invalid">{{ error.publishing }}</div>
            <input
              type="text"
              class="form-control mb-3"
              placeholder="Tên NXB"
              v-model="book.publishing"
              v-bind:class="{ 'is-invalid': error.publishing }"
              @blur="validate()"
            />
            <div class="feedback-invalid">{{ error.address }}</div>
            <input
              type="text"
              class="form-control mb-3"
              placeholder="Địa chỉ"
              v-model="book.address"
              v-bind:class="{ 'is-invalid': error.address }"
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
import Nav from "../nav/NavBar.vue";

export default {
  components: {
    Nav,
  },
  name: "CreatePublishing",
  data() {
    return {
      error: {
        publishing: "",
        address: "",
      },
      book: {
        publishing: "",
        address: "",
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
        publishing: "",
        address: "",
      };
      if (!this.book.publishing) {
        this.error.publishing = "bắt buộc phải nhập Tên sách";
        isValid = false;
      }
      if (!this.book.address) {
        this.error.address = "bắt buộc phải nhập Giá sách";
        isValid = false;
      }
      return isValid;
    },
    save() {
      if (this.validate()) {
        if (this.$route.params.id) {
          this.$request
            .put(
              `http://localhost:8000/v1/publishing/${this.book._id}`,
              this.book
            )
            .then((res) => {
              if (res.data.success) {
                this.$router.push({ name: "publishing" }); // trả về trang danh sách
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
          .post("http://localhost:8000/v1/publishing/", this.book)
          .then((res) => {
            // this.abook = res.data;

            if (res.data.success) {
              this.$router.push({ name: "publishing" }); // trả về trang danh sách
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
        .get(`http://localhost:8000/v1/publishing/${bookId}`)
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
      this.book.publishing = "";
      this.book.address = "";
    },
  },
};
</script>

<style scoped>
p {
  margin: 15px;
}
</style>
