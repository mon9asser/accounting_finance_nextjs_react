import Head from "next/head";
import Image from "next/image";
import Helper from "services/helper";

import Header from "parts/header";


function YourComponent() {
  return (
    <div>
      <Image
        src={'https://freeaccountingtutorial.com/uploads/free-accounting-tutorial.webp'}
        width={180}
        height={40}
        alt="Free Accounting Tutorial"
      />
    </div>
  );
}

export default function Home({upcoming}) {
    
    return (
      <>
        <Head>
          <title>{upcoming.title}</title>
        </Head>

        <div>
        <YourComponent/>
        </div>
        <Header settings={upcoming.settings} menus={upcoming.menus}/>

        <div>
          <h1>{upcoming.title}</h1>
        </div>
      </>
    );
}

export async function getServerSideProps() {

  var request = await Helper.sendRequest({
    api: "home-page/get",
    method: "get",
    data: {} 
  })
   
  var upcoming = {};

  if( request.status == 200) {

      var json = await request.json(); 
      var site_url = json.data.settings.site_address;
      if(site_url) {
            var url_array = site_url.split('/');
            if( url_array[url_array.length - 1] != '' ) {
                site_url = site_url + '/';
            }
      } 
      json.data.settings.site_address = site_url;

      if( json.data.settings.site_meta_title != '' ) {
        json.data.settings.site_meta_title = `${json.data.settings.site_meta_title} ${json.data.settings.beside_post_title}`;
      }

      upcoming = {
        tutorials: json.data.tutorials,
        posts: json.data.posts, 
        settings: json.data.settings,
        site_url,
        menus: json.data.menus,
        ads: json.data.ads
      };

  }
  
  return {
    props: {upcoming}
  }

}
  