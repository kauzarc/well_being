"use strict";

class Menu extends VisualComponent {
    constructor(dataset, x, y, w, h) {
        super(x, y, w, h);

        this.fields = dataset.uniques;
    }

    draw() {
        fill(0);
        stroke(255);

        rect(this.x, this.y, this.w, this.h);

        const titleTextSize = this.h / 30;

        fill(255);
        textSize(titleTextSize);

        text("Gender", this.x, this.y + titleTextSize);
        text("Male - Female", this.x, this.y + 2 * titleTextSize);

        text("Ethnicity", this.x, this.y + 4 * titleTextSize);
        text("White - Black - Hispanic - Other", this.x, this.y + 5 * titleTextSize);

        text("Household Income", this.x, this.y + 7 * titleTextSize);
        text("Less than $10,000 - ...", this.x, this.y + 8 * titleTextSize);
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