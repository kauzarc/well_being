class Menu extends VisualComponent {
    constructor(dataset, x, y, w, h) {
        super(x, y, w, h);
    }

    draw() {
        const color = 255;

        fill(0);
        stroke(color);

        rect(this.x, this.y, this.w, this.h);

        const titleTextSize = this.h / 40;

        fill(color);
        textSize(titleTextSize);

        text("Gender", this.x, this.y + titleTextSize);
        text("Male - Female", this.x, this.y + 2 * titleTextSize);

        text("Ethnicity", this.x, this.y + 4 * titleTextSize);
        text("White - Black - Hispanic - Other", this.x, this.y + 5 * titleTextSize);

        text("...", this.x, this.y + 7 * titleTextSize);
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