const nodemailer = require('nodemailer');

const sendEmail = async  (user) => {

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port : 587,
    secure : false,
  auth : {
    user : 'pedrosarkisverani@gmail.com',
    pass : 'inglaterra,.,'
  }
    });

    let emailcorpo = {
      from: "ahgorabookclub@gmail.com",
      to: user.email,
      subject: 'Teste Email Automático : Cadastre um livro',
      html: `<p>Olá, ${user.username}! Tudo bem ? </p> 
      <p> Percebemos que você ainda <b> não cadastrou nenhum livro em nosso clube. :( </b> </p> 
        <p> O objetivo da nossa plataforma é <b> gerar interação entre os colaboradores da Ahgora
         e incentivar a leitura </b> através de uma ferramenta de troca de conhecimento. 
         E, claro, com um <b> pouquinho de competitividade. </b> ;) </p>
<p> Você já finalizou a leitura de algum livro este ano? 
Não fique de fora e compartilhe com todo mundo! <b> 
Conte sua opinião sobre o livro de dicas que possam encorajar outras pessoas a lerem. </b> </p>
        <br>
         <a href = 'https://ahgorabookclub.herokuapp.com/form'> Clique aqui para cadastrar seu primeiro livro! </a> 
        `
    }
    
    try {
      const emailSent = await transporter.sendMail(emailcorpo);
      console.log('chegamos aqui');
      console.log(emailSent);
      if(emailSent) {
        return 'Sucesso';
      }
    } catch (error) {
		console.log(error, 'error');
    }
};

exports.sendEmail = sendEmail; // usando module.exports não funciona para este caso

