import Config from "./config";
import he from 'he';
import { createElement } from "react";

class HelperData {

  renderArrayElements_old = (elements) => {
      
    if( elements == undefined ) {
      return []
    }

    return elements.map((element, index) => { 
        const { type, props } = element;
        return createElement(type, { ...props, key: index });
    });

  }

  renderArrayElements = (elements) => {
    if (elements === undefined) {
        return [];
    }

    return elements.map((element, index) => {
        const { type, props } = element;
        
        // Decode HTML entities in all string props using 'he'
        const sanitizedProps = { ...props };
        Object.keys(sanitizedProps).forEach((key) => {
            if (typeof sanitizedProps[key] === 'string') {
                console.log(he.decode(sanitizedProps[key]));
                sanitizedProps[key] = he.decode(sanitizedProps[key]);
            }
        });

        return createElement(type, { ...sanitizedProps, key: index });
    });
}



     

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
    
    var requestObject = {
      cache: 'force-cache',
      headers,
      method 
    }

    if( method.toLowerCase() == 'post') {
      requestObject.body = data; 
    }

    var response = await fetch(`${Config.api}/${api}`, requestObject ); 
     
    return response;
  }

}

var Helper = new HelperData();

export default Helper; 
