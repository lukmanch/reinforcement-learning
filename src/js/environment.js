import { dir } from './dir';

export class Environment {
  constructor(maze, rewardsMap) {
    this.setMaze(maze);
    this.setRewards(rewardsMap);
    this.startState = this.position2state(this.maze.startPosition);
    this.endStates = this.maze.endPositions.map(coord => this.position2state(coord));
  }

  setMaze(maze) {
    this.maze = maze;
  }

  setRewards(rewardsMap) {
    this.rewardsMap = rewardsMap;
  }

  state2position(state) {
    return {
      x: (state % this.maze.width),
      y: Math.floor(state / this.maze.width),
    };
  }
  
  position2state(coord) {
    return coord.x + coord.y * this.maze.width;
  }
  
  reward(state) {
    const position = this.state2position(state);
    return this.rewardsMap[this.maze.map[position.y][position.x]];
  }

  actions(state) {
    const coord = this.state2position(state);
    var cellActions = [];
    if (this.maze.isTransitable(coord)) {
      [dir.UP, dir.DOWN, dir.RIGHT, dir.LEFT].forEach(dir => {
        if (this.maze.canMove(coord, dir))
          cellActions.push(dir);
      });
    }
    return cellActions;
  }

  transition(state, action) {
    switch (action) {
      case dir.UP:
        return state - this.maze.width;
      case dir.RIGHT:
        return state + 1;
      case dir.DOWN:
        return state + this.maze.width;
      case dir.LEFT:
        return state - 1;
    }
  }
}
