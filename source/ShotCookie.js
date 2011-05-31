/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind({
	name: "ShotCookie",
	kind: enyo.Control,
	components: [],
	setCookie: function(value) {
		enyo.setCookie("userInfo", value);
	},
	getCookie: function() {
		return enyo.getCookie("userInfo");
	}
});
