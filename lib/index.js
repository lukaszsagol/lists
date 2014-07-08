var Root = require("./components/root")
var React = require("react")
var Store = require("./store")
var Utils = require("./utils")

function App() {
  var data = {
    nodes: [{
      id: Utils.uuid(),
      name: 'Lists TODO',
      nodes: [{
        id: Utils.uuid(),
        name: '[x] Rendering of nested lists',
        nodes: [{
          id: Utils.uuid(),
          name: '[x] Just to verify multiple levels of nesting',
          nodes: []
        }]
      },{
        id: Utils.uuid(),
        name: '[x] Adding new items',
        nodes: []
      },{
        id: Utils.uuid(),
        name: '[ ] Saving the state',
        nodes: []
      },{
        id: Utils.uuid(),
        name: '[ ] Indenting/unindenting lists',
        nodes: []
      },{
        id: Utils.uuid(),
        name: '[ ] Editing current items',
        nodes: []
      }]
    },{
      id: Utils.uuid(),
      name: 'Second top level list',
      nodes: [{
        id: Utils.uuid(),
        name: 'Added just in case',
        nodes: []
      }]
    }]
  }

  var store = new Store({initialData: data})
  React.renderComponent(Root({store: store}), document.getElementById('app'));
}

module.exports = App
