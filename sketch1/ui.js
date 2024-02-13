"use strict";

class Menu extends VisualComponent {
    constructor(dataset, crowd, x, y, w, h) {
        super(x, y, w, h);
        this.crowd = crowd;

        const fieldNb = Object.keys(dataset.uniques).length;
        const fieldHeight = h / fieldNb;

        this.fields = [];
        let i = 0;
        for (const [key, value] of Object.entries(dataset.uniques)) {
            this.fields.push(new MenuField(
                key, value,
                x, y + i * fieldHeight, w, fieldHeight
            ));

            ++i;
        }
    }

    draw() {
        fill(0);
        stroke(255);

        rect(this.x, this.y, this.w, this.h);

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
        fill(255);
        text(columnPrettyName[this.key] + " : " + this.options[this.index], this.x, this.y + this.h);
    }

    toggleOption() {
        this.index = (this.index + 1) % this.options.length;
    }

    currentOption() {
        return this.options[this.index];
    }
}

class ColorScale extends VisualComponent {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    draw() {
        fill(255);
        textSize(this.w / 11);
        text("0", this.x, this.y + this.h / 3);
        text("10", this.x + this.w - this.w / 11, this.y + this.h / 3);

        text("Well Being", this.x + 3 * this.w / 11, this.y + this.h / 3);

        stroke(255);
        for (let i = 0; i <= 11; ++i) {
            fill(Person.wellBeingColor(i));
            rect(
                this.x + i * this.w / 11,
                this.y + this.h / 2,
                this.w / 11,
                this.h / 2
            );
        }
    }
}