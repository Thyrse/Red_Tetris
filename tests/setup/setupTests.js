const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
require("regenerator-runtime/runtime");

enzyme.configure({ adapter: new Adapter() });
