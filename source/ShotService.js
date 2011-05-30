enyo.kind({
	name: "ShotService",
	kind: "WebService",
	published: {
		url: "",
		list: "popular",
		page: "1",
		per_page: "30",
		onSuccess: "",
		onFailure: ""
	},
	
	setList: function(inList) {
		this.list = inList;
		this.setUrl();
	},
	
	setPage: function(inPage) {
		this.page = inPage;
		this.setUrl();
	},
	
	incPage: function() {
		this.page++;
		this.setUrl();
	},
	
	setPerPage: function(inPerPage) {
		this.per_page = inPerPage;
		this.setUrl();
	},
	
	setUrl: function(inUrl) {
		this.url = inUrl || "http://api.dribbble.com/shots/" + this.list + "?per_page=" + this.per_page + "&page=" + this.page;
	}
});
