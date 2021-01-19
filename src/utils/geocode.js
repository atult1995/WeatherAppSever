const request = require('postman-request');


const geocode=(address,callback)=>{
    const geoCodeUrl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiYXR1bHByYWthc2gxOTk3IiwiYSI6ImNrajVocmU5ODB2bG8yem5xaDd1aHVoa3MifQ.1h2CEpjZfrF7iVxyIc3URA"
        request({url:geoCodeUrl,json:true},(error , {body})=>{
        if(error){
            callback("unable to connect location service",undefined);
        }else if(body.error){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined,{
                lattitude:body.features[0].center[1],
                longitude:body.features[0].center[0]
            })
        }
    })
}
module.exports=geocode