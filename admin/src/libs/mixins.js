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
            data.translation = this.getFormTranslationData();
            return data;
        },

        getFormTranslationData () {
            let data = {};
            if (this.formEnglist) {
                Object.entries(this.formEnglist).forEach(item => {
                    data[item[0] + '_english'] = item[1];
                });
            }
            if (this.formCustom) {
                Object.entries(this.formCustom).forEach(item => {
                    data[item[0] + '_chinese'] = item[1];
                });
            }
            return data;
        }
    }
};
