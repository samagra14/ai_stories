
var file;

var order = 10;
var ngrams = {};
var button;
var txt;

// function preload(){
// file = loadStrings('http://localhost:8000/text.txt');
// console.log(file);
// }

function setup(){
    noCanvas();
    createP("Upload a text file to generate your own story using AI ...")
    createFileInput(onFileLoad);

};

function markovIt(){

  var currentGram = txt.substring(0,order);
  var result = currentGram;

  for (var i = 0; i <10000; i++) {
     var possibilities = ngrams[currentGram];
     if(possibilities){
       result+=random(possibilities);
     }
     currentGram = result.substring(result.length-order,result.length);
   }
   createP(result);
}

function onFileLoad(file){
  if (!(file.type=="text")){
    createP("Oops! I need a text file");
    return;
  }
   txt = file.data;

   for (var i = 0; i <=txt.length-order; i++) {
     var gram = txt.substring(i,i+order);
     if (!ngrams[gram]) {
       ngrams[gram] = [];
     }
     ngrams[gram].push(txt.charAt(i+order));

   }

   button = createButton('Click me to generate your story!');
   button.mousePressed(markovIt);
}
