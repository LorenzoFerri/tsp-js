const fs = require('fs');
const two_opt = require('./two-opt.js');
const utils = require('./utils.js');
const simulates_annealing = require('./simulated-annealing.js');

let argv = require('minimist')(process.argv.slice(2));
let distance_matrix = [];
let problem_file = "problems/" + argv.p;
let problem_name;
let problem_size;
let problem_best_known;
let seed = argv.s || new Date().getTime();
let rand = require('random-seed').create(seed);
let city_list = [];
let solution = [];

fs.readFile('problems/ch130.tsp', 'utf8', function (err,data) {
  if (err) return console.log(err);
  /******************************
  * READING THE INPUT
  *****************************/
  problem_name = data.match(/NAME[\s]*:[\s]*([\w\d]+)/)[1];
  problem_size = data.match(/DIMENSION[\s]*:[\s]*([\d]+)/)[1];
  problem_best_known = data.match(/BEST_KNOWN[\s]*:[\s]*([\d]+)/)[1];
  data.split("NODE_COORD_SECTION\n")[1].split("\n").forEach(function(line) {
    if(line == "EOF" || line == "") return;
    let city = line.split(" ");
    city_list.push({
      x:  city[1],
      y:  city[2]
    });
  });

  /********************************
  * GENERATING THE DISTANCE MATRIX
  ********************************/
  for(let i=0; i < problem_size; i++){
    distance_matrix.push([]);
    for(let j=0; j < problem_size; j++){
      distance_matrix[i].push(utils.distance(city_list[i],city_list[j]));
    }
  }

  /********************************
  * CREATING A RANDOM SOLUTION
  ********************************/
  for(let i = 0; i < problem_size; i++){
    solution[i] = i + 1;
  }
  for(let i = problem_size - 1; i > 0; i--){
    let r = rand.intBetween(0,problem_size - 1)
    let temp = solution[r];
		solution[r] = solution[i];
		solution[i] = temp;
  }

  /********************************
  * TWO OPT AND ANNEALING
  ********************************/
  solution = two_opt.run(solution,distance_matrix).solution;
  solution = simulates_annealing.run(solution,distance_matrix,rand);
  console.log(utils.evaluate(solution,distance_matrix));
});
