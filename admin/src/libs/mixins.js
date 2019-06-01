import Cookies from 'js-cookie';

function dateFtt(fmt, date) { //author: meizz   
    var o = {
        "M+": date.getMonth() + 1,                 //月份   
        "d+": date.getDate(),                    //日   
        "h+": date.getHours(),                   //小时   
        "m+": date.getMinutes(),                 //分   
        "s+": date.getSeconds(),                 //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
export default {
    computed: {
        checkRemoveIdentity() {
            var identity = Cookies.get('identity');
            if (identity == 3) return false;
            return true;
        },
        checkAdminIdentity() {
            var identity = Cookies.get('identity');
            if (identity == 1) return true;
            return false;
        }
    },
    created() {
        this.setRuleValidate(this.filterKey);
    },
    methods: {
        formatDateFun(str) {
            return dateFtt('yyyy-MM-dd hh:mm', new Date(str))
        },
        setRuleValidate(filterKey) {
            if (!filterKey) filterKey = [];
            for (let i in this.formCustom) {
                if (filterKey.indexOf(i) === -1) {
                    this.ruleValidate[i] = [{ required: true, message: '不能为空' }];
                }
            }
        },
        getFormData() {
            let data = {};
            data = Object.assign({}, this.formCustom);
            // data.translation = this.getFormTranslationData();
            return data;
        },

        getFormTranslationData() {
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

        checkIdentity() {
            var identity = Cookies.get('identity');
            return identity;
        }

    }
};
