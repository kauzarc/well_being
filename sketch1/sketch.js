"use strict";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 500;

const data = new Dataset();
function preload() {
    data.load();
}

let crowd = null;
function setup() {
    data.printShape();
    data.prepare();

    crowd = new Crowd(data, 0, 0, 4 * CANVAS_WIDTH / 5, CANVAS_HEIGHT);

    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}


function menu(x, y, w, h) {
    const color = 255;

    fill(0);
    stroke(color);

    rect(x, y, w, h);

    const titleTextSize = h / 40;

    fill(color);
    textSize(titleTextSize);

    text("Gender", x, y + titleTextSize);
    text("Male - Female", x, y + 2 * titleTextSize);

    text("Ethnicity", x, y + 4 * titleTextSize);
    text("White - Black - Hispanic - Other", x, y + 5 * titleTextSize);

    text("...", x, y + 7 * titleTextSize);
}

// function colorScale(x, y, w, h) {
//     fill(255);
//     textSize(w / 11);
//     text("0", x, y + h / 3);
//     text("10", x + w - w / 11, y + h / 3);

//     text("Well Being", x + 3 * w / 11, y + h / 3);

//     for (let i = 0; i <= 11; ++i) {
//         fill(wellBeingColor(i));
//         rect(x + i * w / 11, y + h / 2, w / 11, h / 2);
//     }
// }

function draw() {
    background(0);

    crowd.draw();


    menu(4 * CANVAS_WIDTH / 5, 0, CANVAS_WIDTH / 5, 4 * CANVAS_HEIGHT / 5);
    // colorScale(4 * CANVAS_WIDTH / 5, 4 * CANVAS_HEIGHT / 5, CANVAS_WIDTH / 5, CANVAS_HEIGHT / 5);
}