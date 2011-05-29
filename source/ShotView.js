/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind({
	name: "ShotView",
	kind: enyo.VFlexBox,
	published: {
		items: []
	},
	components: [
		{kind: "HFlexBox", flex: 1, components: [
			{kind: "VFlexBox", flex: 1, components: [
				{kind:"Image", name: "image0", height: "200px", width: "300px", src: "", flex: 1},
				{kind:"Header", name: "title0", content: ""}
			]},
			{kind: "VFlexBox", flex: 1, components: [
				{kind:"Image", name: "image1", height: "200px", width: "300px", src: "", flex: 1},
				{kind:"Header", name: "title1", content: ""}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.itemsChanged();
	},
	itemsChanged: function() {
		this.$.title0.setContent(this.items[0].title);
		this.$.title1.setContent(this.items[1].title);
		
		this.$.image0.setSrc(this.items[0].image_url);
		this.$.image1.setSrc(this.items[1].image_url);
	}
});
