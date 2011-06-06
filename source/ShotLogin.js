/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind({
	name: "ShotLogin",
	kind: enyo.ModalDialog,
	caption: "Login",
	published: {
		username: ""
	},
	events: {
		onSubmit: "",
	},
	components: [
		{content: "In order to display the shots of players you are following, please enter your username below.", className: "smallhint"},
		{kind:"Spacer", height: "20px"},
		{kind:"RowGroup", components: [
			{kind: "Input", hint: "Username", name:"username", 
				spellcheck: false,
				autocorrect: false,
				autoCapitalize: "lowercase",
				autoWordComplete: false,
				selectAllOnFocus: true,
				onkeypress: "keypressHandler"
			}
		]},
		{kind:"Spacer", height: "10px"},
		{kind: "HFlexBox", components: [
			{kind: "Button", flex: 1, caption: "Reset", onclick: "resetHandler"},
			{kind: "Button", flex: 1, caption: "Login", className: "enyo-button-dark", default: true, onclick: "buttonHandler"}
		]}
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
