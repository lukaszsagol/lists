var React = require("react");
var Editable = require("./editable");

// Had to put both Item and Tree in one file
// due to circular dependencies problem

var Tree = React.createClass({
  render: function() {
    var items = this.props.nodes.map(function(item, i) {
      return (
        <Item
          key={item.id}
          name={item.name}
          nodes={item.nodes}
          newNode={item.newNode}
          addNode={this.props.addNode.bind(null, i)} />)
    }.bind(this));

    return (
      <div className="list-tree">
        {items}
      </div>
    );
  }
});

var Item = React.createClass({
  handleKeypress: function(ev) {
    if (ev.which == 13 && !ev.shiftKey) {
      this.props.addNode()
      ev.preventDefault()
    }
  },

  render: function() {
    return (
      <div className="list-item">
        <div className="list-item--name">
          <Editable
            newItem={this.props.newNode}
            ref="inputField"
            handleKeypress={this.handleKeypress}>
            {this.props.name}
          </Editable>
        </div>
        <div className="list-item--nodes">
          <Tree
            nodes={this.props.nodes}
            addNode={this.props.addNode} />
        </div>
      </div>
    )
  }
});

module.exports.Item = Item;
module.exports.Tree = Tree;
