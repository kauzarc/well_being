"use strict";

// https://stackoverflow.com/questions/37240287/can-i-create-multiple-canvas-elements-on-same-page-using-p5js
// https://p5js.org/reference/#/p5.Element/mousePressed
// https://p5js.org/examples/image-load-and-display-image.html
// https://p5js.org/examples/image-background-image.html

let canvaMenu; // The menu
let canvaImage; // The image

const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 700;

var font_type = 'Arial';
var font_height = 20;
var font_color = 'white';

// Categories as clickables
// "ppreg4" : "Region"
var regionCategory = "ppreg4";  // region category
let uniqueRegions; // To store the unique values of the region category
let regionCanvas;  // To store the region canvas
// "ppmarit5" : "Marital Status"
var maritalStatusCategory = "ppmarit5";  // marital status category
let uniqueMaritalStatus; // To store the unique values of the marital status category
let maritalStatusCanvas;  // To store the marital status canvas
// "ppeducat" : "Education Level"
var educationLevelCategory = "ppeducat";  // education level category
let uniqueEducationLevel; // To store the unique values of the education level category
let educationLevelCanvas;  // To store the education level canvas
// "D1G" : "Enrolled as a student"
var enrolledAsStudentCategory = "D1G";  // enrolled as a student category
let uniqueEnrolledAsStudent; // To store the unique values of the enrolled as a student category
let enrolledAsStudentCanvas;  // To store the enrolled as a student canvas
// "SL1": "Student Loan Debt"
var studentLoanDebtCategory = "SL1";  // student loan debt category
let uniqueStudentLoanDebt; // To store the unique values of the student loan debt category
let studentLoanDebtCanvas;  // To store the student loan debt canvas
// "ppemploy" : "Employment Status"
var employmentStatusCategory = "ppemploy";  // employment status category
let uniqueEmploymentStatus; // To store the unique values of the employment status category
let employmentStatusCanvas;  // To store the employment status canvas
// "ED5": "Financial Benefits vs. Costs of Education"
var financialBenefitsCategory = "ED5";  // financial benefits category
let uniqueFinancialBenefits; // To store the unique values of the financial benefits category
let financialBenefitsCanvas;  // To store the financial benefits canvas
// "SL7": "Repayment of Student Loans"
var repaymentStudentLoansCategory = "SL7";  // repayment of student loans category
let uniqueRepaymentStudentLoans; // To store the unique values of the repayment of student loans category
let repaymentStudentLoansCanvas;  // To store the repayment of student loans canvas
// "B10": "Self reported well-being"
var selfReportedWellBeingCategory = "B10";  // self reported well-being category
let uniqueSelfReportedWellBeing; // To store the unique values of the self reported well-being category
let selfReportedWellBeingCanvas;  // To store the self reported well-being canvas



// Categories as sliders
// "ppagecat" : "Age"
var ageCategory = "ppagecat";  // age category
let uniqueAges; // To store the unique values of the age category
let selectAge;  // To store the age select
// "ppgender" : "Gender"
var genderCategory = "ppgender"; // gender category
let uniqueGenders; // To store the unique
let selectGender;  // To store the gender select
// "ppethm" : "Race / Ethnicity"
var raceCategory = "ppethm"; // race category
let uniqueRaces; // To store the unique
let selectRace;  // To store the reace select


var marginX, marginY;  // To control spacing
var spaceMargin;  // To control spacing


var dataset;  // To store the loaded dataset
let img;
let regionIMG_North;
let regionIMG_South;
let regionIMG_East;
let regionIMG_West;
// list of regions IMG
let regionIMG;

let studentIMG_YES;
// list of student IMG
let studentIMG;


// Define a class for the clikable objects
class ClickableObject {
  constructor(x, y, w, h, text,index,uniVal,uniIMG=[],indexToSkip=[0]) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.header = text;
    this.index = index;
    this.uniVal = uniVal;
    this.text = this.header + this.uniVal[this.index];
    this.switch = false;
    this.uniIMG = uniIMG;
    this.indexToSkip = indexToSkip;
  }

  // Check if the mouse is inside the object
  isInside() {
    return mouseX > this.x && mouseX < this.x + this.w &&
      mouseY > this.y && mouseY < this.y + this.h;
  }

  // Draw the object
  draw() {
    if (this.switch && !this.indexToSkip.includes(this.index)) {
      image(this.uniIMG[this.index-this.indexToSkip.length], this.x, this.y, this.w, this.h);
    }
    // rect(this.x, this.y, this.w, this.h);
    // fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(this.text, this.x + this.w / 2, this.y + this.h / 2);
  }

  // Check if the mouse is inside the object and change the text
  check() {
    if (this.isInside()) {
      this.index = (this.index + 1) % this.uniVal.length;
      this.text = this.header + this.uniVal[this.index];
      // console.log("Current index:", this.index);
    }
  }

  // give the current value of the object
  getCurrentValue() {
    return this.uniVal[this.index];
  }

  updateSwitch() {
    this.switch = !this.switch;
  }
}

// Define a class for the well-being object where the value will change according to all the categories values
class WellBeingObject {
  constructor(x, y, w, h, text) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.header = text;
    this.text = this.header;
    this.changeText();
  }

  // Draw the object
  draw() {
    // use the same color as the background
    rect(this.x, this.y, this.w, this.h);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(this.text, this.x + this.w / 2, this.y + this.h / 2);
    fill(0);
  }

  // Change the text
  changeText() {
    let regionCanvasValue = regionCanvas.getCurrentValue();
    let maritalStatusCanvasValue = maritalStatusCanvas.getCurrentValue();
    let educationLevelCanvasValue = educationLevelCanvas.getCurrentValue();
    let enrolledAsStudentCanvasValue = enrolledAsStudentCanvas.getCurrentValue();
    let studentLoanDebtCanvasValue = studentLoanDebtCanvas.getCurrentValue();
    let employmentStatusCanvasValue = employmentStatusCanvas.getCurrentValue();
    let financialBenefitsCanvasValue = financialBenefitsCanvas.getCurrentValue();
    let repaymentStudentLoansCanvasValue = repaymentStudentLoansCanvas.getCurrentValue();
    
    let ageSelectValue = selectAge.value();
    let genderSelectValue = selectGender.value();
    let raceSelectValue = selectRace.value();


    // get the rows that match the selected values
    let filteredRows = dataset.rows.filter(function (row) {
      return (regionCanvasValue == "NAN" || row.get(regionCategory) == regionCanvasValue) &&
        (maritalStatusCanvasValue == "NAN" || row.get(maritalStatusCategory) == maritalStatusCanvasValue) &&
        (educationLevelCanvasValue == "NAN" || row.get(educationLevelCategory) == educationLevelCanvasValue) &&
        (enrolledAsStudentCanvasValue == "NAN" || row.get(enrolledAsStudentCategory) == enrolledAsStudentCanvasValue) &&
        (studentLoanDebtCanvasValue == "NAN" || row.get(studentLoanDebtCategory) == studentLoanDebtCanvasValue) &&
        (employmentStatusCanvasValue == "NAN" || row.get(employmentStatusCategory) == employmentStatusCanvasValue) &&
        (financialBenefitsCanvasValue == "NAN" || row.get(financialBenefitsCategory) == financialBenefitsCanvasValue) &&
        (repaymentStudentLoansCanvasValue == "NAN" || row.get(repaymentStudentLoansCategory) == repaymentStudentLoansCanvasValue) &&
        (ageSelectValue == "NAN" || row.get(ageCategory) == ageSelectValue) &&
        (genderSelectValue == "NAN" || row.get(genderCategory) == genderSelectValue) &&
        (raceSelectValue == "NAN" || row.get(raceCategory) == raceSelectValue);
    });

    // get the well-being value of the selected rows
    let wellBeingValues = filteredRows.map(function (row) {
      return row.get(selfReportedWellBeingCategory);
    });
    // console.log("Well-being values: ", wellBeingValues);
    // calculate the average, min, max of the well-being values
    let averageWellBeing = wellBeingValues.reduce((a, b) => parseInt(a) + parseInt(b), 0) / wellBeingValues.length;
    // console.log("Average well-being: ", averageWellBeing);

    // change the text of the object
    this.text = this.header +  " Average Well-being: " + round(averageWellBeing,2) + "\n Ratio: " + round(wellBeingValues.length * 100 / dataset.getRowCount(),2) + "%";

    // console.log("Number of rows: ", filteredRows.length);


  }
}





function menu(g) {
  g.push();

  const color = 255;

  g.fill(0);
  g.stroke(color);

  g.rect(0, 0, g.width, g.height);

  const titleTextSize = g.height / 40;

  g.fill(color);
  g.textSize(titleTextSize);

  // define space between the different categories
  marginX = g.width / 10;
  marginY = g.height / 10;

  // space for the select
  spaceMargin = 160;

  // draw the different categories*
  g.text("Age", marginX, marginY);
  selectAge.position( 4 * CANVAS_WIDTH / 5 + spaceMargin + marginX, 280 + marginY + titleTextSize);  
  g.line(marginX, marginY + titleTextSize, g.width - marginX, marginY + titleTextSize);
  g.text("Gender", marginX, marginY * 2);
  g.line(marginX, marginY * 2 + titleTextSize, g.width - marginX, marginY * 2 + titleTextSize);
  // get the length of the longest string in the selectGender selector
  let maxLenGender = 0;
  for (let i = 0; i < uniqueGenders.length; i++) {
    if (uniqueGenders[i].length > maxLenGender) {
      maxLenGender = uniqueGenders[i].length;
    }
  }
  selectGender.position( (4 * CANVAS_WIDTH / 5 + spaceMargin + marginX) - (maxLenGender-5) * 6, 280 + marginY * 2 + titleTextSize);
  g.text("Ethnicity", marginX, marginY * 3);
  g.line(marginX, marginY * 3 + titleTextSize, g.width - marginX, marginY * 3 + titleTextSize);
  // get the length of the longest string in the selectRace selector
  let maxLenRace = 0;
  for (let i = 0; i < uniqueRaces.length; i++) {
    if (uniqueRaces[i].length > maxLenRace) {
      maxLenRace = uniqueRaces[i].length
    }
  }
  selectRace.position( (4 * CANVAS_WIDTH / 5 + spaceMargin + marginX) - (maxLenRace-5) * 6, 280 + marginY * 3 + titleTextSize);
  g.pop();
}

function preload() {
  dataset = loadTable("data/project.csv", "csv", "header");
  img = loadImage('data/student_room.png');

  // images for regions
  regionIMG_North = loadImage('data/midwest.png');
  regionIMG_South = loadImage('data/south2.png');
  regionIMG_East = loadImage('data/northeast.png');
  regionIMG_West = loadImage('data/West.png');
  regionIMG = [regionIMG_North, regionIMG_East, regionIMG_South, regionIMG_West]

  // image for student
  studentIMG_YES = loadImage('data/student.png');
  studentIMG = [studentIMG_YES, studentIMG_YES];
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  // create graphic for the image
  canvaImage = createGraphics(4 * CANVAS_WIDTH / 5, CANVAS_HEIGHT);
  canvaImage.background(img);

  // Preprocess: Get unique values of the specified category

  // "ppreg4" : "Region"
  regionCanvas = new ClickableObject(300, 100, 300, 100, "Region : ", 0, ["NAN"].concat([...new Set(dataset.getColumn(regionCategory))].filter(e => e !== "")), regionIMG);
  regionCanvas.updateSwitch();
  // console.log("Unique Values of " + regionCategory + ":", ["NAN"].concat([...new Set(dataset.getColumn(regionCategory))].filter(e => e !== "")));
  // "ppmarit5" : "Marital Status"
  maritalStatusCanvas = new ClickableObject(300, 200, 300, 100, "Marital Status : ", 0, ["NAN"].concat([...new Set(dataset.getColumn(maritalStatusCategory))].filter(e => e !== "")));
  // console.log("Unique Values of " + maritalStatusCategory + ":", ["NAN"].concat([...new Set(dataset.getColumn(maritalStatusCategory))].filter(e => e !== "")));
  // "ppeducat" : "Education Level"
  educationLevelCanvas = new ClickableObject(300, 300, 300, 100, "Education Level : ", 0, ["NAN"].concat([...new Set(dataset.getColumn(educationLevelCategory))].filter(e => e !== "")));
  // console.log("Unique Values of " + educationLevelCategory + ":", ["NAN"].concat([...new Set(dataset.getColumn(educationLevelCategory))].filter(e => e !== "")));
  // "D1G" : "Enrolled as a student"
  enrolledAsStudentCanvas = new ClickableObject(0, 100, 300, 100, "Enrolled as a student : ", 0, ["NAN"].concat([...new Set(dataset.getColumn(enrolledAsStudentCategory))].filter(e => e !== "")), studentIMG, [0,1]);
  enrolledAsStudentCanvas.updateSwitch();
  // console.log("Unique Values of " + enrolledAsStudentCategory + ":", ["NAN"].concat([...new Set(dataset.getColumn(enrolledAsStudentCategory))].filter(e => e !== "")));
  // "SL1": "Student Loan Debt"
  studentLoanDebtCanvas = new ClickableObject(0, 200, 300, 100, "Student Loan Debt : ", 0, ["NAN"].concat([...new Set(dataset.getColumn(studentLoanDebtCategory))].filter(e => e !== "")));
  // console.log("Unique Values of " + studentLoanDebtCategory + ":", ["NAN"].concat([...new Set(dataset.getColumn(studentLoanDebtCategory))].filter(e => e !== "")));
  // "ppemploy" : "Employment Status"
  employmentStatusCanvas = new ClickableObject(0, 300, 300, 100, "Employment Status : ", 0, ["NAN"].concat([...new Set(dataset.getColumn(employmentStatusCategory))].filter(e => e !== "")));
  // console.log("Unique Values of " + employmentStatusCategory + ":", ["NAN"].concat([...new Set(dataset.getColumn(employmentStatusCategory))].filter(e => e !== "")));
  // "ED5": "Financial Benefits vs. Costs of Education"
  financialBenefitsCanvas = new ClickableObject(600, 100, 300, 100, "Financial Benefits : ", 0, ["NAN"].concat([...new Set(dataset.getColumn(financialBenefitsCategory))].filter(e => e !== "")));
  // console.log("Unique Values of " + financialBenefitsCategory + ":", ["NAN"].concat([...new Set(dataset.getColumn(financialBenefitsCategory))].filter(e => e !== "")));
  // "SL7": "Repayment of Student Loans"
  repaymentStudentLoansCanvas = new ClickableObject(600, 200, 300, 100, "Repayment of Student Loans : ", 0, ["NAN"].concat([...new Set(dataset.getColumn(repaymentStudentLoansCategory))].filter(e => e !== "")));
  // console.log("Unique Values of " + repaymentStudentLoansCategory + ":", ["NAN"].concat([...new Set(dataset.getColumn(repaymentStudentLoansCategory))].filter(e => e !== "")));


  // "ppagecat" : "Age"
  selectAge = createSelect();
  uniqueAges = [...new Set(dataset.getColumn(ageCategory))];
  // sort them by first number in the string which is the 2 first characters
  uniqueAges.sort(function (a, b) {
    return a.substring(0, 2) - b.substring(0, 2);
  });
  // remove "" value and add "NAN" value at the end
  uniqueAges = ["NAN"].concat(uniqueAges.filter(e => e !== ""));
  // console.log("Unique Values of " + ageCategory + ":", uniqueAges);
  for (var i = 0; i < uniqueAges.length; i++) {
    selectAge.option(uniqueAges[i]);
  }

  selectAge.selected(uniqueAges[0]);

  // "ppgender" : "Gender"
  selectGender = createSelect();
  uniqueGenders = ["NAN"].concat([...new Set(dataset.getColumn(genderCategory))].filter(e => e !== ""));
  // console.log("Unique Values of " + genderCategory + ":", uniqueGenders);
  for (var i = 0; i < uniqueGenders.length; i++) {
    selectGender.option(uniqueGenders[i]);
  }
  selectGender.selected(uniqueGenders[-1]);

  // "ppethm" : "race"
  selectRace = createSelect();
  uniqueRaces = ["NAN"].concat([...new Set(dataset.getColumn(raceCategory))].filter(e => e !== ""));
  // console.log("Unique Values of " + raceCategory + ":", uniqueRaces);
  for (var i = 0; i < uniqueRaces.length; i++) {
    selectRace.option(uniqueRaces[i]);
  }
  selectRace.selected(uniqueRaces[-1]);



  // "B10": "Self reported well-being"
  selfReportedWellBeingCanvas = new WellBeingObject(600, 300, 300, 100, "");
  // console.log("Unique Values of " + selfReportedWellBeingCategory + ":", [...new Set(dataset.getColumn(selfReportedWellBeingCategory))]);

  
  // create graphic for the menu
  canvaMenu = createGraphics(CANVAS_WIDTH / 5,  CANVAS_HEIGHT );
  menu(canvaMenu);

}

function draw() {
  
  image(canvaMenu, 4 * CANVAS_WIDTH / 5, 0);
  image(canvaImage, 0, 0);
  
  // Draw the clickables canvas
  regionCanvas.draw();
  maritalStatusCanvas.draw();
  educationLevelCanvas.draw();
  enrolledAsStudentCanvas.draw();
  studentLoanDebtCanvas.draw();
  employmentStatusCanvas.draw();
  financialBenefitsCanvas.draw();
  repaymentStudentLoansCanvas.draw();

  // Draw the well-being canva
  selfReportedWellBeingCanvas.draw();

}

function mouseClicked() {
  // Change value of clickable categories if the mouse is inside the object
  regionCanvas.check();
  maritalStatusCanvas.check();
  educationLevelCanvas.check();
  enrolledAsStudentCanvas.check();
  studentLoanDebtCanvas.check();
  employmentStatusCanvas.check();
  financialBenefitsCanvas.check();
  repaymentStudentLoansCanvas.check();
  // Change the text of the well-being object
  selfReportedWellBeingCanvas.changeText();

}