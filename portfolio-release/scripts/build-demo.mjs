import { build, stop } from 'esbuild-wasm';
import React from 'react';
import {renderToString} from 'react-dom/server';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import { routes } from '../src/content.js';
const production=process.env.PAS_RELEASE==='production';
const output=production?'dist-production':'dist';
await rm(output,{recursive:true,force:true});
await mkdir(output+'/assets',{recursive:true});
try{
 const result=await build({entryPoints:['src/main.jsx'],bundle:true,format:'esm',jsx:'automatic',outdir:output+'/assets',entryNames:'app',minify:true,target:['es2020'],define:{'process.env.NODE_ENV':'"production"'},metafile:true,legalComments:'none'});
 await build({entryPoints:['src/App.jsx'],bundle:true,format:'esm',jsx:'automatic',platform:'node',outfile:'verification/prerender-app.mjs',external:['react','react-dom','react-dom/*'],loader:{'.css':'empty'},define:{'process.env.NODE_ENV':'"production"'}});
 const {App}=await import(pathToFileURL(resolve('verification/prerender-app.mjs')).href+'?build='+Date.now());
 let shell=(await readFile('index.html','utf8')).replace('src="/src/main.jsx"','src="/assets/app.js"').replace('</head>','<link rel="stylesheet" href="/assets/app.css" /></head>');
 if(production)shell=shell.replace('<meta name="robots" content="noindex, nofollow" />','<meta name="robots" content="index, follow" />');
 for(const [route,metadata] of Object.entries(routes)){
  const canonical='https://promptarchitectstudio.com'+route;
  let page=shell.replace(/<title>.*?<\/title>/,'<title>'+metadata.title+'</title>');
  for(const [attr,key,value] of [['name','description',metadata.description],['property','og:title',metadata.title],['property','og:description',metadata.description],['property','og:url',canonical],['name','twitter:title',metadata.title],['name','twitter:description',metadata.description]]) page=page.replace(new RegExp('(<meta '+attr+'="'+key+'" content=")[^"]*(" \\/>)'),'$1'+value+'$2');
  page=page.replace(/(<link rel="canonical" href=")[^"]*(" \/>)/,'$1'+canonical+'$2');
  const graph=[{'@type':'WebSite','@id':'https://promptarchitectstudio.com/#website',name:'Prompt Architect Studio',url:'https://promptarchitectstudio.com/'},{'@type':'Person','@id':'https://promptarchitectstudio.com/about#person',name:'Michael J McAteer'}, {'@type':'WebPage','@id':canonical+'#page',url:canonical,name:metadata.title,description:metadata.description,isPartOf:{'@id':'https://promptarchitectstudio.com/#website'},author:{'@id':'https://promptarchitectstudio.com/about#person'}}];
  if(route==='/' || route==='/build')graph.push({'@type':'WebApplication','@id':'https://promptarchitectstudio.com/build#tool',name:'Prompt Architect Studio brief builder',url:'https://promptarchitectstudio.com/build',applicationCategory:'ProductivityApplication',operatingSystem:'Web browser',browserRequirements:'JavaScript enabled',description:'A free deterministic tool that organizes user-supplied requests and details into editable briefs and prompts. It does not call an AI model or execute the task.',offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}});
  page=page.replace('</head>','<script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')+'</script></head>');
  page=page.replace('<div id="root"></div>','<div id="root">'+renderToString(React.createElement(App,{pageRoute:route}))+'</div>');
  await writeFile(route==='/'?output+'/index.html':output+route+'.html',page);
 }
 const notFound=shell.replace(/<title>.*?<\/title>/,'<title>Page not found | Prompt Architect Studio</title>').replace(/<link rel="canonical"[^>]*>/,'').replace(/<meta name="robots"[^>]*>/,'<meta name="robots" content="noindex, follow" />').replace('<div id="root"></div>','<div id="root">'+renderToString(React.createElement(App,{pageRoute:'/404'}))+'</div>');
 await writeFile(output+'/404.html',notFound);
 for(const file of ['_headers','favicon.svg','apple-touch-icon.png','icon-192.png','icon-512.png','site.webmanifest'])await cp('public/'+file,output+'/'+file);
 await writeFile(output+'/_redirects',Object.entries((await import('../src/content.js')).aliases).map(([from,to])=>from+' '+to+' 301').join('\n')+'\n');
 const sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+Object.keys(routes).map(route=>'<url><loc>https://promptarchitectstudio.com'+route+'</loc></url>').join('')+'</urlset>\n';
 await writeFile(output+'/sitemap.xml',sitemap);
 await writeFile(output+'/robots.txt',production?'User-agent: *\nAllow: /\nSitemap: https://promptarchitectstudio.com/sitemap.xml\n':'User-agent: *\nDisallow: /\n');
 await writeFile('verification/build-metafile.json',JSON.stringify(result.metafile,null,2)+'\n');
 console.log('Built '+(production?'production':'local')+' static React site: '+output+'/ ('+Object.keys(routes).length+' prerendered pages; no API function).');
}finally{stop();}
