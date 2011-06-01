enyo.kind({
	name: "ShotService",
	kind: "WebService",
	published: {
		url: "",
		list: "popular",
		username: "",
		page: "1",
		per_page: "20",
		onSuccess: "",
		onFailure: "",
		timeout: 3000
	},
	
	setList: function(inList) {
		this.list = inList;
		this.validateList();
		this.setUrl();
	},
	
	validateList: function() {
		if(this.username == "" && this.list == "following")
			this.list = "popular";
	},
	
	setUser: function(inUser) {
		this.username = inUser;
		this.validateList();
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
		if(this.list == "following") {
			var url = "http://api.dribbble.com/players/" + this.username + "/shots/following?per_page=" + this.per_page + "&page=" + this.page;
		}
		else {
			var url = "http://api.dribbble.com/shots/" + this.list + "?per_page=" + this.per_page + "&page=" + this.page;
		}
		this.url = inUrl || url;
	}
});
