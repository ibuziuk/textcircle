this.Documents = new Mongo.Collection("documents");

if (Meteor.isClient) {
	Template.editor.helpers({
		docid: function(){
			var doc = Documents.findOne();
			if (doc) {
				return doc._id;
			} else {
				return undefiened
			}
		},
		config: function(){
			return function (editor) {
				console.log(editor);
				editor.on("change", function(cm_editor, info) {
					console.log(cm_editor.getValue());
					$("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
				}); 
			}
		}
	});

	Template.viewer.helpers({
		docid: function(){
		}
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  	if(!Documents.findOne()) { // no documents yet
  		Documents.insert({title:"my new document"});
  	}
  });
}
