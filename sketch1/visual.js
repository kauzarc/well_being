"use strict";

class VisualComponent {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        fill(whiteTheme ? 255 : 0);
        stroke(whiteTheme ? 0 : 255);
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
        this.selected = true;
    }

    draw() {
        if (whiteTheme) {
            stroke(this.mouseOn() ? 0 : 255);
        } else {
            stroke(this.mouseOn() ? 255 : 0);
        }

        const fadedWhite = color(255, 255, 255, 0.25 * 255);
        fill(
            this.selected ?
                Person.wellBeingColor(this.data.getNum("B10")) :
                fadedWhite
        );

        const centerX = this.x + this.w / 2;
        const centerY = this.y + this.h / 2;
        const headRadius = this.w / 4;
        const bodyHeight = this.h - headRadius * 2;

        ellipse(centerX, centerY - bodyHeight / 2, headRadius * 2, headRadius * 2);
        rect(this.x, centerY - bodyHeight / 2 + headRadius, this.w, bodyHeight, headRadius);
    }

    static wellBeingColor(wellBeing) {
        return color(
            255 - (wellBeing * 255 / 10),
            (wellBeing * 255 / 10),
            0,
            0.75 * 255
        );
    }

    filter(filters) {
        for (const [columnName, value] of Object.entries(filters)) {
            if (this.data.get(columnName) != value) {
                this.selected = false;
                return;
            }
        }

        this.selected = true;
    }
}

class Crowd extends VisualComponent {
    constructor(dataset, x, y, w, h) {
        super(x, y, w, h);

        const rowNb = 23;
        const columnNb = 31;

        const columnsWidth = this.w / columnNb;
        const rowsHeight = this.h / rowNb;

        const paddingSize = 1 / 8;

        this.persons = [];
        for (let j = 0; j < columnNb; ++j) {
            for (let i = 0; (i < rowNb) && (i + j * rowNb < dataset.length); ++i) {
                this.persons.push(new Person(
                    dataset.getRow(i + j * rowNb),
                    this.x + columnsWidth * j + paddingSize * columnsWidth,
                    this.y + rowsHeight * i + paddingSize * rowsHeight,
                    (1 - 2 * paddingSize) * columnsWidth,
                    (1 - 2 * paddingSize) * rowsHeight
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
        for (const person of this.persons) {
            person.filter(filters);
        }
    }

    mouseOnPerson() {
        for (const person of this.persons) {
            if (person.mouseOn()) {
                return person;
            }
        }
    }

    averageWellBeing() {
        let sum = 0;
        let count = 0;
        for (const person of this.persons) {
            if (person.selected) {
                sum += person.data.getNum("B10");
                ++count;
            }
        }

        return sum / count;
    }


}