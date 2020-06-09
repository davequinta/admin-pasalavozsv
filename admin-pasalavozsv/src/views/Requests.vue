<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app color="#263C4F">
      <v-list dense>
        <v-list-item link to="/dashboard">
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
        <!--Acá va el contenido-->
        <div style="padding:0% 5% 0% 5% ;">
          <h1>Listado de solicitudes de ayuda</h1>
          <br />
          <v-flex xs6>
            <v-text-field
              v-model="search"
              color="#FF5A4D"
              append-icon="mdi-magnify"
              label="Buscar"
              hide-details
              dark
              style="margin-right: 5rem"
            ></v-text-field>
          </v-flex>
          <br /><br />
          <!--Card 1-->
          <v-data-table
            light
            :headers="headers"
            :items="requests"
            :items-per-page="10"
            class="elevation-1"
            :search="search"
          ></v-data-table>
          <!--Card 2-->
        </div>
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
import { db } from "@/main";

export default {
  name: "Form",

  props: {
    source: String,
  },
  data: () => ({
    drawer: false,
    search: "",
    //Start-Form Data
    headers: [
      {
        text: "Necesitados",
        align: "start",
        sortable: false,
        value: "who",
      },
      { text: "Departamento/Municipios", value: "state" },
      { text: "Dirección", value: "address" },
      { text: "Nombre de representante", value: "name" },
      { text: "Contacto", value: "conctact" },
      { text: "Cantidad de personas", value: "peopleNumber" },
      { text: "N° Niños", value: "kids" },
      { text: "N° Adultos", value: "adults" },
      { text: "N° Adultos Mayores", value: "elder" },
    ],
    requests: [],
  }),
  created() {
    this.$vuetify.theme.dark = true;
    this.loadData();
  },
  methods: {
    loadData() {
      this.ref = db.collection("helpRequests").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            let doc = change.doc;
            this.requests.push({
              id: doc.id,
              who: doc.data().who,
              state: doc.data().state,
              address: doc.data().address,
              name: doc.data().name,
              contact: doc.data().contact,
              peopleNumber: doc.data().peopleNumber,
              kids: doc.data().kids,
              adults: doc.data().adults,
              elder: doc.data().elder,
            });
          }
        });
      });
      console.log(this.requests);
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
</style>
