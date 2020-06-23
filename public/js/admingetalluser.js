
  const fetchToGetAllUsers = async () => {
    const userPromise = await fetch('/admin/allusers');
    const userData = await userPromise.json();
    return userData;
  }

  constcreateElementsForEveryUser = async () => {
    const users = await fetchToGetAllUsers();
    const appendHTMl = users.map((user) => `<li>${user.username} </li>
                 <li>${user.email} </li> <br>`);

    $('#append').append(appendHTMl);
  }

  createElementsForEveryUser();