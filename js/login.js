const app = Vue.createApp({
  data() {
    return {
      // config 設定
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      if (!this.user.username || !this.user.password) {
        alert("請輸入信箱及密碼!");
        return;
      } else {
        axios
          .post(`${this.apiUrl}/admin/signin`, this.user)
          .then(res => {
            // 將 token 和 unix timestamp 存起來
            const { token, expired } = res.data;
            // 設定 cookie
            document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
            window.location = "product.html";
          })
          .catch(err => {
            alert(err.data.message);
          });
      }
    }
  }
});
app.mount("#app");
