var unscoredGenomes = [];
var scoredGenomes = [];

function sendTasks(unscoredGenomes, nodes) {
    var assigned = [];
    var tasks = unscoredGenomes.length()/nodes;
    var index = 0;
    while(index < tasks){
        assigned.push(unscoredGenomes[0]);
        unscoredGenomes.shift();
        index++;
    }
}

function recieveTasks(tasks){
    var index = 0;
    while(index < tasks.length()){
        scoredGenomes.push(tasks[0]);
        tasks.shift();
        index++;
    }
}