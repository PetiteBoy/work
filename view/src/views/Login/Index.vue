<template>
  <div>
    <button @click="handleLogin">登录</button>
    <video id="video1"></video>
    <video id="video1"></video>
  </div>
</template>
<script>
export default {
  mounted() {
    this.sockets.subscribe("cb", mediaStream => {
      console.log(mediaStream)
      // var video = document.querySelector("#video2");
      // video.srcObject = mediaStream;
      // video.play();
    });
  },
  methods: {
    handleLogin() {
      let _this = this
      let opt = {
        audio: true,
        video: {
          width: 1280,
          height: 720
        }
      };
      navigator.mediaDevices
        .getUserMedia(opt)
        .then(function(mediaStream) {
          console.log(mediaStream)
           setTimeout(() => {
             _this.$socket.emit("click", mediaStream);
           }, 1000);
          var video = document.querySelector("#video1");
          video.srcObject = mediaStream;
          video.play();
          
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
