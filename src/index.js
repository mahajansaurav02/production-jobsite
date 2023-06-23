const express = require("express");

const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
const path=require("path")
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.post("/api/submitForm", upload.single("resume"), (req, res) => {
  const {
    firstName,
    lastName,
    mobile,
    email,
    address,
    pincode,
    city,
    state,
    country,
  } = req.body;

  const resumePath = req.file.path;

//Configuration for sending a mail 

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mahajansaurav03@gmail.com",
      pass: "otzlhmbpvglicook",
    },
  });

  const mailOptions = {
    from: "mahajansaurav03@gmail.com",
    to: "mahajansaurav02@gmail.com",
    subject: "New Job Application",
    html: `
      <h2>New Job Application</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Pincode:</strong> ${pincode}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>State:</strong> ${state}</p>
      <p><strong>Country:</strong> ${country}</p>
    `,
    attachments: [{ filename: "resume.pdf", path: resumePath }],
  };



  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while sending the email." });
    } else {
      console.log("Email sent:", info.response);
      res.json({ message: "Application submitted successfully!" });
    }
  });
});

app.use(express.static(path.join(__dirname,'./my-app/build')))
app.get('*',(req,res)=>
res.sendFile(path.join(__dirname,'./my-app/build/index.html'))
)
//=================================================================================

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
