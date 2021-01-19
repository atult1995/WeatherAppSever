const request = require('postman-request');

const forecast=(lat,long,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=29eb0a7cb9256faee51270bdfe88366d&query="+lat+","+long+"&units=f"
    request({url:url,json:true}, function (error,{body}) {
        //const data=JSON.parse(response.body)/;
        //console.log(data.current);
        if(error){
            callback("unable to connect to weather service",undefined);
        }else if(body.error){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+". It is current " +body.current.temperature+ " degree out. There is a " +body.current.precip+ "% chance of rain");
        }
    })
}
module.exports=forecast