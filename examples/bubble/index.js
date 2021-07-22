// var data = [0,3,5,2,0,8,1,6];

var data = [];
for (let i = 0; i < 12; i++) {

    data.push(~~(Math.random() * 51))

};

var a = illustrateArray("#_push",data,{fontsize:23,speed:250});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let v = 0;
const speed = 300;
// let g = true;

async function compareValues() {

    let v1 = data[v];
    let v2 = data[v + 1];

    await sleep(speed);

    let z1 = a.highlight(v);
    let z2 = a.highlight(v+1).color("green");

    await sleep(speed);

    if (v1 > v2) {

        // g = false;

        a.splice(v, v2);
        a.splice(v + 1, v1);

        z1.goto(v+1);
        z2.goto(v);

        await sleep(speed);

    }

    z1.destroy();
    z2.destroy();

    if (v < data.length - 2) {

        v++;

    } else {

        // if (!g)

        v = 0;

    }

    await sleep(speed);
    compareValues();

}

compareValues();