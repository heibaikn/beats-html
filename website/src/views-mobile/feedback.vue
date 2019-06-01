<template>
  <section class="message-body">
    <message :mobile="true" ref="message"/>
  </section>
</template>

<script>
import message from '@shared/components/message'
import mixins from '@shared/mixins/mobile'

export default {  
  data(){
    return {
      
    }
  },
  mixins: [mixins],
  components: {
    message
  },
  mounted() {
    this.$refs.message.show();
  },
  methods: {

  },
}
</script>
