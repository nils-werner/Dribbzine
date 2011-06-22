/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind({
	name: "ShotCookie",
	kind: enyo.Control,
	components: [],
	setUsername: function(value) {
		enyo.setCookie("username", value);
	},
	getUsername: function() {
		return enyo.getCookie("username");
	},
	getFirstuse: function() {
		console.log("test");
		if(typeof(enyo.getCookie("firstuse")) == "undefined") {
			enyo.setCookie("firstuse", true);
			return true;
		}
		return false;
	}
});
