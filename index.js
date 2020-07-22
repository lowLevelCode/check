const cron = require('node-cron');
const { default: Axios } = require('axios');
const nodemailer = require("nodemailer");

const options = {
    user: '90038198',
    base: 'assa',
    times:[
        { hour:'3 3 * * 1-5' , isActive:true},
        { hour:'0 2 * * 1-5' , isActive:true},
        { hour:'* * * * 1-5' , isActive:false},
        { hour:'* * * * 1-5' , isActive:false},
    ]
};

const start = async () => {

    console.log("waiting....");
    options.times.forEach(t => {    
        cron.schedule(t.hour, () => {
            if(t.isActive)
                check(options.user, options.base);
        });
    });    
}

const check = async(user,base) => {      
    try {    
        console.log("checking...");
        const {data} = await Axios.post("http://localhost:3000/checar",{user,base});    

    } catch (error) {
        sendmail(error);
    }
}

const sendmail = async(message) => {
    console.log('sending message...');

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'lora.cummings58@ethereal.email',
            pass: 'tnGUC6kR2xMdCwHPPM'
        },
      });
          
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);      
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

start();