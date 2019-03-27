<template>
  <div class="signup">







    <div class="account-page">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <form class="ecommerce-sign-up-form" v-on:submit.prevent="submit()">
              <h1>
                Create your account
              </h1>
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>
              <div class="form-group">
                <label>Name</label>
                <input type="name" class="form-control" v-model="name">
              </div>
              <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control" v-model="email">
              </div>
              <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="password">
              </div>
              <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" class="form-control" v-model="passwordConfirmation">
              </div>
<!--               <div class="checkbox">
                <label>
                  <input type="checkbox"> I've read & agree with the <a href="#">Terms</a>.
                </label>
              </div> -->
              <div class="form-action">
                <button type="submit" class="btn-shadow btn-shadow-dark">Create account</button>
              </div>
              <div class="form-bottom">
                Already have an account? <router-link :to="'/login'">Sign in</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
















<!--     <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Signup</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Name:</label> 
          <input type="text" class="form-control" v-model="name">
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <input type="password" class="form-control" v-model="passwordConfirmation">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>