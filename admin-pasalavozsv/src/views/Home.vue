<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer v-model="drawer" app color="#263C4F">
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <!-- <v-app-bar app color="#263C4F">

      <br />
      <v-toolbar-title style="padding:30px"
        ><img
          src="../assets/pasalavoz.png"
          alt
          width="90px"
          height="85px"
          style="padding-top:20px; padding-bottom:15px"
      /></v-toolbar-title>
    </v-app-bar> -->

    <v-content class="login-square">
      <v-container fluid>
        <v-row class="login-square" align="center" justify="center">
          <!--Acá va el contenido-->
          <div class="square">
            <div class="text-center">
              <img
                align="center"
                justify="center"
                src="../assets/pasalavoz.png"
                alt
              />
            </div>

            <br /><br />
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  dark
                  outlined
                  v-model="username"
                  prepend-inner-icon="mdi-account-heart"
                  label="User"
                  required
                ></v-text-field
              ></v-col>
              <v-col cols="12" md="12"
                ><v-text-field
                  dark
                  type="password"
                  outlined
                  v-model="pass"
                  prepend-inner-icon="mdi-account-lock"
                  label="Password"
                  required
                ></v-text-field
              ></v-col>
            </v-row>
            <div class="text-center">
              <v-btn x-large color="#FFFFF" @click="login()">
                Entrar
              </v-btn>
            </div>
          </div>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { swal2 } from "@/main";

export default {
  name: "Form",

  props: {
    source: String,
  },
  data: () => ({
    //Start-Form Data
    username: "",
    pass: "",

    //End-Form Data
  }),
  created() {
    this.$vuetify.theme.dark = false;
  },
  methods: {
    login() {
      if (this.username == "pasalavoz" && this.pass == "123456!") {
        console.log("You Are In");
        this.$router.push("dashboard");
      } else {
        swal2.fire("¡Error!", "Credenciales invalidas.", "error");
      }
    },
  },
};
</script>

<style>
.title {
  color: #212121;
}
.form {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 10px 10px 29px 0px rgba(0, 0, 0, 0.75);
}
.stepper {
  box-shadow: 10px 10px 22px 0px rgba(0, 0, 0, 0.75);
}
.inner-text {
  color: #ff5a4d;
}
.login-square {
  padding: 10% 5% 10% 5%;
  background: #263c4f;
  background-repeat: repeat;
}

.square {
  border-radius: 10px 10px 10px 10px;
  -moz-border-radius: 10px 10px 10px 10px;
  -webkit-border-radius: 10px 10px 10px 10px;
  border: 2px solid #ff5a4d;
  padding: 2%;
}
</style>
