<template>
  <div class="login">





    <div class="account-page">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <form class="ecommerce-sign-up-form">
              <h1>
                Log in to your account
              </h1>
              <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control">
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control">
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox"> Remember me
                </label>
              </div>
              <div class="form-action">
                <button type="submit" class="btn-shadow btn-shadow-dark">Sign in</button>
              </div>
              <div class="form-bottom">
                <a href="sign-up.html" class="btn-forgot-password">Forgot your password?</a>
                Don't have an account yet? <a href="sign-up.html">Sign up</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>





    
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Login</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("admin", response.data.admin);
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>