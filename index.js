"use strict";
const synaptic = require('synaptic');
const Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;


var model = new Architect.Perceptron(2, 2, 1);
var trainer = new Trainer(model);

var trainingSet = [];

for (let i = 0; i<=1; i+=0.1)
  for (let j = 0; j<=1; j+=0.1)
    trainingSet.push({
      input: [i,j],
      output: [(i+j)/10]
    });
// console.log(trainingSet);
trainer.train(trainingSet,{
    rate: .1,
    iterations: 20000,
    error: .005,
    shuffle: true,
    log: 1000,
    cost: Trainer.cost.CROSS_ENTROPY
});
console.log(model.activate([0.5,1]));
// console.log(model.toJSON());

console.log("done");
