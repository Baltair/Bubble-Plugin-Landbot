function(instance, properties, context) {
    
	instance.data.myLandbot.showProactive([{
        type: 'text',
        message: properties.value,
    }]);

}