import express from "express";
import { Configuration, OpenAIApi } from "openai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

app.post("/generate-task", async (req, res) => {
  const { text } = req.body;

  const prompt = `Extract structured tasks from this sentence: "${text}". Output format: [{task: "task description"}]`;

  const response = await openai.createCompletion({
    model: "gpt-4",
    prompt,
    max_tokens: 50,
  });

  res.json({ tasks: JSON.parse(response.data.choices[0].text) });
});

app.listen(5000, () => console.log("Server running on port 5000"));
