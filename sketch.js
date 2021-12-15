var cowIdle, pigIdle, chickenIdgle;
var cowMove, pigMove, chickenMove;
var coins;
var buyCow, buyPig, BuyChicken;
var cow, pig, chicken;
var buttonImage;
var numOfAnimals;
//var rs;
var firtAnimal = 0;
var numOfCows = 0;
var numOfPigs = 0;
var numOfChickens = 0;
var theifImg

var cowGroup, pigGroup, chickenGroup;
function preload() {
    chickenIdgle = loadImage("./Assets/Chicken/tile004.png");
    chickenMove = loadAnimation("./Assets/Chicken/tile004.png", "./Assets/Chicken/tile006.png", "./Assets/Chicken/tile007.png", "./Assets/Chicken/tile008.png", "./Assets/Chicken/tile009.png", "./Assets/Chicken/tile010.png");

    pigIdle = loadImage("./Assets/Pigs/tile002.png");
    pigMove = loadAnimation("./Assets/Pigs/tile000.png", "./Assets/Pigs/tile001.png", "./Assets/Pigs/tile003.png", "./Assets/Pigs/tile004.png", "./Assets/Pigs/tile005.png");

    cowIdle = loadImage("./Assets/Cow/tile008.png");
    cowMove = loadAnimation("./Assets/Cow/tile000.png", "./Assets/Cow/tile001.png", "./Assets/Cow/tile003.png", "./Assets/Cow/tile016.png", "./Assets/Cow/tile008.png");
    theifImg = loadImage("./Assets/Theif.png");

    buttonImage = loadImage("./Assets/Button.jpg")
}

function setup() {
    createCanvas(1000, 900);

    //rs = createSprite(200,200);

    buyCow = createSprite(400, 100);
    buyCow.scale = 0.1;
    buyCow.addImage("buyCow", buttonImage);

    buyPig = createSprite(550, 100);
    buyPig.scale = 0.1;
    buyPig.addImage("buyPig", buttonImage);

    BuyChicken = createSprite(760, 100);
    BuyChicken.scale = 0.1;
    BuyChicken.addImage("buyChicken", buttonImage);

    cowGroup = new Group();
    pigGroup = new Group();
    chickenGroup = new Group();

    coins = 0;
}

function draw() {
    background("green");

    textSize(30);
    fill("red");
    text("BUY COW:40   BUY PIGS:100   BUY CHICKENS:60", 300, 50);

    if (firtAnimal < 1) {
        CreateCows();
        firtAnimal += 1;
    }

    if (mousePressedOver(buyPig) && coins >= 100) {
        CreatePigs();
        coins -= 100;
    }

    if (mousePressedOver(buyCow) && coins >= 40) {
        CreateCows();
        coins -= 40;
    }

    if (mousePressedOver(BuyChicken) && coins >= 60) {
        CreateChickens();
        coins -= 60;
    }

    if (frameCount % 30 === 0) {
        if (numOfChickens > 0) {
            coins += numOfChickens * 2.5;
        }
        if (numOfPigs > 0) {
            coins += numOfPigs * 3;
        }
        if (numOfCows > 0) {
            console.log("A");
            coins += numOfCows * 2;
        }
    }

    if (frameCount % 500 === 0) {
        theif();
    }

    fill("blue");
    textSize(30);
    text("Coins: " + coins, 70, 100);
    drawSprites();
}

function CreateCows() {
    cow = createSprite(random(600, 900), random(200, 500));
    cow.scale = 1.3;
    cow.addImage("cowIdle", cowIdle);
    //cow.addAnimation("cowMove",cowMove);
    numOfCows += 1;
    console.log(numOfCows);

    cowGroup.add(cow);
}

function CreatePigs() {
    pig = createSprite(random(300, 600), random(600, 700));
    pig.scale = 1;
    pig.addImage("pigIdle", pigIdle);
    //pig.addAnimation("pigMove",pigMove);
    numOfPigs += 1;

    pigGroup.add(pig);
}

function CreateChickens() {
    chicken = createSprite(random(50, 300), random(200, 500));
    chicken.scale = 1;
    chicken.addImage("chickenIdle", chickenIdgle);
    //chicken.addAnimation("chickenMove",chickenMove);
    numOfChickens += 1;

    chickenGroup.add(chicken);
}

function mousePressed() {
    console.log("a");
}

function theif() {
    var rand = Math.round(random(1, 3));
    if (cowGroup > 0 && pigGroup > 0 && chickenGroup > 0) {
        switch (rand) {
            case 1: cowGroup[cowGroup.length - 1].destroy();
                    numOfCows-=1;
                break;
            case 2: chickenGroup[chickenGroup.length-1].destroy();
                numOfChickens-=1;
                break;
            case 3: pigGroup[pigGroup.length-1].destroy();
                numOfPigs-=1;
                break;
        }
    }

    var theif;
    theif = createSprite(500, 450);
    theif.scale = 1.3;
    theif.addImage("theif", theifImg);
    theif.lifetime = 100;

    console.log("theif");
    console.log(rand);
}