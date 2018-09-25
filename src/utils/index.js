export const getUrlVars = () => {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
};

// callnum pattern should be /?callnum=067-0423104-001-008-EFMG617STT-001-002

//var callnum = getUrlVars()['callnum'] !== undefined && getUrlVars()['callnum'] !== '' ? getUrlVars()['callnum'] : null;