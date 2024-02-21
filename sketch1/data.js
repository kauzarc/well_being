"use strict";

const columnPrettyName = {
    ppagecat: "Age", 
    ppgender: "Gender",
    ppethm: "Ethnicity",
    ppreg4: "Region",
    ppmarit5: "MSA Status",
    ppeducat: "Education",
    ppemploy: "Employment Status",
    D1G: "Student Status",
    SL1: "Student Loan",
    SL7: "Repayment of Student Loans", 
    ED5: "Financial Benefits",
    B10: "Well being"
};

class Dataset {
    load() {
        // this.table = loadTable("data/well_being.csv", "csv", "header");
        this.table = loadTable("data/project.csv", "csv", "header");
    }

    prepare() {
        this.length = this.table.rows.length;
        this._sortByWellBeing();
        this._computeUniques();
    }

    get(row, column) {
        return this.table.get(this.sortedIndexes[row], column);
    }

    getRow(row) {
        return this.table.getRow(this.sortedIndexes[row]);
    }

    printShape() {
        console.log(`Data shape : ${this.table.rows.length} rows, ${this.table.columns.length} columns`);
    }

    _sortByWellBeing() {
        let wellBeingPlusIndex = this.table.getColumn(
            this.table.columns.indexOf("B10")
        ).map((value, index) => {
            return { value, index };
        });

        wellBeingPlusIndex.sort((a, b) => a.value - b.value);

        this.sortedIndexes = wellBeingPlusIndex.map((obj) => obj.index);
    }

    _computeUniques() {
        this.uniques = {};

        for (const columnName of this.table.columns) {
            this.uniques[columnName] = new Set(this.table.getColumn(columnName));
        }
    }
}