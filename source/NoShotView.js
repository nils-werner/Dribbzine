/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind({
	name: "NoShotView",
	kind: enyo.VFlexBox,
	published: {},
	components: [
		{kind: "VFlexBox", flex:1,  pack:"center", align:"center",  components: [
				{content:"There is nothing to show.", className:"subtlehint"}
		]}
	]
});
