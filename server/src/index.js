import express from "express"
import cors from "cors"
import {StreamChat} from "stream-chat"
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const api_key = "4bkt5wj5q5w5";
const api_secret = "c78wzh63etw75wnxk8q5kyxnb6vgj9uqgegw96pphz2j43hn58an8uggewv2xytj";

const serverClient =  StreamChat.getInstance(api_key,api_secret);

app.post("/signup",async (req,res)=>{
    try{
        const {firstName,lastName,username,password} = req.body;
        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(password,10);
        const token = serverClient.createToken(userId);
        res.json({token,userId,firstName,lastName,username,hashedPassword});
    }
    catch(error)
    {
        console.log(error);
    }
    
});

app.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(username);
      console.log(password);
      const { users } = await serverClient.queryUsers({ name: username });
      console.log(users);
      if (users.length === 0) return res.json({ message: "User not found" });
  
      const token = serverClient.createToken(users[0].id);
      const passwordMatch = await bcrypt.compare(
        password,
        users[0].hashedPassword
      );
  
      if (passwordMatch) {
        res.json({
          token,
          firstName: users[0].firstName,
          lastName: users[0].lastName,
          username,
          userId: users[0].id,
        });
      }
    } catch (error) {
      res.json(error);
    }
  });
  

app.listen(3001 ,()=>{
    console.log(`Server running`);
})