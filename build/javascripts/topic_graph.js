(function(){var o,t,e=[].indexOf||function(o){for(var t=0,e=this.length;t<e;t++)if(t in this&&this[t]===o)return t;return-1};o={simple:1,topic_count:2,bookmarks:3},t={metrics:1,bookmarks:2},window.TopicGraph=function(){function n(e,n,i){var s,r,a,c,d,h,p,l,u,f,m,_,g,b,k,w,v,y,B,W,z;for(this.container=i,this.topic_ids={},this.topic_connections={},this.nodes=null,this.selected_node=null,this.edges=null,this.data={},this.network=null,this.topic_count=0,this.topic_connection_count=0,this.options={font_size:20,node_size:1,edge_size:1,edge_formula:o.simple,node_formula:t.metrics,edge_threshold:2,node_threshold:2,colorful:!1},this.vis_config={nodes:{shape:"dot",font:{size:this.options.font_size},scaling:{min:10,max:70,label:{enabled:!1,min:10,max:50}}},edges:{scaling:{min:1,max:20,label:{enabled:!0,min:20,max:50}}},interaction:{hover:!0},physics:{forceAtlas2Based:{gravitationalConstant:-26,centralGravity:.005,springLength:230,springConstant:.18},maxVelocity:146,solver:"forceAtlas2Based",timestep:.35,stabilization:{iterations:150}}},this.example_topic={id:45466,name:"Accident",type:"Topic",url:"https://wikirate.org/Accident.json",content:"",bookmarkers:0,metrics:6,projects:0},this.example_metric={id:538693,name:"2020WoB+Women on Board",type:"Metric",url:"https://wikirate.org/2020WoB+Women_on_Board.json",designer:"2020WoB",title:"Women on Board",question:"What percentage of people on the company's board of directors are women?",metric_type:"Researched",about:"<p><span>2020 Women on Boards conducts research studies about the gender composition of the boards of directors of US companies.</span></p>",methodology:'<p>To search for a company listed on the 2020 Women on Boards directory, check the database here: <a href="https://www.2020wob.com/company-directory">https://www.2020wob.com/company-directory</a>. See also data in the 2014 report <a href="http://www.2020wob.com/sites/default/files/2020GDI-2014Report.pdf">here</a>.</p>',value_type:"Number",value_options:["Unknown"],report_type:"Data Breach Report",research_policy:"Designer Assessed",unit:"%",range:null,hybrid:"no",topics:["Employee","Gender equality"],scores:["2020WoB+Women on Board+Mariana","2020WoB+Women on Board+Alex H","2020WoB+Women on Board+Elizabeth Potter"],answers:3571,bookmarkers:6,projects:4,answers_url:"https://wikirate.org/2020WoB+Women_on_Board+Answer.json"},this.topics=n.items,this.topic_count=this.topics.length,v=this.topics,u=0,_=v.length;u<_;u++)l=v[u],this.topic_ids[l.name]=l.id;for(W=this,y=e.items,f=0,g=y.length;f<g;f++)if(l=y[f],l.topics.length>1)for(p=l.topics.map(function(o){return W.topic_ids[o]}).sort(),z=1/(l.topics.length-1),a=l.bookmarkers,c=m=0,b=p.length;m<b;c=++m)for(d=p[c],B=p.slice(c+1),w=0,k=B.length;w<k;w++)h=B[w],null==(s=this.topic_connections)[d]&&(s[d]={}),null==(r=this.topic_connections[d])[h]&&(r[h]={count:0,topic_count_score:0,bookmark_score:0}),0===this.topic_connections[d][h].count&&(this.topic_connection_count+=1),this.topic_connections[d][h].count+=1,this.topic_connections[d][h].topic_count_score+=z,this.topic_connections[d][h].bookmark_score+=a}return n.prototype.showEdge=function(t){return this.options.edge_formula===o.simple?t.count>=this.options.edge_threshold:this.options.edge_formula===o.topic_count?t.topic_count_score>=this.options.edge_threshold:t.bookmark_score>=this.options.edge_threshold},n.prototype.showNode=function(o){return this.options.node_formula===t.bookmarks?o.bookmarkers>=this.options.node_threshold:o.metrics>=this.options.node_threshold},n.prototype.setFontSize=function(o){var t,e;return this.options.font_size=o,null==(t=this.vis_config).nodes&&(t.nodes={}),null==(e=this.vis_config.nodes).font&&(e.font={}),this.vis_config.nodes.font.size=o},n.prototype.updateEdges=function(){var o,t,e,n,i,s;this.edges=new vis.DataSet([]),i=this.topic_connections,s=[];for(t in i)n=i[t],s.push(function(){var i;i=[];for(e in n)o=n[e],this.showEdge(this.topic_connections[t][e])?i.push(this.edges.add({from:parseInt(t),to:parseInt(e),value:o.count*this.options.edge_size})):i.push(void 0);return i}.call(this));return s},n.prototype.updateNodes=function(){var o,t,e,n,i,s,r;for(this.nodes=new vis.DataSet([]),n=this.topics,i=[],t=0,e=n.length;t<e;t++)s=n[t],this.showNode(s)?(o=function(){switch(!1){case!this.options.colorful:return s.id;case 0!==s.name.indexOf("GRI"):return 2;case 0!==s.name.indexOf("SDG"):return 3;case 0!==s.name.indexOf("G4"):return 4;default:return 1}}.call(this),r=this.options.node_formula_bookmark?s.bookmarkers:s.metrics,i.push(this.nodes.add({id:s.id,label:s.name,label_bak:s.name,value:r*this.options.node_size,group:o}))):i.push(void 0);return i},n.prototype.loadConfig=function(o){return this.options=o,this.setFontSize(o.font_size)},n.prototype.getVisConfig=function(){return jsyaml.safeDump(this.vis_config)},n.prototype.setVisConfig=function(o){return this.vis_config=jsyaml.safeLoad(o),this.network.setOptions(this.vis_config)},n.prototype.render=function(){var o;return this.data={nodes:this.nodes,edges:this.edges},this.network=new vis.Network(this.container,this.data,this.vis_config),o=this,this.network.on("click",function(t){var n;return t.nodes.length<1||this.selected_node===t.nodes[0]?(this.selected_node=null,o.nodes.update(o.nodes.get({fields:["id","label_bak"]}).map(function(o){return{id:o.id,label:o.label_bak}})),void o.edges.update(o.edges.getIds().map(function(o){return{id:o,hidden:!1}}))):(this.selected_node=t.nodes[0],n=t.nodes,o.edges.get({filter:function(o){var n;return n=o.id,e.call(t.edges,n)>=0}}).forEach(function(o){return n.push(o.from),n.push(o.to)}),o.nodes.update(o.nodes.get({fields:["id","label_bak"]}).map(function(o){var t;return{id:o.id,label:(t=o.id,e.call(n,t)>=0?o.label_bak:"")}})),o.edges.update(o.edges.getIds().map(function(o){return{id:o,hidden:e.call(t.edges,o)<0}})))})},n}()}).call(this);