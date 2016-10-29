//http://jsonviewer.stack.hu/

'use strict';

function objMap(obj,func) {
  Object.keys(obj).map(func);
}


const normal_list = ["Deploy Time","Hit Speed","Rage Duration","Spawn Speed","Freeze Duration","Cost"];
const need_change_list = {
  "Count": (str) => {
    return parseInt(str.substring(1));
  },
  "Rage Effect": (str) => {
    return parseInt(str.substring(1));
  },
  "Range": (str) => {
    return (str === "Melee") ? 0 : parseFloat(str);
  },
  "Speed": (str) => {
    //very fast: 1.0
    //fast: 0.75
    //Medium: 0.5
    //slow: 0.25
    if (str === "Very Fast") return 1.0;
    else if (str === "Fast") return 0.75;
    else if (str === "Medium") return 0.5;
    else if (str === "Slow") return 0.25;

  },
  "Transport": (str) => {
    //air [1,0]
    //ground [0,1]
    if (str==="Ground") return [0,1];
    if (str==="Air") return [1,0];
  },
  "Target": (list) => {
    //air       [1, _, _]
    //ground    [_, 1, _]
    //building  [_, _, 1]
    let arr = [0,0,0];
    let match = {
      "Air": 0,
      "Ground": 1,
      "Buildings":2
    };
    for (let i=0; i < list.length; i++) {
      arr[match[list[i]]] = 1;
    }
    return arr;
  }
}
const jsonfile = require('jsonfile');
let list = jsonfile.readFileSync('./data/card_stats_int_v.json');




objMap(list,(key) => {
  objMap(list[key]["Stats"],(level) => {
    objMap(list[key]["Stats"][level],(item) => {
      list[key]["Stats"][level][item] = parseInt(list[key]["Stats"][level][item]);
    });
  });
});

objMap(list,(card) => {
  objMap(list[card],(key) => {
    if (normal_list.indexOf(key)!=-1) list[card][key] = parseFloat(list[card][key]);
    if (Object.keys(need_change_list).indexOf(key)!=-1) list[card][key] = need_change_list[key](list[card][key]);
  });
});

jsonfile.writeFile('./data/card_stats_final.json', list, function (err) {
  console.error(err)
});

// console.log(list["Sparky"]);
