import { useState, useRef } from "react";
import { useRouter } from 'next/router';

import Helper from "./helper";

function SearchComponent ({searchType}) {
    
    var [query, setQuery] = useState('');
    var [is_pressed, setIsPressed] = useState(false);
 
    const router = useRouter();

    var sendRequest = (e) => {
        e.preventDefault(); 
        setIsPressed(true);
        setTimeout(() => {
          setIsPressed(false);
          router.push(`/search?q=${query}`)
        }, 3000)
        
    }

    // seach components 
    var render = (
      <form className="search-form" style={{marginTop: '25px'}}>
          <input onChange={e => setQuery(e.target.value)} value={query} type="text" placeholder="What are you looking for?" />
          <button onClick={sendRequest} className="btn third-btn radius-5 custom-header-btn">
            {is_pressed?<span className='loader'></span>: 'Search'}
          </button>
      </form>
    );

    // sidebar seach components 
    if( searchType == 'sidebar' ) {
      render = (
        <form className="form-group form-1" action="/" method="get">
            <input onChange={e => setQuery(e.target.value)} value={query} type="text" placeholder="Search in our tutorials" />
            <button onClick={sendRequest} type="submit">
                {is_pressed?<span className='loader black-loader'></span>: <span className="flexbox">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="7" className="stroke-color" stroke="#33363F" strokeWidth="2" />
                        <path d="M20 20L17 17" className="stroke-color" stroke="#33363F" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </span>}
                
            </button>
        </form>
      );
    }

    return render;

}

function AdCompaignBox({ position, data, classes }) {
  const adRef = useRef(null);

  if (!data) {
    return null;
  }

  const index = data.findIndex(x => x.position === position);
  if (index === -1) {
    return null;
  }

  useEffect(() => {
    if (!adRef.current) return;

    const box = data[index].code;
    adRef.current.innerHTML = box;
    
    const scripts = adRef.current.querySelectorAll('script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      newScript.textContent = script.textContent;
      Array.from(script.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      script.parentNode.replaceChild(newScript, script);
    });
  }, [data, index]);

  const combinedClasses = classes ? `ad-box ${classes}` : 'ad-box';

  return <div className={combinedClasses} ref={adRef}></div>;
};

function SubscribeComponents ({is_footer, title, description, camp_data }) {
         
  var [email, setEmail] = useState('')
  var [result, setRestult] = useState({
      message: '',
      cls: '', // show
      type: '',  // error - success
      is_pressed: false
  });

  var response_results_callback = (obj) => {
      var old_objec = {...result};
      var __keys = Object.keys(obj);
      __keys.map(x => {
          old_objec[x] = obj[x]
      }); 
      setRestult(old_objec);
  } 
 
  var send_data = (e) => {
    
    e.preventDefault();

    response_results_callback({ 
      is_pressed: true
    }); 

    Helper.sendRequest({
      api: 'user/subscribe',
      data: {
        email: email
      },
      method: 'post'
    }).then( async row => {
      
      var res =  await row.json(); 
      var to_be_state = {};
      to_be_state.message= res.data;
      to_be_state.cls= 'show';
      to_be_state.is_pressed= false;

      if( res.is_error ) { 
        to_be_state.type= 'error';
      } else {
        to_be_state.type= 'success';
      }
      //console.log(to_be_state, res)
      response_results_callback(to_be_state);

      setTimeout(() => {
        response_results_callback({
          message: '',
          cls: '',
          type: ''
        });
      }, 3000)

    });


  }

  return (
    <>
      {
        is_footer ?
        <h2 className="title">{title}</h2> :
        <h1 className="custom-headline section-head" dangerouslySetInnerHTML={{__html: title}} />  
      }

      {
        is_footer ?
        <p className="font-16 pb-15">{description}</p> :
        <p>{description}</p>  
      }
      
      
      <div style={{margin: "0 auto"}}>
        <div className={`response-msg ${result.cls} ${result.type}`}>{result.message}</div>
          <AdCompaignBox position="before_subscribe" data={camp_data}/> 
          <form className="set-center form-group set-focus" action="/" method="get"> 
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" />
              <button className="btn primary-btn" type="submit" onClick={send_data}>
                {
                  result.is_pressed ?
                  <span className='loader'></span>: 
                  'Subscribe'
                }
              </button>
          </form>
          <AdCompaignBox position="after_subscribe" data={camp_data}/> 
      </div>
    </>
  )
}


export {
  SearchComponent,
  AdCompaignBox,
  SubscribeComponents
}