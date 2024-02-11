class Menu { }

class ColorScale {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
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