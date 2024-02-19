"use strict";

const CANVAS_WIDTH = 1500;
const CANVAS_HEIGHT = 750;

const data = new Dataset();
function preload() {
    data.load();
}

let crowd = null;
let colorScale = null;
let menu = null;
let menuPerson = null;

function setup() {
    data.prepare();
    data.printShape();

    crowd = new Crowd(data, 0, 0, 2 * CANVAS_WIDTH / 5, CANVAS_HEIGHT);
    colorScale = new ColorScale(2 * CANVAS_WIDTH / 5, 50 + 4 * CANVAS_HEIGHT / 5 , 3 *CANVAS_WIDTH / 5 - 75, CANVAS_HEIGHT / 5 - 50);
    menu = new Menu(data, crowd, " Filter", 2 * CANVAS_WIDTH / 5, 5, 2 * CANVAS_WIDTH / 5, 4 * CANVAS_HEIGHT / 5);
    menuPerson = new MenuPerson(data, crowd, " Inspect", 4 * CANVAS_WIDTH / 5, 5, CANVAS_WIDTH / 5, 4 * CANVAS_HEIGHT / 5);

    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
    background(0);

    crowd.draw();
    colorScale.draw();
    menu.draw();
    menuPerson.draw();
}

function mouseClicked() {
    menu.mouseClicked();
}