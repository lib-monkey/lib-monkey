import colors from 'colors/safe';

if(!process.env.LIB_MONKEY_SEED){
   process.env.LIB_MONKEY_SEED = Math.round(Math.random() * Math.pow(10, 10));
}

if(process.env.LIB_MONKEY_QUIET !== '0'){
  console.log(colors.green('lib-monkey seed', process.env.LIB_MONKEY_SEED));
}


function exitHandler(options, err) {
  if(process.env.LIB_MONKEY_QUIET !== '0'){
    console.log(colors.green('lib-monkey seed', process.env.LIB_MONKEY_SEED));
  }
  if (err) console.log(err.stack);
  if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));