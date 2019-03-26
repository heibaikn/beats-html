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
        }
    }
};
