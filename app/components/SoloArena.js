var React = require('react');
var io = require('socket.io-client');

var ErrorList = require('./ErrorList');
var socket = require('../sockets/socket-helper');

var selfEditorOptions = {
  // theme: "ace/theme/solarized_light",
  theme: "ace/theme/dawn",
  mode: "ace/mode/javascript",
  useSoftTabs: true,
  tabSize: 2,
  wrap: true,
  showPrintMargin: false,
  fontSize: 16
};

var SoloArena = React.createClass({
  componentDidMount: function(){
    var editor = ace.edit("editor");
    editor.setOptions(selfEditorOptions);
    editor.$blockScrolling = Infinity;
    this.props.arenaActions.storeEditor(editor);
  },
  componentDidUpdate: function(){
    this.props.arena.editorSolo.setValue(this.props.arena.content,1);
  },

  render: function() {
    var submitProblem = function(){
      var errors = this.props.arena.editorSolo.getSession().getAnnotations();
      var content = this.props.arena.editorSolo.getSession().getValue();
      this.props.arenaActions.submitProblem(errors, content, this.props.arena.socket.id, this.props.arena.problem_id, this.props.user.github_handle, 'solo');
    }.bind(this);
    return (
      <div className="content">
        <div className="arena">
          
          <div id="editor" className="solo-editor">
          </div>
          
          <div className="messages">
            {this.props.arena.syntaxMessage !== '' ? <div className="syntax-messages"><ErrorList syntaxMessage={this.props.arena.syntaxMessage} errors={this.props.arena.errors}/></div> : null}
            {this.props.arena.submissionMessage !== "Nothing passing so far...(From initial arena reducer)" ? <div className="submission-message">SUBMISSION RESPONSE: {this.props.arena.submissionMessage}</div> : null}
          </div>
          
          <div className="console">{this.props.arena.stdout}
          <button className="submit submit-challenge" onClick={submitProblem}>SUBMIT</button>
          </div>

        </div>
      </div>
    );
  }
});

module.exports = SoloArena;
