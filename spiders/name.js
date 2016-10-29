// http://clashroyale.wikia.com/wiki/Cards
var table = document.getElementsByClassName('navbox')[1];

function getCards(bonds) {
    var obj = {};

    for (var i =bonds[0]; i<=bonds[1]; i++) {
        obj[i] = table.rows[i].cells[ i==bonds[0] ? 2 : 1].innerHTML;
    }

    var url_list = [];
    for (var each in obj) {

        obj[each] = obj[each].match(/href=\".{0,}?\"/g).map(function(str) {
            return str.substring(12,str.length-1);
        });
        url_list = url_list.concat(obj[each]);
    }
    return url_list;
}



var final = {
    troops: [2,5],
    spells: [6,9],
    buildings: [10,12]
};

for (var each in final)
    final[each] = getCards(final[each]);

console.log(final);
console.log(JSON.stringify(final));
