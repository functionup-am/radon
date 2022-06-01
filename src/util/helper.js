const printDate = function (){
    console.log('the current date is 01/06/2022')
}
const printMonth = function (){
    console.log('the current month is June')
}
const getBatchInfo = function() {
    console.log('Radon, W3D1, the topic for today is Nodejs module system')
}

module.exports.printDate = printDate
module.exports.printMonth = printMonth
module.exports.getBatchInfo = getBatchInfo