"use strict";
const request = require('request');
const jsonfile = require('jsonfile');

const base_url = "http://www.clashroyaleguides.com/category/characters/page/";
const rule = /http\:\/\/www\.clashroyaleguides\.com\/characters\/.{0,}?\//g
const max = 4;


function remove_dup(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
}

function fetch_page(rule,count,base_url,callback,list) {
  list = list || [];
  request(base_url+count, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let new_list = list.concat(body.match(rule).map(function(item){
        return item.substring(44,item.length-1);
      }))
      console.log("done: " + count);
      count++;
      if (count <= max)
        fetch_page(rule,count,base_url,callback,new_list);
      else {
        callback(remove_dup(new_list));
      }
    }
  });
}


fetch_page(rule,1,base_url,function (list) {
  console.log(list);
  console.log(list.length);

  jsonfile.writeFile('./data/card_names.txt', list, function (err) {
    console.error(err)
  })

});
