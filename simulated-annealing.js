const two_opt = require("./two-opt.js");
const utils = require("./utils.js");

module.exports = {
  acceptance_probability(energy, new_energy, temperature) {
    if (new_energy < energy) {
      return 1;
    }
    return Math.exp((energy - new_energy) / temperature);
  },
  run(s,distance_matrix,rand){
    let duration;
    let temperature = 1000000000;
    let cooling = 0.01;
    let absTemp = 0.0000001;
    let proposed_solution;
    let best = Array.from(s);
    let best_energy = 0;
    while(temperature > absTemp) {
      proposed_solution = Array.from(s);
      let current_energy = 0;
      let city_index_a = rand.intBetween(0,s.length-1);
      let city_index_b = rand.intBetween(0,s.length-1);
      if( city_index_b < city_index_a ){
        let temp = city_index_a;
        city_index_a = city_index_b;
        city_index_b = temp;
      }
      proposed_solution = two_opt.swap(proposed_solution,city_index_a,city_index_b);
      let result = two_opt.run(proposed_solution,distance_matrix);
      proposed_solution = result.solution;
      neighbour_energy = current_energy + result.gain;
      let prob = this.acceptance_probability(current_energy, neighbour_energy, temperature);
      let rnd = rand.random();

      if(prob > rnd){
        s = Array.from(proposed_solution);
      }

      if(result.gain < best_energy){
        best = Array.from(s);
        best_energy = result.gain;
      }
      temperature *= 1 - cooling;
    }

    return s;
  }
}
