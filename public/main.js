

console.log("JS загружен");

const root = document.getElementById("root");
var isLogged = false;
var fullname;
var Router = function(name,routes){
    return {
        name: name,
        routes: routes
    }
};

var MyRouter = new Router('MyRouter', [
 {
    path: '/',
    name: 'root'
 },
 {
    path: '/signup',
    name: 'signup'
 },
 {
    path: '/login',
    name: 'login'
 },
 {
    path: '/profile',
    name: 'profile' 
 }
]);


function sessioncheck()  {
   
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    const url = "https://62.84.114.46:8080/v1/session/check";
    json = "";
    xhr.open("POST", url, false);
    xhr.onreadystatechange = function() {
        const statusOK = 200
        if (xhr.readyState === xhr.DONE && xhr.status === statusOK) {
            // выводим то, что ответил нам сервер — так мы убедимся, что данные он получил правильно
            console.log(this.responseText);
            console.log('Сесси дейсвтительна, юзер существует')
            isLogged =  true;
            
        } else {
            console.log("не авторизован");
        }
        console.log(xhr.status);
    };

    xhr.send(json);
}

function navigate(event){
    headerBuilder();
    var route = event.target.attributes[0].value;
    var routeInfo = MyRouter.routes.filter(function(r){
        return r.path === route;
    })[0];
    
    if (!routeInfo){
        console.log('no route')
        root.innerHTML = 'No route esists with this path'
    }
    else{
        window.history.pushState({}, 'name',routeInfo.path);
        if (routeInfo.name === 'root'){
            console.log('this is root')
            indexPage();

        } else if(routeInfo.name === 'signup'){
            signupPage();
            
        } else if (routeInfo.name === 'login'){
            loginPage();

        } else if (routeInfo.name === 'profile'){
            profilePage();
        } 
        
    }
    console.log('route info: ',routeInfo);
};

window.onload = function(){
    console.log('dom загружен');
    headerBuilder();
    //создание конструктора роутера
    //grab all active attribute routes

    var currentPath = window.location.pathname;
    if (currentPath === '/'){
        
        indexPage();

    } 
    else{
        console.log('route: ',route);
        var route = MyRouter.routes.filter(function(r){
            return r.path === currentPath
        })[0];
        if (route.name === 'login') {
            loginPage();
        }
        else if (route.name === 'profile'){
            profilePage();
        } 
        else if (route.name ==='signup'){
            signupPage();
        } 
        console.log('route: ',route);

    }
}


//просто вспомогательная функция для инпута
function createInput(type, placeholder, clas, id) {
    // создает инпут
    const input = document.createElement("input");
    input.type = type;
    input.class = clas;
    input.placeholder = placeholder;
    input.id = id;

    return input;
}
//отрисовка меню
function headerBuilder(){
       sessioncheck();
    console.log(isLogged);
    let header = document.getElementById('header')
    if (isLogged) {
        header.innerHTML = `
        <ul class="nav">
        <li  route ='/' class = "logo" >
            <h4  route ='/' id = "NavLinkLogo" class="logo" >Wearel</h4>
        </li>
        
        <li route = '/profile' class="nav-item">
          <a  route = '/profile' id = "NavLinkProf" class="nav-link"  >
          <svg  route = '/profile' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
    </svg>
            </a>
        </li>

        <li   class="nav-item">
          <a   id = "NavLinkLogOut" class="nav-link"  >
          <svg    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"></path>
          <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"></path>
        </svg>
            </a>
        </li>
        
        
      </ul>`;
      var logoutB = document.getElementById("NavLinkLogOut");
      logoutB.addEventListener('click', logout, false )
    } else {
        header.innerHTML = `
            <ul class="nav">
        <li  route ='/' class = "logo">
            <h4  route ='/' id = "NavLinkLogo" class="logo" >Wearel</h4>
        </li>
        <li  route='/signup' class="nav-item">   
          <a  route='/signup' id="NavLinkReg" class="nav-link"  >
          <svg  route='/signup' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
      <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
      <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
    </svg>
          </a>
        </li>
        <li route = '/login' class="nav-item">
          <a  route = '/login' id = "NavLinkLog" class="nav-link"  >
          <svg route = '/login' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
      <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
    </svg>
          </a>
        </li>

      </ul>
        `
    }
    var activeRoutes = Array.from(document.querySelectorAll('[route]'));
    console.log('active routes: ', activeRoutes); 
    //addEventListeners
     activeRoutes.forEach(function(route){
        route.addEventListener('click', navigate, false);
    });

}
//отрисовка регистрации
function signupPage() {
    
    root.innerHTML = `
    
    <div class="center-flex">
            <div class="form">

          <div class="mb-3"> 
            <label for="InputNameReg" class="form-label">Имя</label>
            <input type="email" class="form-control" id="InputNameReg" aria-describedby="emailHelp">
          </div>

          <div class="mb-3"> 
            <label for="InputSurnameReg" class="form-label">Фамилия</label>
            <input type="email" class="form-control" id="InputSurnameReg" aria-describedby="emailHelp">
          </div>

          <div class="mb-3"> 
            <label for="InputPatronymicReg" class="form-label">Отчество</label>
            <input type="email" class="form-control" id="InputPatronymicReg" aria-describedby="emailHelp">
          </div>

         

          <div class="mb-3"> 
          <label for="InputPhoneReg" class="form-label">Номер телефона</label>
            <input type="email" class="form-control" id="InputPhoneReg" aria-describedby="emailHelp">
          </div>

          <div class="mb-3"> 
            <label for="InputEmailReg" class="form-label">Адрес электронной почты</label>
            <input type="email" class="form-control" id="InputEmailReg" aria-describedby="emailHelp">
            
          </div>

          <div class="mb-3"> 
            <label for="InputPasswordReg" class="form-label">Пароль</label>
            <input type="password" class="form-control" id="InputPasswordReg">
            <div id="emailHelp" class="form-text">Мы не делимся вашими данными с третьими сторонами.</div>
          </div>
          
         
          <button id="signupId"  class="btn btn-primary">Зарегистрироваться</button>
        </div>
    </div>
            `;
    
    signupB = document.getElementById("signupId");
    
    signupB.addEventListener("click", () => {
        password = document.getElementById("InputPasswordReg"); //password
       
        email = document.getElementById("InputEmailReg"); //email
        firstname = document.getElementById("InputNameReg"); //name
        surname = document.getElementById("InputSurnameReg"); //surname
        patronymic = document.getElementById("InputPatronymicReg"); //patronymic
        phone = document.getElementById("InputPhoneReg"); //phone
        console.log('Имя: ',firstname.value, 'Фамилия: ', surname.value, 'Отчество: ', patronymic.value,'Номер телефона: ',phone.value,'Адрес электронной почты: ',email.value,'Пароль: ',password.value );
        signup(firstname.value, password.value, surname.value, patronymic.value, phone.value,  email.value);
    });
    console.log(signupB);

    
}
//отрисовка входа
function loginPage() {
    
    root.innerHTML = ""; //удаляем прошлый контент со страницы
    
    root.innerHTML = `
    
    <div class="center-flex">
            <div class="form">
            <div class="mb-3"> 
            <label for="InputEmailLog" class="form-label">Адрес электронной почты</label>
            <input type="email" class="form-control" id="InputEmailLog" aria-describedby="emailHelp">
            
          </div>
          <div class="mb-3">
            <label for="InputPasswordLog" class="form-label">Пароль</label>
            <input type="password" class="form-control" id="InputPasswordLog">
          </div>
          
          
          <button id="loginId"  class="btn btn-primary">Войти</button>
        </div>
    </div>
            `;
    signupB = document.getElementById("loginId");
    
    signupB.addEventListener("click", () => {
        password = document.getElementById("InputPasswordLog");
        username = document.getElementById("InputEmailLog");
        console.log(password.value, username.value);
        login(username.value, password.value);
    });
    console.log(signupB);
}

function profilePage(){
    
   
    
    root.innerHTML= `
    <div class = "userInfo">
    <div class = "userFullName" id = "fullNameProf"></div>
        <div id = "phoneProf">Phone number</div>
        <div id ="emailProf">Email</div> 
        </div>`
    ;
    getUserBySession();
    
   

}


function indexPage(){
    
    root.innerHTML=`
        <div class="fs-4 mb-3">
              
              <p class = "welcome"> Welcome to Wearel    
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="rgb(123, 47, 194)" class="bi bi-bag-fill" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"></path>
</svg>    <p>
            </div>`;
}
//нужная хуйня(отправка пост запроса)
function login(email, password)  {
    json = JSON.stringify({ email: email, password: password }); //

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    const url = "https://62.84.114.46:8080/v1/login";
    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(json);

    // когда придёт ответ на наше обращение к серверу, мы его обработаем здесь
    xhr.onreadystatechange = function() {
        // если запрос принят и сервер ответил, что всё в порядке

        const statusOK = 200
        if (xhr.readyState === xhr.DONE && xhr.status === statusOK) {
            // выводим то, что ответил нам сервер — так мы убедимся, что данные он получил правильно
            console.log(this.responseText);
            window.location.pathname = '/profile'
     
        } 
        if (xhr.readyState === xhr.DONE && xhr.status===400){
            loginPage();
            alert('Неверный логин или пароль!');
        }
        console.log(xhr.status);
    };

    xhr.send(json);
    
}

function signup(firstname,password,surname,patronymic,phone,email)  {
    json = JSON.stringify({ name: firstname,  password: password, surname:surname, patronymic:patronymic, phone: phone, email:email}); //нужно добавить емейл сюда
    console.log(email);
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    const url = "https://62.84.114.46:8080/v1/user"; 
    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(json);

    // когда придёт ответ на наше обращение к серверу, мы его обработаем здесь
    xhr.onreadystatechange = function() {
        // если запрос принят и сервер ответил, что всё в порядке

        const statusOK = 200
        if (xhr.readyState === xhr.DONE && xhr.status === statusOK) {
            // выводим то, что ответил нам сервер — так мы убедимся, что данные он получил правильно
            console.log(this.responseText);
            alert(document.cookie);
        }
        console.log(xhr.status);
    };

    xhr.send(json);
}

function logout()  {
    console.log('logout вызван 402');
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    const url = "https://62.84.114.46:8080/v1/logout";
    json = "";
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
        const statusOK = 200
        if (xhr.readyState === xhr.DONE && xhr.status === statusOK) {
            // выводим то, что ответил нам сервер — так мы убедимся, что данные он получил правильно
            console.log(this.responseText);
            console.log('Выход выполнен')
            isLogged =  false;
            window.location.pathname = '/'
            
            
        } 
        if (xhr.status===400){
            console.log("Выход не выполнен");
        }
        console.log(xhr.status);
    };

    xhr.send(json);
}

function getUserBySession(){
    
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    const url = "https://62.84.114.46:8080/v1/user";
    xhr.open("GET", url, true);
    
    xhr.onreadystatechange = function() {
        const statusOK = 200
        if (xhr.readyState === xhr.DONE && xhr.status === statusOK) {
            // выводим то, что ответил нам сервер — так мы убедимся, что данные он получил правильно
            json = JSON.parse(this.responseText)
            console.log("name=", json['name']);
            let fullname = document.getElementById('fullNameProf');
            let phonenum =document.getElementById('phoneProf');
            let ema1l=document.getElementById('emailProf');
           
            fullname.innerHTML = `${json['surname'] +' '+ json['name']+' '+ json['patronymic']}` 
            phonenum.innerHTML =`${json['phone']}`
            ema1l.innerHTML =`${json['email']}`
            
            
           
            
            console.log(fullname);
        } 
        if (xhr.status===400){
            console.log("Выход не выполнен");
            
        }
        console.log(xhr.status);
    };

    xhr.send("");
    
      

}

//---------------------ИНФА-------------------------------------

/* const configApp = {


    signup: {
        //ключи
        href: "/signup",
        name: "Регистрация",
        open: signupPage,
    },

    login: {
        //ключи
        href: "/login",
        name: "Вход",
        open: loginPage,
    },

    profile: {
        //ключи
        href: "/profile",
        name: "Профиль",
    },
}; */


/* //обработчик всех кликов, надо потом убрать
root.addEventListener("click", (e) => {
    //можно было и в document
    //проверяем что клик на ссылку
    const { target } = e; // = const target = e.target; деструктуризация обьекта. см подсказки в ноушн
    console.log(e);
    if (target instanceof HTMLAnchorElement) {
        //проверяю что это инстанс(экземпляр) HTMLAnchorElement
        e.preventDefault(); //если это сссылка, запрет на дефолтное событие

        configApp[target.dataset.section].open(); //если это ссылка то смотрю секшн и вызываю метод оупен.
    }
});
 */

 /*  let s = document.getElementsByTagName("a");
    console.log(s);
    console.log(root);
    let jj = "sdsdsdsds";
    let jopa = `${jj}stroke`; */

    /* PUSH В GIT
    git init(если не было до этого)
    git add *
    git commit -m "название"
    git remote add  main https://github.com/BloodInfection/FRONT-JS (добавили куда пушить)
    git push main --force
    */

    