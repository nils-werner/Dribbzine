/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind({
	name: "ShotLogin",
	kind: enyo.ModalDialog,
	caption: $L("Login"),
	published: {
		username: ""
	},
	events: {
		onSubmit: "",
	},
	components: [
		{kind:"RowGroup", components: [
			{kind: "Input", hint: "Username", name:"username", 
				spellcheck: false,
				autocorrect: false,
				autoCapitalize: "lowercase",
				autoWordComplete: false,
				selectAllOnFocus: true
			}
		]},
		{kind:"Spacer", height: "10px"},
		{content: $L("You don't need to provide your password as most of your profile-data is accessible anonymously."), className: "smallhint"},
		{kind:"Spacer", height: "20px"},
		{kind: "HFlexBox", components: [
			{kind: "Button", flex: 1, caption: $L("Reset"), onclick: "resetHandler"},
			{kind: "Button", flex: 1, caption: $L("Login"), className: "enyo-button-dark", default: true, onclick: "buttonHandler"}
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
