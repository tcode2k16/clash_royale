// var cards = ["Knight","Bomber","Archers","Spear_Goblins","Goblins","Skeletons","Minions","Barbarians","Minion_Horde","Fire_Spirits","Royal_Giant","Ice_Spirit","Giant","Musketeer","Mini_P.E.K.K.A.","Valkyrie","Hog_Rider","Wizard","Mega_Minion","Three_Musketeers","Ice_Golem","Baby_Dragon","Prince","Witch","Skeleton_Army","Giant_Skeleton","Balloon","P.E.K.K.A.","Golem","Dark_Prince","Guards","Bowler","Inferno_Dragon","Lava_Hound","Ice_Wizard","Sparky","Miner","Princess","Lumberjack"];
// var cards = ["Knight","Bomber","Archers","Spear_Goblins","Goblins"];
// var cards = ["Witch"];
var obj = {"Troop":["Knight","Bomber","Archers","Spear_Goblins","Goblins","Skeletons","Minions","Barbarians","Minion_Horde","Fire_Spirits","Royal_Giant","Ice_Spirit","Giant","Musketeer","Mini_P.E.K.K.A.","Valkyrie","Hog_Rider","Wizard","Mega_Minion","Three_Musketeers","Ice_Golem","Baby_Dragon","Prince","Witch","Skeleton_Army","Giant_Skeleton","Balloon","P.E.K.K.A.","Golem","Dark_Prince","Guards","Bowler","Inferno_Dragon","Lava_Hound","Ice_Wizard","Sparky","Miner","Princess","Lumberjack"],"Spell":["Arrows","Zap","Fireball","Rocket","Lightning","Goblin_Barrel","Rage","Freeze","Mirror","Poison","Graveyard","The_Log"],"Building":["Cannon","Tesla","Mortar","Goblin_Hut","Bomb_Tower","Tombstone","Barbarian_Hut","Inferno_Tower","Furnace","Elixir_Collector","X-Bow"]};
var cards = [...obj["Troop"],...obj["Spell"],...obj["Building"]];
var output = {};
var base_url = "http://clashroyale.wikia.com/wiki/";

var delay = 4000;





document.write('<iframe src="" id="frame" width="100%" height="700"></iframe>');








function get_page(count,output,callback) {

    console.log("done: "+cards[count]);
    var frame = document.getElementById('frame');
    var innerDoc = frame.contentDocument || frame.contentWindow.document;


    //stats

    //t1
    var table1 = innerDoc.getElementById('unit-attributes-table');
    var raw_list = [];
    for (var i=0;i<table1.rows.length;i++) {
        raw_list.push([]);
        for (var j=0;j<table1.rows[i].cells.length;j++)
            raw_list[i].push(table1.rows[i].cells[j].innerHTML);
    }

    raw_list[0].map(function(str,index) {
        var raw = str.match(/.{0,}?<br>/g)[0];
        raw_list[0][index] = raw.substring(0,raw.length-4);
    });


    output[cards[count]] = zipobj2d(raw_list);

    output[cards[count]]["Type"].replace(/>(.{0,}?)</g,(_,item) => {
        output[cards[count]]["Type"] = item;
    });

    var rarity = output[cards[count]]["Rarity"].match(/d;\">.{0,}?<\//g)[0];
    output[cards[count]]["Rarity"] = rarity.substring(4,rarity.length-2);
    if (output[cards[count]]["Target"]) output[cards[count]]["Target"] = output[cards[count]]["Target"].split(" &amp; ");

    //t2
    var table2 = innerDoc.getElementById('unit-statistics-table');
    var raw_data = {};
    for (var i=1;i<table2.rows.length;i++) {
        raw_data[i] = {};
        for (var j=1;j<table2.rows[i].cells.length;j++) {
            var title = table2.rows[0].cells[j].innerHTML.match(/.{0,}?<br>/g)[0];
            title = title.substring(0,title.length-4);
            title.replace(/<a.{0,}?>(.{0,}?)<\/a>/,function (str, p1, offset, s) {
                title = p1+title.substring(str.length);
            });

            var content = table2.rows[i].cells[j].innerHTML;
            raw_data[i][title] = content[content.length-1]=="\n" ? content.substring(0,content.length-1) : content;
        }
    }
    output[cards[count]]["Stats"] = raw_data;




    if (count < cards.length-1) {

        frame.src = base_url + cards[count+1];
        setTimeout(get_page.bind(null,count+1,output,callback),delay);

    }else {
        callback(output);
    }
}


function zipobj2d(list) {
    var out = {};
    for (var each=0;each<list[0].length;each++){
        out[list[0][each]]=list[1][each];
    }
    return out;
}





document.getElementById('frame').src = base_url + cards[0];
setTimeout(get_page.bind(null,0,{},function(list) {
    console.log(list);
    console.log(JSON.stringify(list));
}),delay);
