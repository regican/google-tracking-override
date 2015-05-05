(function(d,w,u,url){
	var __get = (function () {
		var map = {},
			parts = w.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
				map[key] = value;
			});
		return map;
	})();

	if (typeof __get.rfsn !== u){
		var script 	= d.createElement("script"),
			head 	= d.head || d.getElementsByTagName("head")[0];

		script.async = 1;
		script.src 	= url;
		script.onload = function(){
			w._gaq = w._gaq || false;
			if (w._gaq){
				try {
					w._gaq.push.override(
		            	['_setCampaign',    __get.rfsn.split('.')[0]],
		             	['_setSource',      'refersion'],
		            	['_setContent',     'affiliate']
		        	);
				}catch(e){}
			}
		}

		head.appendChild(script);
	}

})(document,window,"undefined","//d3jwh6hymghfj0.cloudfront.net/www/js/trk/__utmz.min.js")