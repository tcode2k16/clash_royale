"use strict";
const request = require('request');
const jsonfile = require('jsonfile');
const _ = require('lodash');

const base_url = "http://www.clashroyaleguides.com/characters/";
const rule = //g;

let name_list = jsonfile.readFileSync('./data/card_names.txt');

function fetch_card(list,callback,output) {
  output = output || [];
  let item  = list.shift()
  request(base_url+item,function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let new_obj = {};
      new_obj[item] = {
        
      }
      if (list.length>0) {
        fetch_card(list,callback,new_obj);
      }else {
        callback(output);
      }
    }
  });
}
