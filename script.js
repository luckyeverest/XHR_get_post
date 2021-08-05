const requestURL = 'https://jsonplaceholder.typicode.com/users'

function sendRequest(method, url, body = null) {//универсальная функция body для POST,равняется null при работе с др.запросами
    return new Promise((resolve, reject) => {

        // объект XHR
        const xhr = new XMLHttpRequest() //создание нового объекта
        //mothod передает метод запроса get post и тд
        xhr.open(method, requestURL)//открывыает новое соединение параметры(вид запроса,строчка url)

        xhr.responseType = 'json'//  способ получение объекта из строки (присваиваниею ответа типа json)

        //при работе с post мы должны указать что работаем с объектом а не текстом
        xhr.setRequestHeader('Content-type', 'application/json')

        xhr.onload = () => {//обрабатываем данные перед отправкой

            //обработка ошибок с сервера
            if (xhr.status >= 400) {//все что выше 400 статуса это ошибки
                //reject вместо console.error
                reject(xhr.response)//вывод ошибки в консоль 
            } else {
                //resolve вместо console.log
                resolve(xhr.response)//response-ответ,отклик получаем в консоль строку(не объект) если не изменить тип    
            }
        }
        xhr.onerror = () => {//обработка ошибок network(при успешном запросе попадаем в onload иныче в onerror)
            console.log(xhr.response)
        }
        //xhr.send()//отправлеяем полученый запрос при get ()пустые параметры
        xhr.send(JSON.stringify(body))// мы можем передавать только строчку ,а не объекты
    })
}

/*
//GET
 sendRequest('GET', requestURL)//вызываем метод(функцию)c параметрами запроса и он возвращает Promis
    .then(data => console.log(data))// присваиваем имя data данным и выводим в консоль 
    .catch(err => console.log(err))//обработка ошибок
 */
//POST 

const body = {//параметр POST обязательный 
    name: 'Dmitryy',
    age: 28
}

sendRequest('POST', requestURL, body) //вызываем метод(функцию)c параметрами запроса и он возвращает Promis
    .then(data => console.log(data))// присваиваем имя data данным и выводим в консоль 
    .catch(err => console.log(err))//обработка ошибок
