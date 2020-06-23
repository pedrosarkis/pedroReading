
  document.getElementById('cancel').addEventListener('click', () => {
    window.location.href = '/';
  });

  const validateEmail =(email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const getEmail = () => {
    const email = document.getElementById('inputEmail').value;

    const isEmailValid = validateEmail(email);
    if (isEmailValid) {
      return {
        email,
      };
    }
    alert('Email inválido');
    return false;
  }

  const sendEmail = () => {
    const email = getEmail();

    if (email) {
      fetch('/users/recoveryPassword', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(email),
      })
        .then((response) => response.text())
        .then((data) => {
          if (data === 'Ok') {
            alert('Senha Enviada com sucesso');
          }
        });
    }
  }
  document.getElementById('requestPassword').addEventListener('click', sendEmail);

