"use strict";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 500;

const data = new Dataset();
function preload() {
    data.load();
}

let crowd = null;
let colorScale = null;
let menu = null;
function setup() {
    data.prepare();
    data.printShape();

    crowd = new Crowd(data, 0, 0, 4 * CANVAS_WIDTH / 5, CANVAS_HEIGHT);
    colorScale = new ColorScale(4 * CANVAS_WIDTH / 5, 4 * CANVAS_HEIGHT / 5, CANVAS_WIDTH / 5, CANVAS_HEIGHT / 5);
    menu = new Menu(data, 4 * CANVAS_WIDTH / 5, 0, CANVAS_WIDTH / 5, 4 * CANVAS_HEIGHT / 5);

    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
    background(0);

    crowd.draw();
    colorScale.draw();
    menu.draw();
}

function mouseClicked() {
    for (const menuField of menu.fields) {
        if (menuField.mouseOn()) {
            console.log(menuField.title);
        }
    }
}