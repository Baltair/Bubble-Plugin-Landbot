function(instance, properties, context) {
    let newBotURL = properties.override_bot_url !== instance.data.lastBotURL;

    if (newBotURL){
        instance.data.lastBotURL = properties.override_bot_url;
        var mode = "";
        var botURL = properties.override_bot_url || context.keys["Landbot URL"];
        var formatedURL = botURL.replace(/\.html$/,'.json');
        var options = {
            configUrl: formatedURL
        };
        
        function initLandbot() {
            if (newBotURL) {
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.addEventListener('load', function() {
                    instance.data.myLandbot = eval("new Landbot." + mode + "(options)");
                });
                s.src = 'https://static.landbot.io/landbot-3/landbot-3.0.0.js';
                var x = document.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
            }
        }        

        switch (properties.mode){
            case "Livechat":
                mode = "Livechat";
                instance.data.canSEO = true;
                break;
                
            case "Popup":
                mode = "Popup";
                instance.data.canSEO = true;
                break;
                
            case "Embed":
                mode = "Container";
                let uid = document.querySelectorAll('[id^="myLandbot-"]').length
                instance.canvas.innerHTML = `<div id="myLandbot-${uid}" class"uniqueLandbotForCount" style="width: 100%; height: 100%"></div>`;
                options.container = "#myLandbot-" + uid;
                break;
        } 
        
        if(instance.data.myLandbot){instance.data.myLandbot.destroy();}
        if (properties.improve_seo && instance.data.canSEO){
            window.addEventListener('mouseover', initLandbot, { once: true });
            window.addEventListener('touchstart', initLandbot, { once: true });
        } else {
            initLandbot();
        }
    }       
}