
import FunctionRunner from "./function.runner";

class RunnerFactory {

  constructor(randomiser) {
    Object.assign(this, { randomiser });    
  }

  
  FunctionRunner(){
    return new FunctionRunner(this.randomiser);
  }
} 

export default RunnerFactory;