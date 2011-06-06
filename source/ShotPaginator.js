enyo.kind({
	name: "ShotPaginator",
	kind: enyo.HtmlContent,
	published: {
		page: "",
		total: "",
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
		this.setContent((this.page/2) + " of " + (this.total/2));
	}
});
