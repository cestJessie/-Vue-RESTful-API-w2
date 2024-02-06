const app = Vue.createApp({
  data() {
    return {
      // config 設定
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'cj-project',
      products: [],
      tempProduct: {},
    }
  },
  methods: {
    checkLogin() {
      axios.post(`${this.apiUrl}/api/user/check`)
        .then(res => {
          this.getProduct();
        })
        .catch(err => {
          alert(err.response.data.message)
          window.location = 'login.html';
        })
    },
    getProduct() {
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
        .then(res => {
          this.products = res.data.products;
        })
        .catch(err => {
          alert(err.response.data.messaage)
        })
    },
    openProduct(item) {
      this.tempProduct = item;
    }
  },
  // 取得 Token（Token 僅需要設定一次）
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // 在每次請求中附加身份驗證令牌於 headers 內
    axios.defaults.headers.common['Authorization'] = token;
    // 預設驗證登入
    this.checkLogin();
  }
})

app.mount('#app')