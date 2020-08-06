//Dados
const proffys = [
    { 
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "1111-1111", 
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências.Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject:"Quimica", 
        cost: "20", 
        weekday:[ 0 ], 
        time_from:[720], 
        time_to: [1220]
    },
    {
        name: "Hugo Oliveira Soares",
        avatar: "https://avatars1.githubusercontent.com/u/33163249?s=400&u=a6f544acfbc594b51d3d776f8d92524bf8e2e9f5&v=4",
        whatsapp: "3171101736",
        bio: "Entusiasta em programação, adora resolver problemas e desafios.",
        subject: "Arduino",
        cost: "20",
        weekday: [1],
        time_from: [720],
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

//Funcionalidades
function getSubject(subjectNumber) {
    const position = +subjectNumber - 1;
    return subjects[position];
}

function pageLanding(req, res)
{
    return res.render("index.html")
}
function pageStudy(req, res)
{
    const filters = req.query;
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}
function pageGiveClasses(req, res)
{
    const data = req.query
    
    // se houver dados
    const isNotEmpty =  Object.keys(data).length > 0;

    if (isNotEmpty) {

        data.subject = getSubject(data.subject);

        //adicionar dados a lista de proffys
        proffys.push(data);
        return res.redirect("/study");
    }

    // se não, não adicionar

    return res.render("give-classes.html", {subjects, weekdays})
}

//Servidor
const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

//configurar nunjucks (template engine)
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//Configurar arquivos estaticos (css, scripts, imagens)
server.use(express.static("public")) //rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.listen(5500);
