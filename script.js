function toggleSide(){document.getElementById("sidebar")?.classList.toggle("open")}
function nav(){let s=document.getElementById("sidebar");if(!s)return;s.innerHTML=`<div class="side-brand"><div>🚘</div><div><b>AutoVerse</b><small>Admin Panel</small></div></div><div class="nav"><a href="index.html">⌂　Dashboard</a><a href="vehicles.html">🚗　Vehicles</a><a href="add-vehicle.html">⊕　Add Vehicle</a><a href="categories.html">▦　Categories</a><a href="users.html">♟　Users</a><a href="bookings.html">▣　Bookings</a><a href="messages.html">✉　Messages</a><a href="settings.html">⚙　Settings</a><a href="#" onclick="logout();return false">↪　Logout</a></div><div class="side-foot">🚘　<b>AutoVerse</b><small>Drive Your Dreams</small></div>`}
const seed=[{id:1,make:"Toyota",model:"RAV4",year:2024,type:"SUV",price:"CAD 38,900",status:"Available"},{id:2,make:"Lexus",model:"RX 350",year:2023,type:"Luxury",price:"CAD 54,900",status:"Available"},{id:3,make:"Honda",model:"CR-V",year:2025,type:"SUV",price:"CAD 36,500",status:"Available"},{id:4,make:"Ford",model:"F-150",year:2024,type:"Truck",price:"CAD 58,900",status:"Available"},{id:5,make:"BMW",model:"X5",year:2023,type:"Luxury",price:"CAD 67,500",status:"Available"},{id:6,make:"Mercedes-Benz",model:"E-Class",year:2022,type:"Sedan",price:"CAD 59,800",status:"Sold"}];
function getV(){let x=JSON.parse(localStorage.getItem("av_vehicles")||"null");if(!x){x=seed;localStorage.setItem("av_vehicles",JSON.stringify(x))}return x}
function setV(x){localStorage.setItem("av_vehicles",JSON.stringify(x))}
function row(v){return `<tr><td>${v.make} ${v.model}</td><td>${v.type}</td><td>${v.year}</td><td>${v.price}</td><td><em class="${v.status==="Available"?"ok":v.status==="Sold"?"danger":"pending"}">${v.status}</em></td><td><button onclick="editV(${v.id})">✎</button> <button onclick="delV(${v.id})">🗑</button></td></tr>`}
function render(){let v=getV();let t=document.getElementById("vehicles");if(t)t.innerHTML=v.map(row).join("");let r=document.getElementById("recent");if(r)r.innerHTML=v.slice(-5).reverse().map(row).join("");let c=document.getElementById("vehicleCount");if(c)c.textContent=v.length;let d=document.getElementById("donut");if(d)d.textContent=v.length;let l=document.getElementById("legend");if(l){let o={};v.forEach(x=>o[x.type]=(o[x.type]||0)+1);l.innerHTML=Object.entries(o).map(([k,n])=>`<div><span>● ${k}</span><span>${n}</span></div>`).join("")}let uc=document.getElementById("userCount");if(uc)uc.textContent=users().length;let u=document.getElementById("users");if(u)u.innerHTML=users().map(x=>`<tr><td>${x.name}</td><td>${x.username}</td><td>${x.email}</td><td>${x.role}</td></tr>`).join("")}
function delV(id){if(confirm("Delete this vehicle?")){setV(getV().filter(x=>x.id!==id));render()}}
function editV(id){localStorage.setItem("av_edit",JSON.stringify(getV().find(x=>x.id===id)));location.href="add-vehicle.html"}
const vf=document.getElementById("vehicleForm");
if(vf){let e=JSON.parse(localStorage.getItem("av_edit")||"null");if(e){make.value=e.make;model.value=e.model;year.value=e.year;type.value=e.type;price.value=e.price;status.value=e.status}vf.onsubmit=x=>{x.preventDefault();let list=getV(),v={id:e?e.id:Date.now(),make:make.value,model:model.value,year:year.value,type:type.value,price:price.value,status:status.value};list=e?list.map(a=>a.id===e.id?v:a):[...list,v];setV(list);localStorage.removeItem("av_edit");location.href="vehicles.html"}}
nav();render();if(document.getElementById("date"))document.getElementById("date").textContent=new Date().toLocaleString();












// auth
const DEFAULT={name:"Admin",username:"admin",email:"admin@autoverse.com",password:"admin123",role:"ADMIN"};
function users(){return JSON.parse(localStorage.getItem("av_users")||"[]")}
function saveUsers(x){localStorage.setItem("av_users",JSON.stringify(x))}
if(!users().length)saveUsers([DEFAULT]);
function logged(){return localStorage.getItem("av_logged")==="1"}
function guard(){if(!logged()&&!location.pathname.endsWith("login.html")&&!location.pathname.endsWith("register.html"))location.href="login.html"}
function logout(){localStorage.removeItem("av_logged");location.href="login.html"}
guard();
const lf=document.getElementById("loginForm");
if(lf)lf.onsubmit=e=>{e.preventDefault();let u=loginUser.value.trim().toLowerCase(),p=loginPass.value;let x=users().find(a=>(a.username.toLowerCase()===u||a.email.toLowerCase()===u)&&a.password===p);if(!x){loginError.textContent="Invalid username/email or password.";return}localStorage.setItem("av_logged","1");localStorage.setItem("av_current",JSON.stringify(x));location.href="index.html"};
const rf=document.getElementById("registerForm");
if(rf)rf.onsubmit=e=>{e.preventDefault();let list=users(),x={name:regName.value.trim(),username:regUser.value.trim(),email:regEmail.value.trim(),password:regPass.value,role:"ADMIN"};if(regPass.value!==regConfirm.value){regError.textContent="Passwords do not match.";return}if(list.some(a=>a.username.toLowerCase()===x.username.toLowerCase())){regError.textContent="Username already exists.";return}list.push(x);saveUsers(list);localStorage.setItem("av_logged","1");localStorage.setItem("av_current",JSON.stringify(x));location.href="index.html"};