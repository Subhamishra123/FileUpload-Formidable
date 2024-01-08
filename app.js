const express=require('express');
const httpLogger=require('./httpLogger');
const app=express();
const bodyParser=require('body-parser');
const formidable=require('formidable');
const fs=require('fs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');
app.get('/',(request,response)=>{
    httpLogger.info('inside /');
    response.render('index');
});
app.post('/fileupload',(request,response)=>{
    const cacheFolder = '\\files';
    const userDirPath = __dirname+'\\public' + cacheFolder+"\\";
   
   // if (!fs.existsSync(userDirPath)) fs.mkdirSync(userDirPath);
    const form = new formidable.IncomingForm(); 
    
   httpLogger.info(JSON.stringify(form));
    form.parse(request, function (err, fields, files) {
        if (err) {
            httpLogger.error(err);
            response.send(err);
            return;
        }
        else{
           httpLogger.info(JSON.stringify(files));
           let oldFilePath=files.filetoupload[0].filepath;
           let newFilepath=userDirPath+files.filetoupload[0].originalFilename;
           
           fs.rename(oldFilePath, newFilepath, function (err) {
            if (err) throw err;
            response.render('display',{image:files.filetoupload[0].originalFilename});
           // res.end();
          });
       
        }
    })
  
});
const port=9172;
app.listen(port,(error)=>{
    if(error) throw error;
    console.log(`Server started at port ${port}`);
});