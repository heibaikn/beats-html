

export default {
  methods: {
    jumpProductDetail(id = ''){
      this.$router.push({ path: '/detail', query: { id }})
    }
  } 
};
