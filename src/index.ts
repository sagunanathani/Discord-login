require('dotenv').config();

import axios from 'axios';
import express, {Request, Response} from 'express';
import url from 'url';

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/api/auth/discord/redirect', async (req: Request, res: Response)=>{
    // console.log(req.query);
    const {code} = req.query;
    if ( code ) {
        try {
          const formData = new url.URLSearchParams ({
            client_id : '1018827443211075664',
            client_secret : 'hHBKa1XXrjWhOcci_xEcbZHTZ0MKkAxp',
            grant_type : 'authorization_code',
            code : code.toString(),
            redirect_uri : 'http://localhost:3001/api/auth/discord/redirect',
          }) ;
          const response = await axios.post (
            'https://discord.com/api/v8/oauth2/token',
            formData.toString(),
            {
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded',
                },
            }
          );
          res.send ( response.data );  
          console.log("response.data-----------",response.data);
          
       } catch (err) {
        console.log ("error: ", err);
        res.sendStatus(400);
       }
    }
});
 
app.listen(PORT,()=>console.log(`Running on port ${PORT}`));

