
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
      // 在规则里面就开始验证
      if ((rule.required && val != '') || (rule.reg && rule.reg.test(val)) || (rule.min && val && val.length >= rule.min) ){
        
      }
      else if(typeof rule.check == 'function'){
        let check = rule.check.call(rules);
        if (check !== true){
          result.msg = getLanguageMsg(check);
          result.key = key;
        }
      }
      else{
        result.msg = getLanguageMsg(rule.errorMsg || rule.required)
        result.key = key;
        return true;
      }

    }
  })

  return result.key ? result : true;
}