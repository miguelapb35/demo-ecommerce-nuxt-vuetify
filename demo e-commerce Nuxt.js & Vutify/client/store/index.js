import Cookies from "js-cookie";

export const state = () => ({
  usertoken: null,
  user: null,
  error: "",
  isAdmin: false,
  products: [],
  product: {},
  likes: [],
  url: ""
});

export const mutations = {
  SetAuth(state, auth) {
    state.usertoken = {
      headers: {
        Authorization: "JWT " + auth.token
      }
    };
    state.user = auth.payload;
    (state.user.time = new Date().getTime()), Cookies.set("user", state.user);
    Cookies.set("token", state.usertoken, { secure: false });
  },
  SetAdmin(state, admin) {
    state.isAdmin = admin;
  },
  SetRefreshAuth(state, auth) {
    state.usertoken = auth.token;
    state.user = auth.payload;
    Cookies.set("user", state.user);
    Cookies.set("token", state.usertoken);
  },

  logout(state) {
    state.user = null;
    state.usertoken = null;
    Cookies.set("user", null);
    Cookies.set("token", null);
  },
  SetError(state, err) {
    state.error = err;
  },
  setListProducts(state, products) {
    state.products = products;
    let arr = state.likes.map(like => like.productId);
    state.products = products.map(prod => {
      if (arr.includes(prod._id)) prod.like = true;
      else {
        prod.like = false;
      }
      return prod;
    });
  },
  setSingleProduct(state, product) {
    state.likes.find(prod => {
      return prod.productId === product._id;
    })
      ? (product.like = true)
      : (product.like = false);
    state.product = product;
  },
  setUrlProduct(state, url) {
    state.url = url;
  },
  setListLikes(state, likes) {
    state.likes = likes;
  }
};

export const getters = {
  user: state => {
    return state.user;
  },
  usertoken: state => {
    return state.usertoken;
  },
  error: state => {
    return state.error;
  },
  isAdmin: state => {
    return state.isAdmin;
  },
  products: state => {
    return state.products;
  },
  product: state => {
    return state.product;
  },
  likes: state => {
    return state.likes;
  }
};

export const actions = {
  //AUTH
  async login({ commit }, auth) {
    await this.$axios
      .post("https://localhost:4000/login/", {
        email: auth.email,
        password: auth.password
      })
      .then(auth => {
        if (auth.data.payload) {
          this.$router.push("/");
          commit("SetAuth", auth.data);
        }
        commit("SetError", "User or password incorrect");
      })
      .catch(() => commit("SetError", "Something went wrong"));
  },
  async register({ commit }, auth) {
    await this.$axios
      .post("https://localhost:4000/register/", {
        userName: auth.userName,
        email: auth.email,
        password: auth.password
      })
      .then(() => location.replace("/auth/login"))
      .catch(() => commit("SetError", "Something went wrong"));
  },
  async isAdmin({ commit, state }) {
    await this.$axios
      .get(
        "https://localhost:4000/user/" + state.user._id,
        state.usertoken
      )
      .then(user => {
        commit("SetAdmin", user.data.isAdmin);
      });
  },
  error({ commit }) {
    commit("SetError", "");
  },
  async refresh({ commit }, auth) {
    commit("SetRefreshAuth", auth);
  },
  logout({ commit }) {
    commit("logout");
  },

  //PRODUCTS
  async loadProducts({ commit }, gender) {
    await this.$axios
      .get("https://localhost:4000/products/" + gender)
      .then(products => {
        commit("setListProducts", products.data);
      });
  },
  async loadSingleProduct({ commit }, id) {
    await this.$axios
      .get("https://localhost:4000/product/" + id)
      .then(product => {
        commit("setSingleProduct", product.data);
      });
  },
  async loadSellerProducts({ commit, state }) {
    await this.$axios
      .get(
        "https://localhost:4000/userProducts/" +
          state.product.seller._id
      )
      .then(products => {
        commit("setListProducts", products.data);
      });
  },
  async loadUserProducts({ commit, state }) {
    await this.$axios
      .get(
        "https://localhost:4000/userProducts/" +
          state.user._id
      )
      .then(products => {
        commit("setListProducts", products.data);
      });
  },

  // LIKED PRODUCTS
  async loadLikedProducts({ commit, state }) {
    await this.$axios
      .get(
        "https://localhost:4000/likes/" + state.user._id,
        state.usertoken
      )
      .then(products => {
        commit("setListLikes", products.data);
      });
  },
  async addLikedProduct({ state }, product) {
    await this.$axios.post(
      "https://localhost:4000/like/",
      {
        productId: product._id,
        userId: state.user._id
      },
      state.usertoken
    );
  },

  //POST/PUT
  async addProduct({ commit, state }, prod) {
    let product = prod;
    product.url = state.url;
    product.seller = state.user;
    await this.$axios
      .post(
        "https://localhost:4000/product/",
        product,
        state.usertoken
      )
      .then(product => {
        commit("setSingleProduct", product.data);
        commit("setUrlProduct", "");
      });
  },
  async updateProduct({ commit, state }, prod) {
    let product = prod;
    if (state.url) {
      product.url = state.url;
    }
    await this.$axios
      .put(
        "https://localhost:4000/product/" + product._id,
        product,
        state.usertoken
      )
      .then(() => {
        commit("setUrlProduct", "");
      });
  },
  async uploadProductURL({ commit, state }, file) {
    const formData = new FormData();
    formData.append("file", file);
    await this.$axios
      .post(
        "https://localhost:4000/upload/",
        formData,
        state.usertoken
      )
      .then(url => {
        commit("setUrlProduct", url.data);
      });
  },

  async deleteProduct({ state }, id) {
    await this.$axios.delete(
      "https://localhost:4000/product/" + id,
      state.usertoken
    );
  }
};
