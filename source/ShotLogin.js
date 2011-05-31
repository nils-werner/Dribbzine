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
		{kind: "Input", hint: "Username", name:"username"},
		{kind: "Button", caption: "OK", onclick: "buttonHandler"}
	],
	buttonHandler: function() {
		this.doSubmit({ value: this.$.username.getValue() });
	},
	usernameChanged: function() {
		this.$.username.setValue(this.username);
	}
});
