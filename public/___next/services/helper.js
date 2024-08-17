import Config from "./config";
 

class HelperData {

  generateToken = async () => {
     
    const staticData = await fetch(`${Config.api}/hash-request`, {
      cache: 'force-cache',
      headers: {
        "x-api-key": Config.app_key,
        "agent": 'User Agent Data'
      }
    });
  
    return staticData;
  };
  

  sendRequest = async ({api, method, data, headers }) => {

    if( headers === undefined ) {
        headers = {};
    }
    
    
    var token = '';

    // generate token 
    var request = await this.generateToken();
    if( request.status == 200 ) {
      var response = await request.json();
      if( ! response.is_error ) {
        token = response.data;
      }
    } 

    headers["x-api-key"] = Config.app_key 
    headers["authorization"] = token;
    
    var response = await fetch(`${Config.api}/${api}`, {
      cache: 'force-cache',
      headers
    }); 
     
    return response;
  }

}

var Helper = new HelperData();

export default Helper; 
