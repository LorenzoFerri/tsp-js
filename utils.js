module.exports = {
  distance(a,b) {
    return Math.round(Math.sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y)));
  },
  evaluate(s,distance_matrix){
    if(!this.check_solution(s)){
  		console.error("Invalid solution\n");
      process.exit(-1);
  	}
  	let total = 0;
  	for(let i = 0; i < s.length; i++){
  		let r = s[i]-1;
  		let c = s[(i+1)%s.length]-1;
  		total += distance_matrix[r][c];
  	}
  	return total;
  },
  check_solution(s){
  	for(let i = 0; i < s.length; i++ ){
  		let found = false;
  		for(let j = 0; j < s.length; j++ ){
  			if(s[j] == i+1){
  				found = true;
  				break;
  			}
  		}
  		if(found == false) return false;
  	}
  	return true;
  }
}
