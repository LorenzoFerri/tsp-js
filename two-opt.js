module.exports = {
  swap(s, i, j){
  	while(i < j){
  		let temp = s[i];
  		s[i] = s[j];
  		s[j] = temp;
  		i++;
  		j--;
  	}
    return s;
  },
  run(s,distance_matrix){
  	let improve = true;
  	let local_gain;
  	let best_gain = -1;
  	let new_distance;
  	let first, second;
    let total_gain = 0;
  	while(improve){
  		improve = false;
  		for(let i = 0; i < s.length; i++){
  			best_gain = 0;
  			for(let j = i + 2; j < s.length; j++){
  				let a = s[i]-1;
  				let b = s[i+1]-1;
  				let c = s[j]-1;
  				let d = s[(j+1) % s.length]-1;
  				if(!(distance_matrix[a][b] > distance_matrix[b][c]) && !(distance_matrix[c][d] > distance_matrix[c][a])) continue;
  				if(b == c || d == a) continue;
  				local_gain =
  				- distance_matrix[a][b]
  				- distance_matrix[c][d]
  				+ distance_matrix[a][c]
  				+ distance_matrix[b][d];
  				if (local_gain < best_gain) {
  					best_gain = local_gain;
  					first = i + 1;
  					second = j;
  					improve = true;
  				}
  			}
  			if(best_gain < 0){
          total_gain += best_gain;
  				s = this.swap(s, first, second);
  			}
  		}
  	}
    return {
      solution: s,
      gain: total_gain
    };
  }
}
