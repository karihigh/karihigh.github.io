let font;
let points;
let data;
let diff;
let inc;
let spell;
let headline;
let numFrames = 30;
let delta = [];
let textSize = 40;


function preload() {
  font = loadFont('data/Domine-Bold.ttf');
  articles = loadJSON('data/articles.json');
  spells = loadJSON('data/spells.json');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  inc = 0.005;

  let indexone = spells.spells.length;
  let indextwo = articles.articles.length;

	spell = font.textToPoints(
    spells.spells[int(random(indexone))], 0, 0, textSize, {
      sampleFactor: 0.4,
    	simplifyThreshold: 0
    }
	 );

  headline = font.textToPoints(
    articles.articles[int(random(indextwo))].Title, 0, 0, textSize, {
      sampleFactor: 0.4,
    	simplifyThreshold: 0
    }
	);

  // textAlign(CENTER);
  // spell = font.textToPoints("Tulio" , 0, 0, 42, {
  //     sampleFactor: 0.3,
  //     simplifyThreshold: 0
  //     });
  //
  // headline = font.textToPoints("Juan Carlos Bodoque" , 0, 0, 42, {
  //     sampleFactor: 0.3,
  //     simplifyThreshold: 0
  //   });

    //processing arrays to make them the same length
    diff = headline.length - spell.length;

    let aux = 0;
    for (var i = 0; i < diff; i++) {
      if(aux > spell.length){
        aux = 0;
      }
      spell.push(spell.slice(i,1));
      aux++;
    }

    // calculate distance array
    for (var i = 0; i < headline.length; i++) {
      let distX = headline[i].x - spell[i].x;
      let distY = headline[i].y - spell[i].y;
      delta.push(createVector(distX/numFrames, distY/numFrames));
    }
}

function draw() {
  // background perlin noise
    let yoff = 0;
    loadPixels();
    for (let y = 0; y < height; y++) {
      let xoff = 0;
      for (var x = 0; x < width; x++) {
        let index = (x + y * width) * 4;
        let r = noise(xoff, yoff) * 255;
        pixels[index + 0] = r;
        pixels[index + 1] = r;
        pixels[index + 2] = r;
        pixels[index + 3] = 255;
        xoff += inc;
      }
      yoff += inc;
    }
    updatePixels();

  background(0, 150);
  noStroke();
  fill(255);

  // drawing words
  translate(100, windowHeight/2);

  for (let i = 0; i < spell.length; i++) {
    if(frameCount < numFrames){
      spell[i].x += delta[i].x;
      spell[i].y += delta[i].y;
    }

    ellipse(spell[i].x, spell[i].y, 2, 2);
  }

  // translate(10, 100);

  // for (let i = 0; i < headline.length; i++) {
  //   ellipse(headline[i].x, headline[i].y, 2, 2);
  // }

}
