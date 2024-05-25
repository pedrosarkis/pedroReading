 
const getElements = () => {
    const username = document.getElementById('username')
    const email = document.getElementById('email')
    return {
        username,
        email,
    }
}

const  fetchUserData = async () => {
    const userPromise = await fetch('userProfileData')
    const userData = await userPromise.json()
    return userData
}

const renderUserData = async () => {
    const userData = await fetchUserData()
    console.log(userData)
    const elements = getElements()
    elements.username.value = userData.username
    elements.email.value = userData.email
}

renderUserData()

const validatePasswords = (pass1, pass2) => {
    return pass1 == pass2
}

const getDataToSend = () => {
    const currentPassword = document.getElementById('currentPassword').value
    const newPassword = document.getElementById('newPasword').value
    const confirmNewPassword = document.getElementById('confirmNewPassword').value

    const isNewAndConfirmSame = validatePasswords(newPassword, confirmNewPassword)
    if (isNewAndConfirmSame) {
        return {
            currentPassword,
            newPassword,
            confirmNewPassword,
        }
    }
    alert('A confirmação da nova senha deve ser igual ao campo Nova senha')
    return false
}

const sendRequestToChange = () => {
    const changingData = getDataToSend()
    if (changingData) {
        fetch('/users/changePassword', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(changingData),
        })
            .then((response) => response.text())
            .then((data) => {
                if (data == 'Ok') alert('Senha alterada com sucesso')
            })
    }
}
document.getElementById('confirmPasswordChange').addEventListener('click', sendRequestToChange)

