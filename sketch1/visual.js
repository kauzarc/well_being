"use strict";

class VisualComponent {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        fill(255);
        stroke(255);
        rect(this.x, this.y, this.w, this.h);
    }

    mouseOn() {
        return mouseX > this.x &&
            mouseX < this.x + this.w &&
            mouseY > this.y &&
            mouseY < this.y + this.h;
    }
}

class Person extends VisualComponent {
    constructor(data, x, y, w, h) {
        super(x, y, w, h);
        this.data = data;
        this.show = true;
    }

    draw() {

        if (this.mouseOn()) {
            stroke(255);
            console.log(this.data.getString("ppage"), this.data.getString("ppgender"));
        } else {
            stroke(0);
        }

        const color = Person.wellBeingColor(this.data.getNum("B10"),this.show);
        fill(color);

        const centerX = this.x + this.w / 2;
        const centerY = this.y + this.h / 2;
        const headRadius = this.w / 4;
        const bodyHeight = this.h - headRadius * 2;

        ellipse(centerX, centerY - bodyHeight / 2, headRadius * 2, headRadius * 2);
        rect(this.x, centerY - bodyHeight / 2 + headRadius, this.w, bodyHeight, headRadius);
    }

    static wellBeingColor(wellBeing,show) {
        if (!show) {
            // make it less visible
            return color(255, 255, 255, 0.25 * 255);
        } else {
            return color(
                255 - (wellBeing * 255 / 10),
                (wellBeing * 255 / 10),
                0,
                0.75 * 255
            );
        }
    }

    filter(filters) {
        let changed = false;
        for (const [col,val] of Object.entries(filters)) {
            for (const [col2,val2] of Object.entries(this.data.obj)) {
                if (col == col2 && val != val2) {
                    this.show = false;
                    changed = true;
                }
            }
        }
        if (!changed) {
            this.show = true;
        }
    }
}

class Crowd extends VisualComponent {
    constructor(dataset, x, y, w, h) {
        super(x, y, w, h);

        const rowNb = 23;
        const columnNb = 31;

        const columnsWidth = this.w / columnNb;
        const rowsHeight = this.h / rowNb;

        this.persons = [];
        for (let j = 0; j < columnNb; ++j) {
            for (let i = 0; (i < rowNb) && (i + j * rowNb < dataset.length); ++i) {
                this.persons.push(new Person(
                    dataset.getRow(i + j * rowNb),
                    this.x + columnsWidth * j + 1 / 8 * columnsWidth,
                    this.y + rowsHeight * i + 1 / 8 * rowsHeight,
                    3 / 4 * columnsWidth,
                    3 / 4 * rowsHeight
                ));
            }
        }
    }

    draw() {
        for (const person of this.persons) {
            person.draw();
        }
    }

    static i2ij(i) {
        return { i: i % rowNb, j: Math.floor(i / rowNb) };
    }

    filter(filters) {
        // call the filter function of each person
        for (const person of this.persons) {
            person.filter(filters);
        }
    }
}