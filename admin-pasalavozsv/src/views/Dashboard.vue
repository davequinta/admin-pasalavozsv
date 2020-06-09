<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app color="#263C4F">
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/organizations">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Organizaciones</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/request">
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Solicitudes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#263C4F">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <br />
      <v-toolbar-title style="padding:30px"
        ><img
          src="../assets/pasalavoz.png"
          alt
          width="90px"
          height="85px"
          style="padding-top:20px; padding-bottom:15px"
      /></v-toolbar-title>
    </v-app-bar>

    <v-content style="background-color:#363636">
      <v-container fluid>
        <h1 style="margin-left:10%">Panel de control</h1>

        <v-row align="center" justify="center">
          <!--Acá va el contenido-->
          <div style="padding:0% 5% 0% 5% ;">
            <br />
            <!--Card 1-->
            <v-row>
              <v-col cols="12" md="6"
                ><v-card color="#006064" class="mx-auto" max-width="400">
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                  >
                  </v-img>

                  <v-card-title class="pb-0">Organizaciones</v-card-title>

                  <v-card-text class="text--primary">
                    <div>Listado</div>

                    <div>Organizaciones de la plataforma</div>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn to="/join" color="orange" text>
                      Agregar
                    </v-btn>
                    <v-btn to="/organizations" color="orange" text>
                      Ver más
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="mx-auto" color="#558B2F" max-width="400">
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    src="https://images.unsplash.com/photo-1461532257246-777de18cd58b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
                  >
                  </v-img>

                  <v-card-title class="pb-0">Solicitudes</v-card-title>

                  <v-card-text class="text--primary">
                    <div>Solicitudes de ayuda</div>

                    <div>Datos recopilados del formulario en la página</div>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn to="/request" color="black" text>
                      Ver más
                    </v-btn>
                  </v-card-actions>
                </v-card></v-col
              >
            </v-row>
            <!--Card 2-->
          </div>
        </v-row>
      </v-container>
    </v-content>
    <v-footer color="#263C4F" app dark center>
      <v-spacer></v-spacer>
      <span style="color:#FF5A4D"> &copy; Made with ❤ Pasá La Voz.</span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
//import { swal2, db, storage } from "@/main";

export default {
  name: "Form",

  props: {
    source: String,
  },
  data: () => ({
    //Start-Form Data
    org_name: "",
    org_desc: "",
    departament: "",
    zone: "",
    donation: [],
    help: [],
    collection: [],
    another_type: "",
    another_help: "",
    contact_name: "",
    contact_cell: "",
    contact_email: "",
    contact_website: "",
    contact_instagram: "",
    contact_facebook: "",
    contact_twitter: "",
    direction: "",
    account_name: "",
    account_type2: "",
    account_bank: "",
    account_number: "",
    //End-Form Data

    e6: 1,
    e7: [],

    selectedFile: null,
    image: null,
    logourl: "",
    logourl2: "",
    flag_donation_type: false,
    flag_destination: false,
    flag_collection: false,

    drawer: false,
    donation_type: [
      "Viveres/Art. primera necesidad",
      "Monetaria",
      "Ropa/Sabanas",
      "Art.Femeninos",
      "Otra",
    ],
    destination: [
      "Adultos Mayores",
      "Niños",
      "Mujeres",
      "Animales",
      "Comunidad General",
      "Otra",
    ],
    recolection: [
      "Centro de acopio",
      "Transferencia Bancaria",
      "Recolección a'domicilio'",
      "Otra",
    ],
    deptos: [
      { nombre: "Ahuchapán", valor: "Ahuchapán" },
      { nombre: "Cabañas", valor: "Cabañas" },
      { nombre: "Cuscatlán", valor: "Cuscatlán" },
      { nombre: "La Libertad", valor: "La Libertad" },
      { nombre: "La Unión", valor: "La Unión" },
      { nombre: "Morazán", valor: "Morazán" },
      { nombre: "San Miguel", valor: "San Miguel" },
      { nombre: "San Salvador", valor: "San Salvador" },
      { nombre: "San Vicente", valor: "San Vicente" },
      { nombre: "Santa Ana", valor: "Santa Ana" },
      { nombre: "Sonsonate", valor: "Sonsonate" },
      { nombre: "Usulután", valor: "Usulután" },
    ],
    account_type: [
      { nombre: "Ahorro", valor: "Ahorro" },
      { nombre: "Corriente", valor: "Corriente" },
    ],
    collection_type: [
      "Centro de acopio",
      "Transferencia Bancaria",
      "Recolección a domicilio",
    ],
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {},
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
</style>
