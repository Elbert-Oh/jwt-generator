<template>
  <div>
    <h1>JWT Generator</h1>

    <div class='container'>
      <div>
        <span class='bold teal'>Your JWT: </span>
        <span>{{ jwt }}</span>
        <div class='generate-jwt-btn'>
          <button @click='generateJwt'>Generate JWT</button>
        </div>
      </div>

      <div class='claims-wrapper'>
        <div>
          <label for='algorithm'>Algorithm (Only HS256 available for now): </label>
          <select disabled='true' id='algorithm'>
            <option value='HS256'>HS256</option>
          </select>
        </div>
        <div>
          <input v-model='issuer' type='text' placeholder='Issuer' />
        </div>
        <div>
          <input v-model='audience' type='text' placeholder='Audience' />
        </div>
      </div>

      <div class='secret-wrapper'>
        <div>
          <input v-model='secret' type='text' placeholder='Secret (string length >= 16)' />
          <button @click='generateBase64UrlSecret'>Encode secret to base64url</button>
        </div>

        <div>
          <input v-model='base64UrlEncodedSecret' type='text' placeholder='Base64url Encoded Secret' />
        </div>

        <div>
          <span class='bold teal'>Your base64url-encoded secret: </span>
          <span>{{ base64UrlEncodedSecret }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { base64UrlEncode } from '../helpers/base64url-encode';
import createJwt from '../helpers/create-jwt';

export default Vue.extend({
  data() {
    return {
      issuer: '' as string,
      audience: '' as string,
      secret: '' as string,
      expiration: new Date() as Date,
      base64UrlEncodedSecret: '' as string,
      jwt: '' as string
    };
  },
  methods: {
    validateSecret(): boolean {
      if(this.secret.length >= 16) return true;

      this.secret = '';
      alert('Secret has to be longer than 16 characters');
      return false;
    },
    generateBase64UrlSecret(): void {
      if(!this.validateSecret()) return;

      this.base64UrlEncodedSecret = base64UrlEncode(this.secret);
    },
    generateJwt(): void {
      if(!this.base64UrlEncodedSecret) {
        alert('Please generate base64url encoded secret!');
        return;
      }

      this.jwt = createJwt('HS256', {
        iss: this.issuer,
        aud: this.audience
      }, this.secret)
    }
  }
})
</script>

<style lang='scss' scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}

h1 {
  text-align: center;
  color: orange;
  font-size: 3.5em;
}

span.bold {
  font-weight: bold;
}

.teal {
  color: teal;
}

.center {
  text-align: center;
}

input {
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  border-width: 1px;

  &:focus {
    border-color: orange;
    outline: none;
  }
}

button {
  border: none;
  background-color: orange;
  color: white;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: gold;
  }
}

select {
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

div.generate-jwt-btn {
  padding: 1em 0;
}

div.container {
  padding-left: 2em;
  padding-top: 1em;
}

div.claims-wrapper {
  padding: 1em 0;

  div {
    padding-bottom: 1em;
  }
}

div.secret-wrapper {
  div {
    padding: 1em 0;
  }
}
</style>
