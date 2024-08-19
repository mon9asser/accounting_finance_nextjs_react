export default function Post ({upcoming}) {
     
    return <b>Post</b>
}


export async function getServerSideProps(context) {   

    try {
        
        var {tutorial, post} = context.params;
        
        var request = await Helper.sendRequest({  
            api: `tutorial-page/get?tut_name=${tutorial}&tab=root`,
            method: "get",
            data: {}
        })
        
        

        if (!request.ok) {
            throw new Error('Server is offline');
        }
    
        var upcoming = {};
        
        if( request.status == 200) {
            
            var json = await request.json();  
            console.log(json);
            if( json.is_error && !json.data.length ) {
                console.log("data here")
                return {
                    notFound: true
                }
            }

            var site_url = json.data.settings.site_address;
            if(site_url) {
                var url_array = site_url.split('/');
                if( url_array[url_array.length - 1] != '' ) {
                    site_url = site_url + '/';
                }
            } 
            json.data.settings.site_address = site_url;

            if( json.data.settings?.beside_post_title != "") {
                // json.data.settings?.beside_post_title
                if( json.data.tutorial?.meta_title) {
                    json.data.tutorial.meta_title = json.data.tutorial.meta_title + " " + json.data.settings?.beside_post_title;
                }
            }

            // prepare lists from menu 
            var nav_left = json.data.menus?.filter( x=> x.menu_name === "main_menu")
            var nav_right = json.data.menus?.filter( x=> x.menu_name === 'main_nav_right');
            var company_links = json.data.menus?.filter( x=> x.menu_name === "company_nav_links")
            var follow_links = json.data.menus?.filter( x=> x.menu_name === 'follow_nav_links');
            var nav_links = json.data.menus?.filter( x=> x.menu_name === 'tags_nav_links');

            upcoming = {
                tutorial: json.data.tutorial,
                posts: json.data.posts,
                chapters: json.data.chapters,
                settings: json.data.settings,
                ads: json.data.ads,
                menus: json.data.menus,
                is_redirect: json.redirect,
                nav_right,
                nav_left,
                company_links,
                follow_links,
                nav_links,
                site_url,
            }
        }

        return {
            props: {upcoming}
        }

    } catch (error) {
        context.res.statusCode = 500;
        return { props: { error: 'Server is offline, please try again later.' } };
    }

}