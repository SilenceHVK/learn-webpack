require.include('./module.js');

// require.ensure(
//   ['./subPageA.js'],
//   function() {
//     // require('./subPageA');
//   },
//   'subPageA'
// );

// import(/* webpackChunkName: "subPageA" */ './subPageA').then(function(
//   subPageA
// ) {
//   console.log(subPageA);
// });

async function test() {
  const subPageA = await import(
    /* webpackChunkName: "subPageA" */ './subPageA'
  );
  console.log(subPageA);
}

test();

// 动态加载 lodash
// require.ensure(['lodash'], function() {
//   const _ = require('lodash');
//   _.join([1, 2, 3, 4], 5);
// });

export default 'pageA';
