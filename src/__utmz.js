(function(d, w){
    'use strict';

    w._gaq = w._gaq || [];
    if (typeof w._gaq.push.override == "function") return;

    var debug = true,  //for debugging

        //map of google cookie utm variables to human readable names
        map =
        {
            'utmcsr'    : 'source',
            'utmccn'    : 'campaign',
            'utmcmd'    : 'medium',
            'utmcct'    : 'content',
            'utmctr'    : 'term',
            'utmgclid'  : 'gclid'
        },

        //simple regex to retrieve cookie value
        cookieValue = d.cookie.replace(/(?:(?:^|.*;\s*)__utmz\s*\=\s*([^;]*).*$)|^.*$/, "$1"),

        //parses Google Cookie and returns an object containing the data with human readable keys
        parseCookieValue = function(settings){
            settings = settings || [];
            var pair, i,
                value = cookieValue.split('.').pop().split('|');

            log('cookie', value);
            log('incoming', settings);

            while(pair = value.shift()){
                pair = pair.split('=');

                for (i in map){
                    //we want to make sure we don't overwrite values that aren't already set by the push
                    if (typeof map[pair[0]] == "undefined" || settings.hasOwnProperty(map[pair[0]])) continue;
                    settings[map[pair[0]]] = pair[1];
                }
            }

            return settings;
        };


    /**
     * log()
     * ---
     * wrapper for console log
     */
    function log(){
        if (console && debug) {
            console.log.apply(console, arguments);
        }
    }


    /**
     * overrideCookie( settings from google cookie )
     * @param settings - object with utm vars as keys
     */
    function overrideCookie(settings){
        var settings = parseCookieValue(settings),
            head = cookieValue.split('.'),
            utmz = [],
            domain,
            i,
            expire = 87660;//in a year

        //get id
        head = head.splice(0, head.length-1).join('.');

        //append the rest of the utm vars
        for (i in map){
            if (typeof settings[map[i]] === "undefined") continue;

            utmz.push({
                key: i,
                val: settings[map[i]],
                toString: function(){ return this.key + '=' + encodeURI(this.val)}
            })
        }

        //join the rest of the utm values
        head += '.'+ utmz.join('|');

        //get domain
        domain = d.location.host.replace(d.location.host.split('.').shift(), '')

        //set expiry
        var expiry = new Date();
        expiry.setTime(expiry.getTime() + expire);
        expire = expiry.toGMTString();

        //for debugging
        log('outgoing', settings, cookieValue);
        log('cookie head', head);
        log('utmz', utmz);
        log('domain', domain);

        //set the cookie
        d.cookie = '__utmz='+head+'; expires='+expire+'; domain='+domain+'; path=/';
    }

    /**
     * run()
     * ---
     * @param object - list of utm vars
     *
        _gaq.push.override(
             ['_setCampaign',    '<1campaign>'],
             ['_setSource',      '<sour12ce>'],
             ['_setContent',     '<c3ontent>']
         );
     * mapped to override function
     */
    var run = function(){
        var _set,  args =  Array.prototype.slice.apply(arguments), settings = [];

        while(_set = args.shift()){
            if (typeof _set !== "object" && typeof _set[0] !== "undefined" && typeof _set[1] !== "undefined") continue;
            settings[ _set[0].replace('_set','').toLowerCase() ] = _set[1];
        }

        overrideCookie(settings);
    }

    /**
     * set push functions on familar google _gaq object
     */
    w._gaq.push.override = run;

})(document, window);