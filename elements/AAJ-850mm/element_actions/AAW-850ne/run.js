function(instance, properties, context) {
	if (instance.data.myLandbot && instance.data.canSEO){
		instance.data.myLandbot.close();
    }
}