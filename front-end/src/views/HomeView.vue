<template>
  <Nav />
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-3 mb-4" v-for="book in books" :key="book._id">
        <div class="card">
          <router-link :to="{ name: 'detail', params: { id: book._id } }"
            ><img :src="book.img" class="card-img-top img" alt="Product Image"
          /></router-link>
          <div class="card-body">
            <h5 class="card-title">{{ book.name }}</h5>
            <router-link :to="{ name: 'BrrowBook', params: { id: book._id } }"
              ><span class="btn btn-warning">Mượn sách</span></router-link
            >
          </div>
        </div>
      </div>
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
img {
  height: 180px;
}
</style>
