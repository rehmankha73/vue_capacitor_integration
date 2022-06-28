<template>
  <v-container>
        <v-card style="padding: 20px">
          <h1>Geolocation</h1>
          <p>Your location is:</p>
          <p>
            Latitude: <span v-if="loc">{{ loc.coords.latitude }}</span>
          </p>
          <p>
            Longitude: <span v-if="loc">{{ loc.coords.longitude }}</span>
          </p>
          <v-btn style="margin: 10px 10px 0px 0px; background-color: blue; color: white" elevation="2" @click="getCurrentPosition">Get Current Location</v-btn>
          <v-btn style="margin: 10px 10px 0px 10px; background-color: blue; color: white" elevation="2" @click="scheduleNotification">Local Notifications</v-btn>
        </v-card>

    <img id="pic" alt="" src="">

    <v-btn style="margin: 50px 20px 0px 10px; background-color: blue; color: white" color="primary" type="button" @click="takePicture"> Take Picture</v-btn>


    <!--    <img v-for="(image, index) in  captures" :src="image" :key="index" :alt="index" />-->
    <!--    <div id="camera">-->
    <!--      <div>-->
    <!--        <video id="video" ref="video" autoplay width="50%" height="30%"/>-->
    <!--      </div>-->
    <!--      <div>-->
    <!--        <button id="snap" v-on:click="capture()">Snap Photo</button>-->
    <!--      </div>-->
    <!--      <canvas id="canvas" ref="canvas" height="100%" width="100%"/>-->
    <!--    </div>-->
  </v-container>
</template>

<script>
import {Geolocation} from "@capacitor/geolocation";
import {LocalNotifications} from "@capacitor/local-notifications";
import {Camera, CameraResultType} from '@capacitor/camera';
import { Plugins } from "@capacitor/core";

export default {
  name: 'HomeView',
  data: function () {
    return {
      loc: null,
      video: {},
      canvas: {},
      captures: []
    };
  },
  mounted() {
    console.log(Plugins)
    // this.video = this.$refs.video;
    // if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    //     this.video.srcObject = stream;
    //     this.video.play();
    //     this.video.onplay = function () {
    //     };
    //     this.video.play();
    //   });
    // }
  },
  methods: {
    capture() {
      this.canvas = this.$refs.canvas;
      var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
      console.log(context)
      this.captures.push(this.canvas.toDataURL("image/webp"));
    },
    async takePicture() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });

      document.getElementById('pic').src = image.webPath;
    },
    getCurrentPosition: function () {
      console.log('getCurrentPosition button is clicked!')
      Geolocation.getCurrentPosition().then(
          loc => (this.loc = loc),
          e => console.log("there was an error", e)
      );
    },
    scheduleNotification: async function () {
      console.log('scheduleNotification button clicked!')

      const canSend = await LocalNotifications.requestPermissions();
      if (canSend) {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: "This is a test purpose!",
              body: "Widgets are 10% off. Act fast!",
              id: 1,
              schedule: {at: new Date(Date.now() + 1000 * 5)},
              actionTypeId: "",
              extra: null
            }
          ]
        });
      }
    },
  }
}
</script>


<style>
#camera {
  text-align: center;
  color: #2c3e50;
}

#video {
  background-color: #000000;
}

#canvas {
  display: none;
}

li {
  display: inline;
  padding: 5px;
}
</style>