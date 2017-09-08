
import FunctionRunner from "./function.runner";

export default class RunnerFactory {

  constructor(randomiser) {
    Object.assign(this, { randomiser });    
  }

  
  FunctionRunner(){
    return new FunctionRunner(this.randomiser);
  }
} 
