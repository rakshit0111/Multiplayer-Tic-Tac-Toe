import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

const api_key = "4bkt5wj5q5w5";
const api_secret = "c78wzh63etw75wnxk8q5kyxnb6vgj9uqgegw96pphz2j43hn58an8uggewv2xytj";
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  if (!firstName || !lastName || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);

    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during signup" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) return res.status(404).json({ message: "User not found" });

    const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);
    if (passwordMatch) {
      const token = serverClient.createToken(users[0].id);

      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during login" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
