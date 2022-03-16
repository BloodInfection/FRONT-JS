const http = require('http');
const fs = require('fs'); // для работы с файловой системой 
const debug = require('debug'); //ищет локально и глобально
let pages = ['/','/login','/signup','/profile', '/mens', '/womens', '/brands', '/profile/favorite',  '/profile/looks',  '/profile/cart',  '/profile/settings'];

const log = debug('*') // инстанцируем дебаг(типа все логи теперь будут такие если прописать log)

const page404 = fs.readFileSync(`./public/404.html`);
let path;

const server = http.createServer((req, res) => {
if (req.url === '/') {
    path = '/index.html'
} else{
    path = req.url
}

if (pages.includes(req.url)){
    console.log('массив: ',pages, ' req url:',req.url);
}




//console.log('request: ', req.url,'path: ', path, 'req headers: ', req.headers['user-agent']); //просто логи



if (pages.includes(req.url)){
    fs.readFile(`./public/index.html`, (err, data) => { //читаем файл в специальную переменную. Теперь когда к нам на сервер придет запрос, мы смотрим реквест юрл и подставляем сюда
        log('файл прочитан')
        
        if (err){
            data = page404; //если нет ошибки то в data записывается прочитанный файл
        }
            
        
        res.write(data); 
        
         // запихиваем сюда файл вместо сообщения(изначально было 'hello')
        res.end(); //без этого сервер будет бесконечно загружаться
        });
} else {
    fs.readFile(`./public${path}`, (err, data) => { //читаем файл в специальную переменную. Теперь когда к нам на сервер придет запрос, мы смотрим реквест юрл и подставляем сюда
        log('файл прочитан')
        
         if (err){
            data = page404; //если нет ошибки то в data записывается прочитанный файл
        }
            
        
        res.write(data); 
        
         // запихиваем сюда файл вместо сообщения(изначально было 'hello')
        res.end(); //без этого сервер будет бесконечно загружаться
        });
} 


});
log('listening at http://127.0.0.1:8080')
server.listen(8080);

//синхронный рид readFileSync пришлось бы оборачивай в трай кетч, в данном случае в синхронном риде readFile ошибка попадает в специальную переменную и это позволяет не писать трай кетч
// js язык асинхронный, поэтому приоритетнее использовать асинхронные ф-ии. Синхронные внутри себя будут делать различные ожидания и блокировать код. 

// git add * ; dit commit  -m " " ; git push ; 
// git status - узнать текущий статус коммита

/* npm init -y - это yes на все, быстрое создание файлика. */