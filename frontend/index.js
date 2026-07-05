(function () {
  var TOKEN = (document.currentScript && document.currentScript.dataset && document.currentScript.dataset.extensionToken) || "";
  if (!TOKEN) throw new Error("Missing extension activation token");

  // localStorage helpers
  function sg(k,d){try{var v=localStorage.getItem("lte-"+k);return v!==null?JSON.parse(v):d}catch(e){return d}}
  function ss(k,v){try{localStorage.setItem("lte-"+k,JSON.stringify(v))}catch(e){}}

  // ===== CITY DATABASE (EXPANDED) =====
  var CN = {
    "Beijing":{lat:39.90,lon:116.41},"Shanghai":{lat:31.23,lon:121.47},"Guangzhou":{lat:23.13,lon:113.26},"Shenzhen":{lat:22.54,lon:114.06},
    "Tianjin":{lat:39.34,lon:117.36},"Chongqing":{lat:29.43,lon:106.50},"Hangzhou":{lat:30.27,lon:120.15},"Nanjing":{lat:32.06,lon:118.80},
    "Wuhan":{lat:30.59,lon:114.31},"Chengdu":{lat:30.57,lon:104.07},"Xi'an":{lat:34.34,lon:108.94},"Suzhou":{lat:31.30,lon:120.58},
    "Changsha":{lat:28.23,lon:112.94},"Zhengzhou":{lat:34.75,lon:113.63},"Dongguan":{lat:23.02,lon:113.75},"Qingdao":{lat:36.07,lon:120.33},
    "Shenyang":{lat:41.81,lon:123.43},"Ningbo":{lat:29.87,lon:121.54},"Kunming":{lat:25.04,lon:102.68},"Dalian":{lat:38.91,lon:121.62},
    "Xiamen":{lat:24.48,lon:118.09},"Hefei":{lat:31.82,lon:117.23},"Foshan":{lat:23.02,lon:113.12},"Fuzhou":{lat:26.07,lon:119.30},
    "Harbin":{lat:45.80,lon:126.54},"Jinan":{lat:36.65,lon:117.00},"Wenzhou":{lat:28.00,lon:120.70},"Changchun":{lat:43.88,lon:125.32},
    "Shijiazhuang":{lat:38.04,lon:114.51},"Changzhou":{lat:31.81,lon:119.97},"Quanzhou":{lat:24.91,lon:118.59},"Nanning":{lat:22.82,lon:108.37},
    "Guiyang":{lat:26.65,lon:106.63},"Nanchang":{lat:28.68,lon:115.86},"Taiyuan":{lat:37.87,lon:112.55},"Yantai":{lat:37.46,lon:121.45},
    "Jiaxing":{lat:30.77,lon:120.76},"Nantong":{lat:31.98,lon:120.89},"Jinhua":{lat:29.08,lon:119.65},"Zhuhai":{lat:22.27,lon:113.57},
    "Huizhou":{lat:23.10,lon:114.42},"Xuzhou":{lat:34.27,lon:117.17},"Haikou":{lat:20.04,lon:110.33},"Urumqi":{lat:43.83,lon:87.62},
    "Shaoxing":{lat:30.00,lon:120.58},"Zhongshan":{lat:22.52,lon:113.38},"Taizhou":{lat:28.66,lon:121.42},"Lanzhou":{lat:36.06,lon:103.82},
    "Weifang":{lat:36.71,lon:119.16},"Yangzhou":{lat:32.39,lon:119.41},"Sanya":{lat:18.25,lon:109.51},"Luoyang":{lat:34.62,lon:112.45},
    "Hohhot":{lat:40.84,lon:111.75},"Tangshan":{lat:39.63,lon:118.18},"Zhenjiang":{lat:32.19,lon:119.43},"Wuxi":{lat:31.49,lon:120.31},
    "Liuzhou":{lat:24.33,lon:109.40},"Handan":{lat:36.60,lon:114.47},"Qufu":{lat:35.58,lon:116.99},"Huangshan":{lat:29.72,lon:118.34},
    "Lijiang":{lat:26.86,lon:100.23},"Lhasa":{lat:29.65,lon:91.17},"Xining":{lat:36.62,lon:101.78},"Yinchuan":{lat:38.47,lon:106.28},
    "Guilin":{lat:25.27,lon:110.29},"Zhangjiajie":{lat:29.12,lon:110.48},"Chengde":{lat:40.97,lon:117.94},"Zhoushan":{lat:30.00,lon:122.20},
    "Wuhu":{lat:31.37,lon:118.38},"Baoding":{lat:38.87,lon:115.47},"Xiangyang":{lat:32.08,lon:112.17},"Hong Kong":{lat:22.32,lon:114.17},"Macau":{lat:22.20,lon:113.55},
    "Taipei":{lat:25.03,lon:121.57},"Kaohsiung":{lat:22.63,lon:120.30},"Taichung":{lat:24.15,lon:120.67},"Tainan":{lat:23.00,lon:120.20},
    "Tokyo":{lat:35.68,lon:139.69},"Osaka":{lat:34.69,lon:135.50},"Kyoto":{lat:35.01,lon:135.77},"Yokohama":{lat:35.45,lon:139.64},
    "Nagoya":{lat:35.18,lon:136.91},"Sapporo":{lat:43.06,lon:141.35},"Fukuoka":{lat:33.59,lon:130.40},"Kobe":{lat:34.69,lon:135.20},
    "Hiroshima":{lat:34.40,lon:132.46},"Sendai":{lat:38.27,lon:140.87},"Naha":{lat:26.21,lon:127.68},
    "Seoul":{lat:37.57,lon:126.98},"Busan":{lat:35.18,lon:129.08},"Incheon":{lat:37.46,lon:126.71},"Daegu":{lat:35.87,lon:128.60},
    "Daejeon":{lat:36.35,lon:127.38},"Gwangju":{lat:35.17,lon:126.91},"Jeju":{lat:33.50,lon:126.53},
    "Singapore":{lat:1.35,lon:103.82},"Bangkok":{lat:13.76,lon:100.50},"Kuala Lumpur":{lat:3.14,lon:101.69},"Jakarta":{lat:-6.21,lon:106.85},
    "Manila":{lat:14.60,lon:120.98},"Ho Chi Minh City":{lat:10.82,lon:106.63},"Hanoi":{lat:21.03,lon:105.83},"Phnom Penh":{lat:11.57,lon:104.88},
    "Yangon":{lat:16.84,lon:96.17},"Chiang Mai":{lat:18.79,lon:98.98},"Da Nang":{lat:16.05,lon:108.20},"Vientiane":{lat:17.97,lon:102.60},
    "Bandung":{lat:-6.92,lon:107.60},"Surabaya":{lat:-7.25,lon:112.75},"Cebu":{lat:10.32,lon:123.89},
    "Mumbai":{lat:19.08,lon:72.88},"Delhi":{lat:28.67,lon:77.22},"Bangalore":{lat:12.97,lon:77.59},"Chennai":{lat:13.08,lon:80.27},
    "Kolkata":{lat:22.57,lon:88.36},"Hyderabad":{lat:17.39,lon:78.48},"Pune":{lat:18.52,lon:73.86},"Ahmedabad":{lat:23.03,lon:72.58},
    "Jaipur":{lat:26.91,lon:75.79},"Lucknow":{lat:26.85,lon:80.95},"Dhaka":{lat:23.81,lon:90.41},"Karachi":{lat:24.86,lon:67.01},
    "Lahore":{lat:31.55,lon:74.36},"Colombo":{lat:6.93,lon:79.84},"Kathmandu":{lat:27.72,lon:85.32},
    "Dubai":{lat:25.20,lon:55.27},"Abu Dhabi":{lat:24.45,lon:54.38},"Doha":{lat:25.29,lon:51.53},"Kuwait City":{lat:29.37,lon:47.99},
    "Riyadh":{lat:24.71,lon:46.68},"Jeddah":{lat:21.49,lon:39.18},"Muscat":{lat:23.59,lon:58.41},"Tehran":{lat:35.69,lon:51.43},
    "Baghdad":{lat:33.31,lon:44.36},"Beirut":{lat:33.89,lon:35.50},"Tel Aviv":{lat:32.09,lon:34.78},"Amman":{lat:31.95,lon:35.93},
    "Ankara":{lat:39.93,lon:32.86},"Istanbul":{lat:41.01,lon:28.97},
    "London":{lat:51.51,lon:-0.13},"Paris":{lat:48.86,lon:2.35},"Berlin":{lat:52.52,lon:13.41},"Madrid":{lat:40.42,lon:-3.70},
    "Rome":{lat:41.90,lon:12.50},"Athens":{lat:37.98,lon:23.73},"Vienna":{lat:48.21,lon:16.37},"Prague":{lat:50.08,lon:14.42},
    "Warsaw":{lat:52.23,lon:21.01},"Budapest":{lat:47.50,lon:19.04},"Amsterdam":{lat:52.37,lon:4.90},"Brussels":{lat:50.85,lon:4.35},
    "Stockholm":{lat:59.33,lon:18.07},"Oslo":{lat:59.91,lon:10.75},"Copenhagen":{lat:55.68,lon:12.57},"Helsinki":{lat:60.17,lon:24.94},
    "Lisbon":{lat:38.72,lon:-9.14},"Dublin":{lat:53.35,lon:-6.26},"Zurich":{lat:47.38,lon:8.54},"Milan":{lat:45.46,lon:9.19},
    "Munich":{lat:48.14,lon:11.58},"Hamburg":{lat:53.55,lon:9.99},"Frankfurt":{lat:50.11,lon:8.68},"Barcelona":{lat:41.39,lon:2.17},
    "Valencia":{lat:39.47,lon:-0.38},"Naples":{lat:40.85,lon:14.27},"Venice":{lat:45.44,lon:12.32},"Florence":{lat:43.77,lon:11.26},
    "Moscow":{lat:55.76,lon:37.62},"Saint Petersburg":{lat:59.93,lon:30.34},"Kiev":{lat:50.45,lon:30.52},"Minsk":{lat:53.90,lon:27.56},
    "Bucharest":{lat:44.43,lon:26.10},"Sofia":{lat:42.70,lon:23.32},"Belgrade":{lat:44.79,lon:20.45},"Zagreb":{lat:45.82,lon:15.98},
    "New York":{lat:40.71,lon:-74.01},"Los Angeles":{lat:34.05,lon:-118.24},"Chicago":{lat:41.88,lon:-87.63},"San Francisco":{lat:37.77,lon:-122.42},
    "Toronto":{lat:43.65,lon:-79.38},"Vancouver":{lat:49.28,lon:-123.12},"Montreal":{lat:45.50,lon:-73.57},"Boston":{lat:42.36,lon:-71.06},
    "Seattle":{lat:47.61,lon:-122.33},"Miami":{lat:25.76,lon:-80.19},"Houston":{lat:29.76,lon:-95.37},"Dallas":{lat:32.78,lon:-96.80},
    "Washington DC":{lat:38.91,lon:-77.04},"Denver":{lat:39.74,lon:-104.99},"Las Vegas":{lat:36.17,lon:-115.14},"Portland":{lat:45.52,lon:-122.68},
    "Atlanta":{lat:33.75,lon:-84.39},"Philadelphia":{lat:39.95,lon:-75.17},"Phoenix":{lat:33.45,lon:-112.07},"San Diego":{lat:32.72,lon:-117.16},
    "Mexico City":{lat:19.43,lon:-99.13},"Cancun":{lat:21.16,lon:-86.85},
    "Sao Paulo":{lat:-23.55,lon:-46.63},"Rio de Janeiro":{lat:-22.91,lon:-43.17},"Buenos Aires":{lat:-34.61,lon:-58.38},"Santiago":{lat:-33.45,lon:-70.66},
    "Lima":{lat:-12.05,lon:-77.04},"Bogota":{lat:4.71,lon:-74.07},"Caracas":{lat:10.48,lon:-66.90},"Quito":{lat:-0.18,lon:-78.47},
    "Montevideo":{lat:-34.90,lon:-56.16},"Brasilia":{lat:-15.79,lon:-47.88},"Manaus":{lat:-3.12,lon:-60.01},
    "Sydney":{lat:-33.87,lon:151.21},"Melbourne":{lat:-37.81,lon:144.96},"Brisbane":{lat:-27.47,lon:153.03},"Perth":{lat:-31.95,lon:115.86},
    "Adelaide":{lat:-34.93,lon:138.60},"Auckland":{lat:-36.85,lon:174.76},"Wellington":{lat:-41.29,lon:174.78},"Christchurch":{lat:-43.53,lon:172.63},
    "Cairo":{lat:30.04,lon:31.24},"Cape Town":{lat:-33.92,lon:18.42},"Johannesburg":{lat:-26.20,lon:28.04},"Nairobi":{lat:-1.29,lon:36.82},
    "Lagos":{lat:6.45,lon:3.39},"Casablanca":{lat:33.57,lon:-7.58},"Marrakech":{lat:31.63,lon:-8.00},"Addis Ababa":{lat:9.03,lon:38.74},
    "Dar es Salaam":{lat:-6.79,lon:39.21},"Accra":{lat:5.60,lon:-0.19},"Dakar":{lat:14.72,lon:-17.47},"Tunis":{lat:36.81,lon:10.18},
    "Algiers":{lat:36.75,lon:3.04},"Khartoum":{lat:15.51,lon:32.56},"Luanda":{lat:-8.84,lon:13.23}
  };
  // ===== WEATHER API =====
  function fetchCityGeo(cityName){
    if(CN[cityName])return Promise.resolve(CN[cityName]);
    var cached=sg("geo_"+cityName,null);
    if(cached)return Promise.resolve(cached);
    return fetch("https://geocoding-api.open-meteo.com/v1/search?name="+encodeURIComponent(cityName)+"&count=1&language=zh&format=json",{signal:AbortSignal.timeout(4000)})
      .then(function(r){return r.json()}).then(function(d){
        if(d&&d.results&&d.results[0]){var r=d.results[0];var o={lat:r.latitude,lon:r.longitude};ss("geo_"+cityName,o);return o}
        return null;
      }).catch(function(){return null});
  }

  function fetchWeather(lat,lon){
    var key=lat.toFixed(1)+"_"+lon.toFixed(1);
    var cached=sg("wea_"+key,null);
    if(cached&&Date.now()-cached.t<600000)return Promise.resolve(cached);
    return fetch("https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+lon+"&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature&timezone=auto",{signal:AbortSignal.timeout(4000)})
      .then(function(r){return r.json()}).then(function(d){
        if(d&&d.current){var o={temp:d.current.temperature_2m,humi:d.current.relative_humidity_2m,code:d.current.weather_code,wind:d.current.wind_speed_10m,feels:d.current.apparent_temperature,t:Date.now()};ss("wea_"+key,o);return o}
        return null;
      }).catch(function(){return null});
  }

  function getCityWeather(name,callback){
    fetchCityGeo(name).then(function(geo){
      if(!geo){callback(null);return}
      fetchWeather(geo.lat,geo.lon).then(function(w){callback(w)});
    });
  }

  function mapWMO(code){
    if(code===0)return"clear";if(code>=1&&code<=3)return"cloudy";if(code>=45&&code<=48)return"fog";
    if(code>=51&&code<=67||code>=80&&code<=82)return"rain";if(code>=71&&code<=77||code>=85&&code<=86)return"snow";
    if(code>=95&&code<=99)return"thunder";return"clear";
  }

  function mapWMOIntensity(code){
    if(code===0)return 30;
    if(code>=1&&code<=3)return 20+code*15;
    if(code>=45&&code<=48)return 30+(code-44)*15;
    if(code>=51&&code<=55)return 30+(code-50)*15;
    if(code>=56&&code<=57)return 40;
    if(code>=61&&code<=65)return 40+(code-60)*15;
    if(code>=66&&code<=67)return 50;
    if(code>=71&&code<=75)return 30+(code-70)*15;
    if(code>=76&&code<=77)return 40;
    if(code>=80&&code<=82)return 50+(code-79)*15;
    if(code>=85&&code<=86)return 50;
    if(code>=95&&code<=99)return 60+(code-94)*15;
    return 40;
  }

  var WN={clear:"Sunny",cloudy:"Cloudy",rain:"Rainy",snow:"Snowy",thunder:"Thunderstorm",fog:"Foggy",wind:"Windy"};
  var WN_ICON={clear:"☀️",cloudy:"☁️",rain:"🌧️",snow:"❄️",thunder:"⛈️",fog:"🌫️",wind:"💨"};

  // ===== SYSTEM STATE =====
  var _wc=null,_wa=null,_wp=[],_wt="clear",_wi=50,_wcode=0,_wrun=false,_wfrm=0,_wenabled=false,_satEnabled=sg("satEnabled",true);
  var _tc=null,_ta=null,_tp=[],_tt="rain",_ti=50,_trun=false,_tfrm=0;
  var _vid=null,_vurl=null,_vactive=false,_vpaused=false,_vvol=0.5;
  try{var sv=localStorage.getItem("lte-vvol");if(sv)_vvol=parseFloat(sv)}catch(e){}

  // ===== CANVAS MANAGEMENT =====
  function makeWeatherCanvas(){
    if(_wc) return _wc;
    _wc=document.createElement("canvas");_wc.id="lte-wx-bg";
    _wc.style.cssText="position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:1;pointer-events:none;";
    document.body.insertBefore(_wc,document.body.firstChild);
    _wc.width=window.innerWidth;_wc.height=window.innerHeight;
    return _wc;
  }
  function removeWeatherCanvas(){
    if(_wa){cancelAnimationFrame(_wa);_wa=null}
    if(_wc&&_wc.parentNode)_wc.parentNode.removeChild(_wc);
    _wc=null;_wp=[];_wrun=false;_wfrm=0;
  }

  function makeThemeCanvas(){
    if(_tc) return _tc;
    _tc=document.createElement("canvas");_tc.id="lte-th-bg";
    _tc.style.cssText="position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:2;pointer-events:none;";
    document.body.insertBefore(_tc,document.body.firstChild);
    _tc.width=window.innerWidth;_tc.height=window.innerHeight;
    return _tc;
  }
  function removeThemeCanvas(){
    if(_ta){cancelAnimationFrame(_ta);_ta=null}
    if(_tc&&_tc.parentNode)_tc.parentNode.removeChild(_tc);
    _tc=null;_tp=[];_trun=false;_tfrm=0;
  }

  // ===== COLOR OVERLAY =====
  function drawColorOverlay(ctx,w,h,code,intensity){
    if(!_satEnabled) return;
    var c=null;
    if(code>=51&&code<=82||code>=95&&code<=99){c={r:25,g:35,b:70,a:0.30*intensity/100}}
    else if(code>=71&&code<=77||code>=85&&code<=86){c={r:200,g:220,b:240,a:0.12*intensity/100}}
    else if(code>=45&&code<=48){c={r:160,g:170,b:180,a:0.18*intensity/100}}
    else if(code>=1&&code<=3){c={r:160,g:170,b:180,a:0.10*intensity/100}}
    else if(code===0){c={r:255,g:220,b:150,a:0.10*intensity/100}}
    if(c){ctx.fillStyle="rgba("+c.r+","+c.g+","+c.b+","+c.a+")";ctx.fillRect(0,0,w,h)}
  }
  // ===== WEATHER PARTICLE EFFECTS (Canvas z-index:1) =====
  var WX = {};
  WX.rain={cnt:300,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,len:8+Math.random()*20,sp:3+Math.random()*6,wd:1+Math.random()*2,op:0.3+Math.random()*0.5,w:0.8+Math.random()*1.5,l:Math.floor(Math.random()*3)});return p},
    draw:function(ctx,w,h,p,int,code){ctx.clearRect(0,0,w,h);for(var i=0;i<p.length;i++){var d=p[i],a=d.op*(int/100);ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x+d.wd,d.y-d.len);ctx.strokeStyle="rgba(160,200,255,"+a+")";ctx.lineWidth=d.w;ctx.lineCap="round";ctx.shadowColor="rgba(100,150,255,"+(a*0.4)+")";ctx.shadowBlur=8;ctx.stroke();ctx.shadowBlur=0;d.x+=d.wd*(d.l+1)*0.15;d.y+=d.sp*(0.8+d.l*0.3);if(d.y>h+30){d.y=-30;d.x=Math.random()*w}if(d.x>w+15)d.x=-15;if(d.x<-15)d.x=w+15;}drawColorOverlay(ctx,w,h,code,int);}};
  WX.snow={cnt:250,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,sz:2+Math.random()*6,sp:0.5+Math.random()*2,wb:Math.random()*Math.PI*2,ws:0.003+Math.random()*0.015,wa:0.3+Math.random()*1.5,op:0.3+Math.random()*0.5,l:Math.floor(Math.random()*3)});return p},
    draw:function(ctx,w,h,p,int,code){ctx.clearRect(0,0,w,h);for(var i=0;i<p.length;i++){var d=p[i],sz=d.sz*(0.7+d.l*0.4)*(int/100),a=d.op*(int/100);var gr=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,sz*4);gr.addColorStop(0,"rgba(200,220,255,"+(a*0.4)+")");gr.addColorStop(0.2,"rgba(180,210,240,"+(a*0.15)+")");gr.addColorStop(1,"rgba(180,210,240,0)");ctx.fillStyle=gr;ctx.beginPath();ctx.arc(d.x,d.y,sz*4,0,Math.PI*2);ctx.fill();ctx.fillStyle="rgba(220,235,255,"+(a*0.5)+")";ctx.beginPath();ctx.arc(d.x,d.y,sz*0.5,0,Math.PI*2);ctx.fill();d.wb+=d.ws;d.x+=Math.sin(d.wb)*d.wa+0.2;d.y+=d.sp*(0.7+d.l*0.4);if(d.y>h+15){d.y=-15;d.x=Math.random()*w}if(d.x>w+10)d.x=-10;if(d.x<-10)d.x=w+10;}drawColorOverlay(ctx,w,h,code,int);}};
  WX.fog={cnt:120,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,sz:15+Math.random()*50,sp:0.1+Math.random()*0.3,op:0.04+Math.random()*0.1});return p},
    draw:function(ctx,w,h,p,int,code){ctx.clearRect(0,0,w,h);_wfrm++;for(var i=0;i<p.length;i++){var d=p[i],sz=d.sz*(int/100),a=d.op*(int/100);var gr=ctx.createRadialGradient(d.x+Math.sin(_wfrm*0.005+i)*30,d.y,0,d.x+Math.sin(_wfrm*0.005+i)*30,d.y,sz*2);gr.addColorStop(0,"rgba(200,210,220,"+(a*0.3)+")");gr.addColorStop(1,"rgba(200,210,220,0)");ctx.fillStyle=gr;ctx.beginPath();ctx.arc(d.x+Math.sin(_wfrm*0.005+i)*30,d.y,sz,0,Math.PI*2);ctx.fill();d.x+=d.sp;if(d.x>w+50)d.x=-50;}drawColorOverlay(ctx,w,h,code,int);}};
  WX.clear={cnt:200,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,sz:1+Math.random()*4,sp:0.2+Math.random()*0.5,wb:Math.random()*Math.PI*2,ph:Math.random()*Math.PI*2,op:0.2+Math.random()*0.5});return p},
    draw:function(ctx,w,h,p,int,code){ctx.clearRect(0,0,w,h);_wfrm++;var gr=ctx.createRadialGradient(w*0.5+Math.sin(_wfrm*0.002)*w*0.1,h*0.2,0,w*0.5+Math.sin(_wfrm*0.002)*w*0.1,h*0.2,Math.max(w,h)*0.6);gr.addColorStop(0,"rgba(255,220,150,"+(0.12*int/100)+")");gr.addColorStop(0.5,"rgba(255,200,100,"+(0.06*int/100)+")");gr.addColorStop(1,"rgba(255,200,100,0)");ctx.fillStyle=gr;ctx.beginPath();ctx.arc(w*0.5,h*0.2,Math.max(w,h)*0.6,0,Math.PI*2);ctx.fill();for(var i=0;i<p.length;i++){var d=p[i],a=d.op*(int/100);d.ph+=0.02;d.x+=d.sp*Math.sin(_wfrm*0.01+d.wb);d.y-=0.2;if(d.y<-10){d.y=h+10;d.x=Math.random()*w}ctx.fillStyle="rgba(255,220,150,"+(a*0.8*(0.5+0.5*Math.sin(d.ph)))+")";ctx.shadowColor="rgba(255,220,150,"+(a*0.4)+")";ctx.shadowBlur=10;ctx.beginPath();ctx.arc(d.x,d.y,d.sz,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;}drawColorOverlay(ctx,w,h,code,int);}};
  WX.wind={cnt:180,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,len:5+Math.random()*12,sp:3+Math.random()*7,op:0.1+Math.random()*0.2});return p},
    draw:function(ctx,w,h,p,int,code){ctx.clearRect(0,0,w,h);for(var i=0;i<p.length;i++){var d=p[i],a=d.op*(int/100);ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x+d.len,d.y);ctx.strokeStyle="rgba(200,210,220,"+a+")";ctx.lineWidth=0.5;ctx.stroke();d.x+=d.sp;if(d.x>w+20)d.x=-20;}drawColorOverlay(ctx,w,h,code,int);}};
  WX.thunder={cnt:300,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,len:8+Math.random()*20,sp:4+Math.random()*7,wd:1+Math.random()*2,op:0.35+Math.random()*0.5,w:0.8+Math.random()*1.5,l:Math.floor(Math.random()*3)});return p},
    draw:function(ctx,w,h,p,int,code){ctx.clearRect(0,0,w,h);WX.rain.draw(ctx,w,h,p,int,code);_wfrm++;if(Math.random()<0.003*int/100){ctx.fillStyle="rgba(200,230,255,"+(0.5*int/100)+")";ctx.fillRect(0,0,w,h);var fx=Math.random()*w;ctx.strokeStyle="rgba(200,230,255,"+(0.6*int/100)+")";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(fx,0);ctx.lineTo(fx-10+Math.random()*20,h*0.3);ctx.lineTo(fx+15+Math.random()*30,h*0.35);ctx.lineTo(fx,h*0.5);ctx.stroke();}drawColorOverlay(ctx,w,h,code,int);}};
  WX.cloudy={cnt:120,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height*0.6,sz:12+Math.random()*40,sp:0.1+Math.random()*0.3,op:0.04+Math.random()*0.08});return p},
    draw:function(ctx,w,h,p,int,code){ctx.clearRect(0,0,w,h);_wfrm++;for(var i=0;i<p.length;i++){var d=p[i],sz=d.sz*(int/100),a=d.op*(int/100);var gr=ctx.createRadialGradient(d.x+Math.sin(_wfrm*0.003+i)*20,d.y,0,d.x+Math.sin(_wfrm*0.003+i)*20,d.y,sz*2);gr.addColorStop(0,"rgba(180,190,200,"+(a*0.4)+")");gr.addColorStop(1,"rgba(180,190,200,0)");ctx.fillStyle=gr;ctx.beginPath();ctx.arc(d.x+Math.sin(_wfrm*0.003+i)*20,d.y,sz*2,0,Math.PI*2);ctx.fill();d.x+=d.sp;if(d.x>w+50)d.x=-50;}drawColorOverlay(ctx,w,h,code,int);}};

  function weatherAnimLoop(){
    if(!_wc||!_wrun)return;
    var ctx=_wc.getContext("2d");if(!ctx)return;
    if(WX[_wt])WX[_wt].draw(ctx,_wc.width,_wc.height,_wp,_wi,_wcode);
    _wa=requestAnimationFrame(weatherAnimLoop);
  }

  function startWeatherEffects(type,intensity,code){
    _wt=type||"clear";_wi=intensity||50;_wcode=code||0;_wenabled=true;
    var c=makeWeatherCanvas();
    if(WX[_wt])_wp=WX[_wt].init(c);
    _wrun=true;_wfrm=0;weatherAnimLoop();
    function rs(){if(_wc){_wc.width=window.innerWidth;_wc.height=window.innerHeight;if(WX[_wt])_wp=WX[_wt].init(_wc)}}
    window.addEventListener("resize",rs);
    return function(){window.removeEventListener("resize",rs);removeWeatherCanvas()};
  }
  function stopWeatherEffects(){_wenabled=false;removeWeatherCanvas();}
  function updateWeatherEffects(type,intensity,code){
    if(type!==undefined)_wt=type;if(intensity!==undefined)_wi=intensity;if(code!==undefined)_wcode=code;
    if(!_wrun||!_wc||!_wc.width)return;_wfrm=0;
    if(WX[_wt])_wp=WX[_wt].init(_wc);
  }
  // ===== THEME PARTICLE EFFECTS (Canvas z-index:2, 10 types, IMPROVED sunset & aurora) =====
  var TH = {};
  TH.rain={cnt:350,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,len:10+Math.random()*22,speed:5+Math.random()*8,wind:1.5+Math.random()*2.5,op:0.15+Math.random()*0.3,w:0.5+Math.random()*1.0,l:Math.floor(Math.random()*3)});return p},
    draw:function(ctx,w,h,p,int){ctx.clearRect(0,0,w,h);for(var i=0;i<p.length;i++){var d=p[i],a=d.op*(int/100);ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x+d.wind*0.8,d.y-d.len);ctx.strokeStyle="rgba(160,200,255,"+a+")";ctx.lineWidth=d.w;ctx.lineCap="round";ctx.shadowColor="rgba(100,150,255,"+(a*0.25)+")";ctx.shadowBlur=(4+d.l*2)*(1+int/200);ctx.stroke();ctx.shadowBlur=0;d.x+=d.wind*(d.l+1)*0.15;d.y+=d.speed*(0.8+d.l*0.3);if(d.y>h+30){d.y=-30;d.x=Math.random()*w}if(d.x>w+15)d.x=-15;if(d.x<-15)d.x=w+15;}}};
  TH.snow={cnt:300,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,sz:1+Math.random()*5,sp:0.5+Math.random()*2.5,wb:Math.random()*Math.PI*2,ws:0.003+Math.random()*0.015,wa:0.3+Math.random()*1.5,op:0.2+Math.random()*0.4,l:Math.floor(Math.random()*3)});return p},
    draw:function(ctx,w,h,p,int){ctx.clearRect(0,0,w,h);for(var i=0;i<p.length;i++){var d=p[i],sz=d.sz*(0.7+d.l*0.4)*(int/100),a=d.op*(int/100);var gr=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,sz*(5+int/25));gr.addColorStop(0,"rgba(200,220,255,"+(a*0.4)+")");gr.addColorStop(0.2,"rgba(180,210,240,"+(a*0.15)+")");gr.addColorStop(1,"rgba(180,210,240,0)");ctx.fillStyle=gr;ctx.beginPath();ctx.arc(d.x,d.y,sz*5,0,Math.PI*2);ctx.fill();ctx.fillStyle="rgba(220,235,255,"+(a*0.5)+")";ctx.beginPath();ctx.arc(d.x,d.y,sz*0.5,0,Math.PI*2);ctx.fill();d.wb+=d.ws;d.x+=Math.sin(d.wb)*d.wa+0.2;d.y+=d.sp*(0.7+d.l*0.4);if(d.y>h+15){d.y=-15;d.x=Math.random()*w}if(d.x>w+10)d.x=-10;if(d.x<-10)d.x=w+10;}}};
  TH.sand={cnt:250,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,sz:0.5+Math.random()*3,sp:2+Math.random()*5,dr:0.3+Math.random()*1.5,op:0.1+Math.random()*0.25,wb:Math.random()*Math.PI*2,ws:0.002+Math.random()*0.01,wa:0.5+Math.random()*2,l:Math.floor(Math.random()*3)});return p},
    draw:function(ctx,w,h,p,int){ctx.clearRect(0,0,w,h);var hz=ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,Math.max(w,h)*0.7);hz.addColorStop(0,"rgba(200,170,120,"+(0.06*int/100*(1+int/100))+")");hz.addColorStop(1,"rgba(180,150,100,0)");ctx.fillStyle=hz;ctx.fillRect(0,0,w,h);for(var i=0;i<p.length;i++){var d=p[i],s=d.sz*(0.7+d.l*0.4)*(int/100),a=d.op*(int/100);var gr=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,s*6);gr.addColorStop(0,"rgba(220,190,140,"+(a*0.3)+")");gr.addColorStop(0.3,"rgba(200,170,120,"+(a*0.12)+")");gr.addColorStop(1,"rgba(200,170,120,0)");ctx.fillStyle=gr;ctx.beginPath();ctx.arc(d.x,d.y,s*6,0,Math.PI*2);ctx.fill();ctx.fillStyle="rgba(220,195,150,"+(a*0.3)+")";ctx.beginPath();ctx.arc(d.x,d.y,s,0,Math.PI*2);ctx.fill();d.wb+=d.ws;d.x+=Math.sin(d.wb)*d.wa+d.dr;d.y+=d.sp*0.15*(0.7+d.l*0.4);if(d.y>h+10){d.y=-10;d.x=Math.random()*w}if(d.x>w+20)d.x=-20;if(d.x<-20)d.x=w+20;}}};
  TH.stars={cnt:300,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,sz:0.3+Math.random()*2.5,b:0.3+Math.random()*0.7,ph:Math.random()*Math.PI*2,sp:0.005+Math.random()*0.03});return p},
    draw:function(ctx,w,h,p,int){ctx.clearRect(0,0,w,h);var ov=ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,Math.max(w,h)*0.8);ov.addColorStop(0,"rgba(0,0,20,0)");ov.addColorStop(1,"rgba(0,0,20,"+(0.06*int/100)+")");ctx.fillStyle=ov;ctx.fillRect(0,0,w,h);var mw=ctx.createRadialGradient(w*0.35,h*0.35,0,w*0.35,h*0.35,Math.min(w,h)*0.6);mw.addColorStop(0,"rgba(150,180,255,"+(0.03*int/100)+")");mw.addColorStop(0.5,"rgba(120,150,220,"+(0.015*int/100)+")");mw.addColorStop(1,"rgba(150,180,255,0)");ctx.fillStyle=mw;ctx.beginPath();ctx.ellipse(w*0.35,h*0.35,Math.min(w,h)*0.6,Math.min(w,h)*0.2,0.4,0,Math.PI*2);ctx.fill();_tfrm++;for(var i=0;i<p.length;i++){var d=p[i],tw=0.5+0.5*Math.sin(d.ph+_tfrm*d.sp),a=d.b*Math.max(0.2,tw)*(int/100);ctx.fillStyle="rgba(200,220,255,"+a+")";ctx.shadowColor="rgba(180,210,255,"+(a*0.3)+")";ctx.shadowBlur=d.sz*3;ctx.beginPath();ctx.arc(d.x,d.y,d.sz*(0.5+tw*0.5),0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;}var ssCount=Math.floor(1+int/33);for(var i=0;i<ssCount;i++){var sx=Math.random()*w,sy=Math.random()*h*0.3,angle=0.6+Math.random()*0.8,len=30+Math.random()*80;var gr=ctx.createLinearGradient(sx,sy,sx+Math.cos(angle)*len,sy+Math.sin(angle)*len);gr.addColorStop(0,"rgba(200,220,255,"+(0.6*int/100)+")");gr.addColorStop(1,"rgba(200,220,255,0)");ctx.strokeStyle=gr;ctx.lineWidth=1.5*(int/100);ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+Math.cos(angle)*len,sy+Math.sin(angle)*len);ctx.stroke();}}};
  // --- IMPROVED AURORA ---
  TH.aurora={cnt:150,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height*0.7,sz:2+Math.random()*6,sp:0.1+Math.random()*0.3,ph:Math.random()*Math.PI*2,ws:0.005+Math.random()*0.02,op:0.2+Math.random()*0.4,cl:Math.floor(Math.random()*4)});return p},
    draw:function(ctx,w,h,p,int){ctx.clearRect(0,0,w,h);_tfrm++;
      var sky=ctx.createLinearGradient(0,0,0,h*0.8);sky.addColorStop(0,"rgba(0,0,10,"+(0.08*int/100)+")");sky.addColorStop(1,"rgba(0,0,20,0)");ctx.fillStyle=sky;ctx.fillRect(0,0,w,h*0.8);
      var auroraColors=[["rgba(0,255,120","rgba(0,200,180","rgba(0,255,80"],["rgba(180,100,255","rgba(220,50,220","rgba(100,200,255"],["rgba(0,220,180","rgba(80,255,120","rgba(0,200,100"],["rgba(255,100,200","rgba(200,50,255","rgba(150,100,255"]];
      for(var l=0;l<5;l++){
        var baseX=l*0.3,amp=0.15+l*0.05,freq=0.006-l*0.001,speed=0.003+l*0.002,off=l*1.7;
        ctx.beginPath();ctx.moveTo(0,h*0.8);
        for(var x=0;x<=w;x+=10){
          var wave=Math.sin(x*freq+_tfrm*speed*1.3+off)*Math.sin(x*0.0015+l)*0.5+0.5;
          var y=h*0.15+wave*h*0.4*amp+Math.sin(x*0.003+l*2+_tfrm*0.002)*h*0.08;
          ctx.lineTo(x,y);
        }
        ctx.lineTo(w,h*0.8);ctx.closePath();
        var gr=ctx.createLinearGradient(0,0,0,h*0.5);
        var ci=l%4,alpha=0.08+0.04*Math.sin(_tfrm*0.01+l)*int/100;
        gr.addColorStop(0,auroraColors[ci][0]+","+alpha+")");
        gr.addColorStop(0.5,auroraColors[ci][1]+","+(alpha*0.7)+")");
        gr.addColorStop(1,auroraColors[ci][2]+","+(alpha*0.2)+")");
        ctx.fillStyle=gr;ctx.fill();
      }
      for(var s=0;s<40;s++){
        var sx=s/40*w+Math.sin(_tfrm*0.003+s)*20,sh=40+Math.sin(_tfrm*0.005+s*0.5)*30;
        var gr=ctx.createLinearGradient(sx,0,sx,sh);
        gr.addColorStop(0,"rgba(0,255,120,"+(0.01*int/100)+")");gr.addColorStop(1,"rgba(0,255,120,0)");
        ctx.fillStyle=gr;ctx.fillRect(sx-1,0,2,sh);
      }
      for(var i=0;i<p.length;i++){
        var d=p[i],a=d.op*(int/100);d.ph+=d.ws;d.y+=Math.sin(d.ph)*0.15;d.x+=d.sp;
        if(d.x>w+20){d.x=-20;d.y=Math.random()*h*0.7}
        var cols=[["0,255,120","0,200,180"],["180,100,255","220,50,220"],["0,220,180","80,255,120"],["255,100,200","200,50,255"]];
        var gr=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,d.sz*10);
        gr.addColorStop(0,"rgba("+cols[d.cl%4][0]+","+(a*0.2)+")");
        gr.addColorStop(0.5,"rgba("+cols[d.cl%4][1]+","+(a*0.1)+")");
        gr.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle=gr;ctx.beginPath();ctx.arc(d.x,d.y,d.sz*10,0,Math.PI*2);ctx.fill();
        ctx.fillStyle="rgba(255,255,255,"+(a*0.08)+")";ctx.beginPath();ctx.arc(d.x,d.y,d.sz*0.3,0,Math.PI*2);ctx.fill();
      }
      var hl=ctx.createRadialGradient(w*0.5,h*0.85,0,w*0.5,h*0.85,Math.max(w,h)*0.5);
      hl.addColorStop(0,"rgba(0,255,100,"+(0.02*int/100)+")");hl.addColorStop(1,"rgba(0,255,100,0)");
      ctx.fillStyle=hl;ctx.fillRect(0,0,w,h);
    }};
  TH.leaves={cnt:200,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height*-1,sz:3+Math.random()*8,sp:0.5+Math.random()*2,wb:Math.random()*Math.PI*2,ws:0.01+Math.random()*0.03,wa:0.5+Math.random()*3,op:0.5+Math.random()*0.5,cl:Math.floor(Math.random()*5),rot:Math.random()*Math.PI*2});return p},
    draw:function(ctx,w,h,p,int){ctx.clearRect(0,0,w,h);var leafColors=["#d4441a","#e87020","#e8b830","#8ab830","#c87830"];for(var i=0;i<p.length;i++){var d=p[i],a=d.op*(int/100),sz=d.sz*(int/100);d.wb+=d.ws;d.rot+=0.02;d.x+=Math.sin(d.wb)*d.wa+0.3;d.y+=d.sp*(0.5+d.sz/8);if(d.y>h+20){d.y=-20;d.x=Math.random()*w;d.cl=Math.floor(Math.random()*5)}if(d.x>w+20)d.x=-20;if(d.x<-20)d.x=w+20;ctx.save();ctx.translate(d.x,d.y);ctx.rotate(d.rot);ctx.shadowColor="rgba(100,50,0,"+(a*0.2)+")";ctx.shadowBlur=4;ctx.fillStyle=leafColors[d.cl];ctx.globalAlpha=a;ctx.beginPath();ctx.ellipse(0,0,sz,sz*0.5,0,0,Math.PI*2);ctx.fill();ctx.restore();ctx.shadowBlur=0;ctx.globalAlpha=1;}}};
  TH.water={cnt:180,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,sz:1+Math.random()*4,sp:0.3+Math.random()*1.5,wb:Math.random()*Math.PI*2,ws:0.005+Math.random()*0.02,wa:5+Math.random()*20,op:0.1+Math.random()*0.3});return p},
    draw:function(ctx,w,h,p,int){ctx.clearRect(0,0,w,h);var ov=ctx.createRadialGradient(w/2,h*0.3,0,w/2,h*0.3,Math.max(w,h)*0.7);ov.addColorStop(0,"rgba(50,100,180,"+(0.04*int/100)+")");ov.addColorStop(1,"rgba(20,50,100,"+(0.06*int/100)+")");ctx.fillStyle=ov;ctx.fillRect(0,0,w,h);_tfrm++;for(var r=0;r<8;r++){var rx=(r/8)*w+Math.sin(_tfrm*0.002+r*2)*80,cw=30+Math.sin(_tfrm*0.003+r*3)*15;var gr=ctx.createLinearGradient(rx,0,rx+cw,0);gr.addColorStop(0,"rgba(180,230,255,0)");gr.addColorStop(0.5,"rgba(180,230,255,"+(0.025*int/100)+")");gr.addColorStop(1,"rgba(180,230,255,0)");ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(rx-20,0);ctx.quadraticCurveTo(rx-10+Math.sin(_tfrm*0.005+r)*30,h*0.7,rx-5+Math.sin(_tfrm*0.004+r*1.5)*20,h);ctx.lineTo(rx+cw+5+Math.sin(_tfrm*0.004+r*1.5)*10,h);ctx.quadraticCurveTo(rx+cw+10+Math.sin(_tfrm*0.005+r)*20,h*0.7,rx+cw+20,0);ctx.fill();}for(var i=0;i<p.length;i++){var d=p[i],sz=d.sz*(int/100);d.wb+=d.ws;d.x+=Math.sin(d.wb)*d.wa*0.02;d.y-=d.sp*(0.5+d.sz/5);if(d.y<-10){d.y=h+10;d.x=Math.random()*w;d.sz=1+Math.random()*4;d.sp=0.3+Math.random()*1.5}ctx.strokeStyle="rgba(180,220,255,"+(d.op*(int/100))+")";ctx.lineWidth=0.5;ctx.beginPath();ctx.arc(d.x,d.y,sz,0,Math.PI*2);ctx.stroke();ctx.fillStyle="rgba(200,230,255,"+(d.op*0.3*(int/100))+")";ctx.beginPath();ctx.arc(d.x-sz*0.2,d.y-sz*0.2,sz*0.2,0,Math.PI*2);ctx.fill();}}};
  TH.fire={cnt:250,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:c.width*0.2+Math.random()*c.width*0.6,y:c.height*0.5+Math.random()*c.height*0.5,sz:1+Math.random()*5,sp:0.5+Math.random()*3,wb:Math.random()*Math.PI*2,ws:0.01+Math.random()*0.05,wa:2+Math.random()*10,op:0.3+Math.random()*0.7,cl:Math.floor(Math.random()*3)});return p},
    draw:function(ctx,w,h,p,int){ctx.clearRect(0,0,w,h);var gl=ctx.createRadialGradient(w/2,h,0,w/2,h,Math.max(w,h)*0.5);gl.addColorStop(0,"rgba(255,150,30,"+(0.08*int/100)+")");gl.addColorStop(0.5,"rgba(200,80,20,"+(0.04*int/100)+")");gl.addColorStop(1,"rgba(150,50,10,0)");ctx.fillStyle=gl;ctx.beginPath();ctx.arc(w/2,h,Math.max(w,h)*0.5,0,Math.PI*2);ctx.fill();for(var i=0;i<p.length;i++){var d=p[i];d.wb+=d.ws;d.x+=Math.sin(d.wb)*d.wa*0.1;d.y-=d.sp*(0.8+d.sz/5);if(d.y<-20||d.x<0||d.x>w){d.y=h*0.5+Math.random()*h*0.5;d.x=w*0.2+Math.random()*w*0.6}var sz=d.sz*(int/100),a=d.op*(int/100);var colors=[["255,200,50","255,150,30","255,100,20"],["255,150,30","255,100,20","200,50,10"],["200,80,20","150,50,10","100,30,0"]];var gr=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,sz*6);gr.addColorStop(0,"rgba("+colors[d.cl][0]+","+(a*0.5)+")");gr.addColorStop(0.3,"rgba("+colors[d.cl][1]+","+(a*0.25)+")");gr.addColorStop(1,"rgba("+colors[d.cl][2]+",0)");ctx.fillStyle=gr;ctx.beginPath();ctx.arc(d.x,d.y,sz*6,0,Math.PI*2);ctx.fill();ctx.shadowColor="rgba(255,200,50,"+(a*0.3)+")";ctx.shadowBlur=10;ctx.fillStyle="rgba("+colors[d.cl][0]+","+(a*0.4)+")";ctx.beginPath();ctx.arc(d.x,d.y,sz,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;}var fl=ctx.createRadialGradient(w*0.3+Math.sin(_tfrm*0.01)*w*0.2,h*0.7,0,w*0.3+Math.sin(_tfrm*0.01)*w*0.2,h*0.7,Math.max(w,h)*0.6);fl.addColorStop(0,"rgba(255,200,100,"+(0.03*int/100)+")");fl.addColorStop(1,"rgba(255,200,100,0)");ctx.fillStyle=fl;ctx.beginPath();ctx.arc(w*0.3+Math.sin(_tfrm*0.01)*w*0.2,h*0.7,Math.max(w,h)*0.6,0,Math.PI*2);ctx.fill();_tfrm++;}};
  // --- IMPROVED SUNSET ---
  TH.sunset={cnt:120,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:i/this.cnt*c.width,y:Math.random()*c.height*0.4,sz:8+Math.random()*30,sp:0.08+Math.random()*0.25,op:0.15+Math.random()*0.35,ph:Math.random()*Math.PI*2});return p},
    draw:function(ctx,w,h,p,int){ctx.clearRect(0,0,w,h);_tfrm++;
      var sunPhase=Math.sin(_tfrm*0.002)*0.5+0.5,sunY=0.15+sunPhase*0.4;
      var sky=ctx.createLinearGradient(0,0,0,h);
      sky.addColorStop(0,"rgba(20,40,100,"+(0.15*int/100)+")");
      sky.addColorStop(Math.max(0,sunY-0.25),"rgba(100,130,200,"+(0.12*int/100)+")");
      sky.addColorStop(sunY-0.05,"rgba(255,190,120,"+(0.18*int/100)+")");
      sky.addColorStop(sunY+0.02,"rgba(255,150,80,"+(0.22*int/100)+")");
      sky.addColorStop(sunY+0.15,"rgba(220,100,50,"+(0.15*int/100)+")");
      sky.addColorStop(sunY+0.35,"rgba(180,60,40,"+(0.10*int/100)+")");
      sky.addColorStop(1,"rgba(80,30,20,"+(0.08*int/100)+")");
      ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
      var sx=w*0.4+Math.sin(_tfrm*0.001)*w*0.2,sy=h*sunY,sunSize=45*(int/100);
      var sg=ctx.createRadialGradient(sx,sy,0,sx,sy,sunSize*5);
      sg.addColorStop(0,"rgba(255,255,230,"+(0.5*int/100)+")");
      sg.addColorStop(0.15,"rgba(255,220,180,"+(0.35*int/100)+")");
      sg.addColorStop(0.4,"rgba(255,180,100,"+(0.20*int/100)+")");
      sg.addColorStop(0.7,"rgba(255,120,60,"+(0.08*int/100)+")");
      sg.addColorStop(1,"rgba(255,100,50,0)");
      ctx.fillStyle=sg;ctx.beginPath();ctx.arc(sx,sy,sunSize*5,0,Math.PI*2);ctx.fill();
      ctx.fillStyle="rgba(255,240,200,"+(0.7*int/100)+")";ctx.beginPath();ctx.arc(sx,sy,sunSize*0.8,0,Math.PI*2);ctx.fill();
      ctx.fillStyle="rgba(255,255,255,"+(0.4*int/100)+")";ctx.beginPath();ctx.arc(sx,sy,sunSize*0.4,0,Math.PI*2);ctx.fill();
      for(var r=0;r<12;r++){var angle=r*Math.PI/6+_tfrm*0.001,rayLen=100+Math.sin(r*2+_tfrm*0.005)*40;
        var gr=ctx.createLinearGradient(sx,sy,sx+Math.cos(angle)*rayLen,sy+Math.sin(angle)*rayLen);
        gr.addColorStop(0,"rgba(255,220,150,"+(0.03*int/100)+")");gr.addColorStop(1,"rgba(255,220,150,0)");
        ctx.strokeStyle=gr;ctx.lineWidth=6*(int/100);ctx.beginPath();ctx.moveTo(sx,sy);
        ctx.lineTo(sx+Math.cos(angle)*rayLen,sy+Math.sin(angle)*rayLen);ctx.stroke();}
      for(var i=0;i<p.length;i++){var d=p[i],sz=d.sz*(int/100),a=d.op*(int/100);d.x+=d.sp;if(d.x>w+60)d.x=-60;
        ctx.fillStyle="rgba(180,120,80,"+(a*0.3)+")";ctx.beginPath();ctx.ellipse(d.x,d.y,sz,sz*0.4,0,0,Math.PI*2);ctx.fill();
        ctx.fillStyle="rgba(200,140,90,"+(a*0.2)+")";ctx.beginPath();ctx.ellipse(d.x+sz*0.5,d.y-sz*0.1,sz*0.5,sz*0.3,0,0,Math.PI*2);ctx.fill();
        var rim=ctx.createRadialGradient(d.x,d.y-sz*0.2,0,d.x,d.y-sz*0.2,sz*0.6);
        rim.addColorStop(0,"rgba(255,200,120,"+(a*0.3)+")");rim.addColorStop(1,"rgba(255,200,120,0)");
        ctx.fillStyle=rim;ctx.beginPath();ctx.ellipse(d.x,d.y-sz*0.2,sz*0.6,sz*0.15,0,0,Math.PI*2);ctx.fill();}
      for(var b=0;b<5;b++){var bx=w*0.1+((b*0.2*w+_tfrm*0.3*int/50)%(w*0.8)),by=h*0.2+b*20+Math.sin(b+_tfrm*0.01)*15;
        ctx.strokeStyle="rgba(20,15,10,"+(0.3*int/100)+")";ctx.lineWidth=1.5;ctx.beginPath();
        ctx.moveTo(bx-8,by);ctx.quadraticCurveTo(bx-4,by-5,bx,by-2);ctx.quadraticCurveTo(bx+4,by-5,bx+8,by);
        ctx.moveTo(bx-6,by+1);ctx.quadraticCurveTo(bx-3,by-3,bx,by);ctx.quadraticCurveTo(bx+3,by-3,bx+6,by+1);ctx.stroke();}
      ctx.fillStyle="rgba(10,8,5,"+(0.25*int/100)+")";
      ctx.beginPath();ctx.moveTo(0,h);for(var x=0;x<=w;x+=20){ctx.lineTo(x,h-15-Math.sin(x*0.02+_tfrm*0.002)*8-Math.sin(x*0.05)*5)}
      ctx.lineTo(w,h);ctx.closePath();ctx.fill();
    }};
  TH.mc={cnt:150,init:function(c){var p=[];for(var i=0;i<this.cnt;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height*0.5,sz:5+Math.random()*15,sp:0.1+Math.random()*0.3,op:0.3+Math.random()*0.5,wb:Math.random()*Math.PI*2});return p},
    draw:function(ctx,w,h,p,int){ctx.clearRect(0,0,w,h);_tfrm++;var sky=ctx.createLinearGradient(0,0,0,h*0.5);sky.addColorStop(0,"rgba(100,180,255,"+(0.15*int/100)+")");sky.addColorStop(1,"rgba(135,200,235,"+(0.08*int/100)+")");ctx.fillStyle=sky;ctx.fillRect(0,0,w,h*0.5);var gh=Math.min(80,h*0.15);ctx.fillStyle="rgba(100,160,60,"+(0.3*int/100)+")";ctx.fillRect(0,h-gh,w,gh);for(var x=0;x<w;x+=12){var th=5+Math.sin(x*0.1)*8;ctx.fillStyle="rgba(120,180,70,"+(0.25*int/100)+")";ctx.fillRect(x,h-gh-th,12,th);}var sunX=w*0.15+Math.sin(_tfrm*0.003)*w*0.35,sunY=h*0.1,ss=20*(int/100);ctx.fillStyle="rgba(255,220,100,"+(0.4*int/100)+")";ctx.fillRect(sunX-ss,sunY-ss,ss*2,ss*2);for(var i=0;i<p.length;i++){var d=p[i];d.x+=d.sp;if(d.x>w+30)d.x=-30;for(var j=-2;j<=2;j++){ctx.fillStyle="rgba(255,255,255,"+(d.op*0.3*(int/100))+")";ctx.fillRect(d.x+j*10,d.y+Math.sin(j)*3,12,8);}}}};

  function themeAnimLoop(){
    if(!_tc||!_trun)return;
    var ctx=_tc.getContext("2d");if(!ctx)return;
    if(TH[_tt])TH[_tt].draw(ctx,_tc.width,_tc.height,_tp,_ti);
    _ta=requestAnimationFrame(themeAnimLoop);
  }

  function startThemeEffects(type,intensity){
    _tt=type||"rain";_ti=intensity||50;
    var c=makeThemeCanvas();
    _tp=TH[_tt]?TH[_tt].init(c):[];
    _trun=true;_tfrm=0;themeAnimLoop();
    function rs(){if(_tc){_tc.width=window.innerWidth;_tc.height=window.innerHeight;if(TH[_tt])_tp=TH[_tt].init(_tc)}}
    window.addEventListener("resize",rs);
    ss("th_type",_tt);ss("th_int",_ti);ss("th_enabled",true);
    return function(){window.removeEventListener("resize",rs);removeThemeCanvas()};
  }
  function stopThemeEffects(){_trun=false;removeThemeCanvas();ss("th_enabled",false);}
  function updateThemeEffects(type,intensity){
    if(type!==undefined)_tt=type;if(intensity!==undefined)_ti=intensity;
    ss("th_type",_tt);ss("th_int",_ti);
    if(!_trun||!_tc)return;_tfrm=0;
    if(TH[_tt])_tp=TH[_tt].init(_tc);
  }
  // ===== VIDEO BACKGROUND (z-index: 0) =====
  function videoMakeElement(){
    var old=document.getElementById("lte-vid");
    if(old&&old.parentNode)old.parentNode.removeChild(old);
    if(_vurl){URL.revokeObjectURL(_vurl);_vurl=null}
    var v=document.createElement("video");
    v.id="lte-vid";
    v.style.cssText="position:fixed;top:0;left:0;width:100vw;height:100vh;object-fit:cover;z-index:0;pointer-events:none;opacity:1";
    v.loop=true;v.muted=false;v.playsInline=true;v.volume=_vvol;
    document.body.insertBefore(v,document.body.firstChild);
    _vid=v;return v;
  }

  function videoStart(blob){
    try{if(_vid){_vid.pause();_vid.src="";try{_vid.load()}catch(e){}}}catch(e){}
    var v=videoMakeElement();
    _vurl=URL.createObjectURL(blob);
    v.src=_vurl;_vactive=true;_vpaused=false;
    v.play().catch(function(){});
    try{var r=indexedDB.open("LTEVidDB",1);
      r.onupgradeneeded=function(e){if(!e.target.result.objectStoreNames.contains("d"))e.target.result.createObjectStore("d")};
      r.onsuccess=function(e){var tx=e.target.result.transaction(["d"],"readwrite");tx.objectStore("d").put(blob,"v");tx.oncomplete=function(){e.target.result.close()}}}catch(e){}
  }

  function videoPause(){if(_vid){_vid.pause();_vpaused=true}}
  function videoPlay(){if(_vid){_vid.play();_vpaused=false}}
  function videoVolume(v){_vvol=v;if(_vid)_vid.volume=v;try{localStorage.setItem("lte-vvol",v)}catch(e){}}
  function videoKill(){
    if(_vid){try{_vid.pause();_vid.src="";try{_vid.load()}catch(e){}}catch(e){}if(_vid.parentNode)_vid.parentNode.removeChild(_vid)}
    if(_vurl){URL.revokeObjectURL(_vurl);_vurl=null}
    _vid=null;_vactive=false;_vpaused=false;
    try{var r=indexedDB.open("LTEVidDB",1);
      r.onsuccess=function(e){var tx=e.target.result.transaction(["d"],"readwrite");tx.objectStore("d").delete("v");tx.oncomplete=function(){e.target.result.close()}}}catch(e){}
  }

  // Auto-restore video
  try{var r=indexedDB.open("LTEVidDB",1);
    r.onupgradeneeded=function(e){if(!e.target.result.objectStoreNames.contains("d"))e.target.result.createObjectStore("d")};
    r.onsuccess=function(e){var tx=e.target.result.transaction(["d"],"readonly");var req=tx.objectStore("d").get("v");
      req.onsuccess=function(){var blob=req.result;if(blob)videoStart(blob);e.target.result.close()}}}catch(e){}

  // Auto-restore theme effects
  var thE=sg("th_enabled",false),thT=sg("th_type","rain"),thI=sg("th_int",50);
  if(thE&&document.body&&!document.getElementById("lte-th-bg")){try{startThemeEffects(thT,thI)}catch(e){}}

  // File picker
  var _fileInput=null;
  function pickVideoFile(){
    if(!_fileInput){_fileInput=document.createElement("input");_fileInput.type="file";_fileInput.accept="video/mp4,video/webm,video/ogg";_fileInput.style.display="none";document.body.appendChild(_fileInput);
      _fileInput.addEventListener("change",function(){var f=_fileInput.files[0];_fileInput.value="";if(f)videoStart(f)})}
    _fileInput.click();
  }
  // ===================== REACT COMPONENTS =====================
  window.registerExtension(function (api) {
    var R = api.React, el = R.createElement, useState = R.useState, useEffect = R.useEffect, useRef = R.useRef;
    var CU = api.ChakraUI;
    var Box=CU.Box, HStack=CU.HStack, VStack=CU.VStack, Text=CU.Text, Heading=CU.Heading, Badge=CU.Badge, Button=CU.Button, Switch=CU.Switch, FormControl=CU.FormControl, FormLabel=CU.FormLabel;

    // ===================== CITY WEATHER WIDGET =====================
    function CityWeatherWidget() {
      var host=api.getHostContext(),es=host.state.useExtensionState;
      var city=es("cw_city",""),wInfo=es("cw_wi",null);
      var [input,setInput]=useState("");
      var [loading,setLoading]=useState(false);
      var [satOn,setSatOn]=useState(_satEnabled);
      var [wxOn,setWxOn]=useState(_wenabled);

      useEffect(function(){
        var cache=sg("cw_lastData",null);
        if(cache){wInfo[1](cache);city[1](cache.cn||"")}
        if(!city[0]){
          fetch("https://ip-api.com/json/?fields=city",{signal:AbortSignal.timeout(3000)})
            .then(function(r){return r.json()}).then(function(d){if(d&&d.city)city[1](d.city)}).catch(function(){});
        }
      },[]);

      function refreshWeather(overrideCity){
        var loc=overrideCity||city[0];if(!loc)return;
        setLoading(true);
        getCityWeather(loc,function(d){
          setLoading(false);
          if(d){
            wInfo[1](d);d.cn=loc;ss("cw_lastData",d);ss("cw_lastCode",d.code);ss("cw_lastInt",_wi);
            var e=mapWMO(d.code),intens=mapWMOIntensity(d.code);
            if(_wenabled){updateWeatherEffects(e,intens,d.code)}
            else{startWeatherEffects(e,intens,d.code)}
          }
        });
      }

      useEffect(function(){if(city[0])refreshWeather()},[city[0]]);

      function searchCity(){
        var v=input.trim();if(!v)return;
        setLoading(true);wInfo[1](null);city[1](v);ss("cw_city",v);
        getCityWeather(v,function(d){
          setLoading(false);
          if(d){wInfo[1](d);d.cn=v;ss("cw_lastData",d);ss("cw_lastCode",d.code);var e=mapWMO(d.code),intens=mapWMOIntensity(d.code);
            if(!_wenabled)startWeatherEffects(e,intens,d.code);else updateWeatherEffects(e,intens,d.code)}
        });
      }

      var wea=wInfo[0];
      var weatherType=wea?mapWMO(wea.code):"";
      var weatherIcon=WN_ICON[weatherType]||"";
      var weatherName=WN[weatherType]||"";

      // Weather-style card
      return el(Box,{
        p:4,borderRadius:"2xl",overflow:"hidden",position:"relative",
        bg:wea?"linear-gradient(135deg, #0f0c29, #302b63, #24243e)":"rgba(8,12,24,0.9)",
        backdropFilter:"blur(4px)",border:"1px solid rgba(255,255,255,0.1)"
      },
        // Decorative background gradient
        wea?el("div",{style:{position:"absolute",top:"-30%",right:"-20%",width:"60%",height:"60%",
          background:"radial-gradient(circle, rgba(100,150,255,0.15), transparent)",
          borderRadius:"50%",pointerEvents:"none"}}):null,
        el(VStack,{spacing:3,align:"stretch",position:"relative",zIndex:1},
          el(HStack,{justify:"space-between",align:"center"},
            el(HStack,{spacing:2},
              el(Text,{fontSize:"xs",fontWeight:"bold",color:"white",letterSpacing:"0.5px",textTransform:"uppercase"},"City Weather"),
            ),
            el(Badge,{colorScheme:_wenabled?"green":"gray",variant:"solid",fontSize:"xs",borderRadius:"full",px:2},
              _wenabled?"Active":"Standby")
          ),
          // City search bar
          el(HStack,{spacing:2},
            el("input",{
              placeholder:"Search city...",value:input,
              onInput:function(e){setInput(e.target.value)},
              onKeyDown:function(e){if(e.key==="Enter")searchCity()},
              style:{flex:1,padding:"6px 10px",borderRadius:"10px",background:"rgba(255,255,255,0.08)",
                color:"#e2e8f0",border:"1px solid rgba(255,255,255,0.15)",fontSize:"13px",outline:"none"}}),
            el(Button,{size:"xs",colorScheme:"blue",onClick:searchCity,isDisabled:!input.trim()||loading,fontSize:"xs",borderRadius:"10px"},
              loading?"...":"🔍")
          ),
          // Weather display - app style
          wea?el(Box,{
            p:3,borderRadius:"xl",bg:"rgba(255,255,255,0.06)",
            border:"1px solid rgba(255,255,255,0.08)"
          },
            el(VStack,{spacing:2,align:"center"},
              el(Text,{fontSize:"11px",color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:"1px",fontWeight:"medium"},
                city[0]||""),
              el(HStack,{spacing:1,align:"center"},
                el(Text,{fontSize:"40px",fontWeight:"300",color:"white",lineHeight:"1"},wea.temp+"°"),
                el(Text,{fontSize:"14px",color:"rgba(255,255,255,0.5)",mt:"6px"},"C")
              ),
              el(HStack,{spacing:1,align:"center"},
                el(Text,{fontSize:"20px"},weatherIcon),
                el(Text,{fontSize:"13px",color:"rgba(255,255,255,0.7)",fontWeight:"500"},weatherName)
              ),
              el(Box,{h:"1px",bg:"rgba(255,255,255,0.06)",w:"100%"}),
              el(HStack,{spacing:4,justify:"center"},
                el(VStack,{spacing:0,align:"center"},
                  el(Text,{fontSize:"10px",color:"rgba(255,255,255,0.4)",textTransform:"uppercase"},"Humidity"),
                  el(Text,{fontSize:"14px",color:"white",fontWeight:"600"},wea.humi+"%")),
                el(VStack,{spacing:0,align:"center"},
                  el(Text,{fontSize:"10px",color:"rgba(255,255,255,0.4)",textTransform:"uppercase"},"Wind"),
                  el(Text,{fontSize:"14px",color:"white",fontWeight:"600"},wea.wind+" km/h")),
                wea.feels?el(VStack,{spacing:0,align:"center"},
                  el(Text,{fontSize:"10px",color:"rgba(255,255,255,0.4)",textTransform:"uppercase"},"Feels"),
                  el(Text,{fontSize:"14px",color:"white",fontWeight:"600"},wea.feels+"°")):null
              )
            )
          ):el(Box,{p:3,borderRadius:"xl",bg:"rgba(255,255,255,0.04)",textAlign:"center"},
            el(Text,{fontSize:"sm",color:"rgba(255,255,255,0.4)"},
              city[0]?el("span",null,"Loading weather..."):el("span",null,"Search for a city"))
          ),
          // Atmosphere toggle
          el(HStack,{justify:"space-between",align:"center"},
            el(Text,{fontSize:"xs",color:"rgba(255,255,255,0.5)"},"Atmosphere Effect"),
            el(Switch,{isChecked:satOn,onChange:function(){var v=!_satEnabled;_satEnabled=v;setSatOn(v);ss("satEnabled",v)},
              size:"sm",colorScheme:"cyan"})
          ),
          el(HStack,{justify:"space-between",align:"center"},
            el(Text,{fontSize:"xs",color:"rgba(255,255,255,0.5)"},"Particle Effects"),
            el(Switch,{isChecked:wxOn,onChange:function(){if(_wenabled){stopWeatherEffects()}else if(wInfo[0]){var e=mapWMO(wInfo[0].code),inten=mapWMOIntensity(wInfo[0].code);startWeatherEffects(e,inten,wInfo[0].code)}setWxOn(_wenabled)},size:"sm",colorScheme:"green"})
          )
        )
      );
    }
    // ===================== THEME ENHANCER WIDGET =====================
    var THEME_OPTIONS=[
      {v:"rain",l:"🌧️ Rain"},{v:"snow",l:"❄️ Snow"},{v:"sand",l:"🌪️ Sandstorm"},
      {v:"stars",l:"🌌 Starry Sky"},{v:"aurora",l:"🌌 Aurora"},{v:"leaves",l:"🍃 Falling Leaves"},
      {v:"water",l:"🌊 Underwater"},{v:"fire",l:"🔥 Fire"},{v:"sunset",l:"🌅 Sunset"},{v:"mc",l:"🎮 Minecraft"}
    ];

    function useVidState(){
      var [s,setS]=useState({active:_vactive,paused:_vpaused,vol:_vvol});
      useEffect(function(){var id=setInterval(function(){setS({active:_vactive,paused:_vpaused,vol:_vvol})},150);return function(){clearInterval(id)}},[]);
      return s;
    }

    function ThemeEnhancerWidget(){
      var vs=useVidState();
      var host=api.getHostContext(),es=host.state.useExtensionState;
      var tT=es("te_type",_tt),tI=es("te_int",_ti),tE=es("te_enabled",_trun);
      var [selType,setSelType]=useState(_tt);
      var [selInt,setSelInt]=useState(_ti);

      function toggleTheme(){
        if(_trun){stopThemeEffects();tE[1](false)}
        else{startThemeEffects(selType,selInt);tE[1](true)}
      }

      function changeType(v){setSelType(v);tT[1](v);
        if(_trun)updateThemeEffects(v);else ss("th_type",v);_tt=v;
      }
      function changeInt(v){var n=parseInt(v);setSelInt(n);tI[1](n);
        if(_trun)updateThemeEffects(null,n);else ss("th_int",n);_ti=n;
      }

      return el(Box,{p:4,borderRadius:"2xl",bg:"rgba(8,12,24,0.9)",backdropFilter:"blur(4px)",border:"1px solid rgba(255,255,255,0.1)"},
        el(VStack,{spacing:3,align:"stretch"},
          // Header
          el(HStack,{justify:"space-between",align:"center"},
            el(Text,{fontSize:"xs",fontWeight:"bold",color:"white",letterSpacing:"0.5px",textTransform:"uppercase"},"Theme Enhancer"),
            el(HStack,{spacing:2},
              el(Badge,{colorScheme:_trun?"green":"gray",variant:"solid",fontSize:"xs",borderRadius:"full",px:2},
                _trun?"ON":"OFF"),
              vs.active?el(Badge,{colorScheme:"blue",variant:"solid",fontSize:"xs",borderRadius:"full",px:2},"Video"):null
            )
          ),

          // Video section
          el(Box,{p:2,borderRadius:"lg",bg:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)"},
            el(HStack,{spacing:2,align:"center"},
              vs.active
                ? el(HStack,{spacing:1,flex:1},
                    el(Button,{size:"xs",colorScheme:"blue",variant:"ghost",px:1,fontSize:"11px",
                      onClick:function(){if(_vpaused)videoPlay();else videoPause()}
                    },vs.paused?"▶️ Play":"⏸️ Pause"),
                    el(Button,{size:"xs",colorScheme:"red",variant:"ghost",px:1,fontSize:"11px",
                      onClick:function(){videoKill()}
                    },"🗑️ Remove"),
                    el(Button,{size:"xs",colorScheme:"green",variant:"ghost",px:1,fontSize:"11px",
                      onClick:pickVideoFile
                    },"📁 Change")
                  )
                : el(Button,{size:"sm",colorScheme:"green",w:"100%",onClick:pickVideoFile,fontSize:"12px",borderRadius:"lg"},"📁 Select Video File"),
              el(Box,{flex:1,maxW:"80px"},
                vs.active?el("input",{type:"range",min:0,max:1,step:0.1,value:vs.vol,
                  onChange:function(e){var v=parseFloat(e.target.value);videoVolume(v);setSelInt(v)},
                  style:{width:"100%",accentColor:"#4299ff",height:"4px",cursor:"pointer"}}):null
              )
            )
          ),

          // Theme effects section
          el(Box,{p:2,borderRadius:"lg",bg:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)"},
            el(VStack,{spacing:2,align:"stretch"},
              // Effect type selector
              el("select",{
                value:selType,
                onChange:function(e){changeType(e.target.value)},
                style:{width:"100%",padding:"6px 8px",borderRadius:"8px",background:"rgba(20,28,58,0.95)",
                  color:"#c8d0e0",border:"1px solid rgba(100,150,255,0.3)",fontSize:"12px",cursor:"pointer",outline:"none"}
              },THEME_OPTIONS.map(function(o){return el("option",{value:o.v,key:o.v},o.l)})),
              // Controls row
              el(HStack,{spacing:2,align:"center"},
                el(Button,{size:"xs",colorScheme:_trun?"red":"green",borderRadius:"8px",fontSize:"11px",
                  onClick:toggleTheme
                },_trun?"⏹️ Stop":"▶️ Start"),
                el(Box,{flex:1},
                  _trun?el("input",{type:"range",min:10,max:100,step:5,value:selInt,
                    onChange:function(e){changeInt(e.target.value)},
                    style:{width:"100%",accentColor:"#4299ff",height:"4px",cursor:"pointer"}}):null
                ),
                _trun?el(Text,{fontSize:"10px",color:"rgba(255,255,255,0.4)",minW:"28px",textAlign:"right"},selInt+"%"):null
              )
            )
          )
        )
      );
    }
    // ===================== SETTINGS PAGE =====================
    function SettingsPage(){
      var host=api.getHostContext(),es=host.state.useExtensionState;
      var city=es("cw_city",""),wInfo=es("cw_wi",null);
      var [input,setInput]=useState(city[0]||"");
      var [loading,setLoading]=useState(false);
      var [tType,setTType]=useState(_tt);
      var [tInt,setTInt]=useState(_ti);
      var vs=useVidState();
      var [satOn,setSatOn]=useState(_satEnabled);
      var [wxOn,setWxOn]=useState(_wenabled);

      function searchCitySetting(){
        var v=input.trim();if(!v)return;
        setLoading(true);wInfo[1](null);city[1](v);ss("cw_city",v);
        getCityWeather(v,function(d){
          setLoading(false);
          if(d){wInfo[1](d);d.cn=v;ss("cw_lastData",d);ss("cw_lastCode",d.code);
            var e=mapWMO(d.code),intens=mapWMOIntensity(d.code);
            if(!_wenabled)startWeatherEffects(e,intens,d.code);else updateWeatherEffects(e,intens,d.code)}
        });
      }

      function changeThemeType(v){setTType(v);_tt=v;
        if(_trun)updateThemeEffects(v);else ss("th_type",v);
      }
      function changeThemeInt(v){var n=parseInt(v);setTInt(n);_ti=n;
        if(_trun)updateThemeEffects(null,n);else ss("th_int",n);
      }

      return el(Box,{p:6,borderRadius:"2xl",bg:"rgba(8,12,24,0.95)",backdropFilter:"blur(4px)",border:"1px solid rgba(255,255,255,0.08)"},
        el(VStack,{spacing:6,align:"stretch"},

          // ===== Section: City Weather =====
          el(Box,null,
            el(HStack,{spacing:2,mb:3,align:"center"},
              el(Box,{w:"18px",h:"18px",borderRadius:"sm",bg:"blue.500"}),
              el(Heading,{size:"sm",color:"white",fontWeight:"600"},"🌤️ City Weather")
            ),
            el(Box,{p:3,borderRadius:"lg",bg:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)"},
              el(VStack,{spacing:3,align:"stretch"},
                el(HStack,{spacing:2},
                  el("input",{
                    placeholder:"Type a city name...",value:input,
                    onInput:function(e){setInput(e.target.value)},
                    onKeyDown:function(e){if(e.key==="Enter")searchCitySetting()},
                    style:{flex:1,padding:"8px 12px",borderRadius:"10px",background:"rgba(255,255,255,0.08)",
                      color:"#e2e8f0",border:"1px solid rgba(255,255,255,0.15)",fontSize:"14px",outline:"none"}
                  }),
                  el(Button,{size:"sm",colorScheme:"blue",borderRadius:"10px",onClick:searchCitySetting,isDisabled:!input.trim()||loading},
                    loading?"...":"🔍")
                ),
                wInfo[0]
                  ? el(HStack,{spacing:4,p:2,borderRadius:"md",bg:"rgba(255,255,255,0.04)"},
                      el(VStack,{spacing:0},
                        el(Text,{fontSize:"sm",color:"gray.300",fontWeight:"500"},city[0]||""),
                        el(Text,{fontSize:"2xl",fontWeight:"bold",color:"orange.300",lineHeight:"1.2"},wInfo[0].temp+"°C")
                      ),
                      el(VStack,{spacing:1,flex:1},
                        el(Text,{fontSize:"xs",color:"gray.400"},"💧 Humidity: "+wInfo[0].humi+"%"),
                        el(Text,{fontSize:"xs",color:"gray.400"},"💨 Wind: "+wInfo[0].wind+" km/h"),
                        wInfo[0].feels?el(Text,{fontSize:"xs",color:"gray.400"},"🌡️ Feels: "+wInfo[0].feels+"°C"):null,
                        el(Text,{fontSize:"xs",color:"cyan.300"},"??? "+WN[mapWMO(wInfo[0].code)]+" (Code: "+wInfo[0].code+")")
                      )
                    )
                  : el(Text,{fontSize:"sm",color:"gray.500",textAlign:"center"},loading?"Fetching data...":"Enter a city name to get weather"),
                // Atmosphere toggle
                el(HStack,{justify:"space-between",align:"center",p:2,borderRadius:"md",bg:"rgba(255,255,255,0.03)"},
                  el(HStack,{spacing:2},
                    el(Text,{fontSize:"sm",color:"gray.300"},"🎨 Atmosphere Effect"),
                    el(Text,{fontSize:"xs",color:"gray.500"},"(saturation overlay)")
                  ),
                  el(Switch,{isChecked:satOn,onChange:function(){var v=!_satEnabled;_satEnabled=v;setSatOn(v);ss("satEnabled",v)},size:"md",colorScheme:"cyan"})
                )
              )
            )
          ),

          // ===== Section: Video Background =====
          el(Box,null,
            el(HStack,{spacing:2,mb:3,align:"center"},
              el(Box,{w:"18px",h:"18px",borderRadius:"sm",bg:"green.500"}),
              el(Heading,{size:"sm",color:"white",fontWeight:"600"},"🎬 Video Background")
            ),
            el(Box,{p:3,borderRadius:"lg",bg:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)"},
              el(VStack,{spacing:3,align:"stretch"},
                el(HStack,{justify:"space-between",align:"center"},
                  el(Badge,{colorScheme:vs.active?"green":"gray",variant:"solid",fontSize:"sm",px:2,py:1,borderRadius:"full"},
                    vs.active?"▶️ Playing":"⏹️ Stopped"),
                  el(Text,{fontSize:"xs",color:"gray.500"},"z-index: 0 (bottom layer)")
                ),
                vs.active
                  ? el(VStack,{spacing:2,align:"stretch"},
                      el(HStack,{spacing:2},
                        el(Button,{size:"sm",colorScheme:"blue",flex:1,borderRadius:"10px",
                          onClick:function(){if(_vpaused)videoPlay();else videoPause()}
                        },vs.paused?"▶️ Play":"⏸️ Pause"),
                        el(Button,{size:"sm",colorScheme:"green",flex:1,borderRadius:"10px",onClick:pickVideoFile},"📁 Change"),
                        el(Button,{size:"sm",colorScheme:"red",flex:1,borderRadius:"10px",onClick:function(){videoKill()}},"🗑️ Remove")
                      ),
                      el(Box,null,
                        el(Text,{fontSize:"sm",color:"gray.300",mb:1},"Volume: "+Math.round(vs.vol*100)+"%"),
                        el("input",{type:"range",min:0,max:1,step:0.05,value:vs.vol,
                          onChange:function(e){videoVolume(parseFloat(e.target.value))},
                          style:{width:"100%",accentColor:"#4299ff"}})
                      )
                    )
                  : el(Button,{size:"lg",colorScheme:"green",w:"100%",py:5,borderRadius:"xl",onClick:pickVideoFile},
                      el(VStack,{spacing:1,align:"center"},
                        el(Text,{fontSize:"2xl"},"📁"),
                        el(Text,{fontSize:"sm",fontWeight:"500"},"Select a video file"),
                        el(Text,{fontSize:"xs",color:"gray.400"},"MP4 / WebM / OGG")
                      )
                    )
              )
            )
          ),

          // ===== Section: Theme Particle Effects =====
          el(Box,null,
            el(HStack,{spacing:2,mb:3,align:"center"},
              el(Box,{w:"18px",h:"18px",borderRadius:"sm",bg:"purple.500"}),
              el(Heading,{size:"sm",color:"white",fontWeight:"600"},"✨ Theme Particle Effects")
            ),
            el(Box,{p:3,borderRadius:"lg",bg:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)"},
              el(VStack,{spacing:3,align:"stretch"},
                el(HStack,{justify:"space-between",align:"center"},
                  el(Text,{fontSize:"sm",color:"gray.300",fontWeight:"500"},"Effect Type"),
                  el(Badge,{colorScheme:_trun?"green":"gray",variant:"solid",fontSize:"sm",borderRadius:"full",px:2},
                    _trun?"Running":"Stopped")
                ),
                el("select",{
                  value:tType,
                  onChange:function(e){changeThemeType(e.target.value)},
                  style:{width:"100%",padding:"8px 12px",borderRadius:"10px",background:"rgba(20,28,58,0.95)",
                    color:"#c8d0e0",border:"1px solid rgba(100,150,255,0.3)",fontSize:"14px",cursor:"pointer",outline:"none"}
                },THEME_OPTIONS.map(function(o){return el("option",{value:o.v,key:o.v},o.l)})),
                el(HStack,{spacing:3,align:"center"},
                  el(Button,{size:"sm",colorScheme:_trun?"red":"green",borderRadius:"10px",px:4,
                    onClick:function(){if(_trun){stopThemeEffects()}else{startThemeEffects(tType,tInt)}}
                  },_trun?"⏹️ Stop":"▶️ Start")),
                el(Box,null,
                  el(HStack,{justify:"space-between"},
                    el(Text,{fontSize:"sm",color:"gray.300"},"Intensity"),
                    el(Text,{fontSize:"sm",color:"cyan.300",fontWeight:"600"},""+tInt+"%")
                  ),
                  el("input",{type:"range",min:10,max:100,step:5,value:tInt,
                    onChange:function(e){changeThemeInt(e.target.value)},
                    style:{width:"100%",accentColor:"#4299ff"}})
                ),
                el(Box,{p:2,borderRadius:"md",bg:"rgba(255,255,255,0.03)"},
                  el(Text,{fontSize:"xs",color:"gray.500",fontStyle:"italic"})
                )
              )
            )
          ),

          // ===== Section: Help =====
          el(Box,{p:3,borderRadius:"lg",bg:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"},
            el(VStack,{spacing:1,align:"stretch"},
              el(Text,{fontSize:"xs",color:"gray.500"},"Launcher Theme Enhancer v0.1.0"),
              el(Text,{fontSize:"xs",color:"gray.500"},"Author: hemekewayoshino"),
              el(Box,{h:"1px",bg:"rgba(255,255,255,0.06)",my:1}),
              el(Text,{fontSize:"xs",color:"gray.500"},"Layer order: Video (z:0) → Weather (z:1) → Theme (z:2)")
            )
          )
        )
      );
    }

    // ===================== REGISTRATION =====================
    return {
      homeWidgets: [
        {
          key: "city-weather",
          title: "City Weather",
          description: "Real-time weather with atmospheric particle effects",
          icon: "cloud-sun",
          Component: CityWeatherWidget
        },
        {
          key: "theme-enhancer",
          title: "Theme Enhancer",
          description: "Video background + 10 custom particle effects",
          icon: "palette",
          Component: ThemeEnhancerWidget
        }
      ],
      settingsPage: {
        Component: SettingsPage
      }
    };
  }, TOKEN);
})();


