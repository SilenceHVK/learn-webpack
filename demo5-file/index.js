'use strict';

import './assets/styles/style.css';

const div1 = document.createElement('div');
div1.className = 'img1';
const div2 = document.createElement('div');
div2.className = 'img2';

document.body.appendChild(div1);
document.body.appendChild(div2);

$('body').append('<h1>webpack.ProvidePlugin</h1>');
