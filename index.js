//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
const OpenAI=require("openai")
const express=require("express")
const dotenv=require("dotenv")
dotenv.config();
const cors = require('cors');
const bodyParser=require("body-parser")


const openai = new OpenAI({
  apiKey : process.env.API_KEY
});
  
  const PORT=3080;
  const app=express();
  app.use(bodyParser.json())
  app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3000/models']
}));
//Chat completion API
  app.post("/",async (req,res)=>{
    console.log(req.body.messages,req.body.model)
    const response = await openai.chat.completions.create({
        model: req.body.model,
        messages: req.body.messages,
        max_tokens: 100,
      temperature: 0.7,
    });
      res.json({
        data:response}
      )
    
  });

  //ChatGPT models API

  app.get("/models",async (req,res)=>{
    const list = await openai.models.list();

    for await (const model of list) {
      console.log(model,"Mads");
    }
    res.json({
      data: list
    })
  });
  app.listen(process.env.PORT,()=>{console.log("Listening on port "+`${process.env.PORT}`)});
