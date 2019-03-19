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
          <div class='bold teal'>Claims:</div>
          <textarea
            v-model='claims'
            @keydown.tab.prevent='handleTabPress'>
          </textarea>
          <div class='claim-error'>
            {{ claimError }}
          </div>
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
import { base64UrlEncode, base64UrlDecode } from '../helpers/base64url';
import createJwt from '../helpers/create-jwt';

export default Vue.extend({
  data() {
    return {
      claims: '{\n\n}' as string,
      claimInJson: {} as object,
      claimError: '' as string,
      secret: '' as string,
      base64UrlEncodedSecret: '' as string,
      jwt: '' as string
    };
  },
  methods: {
    handleTabPress(event: any) {
      const originalStartPosition = event.target.selectionStart;
      const startPosition = this.claims.slice(0, event.target.selectionStart);
      const endPosition = this.claims.slice(event.target.selectionStart);

      this.claims = `${startPosition}\t${endPosition}`;

      event.target.value = this.claims;
      event.target.selectionEnd = event.target.selectionStart = originalStartPosition + 1
    },
    validateSecret() {
      if(this.secret.length >= 16) return true;

      this.secret = '';
      alert('Secret has to be longer than 16 characters');
      return false;
    },
    generateBase64UrlSecret() {
      if(!this.validateSecret()) return;

      this.base64UrlEncodedSecret = base64UrlEncode(this.secret);
    },
    generateJwt() {
      if(!this.base64UrlEncodedSecret) {
        alert('Please generate base64url encoded secret!');
        return;
      }

      this.secret = base64UrlDecode(this.base64UrlEncodedSecret);

      this.jwt = createJwt('HS256', this.claimInJson, this.secret);
    }
  },
  watch: {
    claims: function(newValue) {
      try {
        this.claimError = '';

        const jsonifiedClaim = JSON.parse(newValue);

        this.claimInJson = jsonifiedClaim;
      }
      catch(ex) {
        this.claimError = ex.message;
      }
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

.bold {
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

textarea {
  resize: none;
  height: 15em;
  width: 30em;
  border-radius: 20px;
  padding: 20px;
  font-size: 1em;
  color: orange;
  background-color: #333;

  &:focus {
    outline: none;
  }
}

div.claim-error {
  padding-top: 1em;
  padding-left: 2em;
  color: red;
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
