
  let pagemode = 'register';

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const validatePassword  = (password, confirmedPassowrd) => {
    return password == confirmedPassowrd;
  }

  const checkFieldsToBuildUser = () => {
    const username = document.getElementById('inputUserame').value;
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    const confirmedPassword = document.getElementById('inputConfirmPassword').value;

    const isEmailValid = validateEmail(email);
    const isPasswordsMatched = validatePassword(password, confirmedPassword);

    if (isEmailValid && isPasswordsMatched) {
      return {
        username,
        email,
        password,
      };
    }
    alert('Email ou Confirmação de senha inválida.');
    return false;
  }

  const sendUserDataToRegister = async () => {
    if (pagemode != 'register') {
      loadRegisterPage();
      return true;
    }
    const user = checkFieldsToBuildUser();
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(user),
    };
    const response = await fetch('/users/create', settings);
    
    try {
      const data = await response.text();
      if(data === 'Ok') {
        location.href = '/';
      } else {
        alert(data);
      }
    } catch (error) {
      
    }
  }
  document.getElementById('register').addEventListener('click', sendUserDataToRegister);

  const getAllRegisterElements = () => {
    return Array.from(document.getElementsByClassName('register'));
  }

  const getAllLoginElements = () => {
    return Array.from(document.getElementsByClassName('login'));
  }

  const getAllForgotElements = () => {
    return Array.from(document.getElementsByClassName('forgot'));
  }

  const loadLoginPage = () => {
    document.getElementsByClassName('card-title')[0].innerHTML = 'Login';
    document.title = 'Login';
    const registerElements = getAllRegisterElements();
    registerElements.forEach((element) => {
      element.style.display = 'none';
    });
    const loginElements = getAllLoginElements();
    loginElements.forEach((element) => {
      element.style.display = 'block';
    });

    const forgotElements = getAllForgotElements();
    forgotElements.forEach((element) => {
      element.style.display = 'none';
    });
    pagemode = 'login';
  }

  const loadRegisterPage = () => {
    document.getElementsByClassName('card-title')[0].innerHTML = 'Cadastro';
    document.title = 'Register';
    const registerElements = getAllRegisterElements();
    registerElements.forEach((element) => {
      element.style.display = 'block';
    });
    const loginElements = getAllLoginElements();
    loginElements.forEach((element) => {
      element.style.display = 'none';
    });
    const forgotElements = getAllForgotElements();
    forgotElements.forEach((element) => {
      element.style.display = 'none';
    });
    pagemode = 'register';
  }

  const getLoginInfo = () => {
    const username = document.getElementById('inputUserameLogin').value;
    const password = document.getElementById('passwordLogin').value;

    return {
      username,
      password,
    };
  };

  const login = async () => {
    if (pagemode != 'login') {
      loadLoginPage();
      return true;
    }
    console.log('preparando para enviar a promise');
    const user = getLoginInfo();

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(user)
    }
    const response = await fetch('/users/login', settings);
    if (!response.ok) throw Error(response.message);
    
    try {
      const data = await response.json();
      if(!data.message) {
        window.location.href = ('/')
      } else {
        alert(data.message);
      }
    } catch (error) { 
      throw error;
    }
  }

  document.getElementById('login').addEventListener('click', login);
  document.getElementById('forgot').addEventListener('click', () => {
    window.location.href = '/recovery';
    return false;
  });

