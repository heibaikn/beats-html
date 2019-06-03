

export default {
  methods: {
    jumpProductDetail(id = ''){
      this.$router.push({ path: '/detail', query: { id }})
    },
    getArrayGroup(arrData) {
      let arr = [];

      arrData.forEach((v, k) => {
        if (v.parentId == 0) {
          arr.push(v);
        }
      });

      arrData.forEach((v, k) => {
        if (v.parentId != 0) {
          let findIndex = findArrChild(v.parentId);
          if (findIndex > -1) {
            if (!arr[findIndex].children) {
              arr[findIndex].children = [];
            }
            arr[findIndex].children.push(v);
          }
        }
      });

      function findArrChild(pid) {
        return arr.findIndex(v => {
          return v.id == pid;
        });
      }

      return arr;
    },
  } 
};
