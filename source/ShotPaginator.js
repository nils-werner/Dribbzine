enyo.kind({
	name: "ShotPaginator",
	kind: enyo.HtmlContent,
	published: {
		page: 0,
		total: 0,
		content: "",
	},
	setPage: function(inPage) {
		console.log("paginator p" + inPage);
		this.page = inPage;
		this.updateContent();
	},
	setTotal: function(inTotal) {
		console.log("paginator t" + inTotal);
		this.total = inTotal;
		this.updateContent();
	},
	updateContent: function(inContent) {
		this.setContent(((this.page/2)+1) + " " + $L("of") + " " + (this.total/2));
	}
});
