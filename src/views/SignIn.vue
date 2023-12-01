<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
      <div class="flex flex-column align-items-center justify-content-center">
        <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
          <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
            <div class="text-center mb-5">
              <div class="text-900 text-3xl font-medium mb-3">Sign in</div>
            </div>
            <div>
              <label for="usuario" class="block text-900 text-xl font-medium mb-2">User</label>
              <InputText v-model="usuario" id="usuario" type="text" placeholder="User" class="w-full md:w-30rem mb-5" style="padding: 1rem" />
              <label for="contrasena" class="block text-900 font-medium text-xl mb-2">Password</label>
              <InputText v-model="contrasena" id="contrasena" type="password" placeholder="********" class="w-full mb-3" style="padding: 1rem"></InputText>
              <label for="country" class="block text-900 text-xl font-medium mb-2">Country</label>
              <Dropdown v-model="selectedCountry" :options="countries" placeholder="Select a country" class="w-full mb-3"/>
              <label for="mail" class="block text-900 text-xl font-medium mb-2">Mail</label>
              <InputText v-model="usuario" id="usuario" type="text" placeholder="example@mail.com" class="w-full md:w-30rem mb-5" style="padding: 1rem" />
              <label for="datebirth" class="block text-900 font-medium text-xl mb-2">Date of birth</label>
              <Calendar :showIcon="true" :showButtonBar="true" class="w-full mb-3" v-model="calendarValue"></Calendar>
              <Button label="Sign In" class="w-full p-3 text-xl" @click="signin"></Button>
              <br><br>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import UsuarioService from '@/service/UsuarioService.js';
  export default {
    data() {
      return {
        usuario: '',
        contrasena: '',
        email: '',  // Agregado para recopilar la dirección de correo electrónico
        selectedCountry: '',
        fechaNacimiento: '',  // Agregado para recopilar la fecha de nacimiento
        error: false,
        countries: [
        'Afghanistan',
        'Albania',
        'Algeria',
        'Andorra',
        'Angola',
        'Antigua and Barbuda',
        'Argentina',
        'Armenia',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bhutan',
        'Bolivia',
        'Bosnia and Herzegovina',
        'Botswana',
        'Brazil',
        'Brunei',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cabo Verde',
        'Cambodia',
        'Cameroon',
        'Canada',
        'Central African Republic',
        'Chad',
        'Chile',
        'China',
        'Colombia',
        'Comoros',
        'Congo (Congo-Brazzaville)',
        'Costa Rica',
        'Croatia',
        'Cuba',
        'Cyprus',
        'Czechia (Czech Republic)',
        'Democratic Republic of the Congo',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        'Eswatini (fmr. "Swaziland")',
        'Ethiopia',
        'Fiji',
        'Finland',
        'France',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Greece',
        'Grenada',
        'Guatemala',
        'Guinea',
        'Guinea-Bissau',
        'Guyana',
        'Haiti',
        'Holy See',
        'Honduras',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Israel',
        'Italy',
        'Jamaica',
        'Japan',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        'Kuwait',
        'Kyrgyzstan',
        'Laos',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands',
        'Mauritania',
        'Mauritius',
        'Mexico',
        'Micronesia',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Morocco',
        'Mozambique',
        'Myanmar (formerly Burma)',
        'Namibia',
        'Nauru',
        'Nepal',
        'Netherlands',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'North Korea',
        'North Macedonia (formerly Macedonia)',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Palestine State',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Poland',
        'Portugal',
        'Qatar',
        'Romania',
        'Russia',
        'Rwanda',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint Vincent and the Grenadines',
        'Samoa',
        'San Marino',
        'Sao Tome and Principe',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Slovakia',
        'Slovenia',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Korea',
        'South Sudan',
        'Spain',
        'Sri Lanka',
        'Sudan',
        'Suriname',
        'Sweden',
        'Switzerland',
        'Syria',
        'Tajikistan',
        'Tanzania',
        'Thailand',
        'Timor-Leste',
        'Togo',
        'Tonga',
        'Trinidad and Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Tuvalu',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'United Kingdom',
        'United States of America',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Venezuela',
        'Vietnam',
        'Yemen',
        'Zambia',
        'Zimbabwe',
        ],
      };
    },
    methods: {
        async signin() {
    try {
      const response = await UsuarioService.register(
        this.usuario,
        this.contrasena,
        this.email,
        this.selectedCountry,
        this.fechaNacimiento
      );
      console.log('Respuesta del servidor:', response);
      localStorage.setItem('nombre', this.usuario);
      this.$router.push({ name: 'listadepelis', query: { id: response.id } });
    } catch (error) {
      console.error('Error en la creación:', error);
      this.error = true;
    }
  },
    },
    created() {

    }
  };
  </script>
  