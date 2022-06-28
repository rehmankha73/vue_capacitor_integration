<template>
  <ion-app>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          Vue Capacitor
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content padding>
      The world is your oyster.
      <p>If you get lost, the <a href="https://ionicframework.com/docs">docs</a> will be your guide.</p>
    </ion-content>
    <ion-button full @click="goToAbout">Go to About</ion-button>
    <ion-button @click="showDialogAlert" full>Show Alert Box</ion-button>
  </ion-app>
</template>
<script>
import { Toast } from '@capacitor/toast'

export default {
  name: 'HomeView',
  methods: {
    goToAbout() {
      this.$router.push('about')
    },

    async showDialogAlert(){
      console.log('showToast')
      await Toast.show({
        title: 'Alert'
      });
    }
  }
}
</script>