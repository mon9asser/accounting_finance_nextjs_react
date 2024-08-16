import Head from "next/head";
import Helper from "services/helper";


export default function Home({serverData}) {
    return (
      <>
        <Head>
          <title>{serverData.title}</title>
        </Head>
        <div>
          <h1>{serverData.title}</h1>
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
   
  var serverData = {};

  if( request.status == 200) {
     var json = await request.json();
     serverData.title = json.data.settings.site_meta_title;
  }
  
  return {
    props: {serverData}
  }

}
  