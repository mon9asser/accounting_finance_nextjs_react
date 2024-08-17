import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link'; 
import SearchComponent from 'services/components';
import { useRef } from 'react';

var Header = ({menus, settings}) => {
    
    if(!menus.length) {
        return <b>No links found right now!</b>
    }

    var sidebarRef = useRef();
    var sidebarContentRef = useRef();
    var maskRef = useRef();
    var closeSidebarRef = useRef();

    var nav_left = menus?.filter( x=> x.menu_name === "main_menu")
    var nav_right = menus?.filter( x=> x.menu_name === 'main_nav_right');

    
    var site_url = settings.site_address;
    var nav_left = nav_left?.length ? nav_left: [];
    var nav_right= nav_right?.length ? nav_right: [];

    var sidebar_toggle = (e) => {
 
        var mask = maskRef.current; 
        var sidebar = sidebarRef.current;
        var asideContent = sidebarContentRef.current;
        var closeToggler = closeSidebarRef.current;
        
        sidebar.style.display = "block";

        if (mask.style.display === 'none' || mask.style.display == "") { 
            
            mask.style.display = "block";
            setTimeout(() => {
                
                mask.classList.toggle('fade');  
                closeToggler.style.display = "block"; 
                asideContent.classList.add("active--aside");

            }, 5);
        }

         // Prevent the default action of the event
         e.preventDefault(); 
    }

    var expand_collapse_item = (e, id) => {
        e.preventDefault();
        var doc_id = document.querySelector(`#collapsed-item-${id}`); 
        var anchor = document.querySelector(`#nav-anchor-${id}`); 

        if( doc_id.classList.contains('expanded') ) {
            anchor.classList.remove('expanded-a')
            doc_id.classList.remove('expanded'); 
        } else {
            doc_id.classList.add('expanded');
            anchor.classList.add('expanded-a')
        }
        
    }

    var close_sidebar = (e) => {
        e.preventDefault();
        
        var mask = maskRef.current; 
        var sidebar = sidebarRef.current;
        var asideContent = sidebarContentRef.current;
        var closeToggler = closeSidebarRef.current;
        
        mask.classList.toggle('fade');  
        closeToggler.style.display = "none";
        asideContent.classList.remove("active--aside");

        setTimeout(() => {  
            mask.style.display = "none";
            sidebar.style.display = "none";
        }, 300);
    }
     
    var ItemElement = ({text}) => {
        
        var item = text;
        
        if(text.indexOf("[button]") != -1 ) {
            var arr = text.split(']');
            var item_text = arr[arr.length - 1].trim();
            item = <span className="btn third-btn radius-5 custom-header-btn">{item_text}</span>
        } else if ( text.indexOf("[svg]") != -1) {
            var arr = text.split(']');
            var icon = arr[arr.length - 1];
            item = <span className="flexbox" dangerouslySetInnerHTML={{__html: icon}} />
        } else if ( text.indexOf("[burgericon]") != -1 ) {
            item = <span  className="nav-toggler aside-toggler remove-anchor-paddings"><span></span><span></span><span></span></span>
        } 

        return item;

    }

    return(
        <> 
            <header className="wrapper white-bg border-bottom plr-0 sticky">
                <nav className="flexbox items-center offset-left offset-right plr-15 max-1172 default-height">
                    
                    
                     
                </nav>
            </header>
        </>
    )
}

export default Header;