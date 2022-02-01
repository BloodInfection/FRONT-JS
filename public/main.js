console.log("JS загружен");

const root = document.getElementById("root");

window.onload = function(){
    console.log('dom загружен');
    //создание конструктора роутера


 



    //grab all active attribute routes
    var activeRoutes = Array.from(document.querySelectorAll('[route]'));
    console.log('active routes: ', activeRoutes);
    function navigate(event){
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
                root.innerHTML=`
        <div class="fs-4 mb-3">
              
              <p class = "welcome"> Welcome to Wearel    
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="rgb(123, 47, 194)" class="bi bi-bag-fill" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"></path>
</svg>    <p>
            </div>`;

            } else if(routeInfo.name === 'signup'){
                signupPage();
                
            } else if (routeInfo.name === 'logIn'){
                loginPage();

            } else if (routeInfo.name === 'profile'){
                profilePage();
            } 
            
        }
        console.log('route info: ',routeInfo);
    };
    //addEventListeners
    activeRoutes.forEach(function(route){
        route.addEventListener('click', navigate, false);
    });
    
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

    var currentPath = window.location.pathname;
    if (currentPath === '/'){
        
        root.innerHTML=`
        <div class="fs-4 mb-3">
              
              <p class = "welcome"> Welcome to Wearel    
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="rgb(123, 47, 194)" class="bi bi-bag-fill" viewBox="0 0 16 16">
  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"></path>
</svg>    <p>
            </div>`;

    } 
    else{
        var route = MyRouter.routes.filter(function(r){
            return r.path === currentPath
        })[0];
        if (route.name === 'login') {
            loginPage();
            
        }
        else if (route.name === 'profile'){
            profilePage();
        } else if (route.name ==='signup'){
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

//отрисовка регистрации
function signupPage() {
    root.innerHTML = `
    
    <div class="center-flex">
            <div class="form">
          <div class="mb-3"> 
            <label for="InputUsrenameReg" class="form-label">Имя пользователя</label>
            <input type="email" class="form-control" id="InputUsrenameReg" aria-describedby="emailHelp">
            
          </div>
          <div class="mb-3"> 
            <label for="InputEmailReg" class="form-label">Адрес электронной почты</label>
            <input type="email" class="form-control" id="InputEmailReg" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">Мы не делимся вашими данными с третьими сторонами.</div>
          </div>
          <div class="mb-3"> 
            <label for="InputPasswordReg" class="form-label">Пароль</label>
            <input type="password" class="form-control" id="InputPasswordReg">
          </div>
          
         
          <button id="signupId"  class="btn btn-primary">Зарегистрироваться</button>
        </div>
    </div>
            `;
    
    signupB = document.getElementById("signupId");
    
    signupB.addEventListener("click", () => {
        password = document.getElementById("InputPasswordReg");
        username = document.getElementById("InputUsrenameReg");
        email = document.getElementById("InputEmailReg");
        console.log(password.value, username.value);
        signup(username.value, password.value, email.value);
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
            <label for="InputUsrenameLog" class="form-label">Имя пользователя</label>
            <input type="email" class="form-control" id="InputUsrenameLog" aria-describedby="emailHelp">
            
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
        username = document.getElementById("InputUsrenameLog");
        console.log(password.value, username.value);
        login(username.value, password.value);
    });
    console.log(signupB);
}

function profilePage(){
    root.innerHTML = ""; 
    root.innerHTML= `
    <div class="fs-4 mb-3">
              
              <p class = "welcome">  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8"></circle>
            </svg>&nbsp; &nbsp; Your profile page here    
                 <p>
            </div>`;
   

}
//нужная хуйня(отправка пост запроса)
function login(username, password)  {
    json = JSON.stringify({ username: username, password: password }); //

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    const url = "http://62.84.114.46:8080/v1/login";
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

function signup(username, password, email)  {
    json = JSON.stringify({ username: username, password: password }); //нужно добавить емейл сюда
    console.log(email);
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    const url = "http://62.84.114.46:8080/v1/login"; //тут не логин а рег наверн
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
    it remote add  main https://github.com/BloodInfection/FRONT-JS (добавили куда пушить)
    git push main --force
    */

