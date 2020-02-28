import { Maze } from "./maze";
import { levelMap } from './level';
import { tile } from './tile';
import { Environment } from "./environment";

const StepState = {
  Continue: 1,
  End: 2
};

function pickRandom(array) {
    return array[array.length * Math.random() << 0];
};

class QTable {
  constructor(learningRate, discountFactor) {
    this.learningRate = learningRate;
    this.discountFactor = discountFactor;
    this.qCallback = undefined;
    /*
    Array implicitely state-indexed, where each element is a Map of action/values

    state 1:
      action 1: Q-value for action 1 taken in state 1
      action 2: Q-value for action 2 taken in state 1
    state 2:
      action 1: Q-value for action 1 taken in state 1
      action 2: Q-value for action 2 taken in state 2
      action 3: Q-value for action 3 taken in state 3
    */
    this.reset();
  }

  // Returns the Map of action/values corresponding to the state
  // Might be an empty Map
  // Modifying this returned map WILL modify the stored values
  getStateActionValues(state) {
    return (state in this.stateAction) ? this.stateAction[state] : (this.stateAction[state] = new Map());
  }

  // Returns an array of actions, NO values
  // Modifying this array will NOT change the stored values
  getStateActions(state) {
    return (state in this.stateAction) ? Array.from(this.stateAction[state].keys()) : [];
  }

  // if state/action combination not known, returns 0
  getCurrentValue(state, action) {
    const actionValues = this.getStateActionValues(state);
    return (action in actionValues) ? actionValues.get(action) : 0;
  }

  // returns an { action: value: } object
  // If no actions are known for this state, action will be undefined
  getMaxActionValue(state) {
    const actionValues = this.getStateActionValues(state);
    const actions = this.getStateActions(state);
    if (actions.length == 0)
      return { action: undefined, value: 0 };

    var bestAction = actions[0];
    actions.forEach( action => {
      if (actionValues.get(action) > actionValues.get(bestAction)) {
        bestAction = action;
      }
    });
    return { action: bestAction, value: actionValues.get(bestAction) };
  }

  getMaxValue(state) {
    return this.getMaxActionValue(state).value;
  }

  getBestAction(state) {
    return this.getMaxActionValue(state).action;
  }

  updateQBounds(qValue) {
    if (qValue < this.qBounds.min)
      this.qBounds.min = qValue;
    if (qValue > this.qBounds.max)
      this.qBounds.max = qValue;
  }

  updateStateAction(state, action, newValue) {
    const stateArray = this.getStateActionValues(state);
    stateArray.set(action, newValue);
    this.updateQBounds(newValue);
  }

  update(state, action, newState, reward) {
    const currentValue = this.getCurrentValue(state, action);
    const maxQ = this.getMaxValue(newState);

    const newQ = (1 - this.learningRate) * currentValue + this.learningRate * (reward + this.discountFactor * maxQ);

    if (this.qCallback != undefined) {
      this.qCallback({
        state : state,
        action: action,
        newState: newState,
        newState: newState,
        currentValue: currentValue,
        reward: reward,
        maxQ: maxQ,
        newQ: newQ
      });
    }
    this.updateStateAction(state, action, newQ);

    return newState;
  }

  reset() {
    this.stateAction = [];
    // arbitrary starting values, but which should help start with a reasonable color gradient
    // when visualizing all q values
    this.qBounds = { min: 0, max: 0 };
  }

  getStateValues() {
    return Object.keys(this.stateAction).map( state => this.getMaxValue(state) );
  }
}

class CallBack {
  constructor() {
    this.callback = null;
  }
  set(callback) {
    this.callback = callback;
  }
  call(...args) {
    if (this.callback != null) {
      this.callback(...args);
    }
  }
}

export class RL_machine {
  constructor(environment,
              start_score,
              end_score,
              learning_rate,
              discount_factor,
              epsilon=0) {

    this.lr = learning_rate;
    this.df = discount_factor;
    this.epsilon = epsilon;

    this.environment = environment;

    this.start_score = start_score;
    this.end_score = end_score;

    this.stateChange = new CallBack();
    this.onReset = new CallBack();
    this.onNewEpisode = new CallBack();

    this.qTable = new QTable(learning_rate, discount_factor);
    this.reset_machine();
  }

  setResetCallback(resetCallback) {
    this.onReset.set(resetCallback);
  }

  setStateChangeCallback(stateChangeCallback) {
    this.stateChange.set(stateChangeCallback);
  }

  setQCallback(qCallback) {
    this.qTable.qCallback = qCallback;
  }

  setNewEpisodeCallback(onNewEpisode){
    this.onNewEpisode = onNewEpisode;
  }

  reset_machine(){
    this.qTable.reset();
    this.episode = 0;
    this.running = false;
    this.score_history = [];
    this.resetState();
    this.onReset.call();
  }

  resetState() {
    this.setState(this.environment.startState);
    this.score = this.start_score;
  }

  new_episode(reason = "failed"){
    const reset = () => {
      this.episode++;
      this.score_history.push(this.score);
      this.resetState();
    }
    // add_new_episode_callback
    if (!this.running && this.onNewEpisode) {
      this.onNewEpisode(reason).then((p) => reset());
    } else {
      reset();
    }
  }

  randomAction(state) {
    return pickRandom(this.environment.actions(state));
  }

  auto_step() {
    return (Math.random() < this.epsilon) ? this.random_step() : this.greedy_step();
  }

  random_step() {
    return this.step(this.randomAction(this.state));
  }

  greedy_step() {
    const bestAction = this.qTable.getBestAction(this.state) || this.randomAction(this.state);
    return this.step(bestAction);
  }

  attemptStep(state, dir) {
    const actions = this.environment.actions(state);
    if (actions.includes(dir))
      this.step(dir);
  }

  step(action) {
    const newState = this.environment.transition(this.state, action);
    const reward = this.environment.reward(newState);
    this.qTable.update(this.state, action, newState, reward);

    this.setState(newState);
    this.score += this.environment.reward(this.state);

    // add_new_step_callback
    if (this.environment.endStates.indexOf(this.state) >= 0) {
      this.new_episode("success");
      return StepState.End;
    }
    if (this.score <= this.end_score){
      this.new_episode("failed");
      return StepState.End;
    }
    return StepState.Continue;
  }

  setState(newState) {
    const oldState = this.state;
    this.state = newState;
    this.stateChange.call(oldState, newState);
  }

  getGreedyPath(startOfPath) {
    var states = [];
    var state = startOfPath;
    do {
      states.push(state);
      const action = this.qTable.getBestAction(state);
      if (action == undefined)
        break;
      state = this.environment.transition(state, action);
    }  while (state != undefined && !(state in states) && !(state in this.environment.endStates));
    return states;
  }

  run(episodes, max_steps_per_episode=10000){
    this.running = true;
    for (var i = 0; i < episodes; i++) {
      for (var j = 0; j < max_steps_per_episode; j++) {
        if (this.auto_step() != StepState.Continue) {
          break;
        }
      }
      this.resetState();
    }
    this.running = false;
  }

  normalizedValue(state) {
    const max = this.qTable.qBounds.max;
    const min = this.qTable.qBounds.min;
    const value = this.qTable.getMaxValue(state);
    return (value - min) / (max - min);
  }
}

export const RewardsMap = {
  [tile.regular]:-1,
  [tile.dangerous]:-100,
  [tile.end]:1000,
  [tile.start]:-1
};

const InitialLearningRate = 0.75;
const InitialDiscountFactor = 0.8;
const InitialEpsilon = 0.2;

export var maze = new Maze(levelMap);

export const environment = new Environment(maze, RewardsMap);

export var machine = new RL_machine(environment,
                            50,
                            0,
                            InitialLearningRate,
                            InitialDiscountFactor,
                            InitialEpsilon);
