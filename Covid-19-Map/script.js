let myMap;
let mappa = new Mappa('Leaflet');
let canvas;
let data;
let worldData;
let newColor;
let subText = "As of July 27, 2020"
textTitle = "Global Coronavirus Cases"

var options = {
	lat: 40.206254,
  lng: -100.845827,
  zoom: 3,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}
function preload(){
  data = loadTable('uscovid.csv', 'csv', 'header');
  worldData = loadTable('coronavirus.csv', 'csv', 'header')
}

function setup(){
  canvas = createCanvas(1600, 800);
  colorMode(HSB, 360, 100, 100);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  //  fill(200,100,100)

  
}

function draw(){
  push();
  //textSize(28);
	//fill(0, 102, 153);
	//text(textTitle, 50, 10, 350, 80)
  pop();
  push();
  myMap.onChange(drawUsPosition);
  pop();
  push();
  myMap.onChange(drawWorldPosition);
  pop();
  table();
  titleandkey();
  
}


function drawUsPosition() {
  clear();
  for(var i = 0; i < data.getRowCount(); i++){
    var latitude = Number(data.getString(i, 'Lat'));
    var longitude = Number(data.getString(i, 'Long_'));


    if(myMap.map.getBounds().contains({lat: latitude, lng:longitude})){
      var pos = myMap.latLngToPixel(latitude, longitude);
      var size = data.getString(i, 'Confirmed');
      let radius = size/15000
      noStroke();
      fill(180, 100, 100);

      ellipse(pos.x, pos.y, radius);

      // if (mouseX - pos.x == radius -10 && mouseY - pos.y == radius-10) {
      //   fill(180, 100, 50);
      //   text(`${Confirmed}`, 0, 0);
      // } 

      //We were unable to get this working
    }
  }
}


function drawWorldPosition() {
  //clear();
  for(var i = 0; i < worldData.getRowCount(); i++){
    var latitude = Number(worldData.getString(i, 'lat'));
    var longitude = Number(worldData.getString(i, 'long'));


    if(myMap.map.getBounds().contains({lat: latitude, lng:longitude})){
      var pos = myMap.latLngToPixel(latitude, longitude);
      var size = worldData.getString(i, 'cases');
      var newSize = size/15000
      noStroke();
      fill(0, 100, 100);
      ellipse(pos.x, pos.y, newSize);

      //We deleted data for the Unoted states from the original, but a dot still appears, so tbd?
    }
  }
}

function table(){
  fill("white");
  rect(35, 10, 150, 170);
  textSize(12);
  fill(0);
  text("United States: 4,539,272", 40, 25);
  text("Brazil: 2,498,668",40, 40);
  text("India: 1,584,384", 40, 55);
  text("Russia: 828,990", 40, 70);
  text("South Africa: 459,761", 40, 85);
  text("Mexico: 402,697", 40, 100);
  text("Peru: 395,005", 40, 115);
  text("Chile: 351,575", 40, 130);
  text("Spain: 329,721", 40, 145);
  text("United Kingdom: 301,455", 40, 160);
  

}

function titleandkey() {
  textSize(30);
	fill(0, 0, 100);
  text(textTitle, 200, 50);
  textSize(20);
  text(subText, 250, 75);
  rect(0,600,200,150);
  fill(0);
  text("Key", 75, 625);
  text("State", 60, 660);
  text("Country", 60, 710);
  fill(180, 100, 100);
  ellipse(30,650 ,20, 20);
  fill(0, 100, 100);
  ellipse(30,700,20,20);
}