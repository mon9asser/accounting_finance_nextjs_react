const express = require("express");  
var sitemapRouter = express.Router(); 
const mongoose = require('mongoose');
var path = require("path");
var fs = require("fs");

const { site_url } = require("./../config/db")
const {Config} = require("./../config/options")
// database models 
const {Usr} = require("./../models/user-model");
const {Tutorial} = require("./../models/tutorial-model");
const {Posts} = require("./../models/posts-model");
const {Sets} = require("./../models/settings-model"); 
/**
 * main sitemap => sitemap_index.xml
 * posts sitemap => sitemap_articles.xml
 * pages sitemap => sitemap_pages.xml
 * users sitemap => sitemap_users.xml
 * tutorials sitemap => sitemap_tutorials.xml
 * tutorial tabs sitemap => sitemap_tutorial_tabs.xml
 * 
 */

// 1- Posts  
// 2- Pages
// 3- users
// 4- tutorials
// 5- Tutorial Tabs


var sitemaps = {
    articles: '/sitemap_articles.xml',
    pages: '/sitemap_pages.xml',
    users: '/sitemap_users.xml',
    tutorials: '/sitemap_tutorials.xml',
    tabs: '/sitemap_tabs.xml',
    compilers: '/sitemap_compilers.xml',
}

sitemapRouter.get( sitemaps.articles, async (req, res) => {
    try {
        var posts = await Posts.find({ post_type: 0, is_published: true, allow_search_engine: true });
        
        var posts_data = posts.map(post => {
            
            var tab_slash = '';
            if( post.selected_tab?.slug  !== '' && post.selected_tab?.slug !== 'root' ) {
                tab_slash = `/${post.selected_tab.slug}`;
            }

            if ( post.tutorial.slug != undefined && post.updated_date != undefined && post.slug != undefined ) {
                return `
                    <url>
                        <loc>${site_url}${Config.redirect_to}${ (post.tutorial.slug == "" ? "" : "/" + post.tutorial.slug) + tab_slash + "/" + post.slug + "/"}</loc>
                        <lastmod>${new Date(post.updated_date).toISOString()}</lastmod>
                        <changefreq>weekly</changefreq>
                        <priority>0.8</priority>
                    </url>
                `;
            } return ""
            
        }).join("");

        var sitemap = `
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${posts_data}
            </urlset>
        `;

        res.header("Content-Type", "application/xml");
        res.send(sitemap.trim());

    } catch (err) {
        res.status(500).send("An error occurred while generating the sitemap.");
    }
});


sitemapRouter.get( sitemaps.pages, async (req, res) => {
    try {
        var posts = await Posts.find({ post_type: 1, is_published: true, allow_search_engine: true });
         
        var posts_data = posts.map(post => {
            if (  post.updated_date != undefined && post.slug != undefined ) {
                return `
                    <url>
                        <loc>${site_url}${ "/" + post.slug + "/"}</loc>
                        <lastmod>${new Date(post.updated_date).toISOString()}</lastmod>
                        <changefreq>weekly</changefreq>
                        <priority>0.8</priority>
                    </url>
                `;
            } return ""
            
        }).join("");

        var sitemap = `
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${posts_data}
            </urlset>
        `;

        res.header("Content-Type", "application/xml");
        res.send(sitemap.trim());

    } catch (err) {
        res.status(500).send("An error occurred while generating the sitemap.");
    }
});


sitemapRouter.get( sitemaps.users, async (req, res) => {
    
    try {
        var users = await Usr.find({ allow_appears_in_search_engine: true, is_blocked: false });

        var users_data = users.map(user => {
            if (user.username != undefined && user.username != "") {
                return `
                    <url>
                        <loc>${site_url}/users/${user.username + "/"}</loc>
                        <changefreq>monthly</changefreq>
                        <priority>0.7</priority>
                    </url>
                `;
            }
            return "";
        }).join("");

        var sitemap = `
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${users_data}
            </urlset>
        `;

        res.header("Content-Type", "application/xml");
        res.send(sitemap.trim());

    } catch (err) {
        res.status(500).send("An error occurred while generating the sitemap.");
    }
});

sitemapRouter.get( sitemaps.tutorials, async (req, res) => {
    
    try {
        var tutorials = await Tutorial.find({ "options.publish": true });
         
        var tutorial_data =tutorials.map(tuts => {
            if (tuts.slug != undefined && tuts.slug != "" && tuts.options.publish) {
                return `
                    <url>
                        <loc>${site_url}${Config.redirect_to}/${tuts.slug + "/"}</loc>
                        <changefreq>monthly</changefreq>
                        <priority>0.7</priority>
                    </url>
                `;
            }
            return "";
        }).join("");

        var sitemap = `
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${tutorial_data}
            </urlset>
        `;

        res.header("Content-Type", "application/xml");
        res.send(sitemap.trim());

    } catch (err) {
        res.status(500).send("An error occurred while generating the sitemap.");
    }
});

sitemapRouter.get( sitemaps.tabs, async (req, res) => {
    
    
    
    try {

        var tutorials = await Tutorial.find({ "options.publish": true }); 
        var all_tabs =  tutorials.map(mtuts => mtuts.tabs.map(x => ({tutorial_slug: mtuts.slug, tab_slug: x.slug})) ).flat();
         
        var tabs = all_tabs.map(tab => {
            
            var tab_slash = '';
            if( tab.tab_slug  !== '' && tab.tab_slug !== 'root' ) {
                tab_slash = `/${tab.tab_slug}`;
            }
            
            var tut_slash = '';
            if( tab.tutorial_slug  !== '' && tab.tutorial_slug !== 'root' ) {
                tut_slash = `/${tab.tutorial_slug}`;
            }

            return `
                <url>
                    <loc>${site_url}${Config.redirect_to}${tut_slash}${ tab_slash + "/"}</loc>
                    <changefreq>weekly</changefreq>
                    <priority>0.8</priority>
                </url>
            `;
            
        }).join("");
    
        var sitemap = `
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${tabs}
            </urlset>
        `;
    
        res.header("Content-Type", "application/xml");
        res.send(sitemap.trim());

    } catch (err) {
        res.status(500).send("An error occurred while generating the sitemap.");
    } 

});

// Main sitemap 
sitemapRouter.get("/sitemap_index.xml", async (req, res) => {

    try {

        var posts = await Posts.find({post_type: 0, is_published: true, allow_search_engine: true});
        var pages = await Posts.find({ post_type: 1, is_published: true, allow_search_engine: true });
        var users = await Usr.find({ allow_appears_in_search_engine: true, is_blocked: false });
        var tutorials = await Tutorial.find({ "options.publish": true }); 
        var tabs =  tutorials.map(mtuts => mtuts.tabs.map(x => ({tutorial_slug: mtuts.slug, tab_slug: x.slug})) ).flat();
        var compilers = [];

        var generated_sitemap = [];
        
        if( posts.length ) {
            generated_sitemap.push(sitemaps.articles)
        }

        if( pages.length ) {
            generated_sitemap.push(sitemaps.pages)
        }

        if( users.length ) {
            generated_sitemap.push(sitemaps.users)
        }

        if( tutorials.length ) {
            generated_sitemap.push(sitemaps.tutorials)
        }

        if( tabs.length ) {
            generated_sitemap.push(sitemaps.tabs)
        }

        if( compilers.length ) {
            generated_sitemap.push(sitemaps.compilers)
        }
        

        const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${generated_sitemap.map(sitemap => 
                
                `<sitemap>
                    <loc>${site_url}${sitemap}</loc>
                </sitemap>`

            ).join('')}
        </sitemapindex>`;
        
        res.header('Content-Type', 'application/xml');
        res.send(sitemapIndex);

    } catch {
        res.send("")
    } 
})


// robots txt robots.txt
sitemapRouter.get("/robots.txt", async (req, res) => {
    try {
        // Fetch the settings from the database
        var settings = await Sets.find({});
        
        // Check if settings exist
        if (!settings.length) {
            // Respond with a default or empty robots.txt content if no settings are found
            res.type('text/plain');
            res.send('User-agent: *\nDisallow:');
            return;
        }

        // Get the robots.txt content from the settings
        var robot_content = settings[0].robots_file_contents;
        
        // Ensure line breaks are properly handled
        robot_content = robot_content.replace(/\r?\n/g, '\n');
        
        // Set the content type to plain text
        res.type('text/plain');
        
        // Send the robots.txt content as the response
        res.send(robot_content);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching robots.txt content:', error);
        res.status(500).send('Internal Server Error');
    }


     
});

module.exports = { sitemapRouter }