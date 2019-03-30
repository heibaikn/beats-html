<template>
  <section class="fixed-message">
    <div class="item fixed-icon" @click="showPopup">
      <i class="iconfont iconliuyan"></i>
      <p>{{$language.comments}}</p>
    </div>

    <div class="fixed-popup-bg" v-show="popupStatus" @click="hidePopup"></div>
    <div class="fixed-popup" :style="popupStyle" v-show="popupStatus">
      <span class="colse" @click="hidePopup"><i class="iconfont iconguanbi"></i></span>
      <message />
    </div>
      
  </section>
</template>


<script>
import message from '@shared/components/message'

export default {
  data(){
    return {
      popupStatus: false,
      top: 0
    }
  },
  components: {
    message
  },
  computed: {
    popupStyle(){
      return {
        top: this.top + 20 + 'px'
      }
    }
  },
  methods: {
    showPopup(){
      var top = document.documentElement.scrollTop;
      this.top = top;
      this.popupStatus = true;
    },
    hidePopup(){
      this.popupStatus = false;
    }
  },
}
</script>