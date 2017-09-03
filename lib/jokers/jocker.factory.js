
import * as Basic from './basic';

class JokerFactory {

  constructor(randomiser) {
    Object.assign(this, { randomiser });

    this._setupGetters();    
  }

  _setupGetters() {
    Object.keys(Basic)
      .forEach(jockerName => 
        Object.defineProperty(this, jockerName, {
          get: () => new (Basic[jockerName])(this.randomiser)
        })
      );
  }

} 

export default JokerFactory;