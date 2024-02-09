"use strict";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 500;

let table;
function preload() {
    table = loadTable("data/well_being.csv", "csv", "header");
}

let sortedIndexes;
function sortTableByWellBeing() {
    let wellBeingPlusIndex = table.getColumn(table.columns.indexOf("B10")).map((value, index) => {
        return { value, index };
    });

    wellBeingPlusIndex.sort((a, b) => a.value - b.value);

    sortedIndexes = wellBeingPlusIndex.map((obj) => obj.index);
}

const tableUniques = {};
function computeUniques() {
    for (const columnName of table.columns) {
        tableUniques[columnName] = new Set(table.getColumn(columnName));
    }
}

function setup() {
    console.log(`Data shape : ${table.rows.length} rows, ${table.columns.length} columns`);
    sortTableByWellBeing();
    computeUniques();
    console.log(tableUniques);
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function people(x, y, w, h) {
    const centerX = x + w / 2;
    const centerY = y + h / 2;
    const headRadius = w / 4;
    const bodyHeight = h - headRadius * 2;

    ellipse(centerX, centerY - bodyHeight / 2, headRadius * 2, headRadius * 2);
    rect(x, centerY - bodyHeight / 2 + headRadius, w, bodyHeight, headRadius);
}

function wellBeingColor(wellBeing) {
    return color(
        255 - (wellBeing * 255 / 10),
        (wellBeing * 255 / 10),
        0,
        0.75 * 255
    );
}

function crowd(x, y, w, h) {
    const rowNb = 23;
    const columnNb = 31;

    const columnsWidth = w / columnNb;
    const rowsHeight = h / rowNb;

    const i2ij = (i) => { return { i: i % rowNb, j: Math.floor(i / rowNb) } };

    for (let i = 0; i < table.rows.length; ++i) {
        const ij = i2ij(i);
        const tableIndex = sortedIndexes[i];

        const wellBeing = +table.get(tableIndex, table.columns.indexOf("B10"));

        const peopleColor = wellBeingColor(wellBeing);

        fill(peopleColor);
        stroke(peopleColor);

        people(
            x + columnsWidth * ij.j + 1 / 8 * columnsWidth,
            y + rowsHeight * ij.i + 1 / 8 * rowsHeight,
            3 / 4 * columnsWidth,
            3 / 4 * rowsHeight
        );
    }
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

function colorScale(x, y, w, h) {
    fill(255);
    textSize(w / 11);
    text("0", x, y + h / 3);
    text("10", x + w - w / 11, y + h / 3);

    text("Well Being", x + 3 * w / 11, y + h / 3);

    for (let i = 0; i <= 11; ++i) {
        fill(wellBeingColor(i));
        rect(x + i * w / 11, y + h / 2, w / 11, h / 2);
    }
}

function draw() {
    background(0);

    crowd(0, 0, 4 * CANVAS_WIDTH / 5, CANVAS_HEIGHT);
    menu(4 * CANVAS_WIDTH / 5, 0, CANVAS_WIDTH / 5, 4 * CANVAS_HEIGHT / 5);
    colorScale(4 * CANVAS_WIDTH / 5, 4 * CANVAS_HEIGHT / 5, CANVAS_WIDTH / 5, CANVAS_HEIGHT / 5);
}