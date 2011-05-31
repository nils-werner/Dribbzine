/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind({
	name: "ShotLogin",
	kind: enyo.VFlexBox,
	published: {
		username: ""
	},
	events: {
		onSubmit: "",
	},
	components: [
		{kind: "Input", hint: "Username", name:"username", 
			spellcheck: false,
			autocorrect: false,
			autoCapitalize: "lowercase",
			autoWordComplete: false,
			selectAllOnFocus: true,
			onkeypress: "keypressHandler",
			onreturn:"buttonHandler"
		},
		{kind: "Button", caption: "OK", default: true, onclick: "buttonHandler"},
		{kind: "Button", caption: "Reset", onclick: "resetHandler"}
	],
	keypressHandler: function(inSender, inEvent) {
		if(inEvent.keyCode == 13) {
			enyo.keyboard.forceHide();
			this.buttonHandler();
		}
	},
	buttonHandler: function() {
		this.doSubmit({ value: this.$.username.getValue() });
	},
	resetHandler: function() {
		this.doSubmit({ value: "" });
	},
	usernameChanged: function() {
		this.$.username.setValue(this.username);
	}
});
