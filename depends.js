/* Copyright 2009-2011 Hewlett-Packard Development Company, L.P. All rights reserved. */

runningInBrowser = window.runningInBrowser ? window.runningInBrowser : (window.PalmSystem ? false : true);

enyo.depends(
	"source/VShotView.js",
	"source/HShotView.js",
	"source/NoShotView.js",
	"source/ShotCarousel.js",
	"source/ShotService.js",
	"source/ShotLogin.js",
	"source/ShotCookie.js",
	"stylesheets/dribbblr.css"
);
