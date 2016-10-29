// http://clashroyale.wikia.com/wiki/Cards
var table = document.getElementsByClassName('navbox')[1];

var obj = {};

for (var i =2; i<=5; i++) {
    obj[i] = table.rows[i].cells[ i==2 ? 2 : 1].innerHTML;
}

var url_list = [];
for (var each in obj) {

    obj[each] = obj[each].match(/href=\".{0,}?\"/g).map(function(str) {
        return str.substring(12,str.length-1);
    });
    url_list = url_list.concat(obj[each]);
}


console.log(url_list);
console.log(JSON.stringify(url_list));
