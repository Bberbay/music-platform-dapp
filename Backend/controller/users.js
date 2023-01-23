import {
    RegisterUser,
    LoginUser,
    DeleteUser,
    updatePassword,
    //UploadTrack

} from "../server/database.js";

export const GetHome =(req, res) => {   
    res.send("Hello Page")
}

export const RegisterUsers = async (req, res) => {
    try {
        var user = req.body;
        console.log(user)
    
        await RegisterUser(user.username,user.email,user.password);
        console.log(`User [${user.username}] added to the database.`);
        res.send(`User [${user.username}] added to the database.`)
    
    } catch (error) {
        console.log(error)
    }   
    


};
export const LoginUsers = async (req, res) => {
    const user = req.body;
    var data = await LoginUser(user.username,user.password)
    console.log(data)
    res.send(data)
};

export const DeleteUserAccount = async (req, res) => { 
    const user = req.body;
    var data = await DeleteUser(user.username,user.password)
    console.log(data)
    res.send(data)
};

export  const UpdatePassword = async (req,res) => {
    const user = req.body;
    var returns = await updatePassword(user.username,user.password,user.newPassword)
    var data = returns[0];
    console.log(data)
    if (data==="Password Changed Succesfully"){
        var newPassword = returns[1];
    console.log(`password has been updated to ${req.body.password} has been updated to ${newPassword}`)
    }
    res.send(data)
};

    /*const axios = require("axios");
    const FormData = require('form-data')
    const fs = require('fs')
    const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2ZWJiYjA3My0wNTk0LTRjYzAtYmE2My1jZDllYjkyMDFlMzkiLCJlbWFpbCI6ImIuYi5lcmJheUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNWIwOGQ1OWRkNjZhMjc1ODEyNmMiLCJzY29wZWRLZXlTZWNyZXQiOiIxYzNiYTdjNWZlNTBlYjhiZWNiNDM0OTA0NzZiZDAzODJkMjllYzQ1M2RjMTMwMmExYjI2ZDQ2NzA4MTBlOWQwIiwiaWF0IjoxNjc0NDEzMjMzfQ.oqS1QFLSyT3CO1JVRP33Ahm-s4qTRMYamc462XCXybQ`
    
 export  const UploadTrack = async () => {
        const formData = new FormData();
        const src = "btb-app-remake\frontend\src\assets\logo-temp.png";
        
        const file = fs.createReadStream(src)
        formData.append('file', file)
        
        const metadata = JSON.stringify({
          name: 'File name',
        });
        formData.append('pinataMetadata', metadata);
        
        const options = JSON.stringify({
          cidVersion: 0,
        })
        formData.append('pinataOptions', options);
    
        try{
          const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
              Authorization: JWT
            }
          });
          console.log(res.data);

        } catch (error) {
          console.log(error);*/
        
    
    
    
    
