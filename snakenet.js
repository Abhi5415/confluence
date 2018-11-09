let score = 0;
let saveState;
let roundState;
let movesTaken = 0;
let moveLimit = 1000;
let moveAlgorithm = [];

//Evolutionary Algo Values

let popSize = 1000;
let genomes = [];
let currentGenome = -1;
let generation = 0;
let archive = {
    populationSize: 0,
    currentGeneration: 0,
    elites: [],
    genomes: []
}

let mutationRate = 0.05;
let mutationStep = 0.02;