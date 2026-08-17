const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname)));

function createTransporter(){
  if(!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS){ return null; }
  return nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:String(process.env.SMTP_SECURE)==='true',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});
}

app.post('/api/quote', async (req,res)=>{
  const {name,email,phone,company,message}=req.body||{};
  if(!name||!email||!phone||!message) return res.status(400).json({ok:false,error:'Faltan campos requeridos.'});
  const transporter=createTransporter();
  if(!transporter) return res.status(503).json({ok:false,error:'SMTP no configurado.'});
  try{
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: 'ventas@miempresa.com',
      replyTo: email,
      subject: `Nueva solicitud de cotización — ${name}`,
      text: `Nueva solicitud de cotización\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nEmpresa: ${company||'No indicada'}\n\nMensaje:\n${message}`
    });
    res.json({ok:true});
  }catch(err){ console.error(err); res.status(500).json({ok:false,error:'No fue posible enviar el correo.'}); }
});

app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'index.html')));
app.listen(PORT,()=>console.log(`MiEmpresa disponible en http://localhost:${PORT}`));
