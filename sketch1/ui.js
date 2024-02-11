"use strict";

class Menu extends VisualComponent {
    constructor(dataset, x, y, w, h) {
        super(x, y, w, h);

        const fieldNb = Object.keys(dataset.uniques).length;
        const fieldHeight = h / fieldNb;

        this.fields = [];
        let i = 0;
        for (const [key, value] of Object.entries(dataset.uniques)) {
            this.fields.push(new MenuField(
                columnPrettyName[key], value,
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
}

class MenuField extends VisualComponent {
    constructor(title, options, x, y, w, h) {
        super(x, y, w, h);

        this.title = title;
        this.options = options;
    }

    draw() {
        fill(255);
        text(this.title, this.x, this.y + this.h);
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