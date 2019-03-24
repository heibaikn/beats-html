
/**
 * 
 * @param {Object} rules 规则
 * @param {Object} checkData 需要校验数据
 */
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
          result.msg = check;
          result.key = key;
        }
      }
      else{
        result.msg = rule.errorMsg || rule.required;
        result.key = key;
        return true;
      }

    }
  })

  return result.key ? result : true;
}