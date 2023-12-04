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
    origin: ['http://localhost:3000']
}));
  app.post("/",async (req,res)=>{
    const {message}=req.body.message;
    console.log(message,"prompt")
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: {message},
        max_tokens: 100,
      temperature: 0.7,
    });
      res.json({
        data:response.choices[0].text}
      )
    
  });
  app.listen(process.env.PORT,()=>{console.log("Listening on port "+`${process.env.PORT}`)});
