import React, { Component } from "react";
import { Header } from "../parts/header"; 
import { Footer } from "../parts/footer";
import { Link } from "react-router-dom";
import withNavigation from "../utils/with-navigation";
import { Helper } from "../helper";
import { Helmet } from "react-helmet";
import { Settings } from "../settings";
import ReCAPTCHA from "react-google-recaptcha"; 
import { LazyLoadImage } from 'react-lazy-load-image-component';

var TermsConditionsPage = () => {

    // states  df
    var [ upcoming, upcoming_change ] = React.useState({
        blocks: [], 
        post_title: 'Terms and Conditions', 
        meta_title: 'Terms and Conditions', 
        description: '',
        menus: null,
        meta_description: '',
        allow_search_engine: false,
        canonical_url: '',
        created_date: '',
        updated_date: '', 
        page_template: '', 
        slug: '',  
        settings: {
            site_address: ''
        },
        article_thumbnail_url: '',
        social_links: []
    });
    
    // refs 
    var recaptchaRef = React.useRef("")

    // Contexts 
    React.useEffect(() => {
        
        Helper.sendRequest({ // privacy-policy
            api: "post/get?post_type=1&page_template=terms_and_conditions",
            method: "get",
            data: {}
        }).then( row => {
            
            var this_page = row.data.length? row.data[0]: {}; 
            var settings = row?.settings?.length ? row.settings[0]: null;
            var social_links = row?.social_links || [];
            
            var object_to_change = {
                menus: row?.menus,
                blocks: this_page?.blocks, 
                article_thumbnail_url:  this_page?.article_thumbnail_url,
                post_title: this_page.post_title ? this_page.post_title: upcoming.post_title, 
                meta_title: this_page.meta_title ? (this_page.meta_title + ( settings?.beside_post_title ? " "+ settings.beside_post_title: "" ) ): upcoming.meta_title + ( settings?.beside_post_title ? " "+ settings.beside_post_title: "" ), 
                description: this_page.description ? this_page.description: upcoming.description, 
                meta_description: this_page.meta_description ? this_page.meta_description: upcoming.meta_description, 
                allow_search_engine: this_page.allow_search_engine ? this_page.allow_search_engine: upcoming.allow_search_engine, 
                canonical_url: this_page.canonical_url ? this_page.canonical_url: upcoming.canonical_url, 
                created_date: this_page.created_date ? this_page.created_date: upcoming.created_date, 
                page_template: this_page.page_template ? this_page.page_template: upcoming.page_template, 
                slug: this_page.slug ? this_page.slug: upcoming.slug, 
                updated_date: this_page.updated_date ? this_page.updated_date: upcoming.updated_date, 
                settings: settings,
                social_links: social_links?.map(x => `"${x.social_link}"`)
            };

            var site_url = object_to_change.settings?.site_address;
            var last_char = site_url?.length ? site_url[site_url.length - 1]: "";
            if(last_char != "/" && last_char != "") {
                object_to_change.settings.site_address = object_to_change.settings?.site_address + "/";
            }
            
            response_upcoming_callback(object_to_change);

        });

    }, []);
    
    // functions 

    var response_upcoming_callback = (obj) => {
        var old_objec = {...upcoming};
        var __keys = Object.keys(obj);
        __keys.map(x => {
            old_objec[x] = obj[x]
        }); 
        upcoming_change(old_objec);
    }
    
    return (
        <>

            <Helmet>
                <title>{upcoming.meta_title}</title>
                <meta name="description" content={upcoming.meta_description} />
                {
                    upcoming.allow_search_engine? "" :
                    <meta name="robots" content={"noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"} />
                }
                <script type="application/ld+json">
                    {
                        `
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "mainEntity": {
                            "@type": "WebPageElement",
                            "name": "${upcoming.post_title}",
                            "description": "These Terms and Conditions outline the rules and regulations for the use of ${upcoming.settings?.site_name}'s Website, located at ${upcoming.settings?.site_address}.",
                            "about": {
                                "@type": "Thing",
                                "name": "${upcoming.post_title}"
                            },
                            "url": "${upcoming.settings?.site_address}terms-and-conditions/",
                            "mainEntityOfPage": "${upcoming.settings?.site_address}terms-and-conditions/",
                            "datePublished": "${upcoming.created_date}",
                            "dateModified": "${upcoming.updated_date}",
                            "author": {
                                "@type": "Organization",
                                "name": "${upcoming.settings?.site_name}",
                                "url": "${upcoming.settings?.site_address}"
                            },
                            "copyrightHolder": {
                                "@type": "Organization",
                                "name": "${upcoming.settings?.site_name}",
                                "url": "${upcoming.settings?.site_address}"
                            },
                            "publisher": {
                                "@type": "Organization",
                                "name": "${upcoming.settings?.site_name}",
                                "url": "${upcoming.settings?.site_address}"
                            },
                            "potentialAction": {
                                "@type": "ReadAction",
                                "target": "${upcoming.settings?.site_address}terms-and-conditions/"
                            }
                        } 
                        `
                    }
                </script>

                <link rel="canonical" href={`${upcoming.settings?.site_address}terms-and-conditions/`}/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:type" content="article"/>
                <meta property="og:title" content={upcoming.meta_title}/>
                <meta property="og:description" content={upcoming.meta_description}/>
                <meta property="og:url" content={`${upcoming.settings?.site_address}terms-and-conditions/`}/>
                <meta property="og:site_name" content={upcoming.settings.site_name}/> 

                 
                <meta property="og:image" content={upcoming.article_thumbnail_url}/>
                <meta name="twitter:card" content="summary_large_image"/> 
                <meta name="twitter:image" content={upcoming.article_thumbnail_url}/>
            </Helmet>

            <Header menus={upcoming.menus} settings={upcoming.settings}/>
            
            <div className="max-850 offset-left offset-right mt-space-long plr-block"> 
                <header className="flexbox content-center column-direction mb-30">
                        
                    <h1 className="tutorial-headline mt-h">{upcoming.post_title}</h1>
                    <div className="flexbox items-center author-section mt-5"> 
                        <div className="flexbox content-center auth-name">
                            <i>Last Update: { Helper.formatDate(upcoming.updated_date)}</i>
                        </div>
                    </div>
                </header> 

                <div className="lg-2-content tutorial-content content-section">
                    <Helper.ArticleContent blocks={upcoming.blocks}/>
                </div> 

            </div>
            
            <Footer menus={upcoming.menus} settings={upcoming.settings}/> 
        </>
    );
}
 

export { TermsConditionsPage }