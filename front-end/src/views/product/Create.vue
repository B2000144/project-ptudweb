<template>
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
              v-model="product.name"
              v-bind:class="{ 'is-invalid': error.name }"
              @blur="validate()"
            />
            <div class="feedback-invalid">{{ error.price }}</div>
            <input
              type="text"
              class="form-control mb-3"
              placeholder="Giá sách"
              v-model="product.price"
              v-bind:class="{ 'is-invalid': error.price }"
              @blur="validate()"
            />
            <div class="feedback-invalid">{{ error.number }}</div>
            <input
              type="text"
              class="form-control"
              placeholder="Số lượng"
              v-model="product.number"
              v-bind:class="{ 'is-invalid': error.number }"
              @blur="validate()"
            />
            <input
              type="date"
              class="form-control"
              placeholder="Năm xuất bản"
              v-model="product.year"
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
export default {
  name: "CreateProduct",
  data() {
    return {
      error: {
        name: "",
        price: "",
        number: "",
        year: "",
      },
      product: {
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
      this.getProduct(productId);
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
      if (!this.product.name) {
        this.error.name = "bắt buộc phải nhập Tên sách";
        isValid = false;
      }
      if (!this.product.price) {
        this.error.price = "bắt buộc phải nhập Giá sách";
        isValid = false;
      }
      if (!this.product.number) {
        this.error.number = "bắt buộc phải nhập năm sản xuất";
        isValid = false;
      }
      return isValid;
    },
    save() {
      if (this.validate()) {
        if (this.$route.params.id) {
          this.$request
            .put(
              `http://localhost:8000/v1/book/${this.product._id}`,
              this.product
            )
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
          .post("http://localhost:8000/v1/book/", this.product)
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
    getProduct(productId) {
      this.$request
        .get(`http://localhost:8000/v1/book/${productId}`)
        .then((res) => {
          this.product = res.data;
        });
    },
    cancel() {
      this.product.name = "";
      this.product.price = "";
      this.product.number = "";
      this.product.year = "";
    },
  },
};
</script>

<style scoped>
p {
  margin: 15px;
}
</style>
