/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind({
	name: "ShotView",
	kind: enyo.VFlexBox,
	published: {
		items: []
	},
	components: [
		{kind: "HFlexBox", flex: 1, pack: "stretch", components: [
			{kind: "VFlexBox", flex: 1, pack: "stretch", components: [
				{kind:"Header", name: "title0", content: ""},
				{kind:"Image", name: "image0", src: "", flex: 1}
			]},
			{kind: "VFlexBox", flex: 1, pack: "stretch", components: [
				{kind:"Header", name: "title1", content: ""},
				{kind:"Image", name: "image1", src: "", flex: 1}
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
		
		this.$.image0.setSrc("/home/nils/Desktop/Skifahren/IMG_2752.JPG");
		this.$.image1.setSrc("/home/nils/Desktop/Skifahren/IMG_2752.JPG");
	}
});
