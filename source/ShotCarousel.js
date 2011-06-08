/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */
enyo.kind({
	name: "ShotCarousel",
	kind: enyo.VFlexBox,
	className: "shotcarousel",
	components: [
		{kind:"Header", className:"header", height: "60px", components: [
			{kind:"Image", "src":"images/splashicon46.png", style: "margin-right: 10px; margin-top: -5px;"},
			{content: "Bench", className:"headtitle"},
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
		{kind: "HFlexBox", components: [
			{kind: "Spacer", flex: 1},
			{kind:"ShotPaginator", name:"paginator", className:"paginator"},
			{kind: "Spacer", flex: 1}
		]},
		{name: "getShots", kind: "ShotService",
			url: "",
			onSuccess: "handleSuccess",
			onFailure: "handleFailure"
		},
		{kind: "Scrim", name:"scrim", layoutKind: "VFlexLayout", align:"center", pack:"center", components: [
			{kind: "SpinnerLarge", name:"spinnerlarge"},
		]},
		{kind: "ShotLogin", name:"login", onSubmit: "handleSubmit"},
		{kind: "AppMenu", components: [
			{caption: "Login...", onclick: "openLogin"}
		]},
		{kind: enyo.ApplicationEvents, 
			onWindowRotated: "rotate"
		},
		{kind: "ShotCookie", name:"cookie"}
	],
	create: function() {
		this.inherited(arguments);
		this.results = [];
		this.index = 0;
		this.inrequest = false;
		this.thereismore = true;
		this.username = "";
		this.firstuse = false;
		this.orientation = this.fixRotation(enyo.getWindowOrientation());
	},
	ready: function() {
		if(runningInBrowser) {
			this.firstuse = true;
			this.username = "";
		}
		else {
			this.firstuse = this.$.cookie.getFirstuse();
			this.username = this.$.cookie.getUsername() || "";
		}
		
		enyo.nextTick(enyo.bind(this, "validateUser"));
	},
	validateUser: function() {
		this.$.getShots.setUser(this.username);
		if(this.username != "" || this.firstuse == true) {
			this.$.follbutton.setShowing(true);
		}
		else {
			this.$.follbutton.setShowing(false);

		}
		
		if(this.username != "") {
			this.listToggled(this.$.follbutton);
		}
		else {
			this.listToggled(this.$.popbutton);
		}
		
		this.$.listtype.render();
	},
	
	openLogin: function() {
		this.$.login.openAtCenter();
		this.$.login.username = this.username;
		this.$.login.usernameChanged();
	},
	handleSubmit: function(inSender, inEvent) {
		this.username = inEvent.value;
		this.firstuse = false;
		this.$.cookie.setUsername(this.username);
		this.$.login.close();
		this.validateUser();
	},
	
	resizeHandler: function(inSender, e) {
		this.inherited(arguments);
		this.$.carousel.resize();
	},
	getViewInfo: function(inIndex) {
		//console.log(inIndex);
		if(this.results.length > 0 && this.results.length - inIndex < 6 && !this.inrequest && this.thereismore) {
			this.inrequest = true;
			this.listApproachingEnd();
		}
		
		//console.log(inIndex);
		
		if(this.results.length == 0) { // show hint if there is no data
			if(this.thereismore) {
				this.thereismore = false;
				return {kind: "NoShotView"};
			}
			else { // disable scrolling for hint
				return false;
			}
		}
		else {
			if(inIndex >= 0 && inIndex+1 < this.results.length) { // there is more data, show it!
				if(this.orientation == "up" || this.orientation == "down") {
					return {kind: "HShotView", items: [this.results[inIndex], this.results[inIndex+1] ]};
				}
				else {
					return {kind: "VShotView", items: [this.results[inIndex], this.results[inIndex+1] ]};
				}
			}
			else { // there is no more data
				return false;
			}
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
		console.log(this.index);
	},
	snapFinish: function() {
		var v = this.$.carousel.fetchCurrentView();
		this.$.paginator.setPage(this.index);
	},
	
	/* BUTTONS */
	listToggled: function(inSender) {
		this.log("Selected button" + inSender.getValue());
		if(this.username == "" && inSender.getValue() == "following") {
			this.openLogin();
			return;
		}
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
				this.$.carousel.previous();
				this.index = 0;
			}
			console.log("Creating new results");
			if(inResponse.shots) {
				this.results = inResponse.shots;
				this.$.carousel.setCenterView(this.getViewInfo(this.index));
				this.thereismore = true;
			}
			else {
				this,results = [];
				this.thereismore = false;
			}
			this.$.paginator.setPage(0);
			this.$.scrim.hide();
			this.$.spinnerlarge.hide();
		}
		else {
			if(inResponse.shots.length > 0) {
				console.log("Appending to results");
				for(i in inResponse.shots)
					this.results.push(inResponse.shots[i]);
			}
			else {
				this.thereismore = false;
			}
			this.$.spinner.hide();
		}
		this.inrequest = false;
		this.$.paginator.setTotal(this.results.length);
	},
	handleFailure: function(inSender, inResponse) {
		console.log("got failure from getShots");
		console.log(inSender.page);
		if(inSender.page == 1) {
			this.results = [];
			this.index = 0;
			this.thereismore = true;
			this.$.carousel.snapTo(0);
			this.$.scrim.hide();
			this.$.spinnerlarge.hide();
		}
		else {
			this.thereismore = false;
			this.$.spinner.hide();
		}
		this.$.carousel.setCenterView(this.getViewInfo(this.index));
		this.inrequest = false;
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
