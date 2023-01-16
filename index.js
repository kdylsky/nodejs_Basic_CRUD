const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override')
const {v4 : uuidv4} = require("uuid");

//request.body를 파싱하는 방법
//express.json()이나 express.urlencoded()와 body분석 미들웨어를 사용해야한다.
//URL 암호화 데이터를 파싱하는 방법
app.use(express.urlencoded({extended:true}));
// JSON 데이터 파싱하는 방법
app.use(express.json());

app.use(methodOverride('_method'))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs")

let quotes =[
    {
        id: uuidv4(),
        author:"Nelson Mandel",
        quote:"The greatest glory in living lies not in never falling, but in rising every time we fall.",
        korean :"인생에서 가장 큰 영광은 넘어지지 않는 것에 있는 것이 아니라 매번 일어선다는 데 있다." 
    },
    {
        id: uuidv4(),
        author:"Helen Keller",
        quote:"Life is either a daring adventure or nothing at all.",
        korean: "생활은 과감한 모험이거나 아니면 아무것도 아니다."
    },
    {
        id: uuidv4(),
        author:"Et hoc transibit",
        quote:"This too shall pass.",
        korean: "이또한 지나가리라."
    },
    {
        id: uuidv4(),
        author:" Carol Burnett",
        quote:"Only I can change me life, no one can do it for me. ",
        korean: "내 인생을 바꾸는 사람은 자신입니다. 아무도 대신해줄 수 없어요. "
    },
    {
        id: uuidv4(),
        author:"Lawana Blackwell",
        quote:"Age is no guarantee of maturity.",
        korean: "나이가 성숙을 보장하지는 않는다."
    },
];

app.get("/quotes", (req,res)=>{
    res.render("quotes/home", {quotes});
});


app.get("/quotes/new", (req,res)=>{
    res.render("quotes/new");
});


app.get("/quotes/:id", (req,res)=>{
    const {id} = req.params;
    const quote = quotes.find(c => c.id === id);
    res.render("quotes/show", {quote});
});

app.post("/quotes", (req,res)=>{
    // const {id, author, comment} = req.body;
    quotes.push({...req.body, id:uuidv4()});
    res.redirect("/quotes");
});


app.get("/quotes/:id/edit", (req,res)=>{
    const {id} = req.params;
    const quote = quotes.find(q=>q.id === id);
    res.render("quotes/edit", { quote })    
})

app.patch("/quotes/:id", (req,res)=>{
    const {id} = req.params;
    const findquote = quotes.find(q=>q.id === id);
    const {quote, korean} = req.body;
    findquote.quote = quote;
    findquote.korean = korean;
    res.redirect("/comments")
})

app.delete("/quotes/:id", (req,res)=>{
    const {id} = req.params;
    quotes = quotes.filter(q=>q.id !== id);
    res.redirect("/comments");
})

app.get("/*", (req,res)=>{
    res.render("quotes/home", {quotes})
})

app.listen(3000, ()=>{
    console.log("ON PORT 3000")
})