import { Texts } from "./language.js";
import { machine } from './rl';

export const Levels = {
  letsMove: {
    components: ["global"],
    levelMap: [
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0]
    ],
    infoBox: {
      ...Texts.letsMove,
      showState: true,
      showActions: true,
    },
  },
  findPower: {
    components: ["global"],
    hasFog: true,
    levelMap: [
      [8, 0, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [2, 0, 0, 0, 1],
    ],
    infoBox: {
      ...Texts.findPower,
      showState: true,
      showActions: true
    }
  },
  getRewarded: {
    components: ["global"],
    levelMap: [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 8],
      [0, 1, 1, 1, 0],
      [2, 0, 0, 0, 0]
    ],
    infoBox: {
      ...Texts.getRewarded,
      showState: true,
      showActions: true,
      showReward: true
    }
  },
  accumulatedReward: {
    components: ["global", "score", "sliders"],
    controls: ["learningRate", "discountFactor"],
    levelMap: [
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 8],
      [0, 1, 1, 1, 0],
      [2, 0, 0, 0, 0]
    ],
    infoBox: {
      ...Texts.accumulatedReward,
      showState: true,
      showActions: true,
      showReward: true,
      showAccumulated: true
    }
  },
  playground: {
    components: ["global", "sliders", "plot", "training","evaluation", "score", "editor"],
    controls: ["learningRate", "discountFactor", "epsilon", "qvalue", "greedy"],
    training: {
      [Texts.training.oneEpisode]: () => machine.train(1),
      [Texts.training.twentyEpisodes]: () => machine.train(20),
      [Texts.training.unlearn]: () => machine.reset_machine(),
    },
    evaluation: {
      [Texts.evaluation.oneStep]: () => {
        machine.learning = false;
        machine.auto_step();
        machine.learning = true;
      },
      [Texts.evaluation.greedyStep]: () => {
        machine.learning = false;
        machine.greedy_step();
        machine.learning = true;
      },
    },
    levelMap: [
      [0, 0, 1, 8, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
      [0, 1, 1, 1, 1, 1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
      [2, 0, 0, 0, 1, 0, 1, 0, 0, 1]
    ],
    infoBox: {
      ...Texts.playground,
      showState: true,
      showActions: true,
      showReward: true,
      showAccumulated: true
    },
  }
};

