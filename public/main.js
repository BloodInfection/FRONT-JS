console.log("buba");
var logi;
var pass;
const root = document.getElementById("root");

window.onload = function(){
    console.log('dom загружен');
    //создание конструктора роутера
    var Router = function(name,routes){
        return {
            name: name,
            routes: routes
        }
    };

    var MyRouter = new Router('MyRouter', [
     {
        path: '/',
        name: 'Root'
     },
     {
        path: '/signin',
        name: 'SignIn'
     },
     {
        path: '/login',
        name: 'LogIn'
     },
     {
        path: '/profile',
        name: 'Profile' 
     }  
    ]);

    var currentPath = window.location.pathname;
    console.log(currentPath);
}

//странички 
const configApp = {


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
};
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
function menuPage() {
    root.innerHTML = "";
    root.innerHTML=`
    <header>
    <ul class="nav">
    <li class="nav-item">   
      <a id="NavLinkReg" class="nav-link" href="#" >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
</svg>
      </a>
    </li>
    <li class="nav-item">
      <a  id = "NavLinkLog" class="nav-link" href="#" >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
  <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg>
      </a>
    </li>
    <li class="nav-item">
    
      <a  id = "NavLinkProf" class="nav-link" href="#" >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
</svg>
        </a>
    </li>
    
  </ul>
  <header>
  `
    
    regB = document.getElementById("NavLinkReg");
    loginB = document.getElementById("NavLinkLog");
    profB = document.getElementById("NavLinkProf");
    regB.addEventListener('click', () => {
        signupPage();
     })

     loginB.addEventListener('click', () => {
        loginPage();
     })

     profB.addEventListener('click', () => {
        profilePage();
     })
    /* Object.entries(configApp) //генерация верстки по конфигэпп //превращает обьект в массив массивов, первый арумент - ключ. второй - значение.
        .map(([key, { href, name }]) => {
            const menuElement = document.createElement("a");
            menuElement.href = href;
            menuElement.textContent = name;
            menuElement.dataset.section = key; //data атрибут добавляется. Паттерн, когда нужно положить данные в элементы страницы, их кладут в дата атрбуты, чтобы потом как то с ними взаимодействовать.

            return menuElement;
        })
        .forEach((el) => {
            root.appendChild(el);
        }); */
}
//отрисовка регистрации
function signupPage() {
    
    

    
    
    root.innerHTML = `
    {}
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
          
          <button id="backButtonId" class="btn btn-secondary">Назад</button>
          <button id="signupId"  class="btn btn-primary">Зарегистрироваться</button>
        </div>
    </div>
            `;
    
    signupB = document.getElementById("signupId");
    backB = document.getElementById("backButtonId");


    backB.addEventListener('click', () => {
        menuPage();
    })
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
          
          <button id="backButtonId" class="btn btn-secondary">Назад</button>
          <button id="loginId"  class="btn btn-primary">Войти</button>
        </div>
    </div>
            `;
    signupB = document.getElementById("loginId");
    backB = document.getElementById("backButtonId");
        
        
    backB.addEventListener('click', () => {
        menuPage();
     })
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
    <div class = "profile">
    <button id="backButtonId" class="btn btn-secondary">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
    Назад</button>
    
    </div>
    `;
    backB = document.getElementById("backButtonId");
    backB.addEventListener('click', () => {
        menuPage();
     })

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


menuPage();

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