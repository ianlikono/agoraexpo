/* eslint no-extend-native: 0 */
// core-js comes with Next.js. So, you can import it like below
import assign from 'core-js/library/fn/object/assign';
import includes from 'core-js/library/fn/string/virtual/includes';
import repeat from 'core-js/library/fn/string/virtual/repeat';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
// Add your polyfills
// This files runs at the very beginning (even before React and Next.js core)

String.prototype.includes = includes
String.prototype.repeat = repeat
Object.assign = assign
