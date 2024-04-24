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
            <th>Tên sách</th>
            <th>Giá sách</th>
            <th>Ngày xuất bản</th>
            <th>Nhà xuất bản</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(book, index) in books">
            <td>{{ index + 1 }}</td>
            <td>{{ book.name }}</td>
            <td>{{ book.price }}</td>
            <td>{{ book.year }}</td>
            <td>
              {{ book.publishing ? book.publishing.publishing : "Unknown" }}
            </td>

            <td>
              <router-link :to="{ name: 'BrrowBook', params: { id: book._id } }"
                ><span class="btn btn-warning">Mượn sách</span></router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Nav from "../views-user/nav/Nav.vue";
export default {
  name: "Home",
  data() {
    return {
      name: "",
      books: [],
    };
  },
  components: { Nav },
  async mounted() {
    let result = await this.$request.get("http://localhost:8000/v1/book/");
    console.warn(result);
    this.books = result.data;
    console.warn(this.books);
  },
};
</script>

<style scoped>
.title {
  font-size: 30px;
  font-weight: bold;
}
</style>
