/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind({
	name: "ShotCarousel",
	kind: enyo.VFlexBox,
	components: [
		{kind:"Header", components: [
			{content: "Dribbblr"},
			{kind: "Spacer"},
			{kind: "RadioToolButtonGroup", onChange: "listToggled", value:"popular", components: [
				{label: "Popular", name:"defaultbutton", value:"popular"},
				{label: "Everyone", value:"everyone"},
				{label: "Debuts", value:"debuts"}
			]}
		]},
		{name: "carousel", kind: "Carousel", flex: 1, 
			onGetLeft: "getLeft", 
			onGetRight: "getRight",
			onSnap: "snap",
			onSnapFinish: "snapFinish"
		},
		{name: "getShots", kind: "WebService",
			url: "",
			onSuccess: "handleSuccess",
			onFailure: "handleFailure"},
	],
	create: function() {
		this.results = [];
		this.inherited(arguments);
		this.listToggled(this.$.defaultbutton);
		this.index = 0;
	},
	resizeHandler: function(inSender, e) {
		this.inherited(arguments);
		this.$.carousel.resize();
	},
	getViewInfo: function(inIndex) {
		console.log(inIndex);
		if(inIndex >= 0 && inIndex+1 < this.results.length)
		return {kind: "ShotView", items: [this.results[inIndex], this.results[inIndex+1] ]};
		else return false;
	},
	getLeft: function(inSender, inSnap) {
		inSnap && (this.index = this.index-2);
		return this.getViewInfo(this.index-2);
	},
	getRight: function(inSender, inSnap) {
		inSnap && (this.index = this.index+2);
		return this.getViewInfo(this.index+2);
	},
	snap: function() {
		this.log();
	},
	snapFinish: function() {
		var v = this.$.carousel.fetchCurrentView();
		this.log(v.kindName + ": " + (v.headerContent || v.content));
	},
	
	/* BUTTONS */
	listToggled: function(inSender) {
		this.log("Selected button" + inSender.getValue());
		this.$.getShots.setUrl("http://api.dribbble.com/shots/" + inSender.getValue() + "?per_page=30");
		this.$.getShots.call();
	},
	
	/* AJAX */
	handleSuccess: function(inSender, inResponse) {
		this.results = inResponse.shots;
		this.index = 0;
		this.$.carousel.snapTo(this.index);
		this.$.carousel.setCenterView(this.getViewInfo(this.index));
	},
	handleFailure: function(inSender, inResponse) {
		console.log("got failure from getShots");
	}
});
