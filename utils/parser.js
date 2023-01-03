function parseError(error) {


    const result = {
        messages: [],
        fields: {}
    };

    if (error.name == 'ValidationError'){
        //result.fields = Object.fromEntries(Object.keys(error.errors).map(k => [k, k]));
        //imperative solution below:
        for(let [field, e] of Object.entries(error.errors)) {
            result.messages.push(e.message);
            result.fields[field] = field;
        }
    }else if(Array.isArray(error)){
        result.messages = error.map(e => e.msg);
        result.fields = Object.fromEntries(error.map(e => [e.param, e.param]));
    }else{
        result.messages = error.message.split('\n');
    }
    return result;
}
module.exports = {
    parseError
};