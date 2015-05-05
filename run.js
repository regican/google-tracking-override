(function(d,w,u){
	var __get = (function () {
		var map = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			map[key] = value;
		});
		return map;
	})();

	if (typeof __get.rfsn !== u){
		var script 	= d.createElement("script"),
			head 	= d.head || d.getElementsByTagName("head")[0];

		script.async = 1;
		script.src 	= '/src/__utmz.min.js';
		script.onload = function(){
			w._gaq = w._gaq || false;
			if (w._gaq){
				w._gaq.push.override(
		             ['_setCampaign',    __get.rfsn.split('.')[0]],
		             ['_setSource',      'refersion'],
		             ['_setContent',     'affiliate']
		        );
			}
		}

		head.appendChild(script);
	}

})(document,window, "undefined")