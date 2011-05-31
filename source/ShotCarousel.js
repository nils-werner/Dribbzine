/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind({
	name: "ShotCarousel",
	kind: enyo.VFlexBox,
	className: "shotcarousel",
	components: [
		{kind:"Header", className:"header", height: "60px", components: [
			{kind:"Image", "src":"images/ball-small.png", style: "margin-right: 10px;"},
			{content: "Dribbblr", className:"headtitle"},
			{kind: "Spacer"},
			{kind: "Spinner", name:"spinner", className: "spinner"},
			{kind: "RadioToolButtonGroup", name:"listtype", onChange: "listToggled", value:0, components: [
				{label: "Following", name:"follbutton", value:"following", showing: false},
				{label: "Popular", name:"popbutton", value:"popular"},
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
		{name: "getShots", kind: "ShotService",
			url: "",
			onSuccess: "handleSuccess",
			onFailure: "handleFailure"
		},
		{kind: "Scrim", name:"scrim", layoutKind: "VFlexLayout", align:"center", pack:"center", components: [
			{kind: "SpinnerLarge", name:"spinnerlarge"},
		]},
		{kind: "Popup", name:"loginpopup", components: [
			{kind: "ShotLogin", name:"login", onSubmit: "handleSubmit"}
		]},
		{kind: "AppMenu", components: [
			{caption: "Set Username", onclick: "openLogin"}
		]},
		{kind: enyo.ApplicationEvents, 
			onWindowRotated: "rotate"
		},
		{kind: "ShotCookie", name:"cookie"}
	],
	create: function() {
		this.results = [];
		this.inherited(arguments);
		this.index = 0;
		this.inrequest = false;
		this.orientation = this.fixRotation(enyo.getWindowOrientation());
	},
	ready: function() {
		this.username = this.$.cookie.getCookie();
		if(this.username && this.username != "") {
			this.$.getShots.setUser(this.username);
			this.$.follbutton.setShowing(true);
			this.listToggled(this.$.follbutton);
		}
		else {
			this.listToggled(this.$.popbutton);
		}
	},
	
	openLogin: function() {
		this.$.loginpopup.openAtCenter();
		this.$.login.username = this.$.cookie.getCookie();
		this.$.login.usernameChanged();
	},
	handleSubmit: function(inSender, inEvent) {
		this.$.loginpopup.close();
		this.$.cookie.setCookie(inEvent.value);
		this.$.getShots.setUser(inEvent.value);
	},
	
	resizeHandler: function(inSender, e) {
		this.inherited(arguments);
		this.$.carousel.resize();
	},
	getViewInfo: function(inIndex) {
		//console.log(inIndex);
		if(this.results.length - inIndex < 10 && !this.inrequest) {
			this.inrequest = true;
			this.listApproachingEnd();
		}
		
		if(inIndex >= 0 && inIndex+1 < this.results.length) {
			if(this.orientation == "up" || this.orientation == "down") {
				return {kind: "HShotView", items: [this.results[inIndex], this.results[inIndex+1] ]};
			}
			else {
				return {kind: "VShotView", items: [this.results[inIndex], this.results[inIndex+1] ]};
			}
		}
		else {
			return false;
		}
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
		//this.log();
	},
	snapFinish: function() {
		var v = this.$.carousel.fetchCurrentView();
		//this.log(v.kindName + ": " + (v.headerContent || v.content));
	},
	
	/* BUTTONS */
	listToggled: function(inSender) {
		this.log("Selected button" + inSender.getValue());
		this.$.listtype.setValue(inSender.getValue());
		this.$.getShots.setPage(1);
		this.$.getShots.setList(inSender.getValue());
		this.$.scrim.show();
		this.$.spinnerlarge.show();
		this.$.getShots.call();
	},
	
	listApproachingEnd: function() {
		this.log("List approaching end");
		this.$.getShots.incPage();
		this.$.spinner.show();
		this.$.getShots.call();
	},
	
	/* AJAX */
	handleSuccess: function(inSender, inResponse) {
		if(inSender.page == 1) {
			if(this.results && this.results.length > 0) {
				this.$.carousel.snapTo(0);
				this.index = 0;
			}
			console.log("Creating new results");
			this.results = inResponse.shots;
			this.$.carousel.setCenterView(this.getViewInfo(this.index));
		}
		else {
			console.log("Appending to results");
			for(i in inResponse.shots)
				this.results.push(inResponse.shots[i]);
		}
		this.inrequest = false;
		this.$.scrim.hide();
		this.$.spinner.hide();
		this.$.spinnerlarge.hide();
	},
	handleFailure: function(inSender, inResponse) {
		console.log("got failure from getShots");
	},
	
	rotate: function(inSender, inEvent) {
		this.orientation = this.fixRotation(inEvent.orientation);
		this.$.carousel.setCenterView(this.getViewInfo(this.index));
	},
	
	fixRotation: function(rotation) {
		if(rotation == "up" || rotation == "down") {
			if(runningInBrowser) {
				rotation = "left";
			}
		}
		else {
			if(runningInBrowser) {
				rotation = "up";
			}
		}
		return rotation;
	}
});
