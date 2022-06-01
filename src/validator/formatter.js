const str = " functionUp  ";
const trim = function(){
    console.log(str.trim());
}
 
const changetoLowerCase = function(){
    console.log(str.toLowerCase());
}
const changetoUpperCase = function(){
    console.log(str.toUpperCase());
}





module.exports.trim = trim
module.exports.changetoLowerCase = changetoLowerCase
module.exports.changetoUpperCase  = changetoUpperCase
