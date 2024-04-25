<template>
  <Nav />
  <div class="container pt-5">
    <div class="row">
      <div class="col-md-6">
        <img class="img-book" :src="book.img" alt="" />
      </div>
      <div class="col-md-6">
        <div class="text-start">
          <span class="title">Tên sách</span>{{ book.name }}
        </div>
        <div class="text-start">
          <span class="title">Giá</span>{{ book.price }}
        </div>
        <div class="text-start">
          <span class="title">Năm xuất bản</span>{{ book.year }}
        </div>
        <div class="text-start">
          <span class="title">tác giả</span>{{ book.author }}
        </div>
        <div class="text-start">
          <span class="title">NXB</span
          >{{ book.publishing ? book.publishing.publishing : "" }}
        </div>
        <div class="text-start">
          <router-link :to="{ name: 'BrrowBook', params: { id: book._id } }"
            ><span class="btn btn-warning">Mượn sách</span></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../nav/Nav.vue";
export default {
  components: { Nav },
  name: "detail",
  data() {
    return {
      book: [],
    };
  },
  created() {
    let productId = this.$route.params.id;
    if (productId) {
      this.getBook(productId);
    }
  },
  methods: {
    getBook(bookId) {
      this.$request
        .get(`http://localhost:8000/v1/book/${bookId}`)
        .then((res) => {
          this.book = res.data;
        });
    },
  },
};
</script>

<style scoped>
.img-book {
  width: 90%;
}
.title {
  padding-right: 20px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 18px;
}
</style>
