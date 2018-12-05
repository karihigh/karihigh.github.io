let font;
let points;
let data;
let diff;
let inc = 0.005;

function preload() {
  font = loadFont('data/Domine-Bold.ttf');
  articles = loadJSON('data/articles.json');
  spells = loadJSON('data/spells.json');
}




function setup() {
  createCanvas(360, 640);
  pixelDensity(1);

  let indexone = spells.spells.length;
  let indextwo = articles.articles.length;

	// spell = font.textToPoints(
  //   spells.spells[int(random(indexone))], 0, 0, 42, {
  //     sampleFactor: 0.3,
  //   	simplifyThreshold: 0
  //   }
	//  );
  //
  // headline = font.textToPoints(
  //   articles.articles[int(random(indextwo))].Title, 0, 0, 42, {
  //     sampleFactor: 0.3,
  //   	simplifyThreshold: 0
  //   }
	// );

  spell = font.textToPoints("Tulio" , 0, 0, 42, {
      sampleFactor: 0.3,
      simplifyThreshold: 0
      });

  headline = font.textToPoints("Juan Carlos Bodoque" , 0, 0, 42, {
      sampleFactor: 0.3,
      simplifyThreshold: 0
    });

}

function draw() {

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

  diff = headline.length - spell.length;


  // if (spell < headline) {
  //   spell.push(headline - spell);
  // } else { (spell > headline)
  //   headline.push();
  // }

  translate(10, 100);

  for (let i = 0; i < spell.length; i++) {
    ellipse(spell[i].x, spell[i].y, 2, 2);
  }

  translate(10, 300);

  for (let i = 0; i < headline.length; i++) {
    ellipse(headline[i].x, headline[i].y, 2, 2);
  }
}
