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

    <v-app-bar app color="#263C4F">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

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

    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <!--Acá va el contenido-->
          <div style="padding:0% 5% 0% 5% ;">
            <h1 style="color:#FF5A4D">
              ¡Hola! Muchas gracias por la labor que estás haciendo por nuestro
              país.
            </h1>
            <br />

            <h3 style="color:#424242">
              Ante la emergencia que enfrentamos, nos pareció oportuno contar
              con un lugar que condensara todas las iniciativas y organizaciones
              en las que podemos ayudar. Por esto, te agradecemos si puedes
              dejar información sobre este tipo de proyectos en este formulario.
            </h3>

            <hr />
            <br />
            <v-stepper
              v-model="e6"
              vertical
              style="box-shadow: 10px 10px 24px 0px rgba(0,0,0,0.38);"
            >
              <v-stepper-step :complete="e6 > 1" step="1" color="#263C4F">
                <h3 class="inner-text">
                  Datos de la organización o iniciativa:
                </h3>
              </v-stepper-step>

              <v-stepper-content step="1">
                <v-form ref="form" style="padding: 4px 20px 10px 20px">
                  <v-text-field
                    v-model="org_name"
                    label="Nombre de la organización"
                    required
                  ></v-text-field>
                  <v-textarea
                    v-model="org_desc"
                    label="Descripción"
                    required
                  ></v-textarea>
                  <h3 class="inner-text">Logo o banner:</h3>
                  <br />
                  <!-- Start Upload Image -->
                  <img :src="logourl" height="150" />
                  <v-btn raised color="#26A69A" @click="onPickFile"
                    ><span style="color:white">Adjuntar imagen</span></v-btn
                  >
                  <input
                    type="file"
                    style="display:none"
                    ref="fileInput"
                    accept="image/*"
                    @change="onFilePicked"
                  />
                  <br />
                  <br />
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="departament"
                        :items="deptos"
                        light
                        label="Departamento"
                        item-value="nombre"
                        item-text="nombre"
                      ></v-select
                    ></v-col>
                    <v-col cols="12" md="6"
                      ><v-text-field
                        v-model="zone"
                        label="Municipio al que va dirigida la ayuda"
                        hint="En este apartado puedes poner el nombre del municipio, las comunidades específicas o territorios específicos. Si la cobertura es nacional, escribir: Todo el territorio nacional. Ej. San Jacinto; Comunidad Bambular;Comunidades de Sonsonate"
                        required
                      ></v-text-field
                    ></v-col>
                  </v-row>
                </v-form>
                <v-btn color="#263C4F" @click="e6 = 2"
                  ><span style="color:#3AC9CC">Continuar</span>
                </v-btn>
                <!-- <v-btn text>Cancelar</v-btn> -->
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 2" step="2" color="#263C4F">
                <h3 class="inner-text">Datos de donativos:</h3>
              </v-stepper-step>

              <v-stepper-content step="2">
                <v-row>
                  <v-col cols="12" sm="4" md="4">
                    <h3 style="color:#FF5A4D">Tipo de donación:</h3>
                    <br />
                    <v-select
                      @change="renderNewField(0)"
                      v-model="donation"
                      :items="donation_type"
                      label="Selecciona: "
                      multiple
                      chips
                      deletable-chips
                      persistent-hint
                    ></v-select>
                    <v-text-field
                      v-if="flag_donation_type"
                      v-model="another_type"
                      label="Especifique"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <h3 style="color:#FF5A4D">
                      A quién va dirigida la ayuda:
                    </h3>
                    <br />
                    <v-select
                      @change="renderNewField(1)"
                      v-model="help"
                      :items="destination"
                      label="Selecciona: "
                      multiple
                      chips
                      deletable-chips
                      persistent-hint
                    ></v-select>
                    <v-text-field
                      v-if="flag_destination"
                      v-model="another_help"
                      label="Especifique"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <br />
                <v-btn color="#263C4F" @click="e6 = 3"
                  ><span style="color:#3AC9CC">Continuar</span>
                </v-btn>
                <v-btn text @click="e6--">Regresar</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 3" step="3" color="#263C4F">
                <h3 class="inner-text">Datos de contacto:</h3>
              </v-stepper-step>

              <v-stepper-content step="3">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="contact_name"
                      prepend-inner-icon="mdi-account"
                      label="Nombre"
                      required
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="6"
                    ><v-text-field
                      v-model="contact_cell"
                      prepend-inner-icon="mdi-cellphone"
                      label="Teléfono"
                      required
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="contact_email"
                      prepend-inner-icon="mdi-email"
                      label="Correo Electrónico"
                      required
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="6"
                    ><v-text-field
                      v-model="contact_website"
                      prepend-inner-icon="mdi-web"
                      label="Sitio Web"
                      required
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="contact_instagram"
                      prepend-inner-icon="mdi-instagram"
                      label="Instragram"
                      required
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="6"
                    ><v-text-field
                      v-model="contact_facebook"
                      prepend-inner-icon="mdi-facebook"
                      label="Facebook"
                      required
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="contact_twitter"
                      prepend-inner-icon="mdi-twitter"
                      label="Twitter"
                      required
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="6"></v-col>
                </v-row>
                <v-btn color="#263C4F" @click="e6 = 4"
                  ><span style="color:#3AC9CC">Continuar</span>
                </v-btn>
                <v-btn text @click="e6--">Regresar</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 4" step="4" color="#263C4F">
                <h3 class="inner-text">Datos de recolección de ayuda:</h3>
              </v-stepper-step>
              <v-stepper-content step="4">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="collection"
                      @change="renderNewField(2)"
                      :items="collection_type"
                      label="Selecciona la forma de recolección: "
                      multiple
                      chips
                      deletable-chips
                      persistent-hint
                    ></v-select
                  ></v-col>
                  <v-col cols="12" md="6"
                    ><v-text-field
                      v-model="direction"
                      label="Dirección"
                      hint="Pon la dirección del centro de acopio o las zonas donde se recogen donaciones a domicilio."
                      persistent-hint
                      required
                    ></v-text-field
                  ></v-col>
                </v-row>

                <v-btn color="#263C4F" @click="e6 = 5"
                  ><span style="color:#3AC9CC">Continuar</span>
                </v-btn>
                <v-btn text @click="e6--">Regresar</v-btn>
              </v-stepper-content>

              <v-stepper-step step="5" color="#263C4F">
                <h3 class="inner-text">Datos de cuenta Bancaria:</h3>
              </v-stepper-step>
              <v-stepper-content step="5">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="account_name"
                      label="Nombre"
                      required
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12" md="6"
                    ><v-text-field
                      v-model="account_bank"
                      label="Banco"
                      required
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="account_type2"
                      :items="account_type"
                      light
                      label="Tipo de cuenta:"
                      item-value="nombre"
                      item-text="nombre"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6"
                    ><v-text-field
                      v-model="account_number"
                      label="Número de cuenta"
                      required
                    ></v-text-field
                  ></v-col>
                </v-row>
                <!-- <v-btn color="#263C4F" @click="e6 = 1"
                  ><span style="color:#3AC9CC">Continuar</span>
                </v-btn> -->
                <v-btn text @click="e6--">Regresar</v-btn>
              </v-stepper-content>
              <br /><br />

              <v-btn style="margin-left:4%;" color="#263C4F" @click="saveData"
                ><span style="color:#3AC9CC">Enviar Data</span>
              </v-btn>
            </v-stepper>
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
import { swal2, db, storage } from "@/main";

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
    this.$vuetify.theme.dark = false;
  },
  methods: {
    renderNewField(number) {
      console.log("HOLI", number);
      switch (number) {
        case 0:
          this.flag_donation_type = this.donation.includes("Otra")
            ? true
            : false;

          break;
        case 1:
          this.flag_destination = this.help.includes("Otra") ? true : false;
          break;
        case 2:
          this.flag_collection = this.collection.includes(
            "Transferencia Bancaria"
          )
            ? true
            : false;
          break;

        default:
          break;
      }
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;

      if (filename.lastIndexOf(".") <= 0) {
        return alert("Error, tipo de archivo invalido!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.logourl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      console.log("------> " + this.image);
      //End of Upload Image
    },
    saveData() {
      if (this.flag_donation_type) {
        this.donation.push(this.another_type);
      }

      if (this.flag_destination) {
        this.help.push(this.another_help);
      }
      if (!this.image) {
        swal2.fire("¡Error!", "Tienes que adjuntar una imagen.", "error");
        return;
      }
      if (this.org_name && this.departament) {
        //console.log(this.categoria);

        //console.log("AUTOINCREMENT", this.autoincrement);

        /*  {
      "Departamento": "San Salvador",
      "Zonas": ["San Salvador"],
      "help_type": ["Comunidad Gnral."],
      "contacts": [
        {
          "instagram": "@one_elsalvador",
          "email": "",
          "twitter": "",
          "phone": "",
          "website:": "",
          "facebook": "",
          "name": "One El Salvador"
        }
      ],
      "donation_type": [
        "Víveres/art. primera necesidad",
        "Ropa/sábanas",
        "Art. Femeninos",
        "Art. para bebés"
      ],
      "collection_type": ["Centro de acopio"],
      "geolocation": [{ "lat": 0, "lng": 0 }],
      "name": "One El Salvador",
      "logo": "",
      "description": "",
      "address": "Calle al Mirador, entre 91 y 93 Av. Norte Col. Escalon. Waze: Publimate",
      "accounts": [{ "type": "", "accountNumber": "", "name": "", "bank": "" }]
    },*/

        var data = {
          Departamento: this.departament,
          Zonas: [this.zone],
          help_type: this.help,
          contacts: [
            {
              instagram: this.contact_instagram,
              email: this.contact_email,
              twitter: this.contact_twitter,
              phone: this.contact_cell,
              website: this.contact_website,
              facebook: this.contact_facebook,
              name: this.contact_name,
            },
          ],
          donation_type: this.donation,
          collection_type: this.collection,
          geolocation: [{ lat: 0, lng: 0 }],
          name: this.org_name,
          review: false,
          description: this.org_desc,
          address: this.direction,
          accounts: [
            {
              type: this.account_type2,
              accountNumber: this.account_number,
              name: this.account_name,
              bank: this.account_bank,
            },
          ],
        };
        var file = this.image;
        let uploadTask = storage.ref(`/organizations/${file.name}`).put(file);
        uploadTask
          .then(function(snapshot) {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //console.log("Upload is " + progress + "% done");
            if (progress == "100") {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function(downloadURL) {
                  data["logo"] = downloadURL;
                })
                .then(() =>
                  db
                    .collection("organizations")
                    .add(data)
                    .then(() => {
                      swal2.fire(
                        "¡Guardado!",
                        "Tu formulario fue enviado con éxito.",
                        "success"
                      );
                    })
                    .catch((err) => {
                      swal2.fire(
                        "¡Error!",
                        "Contacta con soporte técnico: " + err,
                        "error"
                      );
                    })
                );
            }
          })
          .then(() => {
            (this.org_name = ""),
              (this.org_desc = ""),
              (this.departament = ""),
              (this.zone = ""),
              (this.donation = []),
              (this.help = []),
              (this.collection = []),
              (this.another_type = ""),
              (this.another_help = ""),
              (this.contact_name = ""),
              (this.contact_cell = ""),
              (this.contact_email = ""),
              (this.contact_website = ""),
              (this.contact_instagram = ""),
              (this.contact_facebook = ""),
              (this.contact_twitter = ""),
              (this.direction = ""),
              (this.account_name = ""),
              (this.account_type2 = ""),
              (this.account_bank = ""),
              (this.account_number = ""),
              //End-Form Data

              (this.e6 = 1),
              (this.e7 = []),
              (this.selectedFile = null),
              (this.image = null),
              (this.logourl = ""),
              (this.logourl2 = ""),
              (this.flag_donation_type = false),
              (this.flag_destination = false),
              (this.flag_collection = false);
          });
      } else {
        swal2.fire(
          "¡Error!",
          "Verifica los datos ingresados o falta información",
          "error"
        );
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
</style>
