"use strict";(()=>{var t={};t.id=671,t.ids=[671,660],t.modules={7913:(t,e,a)=>{a.a(t,async(t,r)=>{try{a.r(e),a.d(e,{config:()=>h,default:()=>p,getServerSideProps:()=>g,getStaticPaths:()=>x,getStaticProps:()=>m,reportWebVitals:()=>_,routeModule:()=>$,unstable_getServerProps:()=>v,unstable_getServerSideProps:()=>y,unstable_getStaticParams:()=>b,unstable_getStaticPaths:()=>f,unstable_getStaticProps:()=>j});var s=a(7093),i=a(5244),l=a(1323),n=a(1682),o=a.n(n),u=a(8269),c=a(5737),d=t([c]);c=(d.then?(await d)():d)[0];let p=(0,l.l)(c,"default"),m=(0,l.l)(c,"getStaticProps"),x=(0,l.l)(c,"getStaticPaths"),g=(0,l.l)(c,"getServerSideProps"),h=(0,l.l)(c,"config"),_=(0,l.l)(c,"reportWebVitals"),j=(0,l.l)(c,"unstable_getStaticProps"),f=(0,l.l)(c,"unstable_getStaticPaths"),b=(0,l.l)(c,"unstable_getStaticParams"),v=(0,l.l)(c,"unstable_getServerProps"),y=(0,l.l)(c,"unstable_getServerSideProps"),$=new s.PagesRouteModule({definition:{kind:i.x.PAGES,page:"/tutorials/[tutorial]",pathname:"/tutorials/[tutorial]",bundlePath:"",filename:""},components:{App:u.default,Document:o()},userland:c});r()}catch(t){r(t)}})},5737:(t,e,a)=>{a.a(t,async(t,r)=>{try{a.r(e),a.d(e,{default:()=>g,getServerSideProps:()=>h});var s=a(997);a(4542);var i=a(968),l=a.n(i);a(5675);var n=a(2905),o=a(52),u=a(7790),c=a(4352),d=a(4800);a(1163);var p=a(1664),m=a.n(p);a(9332),a(4298);var x=t([n,u,c,d]);function g({upcoming:t}){if(!t)return s.jsx(d.z5,{});let e=(0,n.default)(t.settings.header),a=(0,n.default)(t.settings.footer);var r=()=>s.jsx("header",{className:"wrapper max-1150 offset-left offset-right",children:s.jsx("div",{className:"row mlr--15",children:(0,s.jsxs)("div",{className:"md-9 text-center offset-left offset-right p-all-15 flexbox content-center column-direction tutorial-header-block",children:[s.jsx(d._H,{data:t.ads,position:"before_title"}),s.jsx("h1",{className:"tutorial-headline",children:t.tutorial?.tutorial_title}),s.jsx(d._H,{data:t.ads,position:"after_title"}),(0,s.jsxs)("span",{className:"sub-title",children:[t.tutorial?.selected_category.name," "]}),t.tutorial?.tabs?.length?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("ul",{className:"no-list-style flexbox gap-50 content-center items-center flex-wrap bold-list tab-lang-categories",children:[s.jsx("li",{children:s.jsx(m(),{href:`/tutorials/${t.tutorial?.slug}/`,children:"Tutorials"})}),t.tutorial?.tabs.map(e=>s.jsx("li",{children:s.jsx(m(),{href:e?.slug.indexOf("http")==-1?`/tutorials/${t.tutorial?.slug}/t/${e?.slug}/`:e?.slug,children:e?.title})},e._id))]}),s.jsx(d._H,{data:t.ads,position:"after_tab_links"})]}):"",(0,s.jsxs)("ul",{className:"content-center no-list-style flexbox gap-50 items-center flex-wrap list-in-tuts",children:[s.jsx("li",{children:(0,s.jsxs)(s.Fragment,{children:[s.jsx("span",{children:o.W.formatNumber(t.posts?.length)}),s.jsx("span",{children:"Tutorials"})]})}),s.jsx("li",{children:(0,s.jsxs)(s.Fragment,{children:[s.jsx("span",{children:o.W.formatNumber(t.tutorial?.duration.split(" ")[0])}),s.jsx("span",{children:t.tutorial?.duration.split(" ")[1]})]})}),s.jsx("li",{children:(0,s.jsxs)(s.Fragment,{children:[s.jsx("span",{children:t.tutorial?.reviews}),s.jsx("span",{children:"Reviews"})]})}),s.jsx("li",{children:(0,s.jsxs)(s.Fragment,{children:[s.jsx("span",{children:o.W.formatNumber(t.tutorial?.views)}),s.jsx("span",{children:"Views"})]})})]}),s.jsx(d._H,{data:t.ads,position:"after_tutorial_statistics"}),s.jsx("div",{className:"mt-20 content-elem",children:s.jsx(d.VU,{ad_camp:t.ads,built_url:`${t.site_url}tutorials/${t.tutorial.slug}/`,upcoming:t,data:t.tutorial.description})})]})})}),i=`
            {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "${t.tutorial?.tutorial_title}",
                "author": {
                    "@type": "Organization",
                    "name": "${t.settings?.site_name}"
                },
                "datePublished": "${t.tutorial?.date_published}",   
                "dateModified": "${t.tutorial?.date_updated}",   
                "description": "${t.tutorial?.meta_description}",
                "publisher": {
                    "@type": "Organization",
                    "name": "${t.settings?.site_name}",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "${t.settings?.site_logo}"  
                    }
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "${t.site_url}tutorials/${t.tutorial?.slug}/",
                },
                "url": "${t.site_url}tutorials/${t.tutorial?.slug}/",
                "articleSection": "${t.tutorial?.tag}",
                "keywords": "${t.tutorial?.keyphrase}",
                "image": "${t.tutorial?.thumbnail_url}",
                "breadcrumb": {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "${t.site_url}"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Tutorials",
                                "item": "${t.site_url}tutorials/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": "${t.tutorial?.tutorial_title}",
                                "item": "${t.site_url}tutorials/${t.tutorial?.slug}/"
                            }, 
                        ]
                }
            }
        `;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(l(),{children:[s.jsx("title",{children:t.tutorial?.meta_title}),s.jsx("meta",{name:"description",content:t.tutorial?.meta_description}),t.tutorial?.options?.hide_from_search_engines?s.jsx("meta",{name:"robots",content:"noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"}):"",s.jsx("link",{rel:"canonical",href:`${t.site_url}tutorials/${t.tutorial?.slug}/`}),s.jsx("meta",{property:"og:locale",content:"en_US"}),s.jsx("meta",{property:"og:type",content:"article"}),s.jsx("meta",{property:"og:title",content:t.tutorial?.meta_title}),s.jsx("meta",{property:"og:description",content:t.tutorial?.meta_description}),s.jsx("meta",{property:"og:url",content:`${t.site_url}tutorials/${t.tutorial?.slug}/`}),s.jsx("meta",{property:"og:site_name",content:t.settings.site_name}),s.jsx("meta",{property:"og:image",content:t.tutorial?.thumbnail_url}),s.jsx("meta",{name:"twitter:card",content:"summary_large_image"}),s.jsx("meta",{name:"twitter:image",content:t.tutorial?.thumbnail_url}),s.jsx("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:i}}),e]}),s.jsx(u.Z,{settings:t.settings,menus:{nav_left:t.nav_left,nav_right:t.nav_right}}),s.jsx(()=>s.jsx(s.Fragment,{children:(0,s.jsxs)("main",{className:"wrapper max-1250 offset-left offset-right ptb-50",children:[s.jsx(r,{}),""!=t.tutorial.content?s.jsx("div",{className:"wrapper ptb-30-50 content-elem max-full text-center mlr--15 chapter-block-hlght",children:s.jsx(d.B8,{ad_camp:t.ads,built_url:`${t.site_url}tutorials/${t.tutorial.slug}/`,upcoming:t,data:t.tutorial.content})}):"",(0,s.jsxs)("div",{className:"wrapper max-800 text-center chapter-block-hlght box-vote-block",children:[(0,s.jsxs)("span",{children:["Share ",s.jsx("b",{className:"share-txt-on",children:t.tutorial.tutorial_title})," on:"]}),s.jsx("div",{className:"flexbox gap-15 share-box",children:s.jsx(d.Du,{platforms:t.settings.share_social_buttons,url:`${t.site_url}tutorials/${t.tutorial.slug}/`,title:t.tutorial.meta_title,size:32,height:"32px",width:"32px",radius:!t.settings.circle_buttons})})]}),s.jsx(d.VH,{data_id:t.tutorial._id,data_title:t.tutorial.tutorial_title,feeadback_title:"How Would You Like to Rate This Content?"})]})}),{}),s.jsx(c.Z,{settings:t.settings,menus:{company_links:t.company_links,follow_links:t.follow_links,nav_links:t.nav_links}}),a]})}async function h(t){try{var e=t.params.tutorial,a=await o.W.sendRequest({api:`tutorial-page/get?tut_name=${e}&tab=root`,method:"get",data:{}});if(!a.ok)throw Error("Server is offline");var r={};if(200==a.status){var s=await a.json();if(s.is_error&&!s.data.length)return console.log("data here"),{notFound:!0};var i=s.data.settings.site_address;if(i){var l=i.split("/");""!=l[l.length-1]&&(i+="/")}s.data.settings.site_address=i,s.data.settings?.beside_post_title!=""&&s.data.tutorial?.meta_title&&(s.data.tutorial.meta_title=s.data.tutorial.meta_title+" "+s.data.settings?.beside_post_title);var n=s.data.menus?.filter(t=>"main_menu"===t.menu_name),u=s.data.menus?.filter(t=>"main_nav_right"===t.menu_name),c=s.data.menus?.filter(t=>"company_nav_links"===t.menu_name),d=s.data.menus?.filter(t=>"follow_nav_links"===t.menu_name),p=s.data.menus?.filter(t=>"tags_nav_links"===t.menu_name);r={tutorial:s.data.tutorial,posts:s.data.posts,chapters:s.data.chapters,settings:s.data.settings,ads:s.data.ads,menus:s.data.menus,is_redirect:s.redirect,nav_right:u,nav_left:n,company_links:c,follow_links:d,nav_links:p,site_url:i}}return{props:{upcoming:r}}}catch(e){return t.res.statusCode=500,{props:{error:"Server is offline, please try again later."}}}}[n,u,c,d]=x.then?(await x)():x,r()}catch(t){r(t)}})},1604:t=>{t.exports=require("he")},2934:t=>{t.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:t=>{t.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:t=>{t.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},2785:t=>{t.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},968:t=>{t.exports=require("next/head")},6689:t=>{t.exports=require("react")},6405:t=>{t.exports=require("react-dom")},2368:t=>{t.exports=require("react-highlight")},997:t=>{t.exports=require("react/jsx-runtime")},2905:t=>{t.exports=import("html-react-parser")},2017:t=>{t.exports=import("react-share")},7147:t=>{t.exports=require("fs")},1017:t=>{t.exports=require("path")},2781:t=>{t.exports=require("stream")},9796:t=>{t.exports=require("zlib")}};var e=require("../../webpack-runtime.js");e.C(t);var a=t=>e(e.s=t),r=e.X(0,[682,723,332,821],()=>a(7913));module.exports=r})();