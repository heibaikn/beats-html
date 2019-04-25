export default {
    created () {
        this.setRuleValidate(this.filterKey);
    },
    methods: {
        setRuleValidate (filterKey) {
            if (!filterKey) filterKey = [];
            for (let i in this.formCustom) {
                if (filterKey.indexOf(i) === -1) {
                    this.ruleValidate[i] = [{ required: true, message: '不能为空' }];
                }
            }
        },

        getFormData () {
            let data = {};
            data = Object.assign({}, this.formCustom);
            // data.translation = this.getFormTranslationData();
            return data;
        },

        getFormTranslationData () {
            let data = {};
            let exclude = ['parentId'];
            if (this.formEnglist) {
                Object.entries(this.formCustom).forEach(item => {
                    if (exclude.indexOf(item[0]) > -1) return;
                    let key = item[0];
                    let val = this.formEnglist[key] ? this.formEnglist[key] : item[1];
                    data[key + '_english'] = val;
                });
            }
            if (this.formCustom) {
                Object.entries(this.formCustom).forEach(item => {
                    if (exclude.indexOf(item[0]) > -1) return;
                    data[item[0] + '_chinese'] = item[1];
                });
            }
            return data;
        },

        getArrayGroup (arrData) {
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

            function findArrChild (pid) {
                return arr.findIndex(v => {
                    return v.id == pid;
                });
            }

            return arr;
        }
    }
};
