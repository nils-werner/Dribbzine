/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind({
	name: "VShotView",
	kind: enyo.VFlexBox,
	published: {
		items: []
	},
	components: [
		{kind: "VFlexBox", className: "shotview", flex: 1, components: [
			{kind: "VFlexBox", height: "450px", pack:"center", align:"stretch",  components: [
				{kind: "HFlexBox", height: "350px", pack:"center", align:"center",
					className:"frame",
					components: [
					{kind:"Image", name: "image0", className: "image", height: "300px", width: "400px", src: "", flex: 1}
				]},
				{name: "title0", height: "10px", className:"title", content: ""}
			]},
			
			{kind: "VFlexBox", height: "450px", pack:"center", align:"stretch",  components: [
				{kind: "HFlexBox", height: "350px", pack:"center", align:"center",
					className:"frame",
					components: [
					{kind:"Image", name: "image1", className: "image", height: "300px", width: "400px", src: "", flex: 1}
				]},
				{name: "title1", height: "10px", className:"title", content: ""}
			]},
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
