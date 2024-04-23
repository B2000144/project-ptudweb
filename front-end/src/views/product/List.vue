<template>
  <div class="container">
    <div class="text-center">
      <router-link to="/product/create"><p>Thêm mới</p></router-link>
    </div>
    <div class="card-deck mb-3 text-center">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Product name</th>
            <th>Price</th>
            <th>Handle</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(product, index) in products">
            <td>{{ index + 1 }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.description }}</td>
            <td>
              <router-link
                :to="{ name: 'product.edit', params: { id: product.id } }"
                ><button class="btn btn-primary">Sửa</button></router-link
              >
              |
              <button class="btn btn-danger" @click="onDelete(product.id)">
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
export default {
  name: "product.list",
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.getAll();
    console.log("Product created");
  },
  methods: {
    getAll() {
      this.$request.get("http://localhost:8000/v1/book/").then((res) => {
        this.products = res.data;
      });
    },
    // onDelete(productId) {
    //   this.$swal
    //     .fire({
    //       title: "Bạn có muốn xóa",
    //       showDenyButton: false,
    //       showCancelButton: true,
    //       confirmButtonText: "Có",
    //       denyButtonText: `Không`,
    //     })
    //     .then((result) => {
    //       /* Read more about isConfirmed, isDenied below */
    //       if (result.isConfirmed) {
    //         this.$request
    //           .delete(`http://localhost:8000/api/products/${productId}`)
    //           .then((res) => {
    //             if (res.data.success) {
    //               this.$swal.fire("Đã xóa!", "", "success");
    //               this.getAll();
    //             }
    //           });
    //       }
    //     });
    // },
  },
};
</script>

<style></style>
