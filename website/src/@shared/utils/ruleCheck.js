
/**
 * 
 * @param {Object} rules 规则
 * @param {Object} checkData 需要校验数据
 */

const languageStorage = localStorage.getItem('language') || 'chinese';
const languageIndex = { chinese: 0, english: 1, japanese: 2, french: 3, german: 4 }


function getLanguageMsg(messageString = ''){
  let arr = messageString.split('|');
  let msg = ''
  try {
    msg = arr[languageIndex[languageStorage]].trim()
  }
  catch (e) {
    msg = arr[0].trim();
  }
  return msg;
}

export default function(rules, checkData){
  var result = {};
  var isCheck = false;
  var msg = '';

  Object.keys(rules).some((key)=>{
    let val = checkData[key].trim();
    let rule = rules[key];
    if ( rule ){
      // if (rule.reg && rule.reg.test(val)) {

      // }
      // else 
      let msg = '';

      if (rule.required && val == ''){
        msg = rule.required;
      }
      else if (rule.reg && !rule.reg.test(val) && !msg) {
        msg = rule.errorMsg;
      }
      else if (rule.min && val && val.length < rule.min && !msg){
        msg = rule.errorMsg;
      }
      else if (typeof rule.check == 'function' && !msg) {
        let check = rule.check.call(rules);
        if (check !== true){
          msg = getLanguageMsg(check);
        }
      }

      if (msg){
        result.key = key;
        result.msg = getLanguageMsg(msg)
        return true;
      }
      
      // if ((rule.required && val != '') || (rule.min && val && val.length >= rule.min) ){
        
      // }
      // else if(typeof rule.check == 'function'){
      //   let check = rule.check.call(rules);
      //   if (check !== true){
      //     result.msg = getLanguageMsg(check);
      //     result.key = key;
      //   }
      // }
      // else{
      //   let msg = val == '' ? rule.required : rule.errorMsg;
      //   result.msg = getLanguageMsg(msg)
      //   result.key = key;
      //   return true;
      // }

    }
  })

  return result.key ? result : true;
}