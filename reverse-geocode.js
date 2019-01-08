'use strict';

const googleMapsClient = require('@google/maps').createClient({
	key: process.env.GMAPS_API_KEY,
	Promise
});

const redis = require('./redis');

module.exports = async latlng => {

	if (!latlng) {
		throw new Error('Invalid latlng');
	}
	try {
		const result = await redis.get(latlng);
		if (result) {
			return result;
		}
		const response = await googleMapsClient.reverseGeocode({latlng}).asPromise();
		await redis.set(latlng, response.json.results[0].formatted_address);
		return response.json.results[0].formatted_address;
	} catch (error) {
		console.log(error);
		return '';
	}
};
