import * as dotenv from 'dotenv';
dotenv.config() // access env variables that we defined in the .env file

import { Configuration, OpenAIApi } from 'openai'; // use env variables when initializing openai stk (systems tool kit)

const configuration = new Configuration({//config obj requiring API key
	apiKey: process.env.OPENAI,//access API key
});

const openai = new OpenAIApi(configuration); //use config obj to initialize openai STK

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); //apply middleware cors (security mechanism)
app.use(express.json()); //handle incoming data in JSON format

app.post('/dream', async (req, res) => {
	try {
		const prompt = req.body.prompt;
		const aiResponse = await openai.createImage({
			prompt, 
			n: 1,
			size: '1024x1024',
		});

		const image = aiResponse.data.data[0].url;
		res.send({ image });
	} catch (error) {
		console.error(error)
		res.status(500).send(error?.response.data.error.message || 'Something went wrong');
	}
}); 
//error handling: wrap in try catch block 
//create end-point: HTTP method POST is best option: creating new piece of data
//catch fail on server side. error? gives error response from openAI, or else something else went wrong

//takes 2 args (1st arg: string that represents URL of API. ex: localhost:8080/dream)
//2nd arg: callback function (w/ request & response obj to interact with)
//callback will be called everytime user navigates to this URL using async funct

//prompt: access text prompt for description of image that user will generate
//pass prompt data to openai API by calling createImage method by passing prompt as arg
//also passing prompts with the number/resolution of image to generate (n, size)
//await: pauses execution of function till openai finishes generating image

//image: createImage will give response object containing image url
//once image is available -> send back to user as a response for browser to receive data as JSON

app.listen(8080, () => console.log('make art on http://localhost:8080/dream'));
//start server with app you want to use, serve on localhost:8080
