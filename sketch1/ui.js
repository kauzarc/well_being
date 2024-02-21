"use strict";

class Menu extends VisualComponent {
    constructor(dataset, crowd, title, x, y, w, h) {
        super(x, y, w, h);
        this.crowd = crowd;
        this.dataset = dataset;
        this.title = title;

        this.fieldNb = Object.keys(dataset.uniques).length;
        this.fieldHeight = h / this.fieldNb;

        this.fields = [];
        let i = 1;
        for (const [key, value] of Object.entries(dataset.uniques)) {
            if (key == "B10") {
                continue;
            }
            this.fields.push(new MenuField(
                key, value,
                x, y + i * this.fieldHeight, w, this.fieldHeight
            ));

            ++i;
        }
    }

    draw() {
        fill(whiteTheme ? 255 : 0);
        stroke(whiteTheme ? 0 : 255);

        rect(this.x, this.y, this.w, this.h);

        fill(whiteTheme ? 0 : 255);
        textSize(this.fieldHeight / 2);
        text(this.title, this.x, this.y + this.fieldHeight / 2);
        line(this.x, this.y + this.fieldHeight, this.x + this.w, this.y + this.fieldHeight);

        for (const field of this.fields) {
            field.draw();
        }
    }

    mouseClicked() {
        const filters = {};

        for (const field of this.fields) {
            if (field.mouseOn()) {
                field.toggleOption();
            }


            if (field.currentOption() != "Null") {
                filters[field.key] = field.currentOption();
            }
        }

        this.crowd.filter(filters);
    }
}

class MenuField extends VisualComponent {
    constructor(key, options, x, y, w, h) {
        super(x, y, w, h);

        this.key = key;
        this.options = Array.from(options).concat(["Null"]);
        this.index = this.options.length - 1;
    }

    draw() {
        fill(whiteTheme ? 0 : 255);
        textSize(this.h / 2);
        text(" " + columnPrettyName[this.key] + (this.options[this.index] == "Null" ? "" : " : " + this.options[this.index]), this.x, this.y + this.h / 2);
    }

    toggleOption() {
        this.index = (this.index + 1) % this.options.length;
    }

    currentOption() {
        return this.options[this.index];
    }
}

class ColorScale extends VisualComponent {
    constructor(crowd, x, y, w, h) {
        super(x, y, w, h);
        this.crowd = crowd;
    }

    draw() {
        const offset = 25;

        fill(whiteTheme ? 0 : 255);
        textSize(this.w / 10);
        text("0", this.x, this.y + this.h / 3);
        text("10", 50 + this.x + this.w - this.w / 10, this.y + this.h / 3);

        text("Well Being", this.x + 3 * this.w / 10, this.y + this.h / 3);

        stroke(whiteTheme ? 0 : 255);
        for (let i = 0; i <= 9; ++i) {
            fill(Person.wellBeingColor(i));
            rect(
                offset + this.x + i * this.w / 10,
                this.y + this.h / 2,
                this.w / 10,
                this.h / 2
            );
        }


        const averageWellBeing = this.crowd.averageWellBeing();
        const arrowBaseX = offset + this.x + averageWellBeing * this.w / 10;
        const arrowBaseY = this.y + this.h / 2;

        fill(whiteTheme ? 255 : 0);
        stroke(whiteTheme ? 0 : 255);
        beginShape();
        vertex(arrowBaseX, arrowBaseY);
        vertex(arrowBaseX + 10, arrowBaseY + 25);
        vertex(arrowBaseX, arrowBaseY + 50);
        vertex(arrowBaseX - 10, arrowBaseY + 25);
        endShape(CLOSE);
    }
}

class InfoPerson {
    constructor(dataset, crowd, w, h) {
        this.crowd = crowd;
        this.dataset = dataset;

        this.w = w;
        this.h = h;

        this.fieldNb = Object.keys(this.dataset.uniques).length - 1;
        this.fieldHeight = this.h / this.fieldNb;
    }

    draw() {
        const person = this.crowd.mouseOnPerson();
        if (!person) { return; }

        const x = mouseX + this.w / 10;
        const y = mouseY + this.h / 10;

        fill(whiteTheme ? 255 : 0);
        stroke(whiteTheme ? 0 : 255);
        rect(x, y, this.w, this.h);

        fill(whiteTheme ? 0 : 255);
        textSize(this.fieldHeight / 2);

        let i = 0;
        for (const columnName of this.dataset.columns) {
            if (columnName != "B10") {
                fill(whiteTheme ? 0 : 255);
                
                textSize(this.fieldHeight / 2);
                text(" " + person.data.get(columnName), x, y + i * this.fieldHeight + this.fieldHeight / 2);
            }
            ++i;
        }
    }
}