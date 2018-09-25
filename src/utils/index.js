export const getUrlVars = () => {
    //get App |> state |> formHash
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
};

// callnum pattern should be /?callnum=067-0423104-001-008-EFMG617STT-001-002

//var callnum = getUrlVars()['callnum'] !== undefined && getUrlVars()['callnum'] !== '' ? getUrlVars()['callnum'] : null;

export const transformArrayToObject = (arr) => {
    let obj = {};
    for(let i = 0; i < arr.length; ++i){
        if(arr[i] !== undefined){
            obj[i] = arr[i];
        }
    }
  
    return obj;
    
}

export const transformAnswerForDataTransport = (answers) => {
    return answers.map(answer => {
        return {
                key : answer.hashKey,
                type : answer.fieldType,
                value : answer.inputState
                }
      })
  }

  export const flattenObject = (object, separator = '') => {

    const isValidObject = value => {
      if (!value) {
        return false
      }
  
      const isArray  = Array.isArray(value);
      const isObject = Object.prototype.toString.call(value) === '[object Object]';
      const hasKeys  = !!Object.keys(value).length;
  
      return !isArray && isObject && hasKeys
    }

    const walker = (child, path = []) => {

      return Object.assign({}, ...Object.keys(child).map(key => {
        
        if(isValidObject(child[key])){
          return walker(child[key], path.concat([key]).reverse())
        }else{
          let upPathArr = [];
          let upPath = (Number(path[0]) +1);
          upPath = upPathArr.concat(upPath);

          return { [upPath.concat([key]).reverse().join(separator)] : child[key] }
        }
      }
      ))};
  
    return Object.assign({}, walker(object))
  };