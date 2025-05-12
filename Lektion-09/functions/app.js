const initApp = () => {
  demoFunc1();
  demoFunc2(1, 2);
  const volvo = {
    make: 'Volvo',
    model: 'XC40',
  };

  demoFunc3(volvo);
  demoFunc3({
    make: 'Volvo',
    model: 'XC40',
  });

  outerFunc(innerFunc);

  const message = fakeCatchErrorAsync(() => {
    return 'Halloj ifrån funktion i funktion!';
  });

  console.log(message);
};

const demoFunc1 = () => {
  console.log('Demo Func');
};

const demoFunc2 = (x, y) => {
  console.log('Demo Func 2', x + y);
};

const demoFunc3 = (vehicle) => {
  console.log('Demo Func 2', vehicle.model);
};

const outerFunc = (fn) => {
  console.log('Running Outer Function');
  fn();
};

const innerFunc = () => {
  console.log('Running Inner Function');
};

const fakeCatchErrorAsync = (fn) => {
  return fn();
};

document.addEventListener('DOMContentLoaded', initApp);
