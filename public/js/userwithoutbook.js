
const fetchToGetAllInactiveUsers = async () => {
    return await (await fetch('/admin/getinactiveusers')).json()
}

const createElementsForEveryInactiveUser = async() => {
    const users = await fetchToGetAllInactiveUsers()
    const appendHTMl = users.map((user) => `<li>${user.username} </li>
					<li>${user.email} </li> <br>`)

    $('#append').append(appendHTMl)
}

createElementsForEveryInactiveUser()

async function sendEmailAlert() {
    const emailPromise = await fetch('/admin/sendEmailInactiveUser')
    const emailData = await emailPromise.text()
    alert(emailData)
}

document.getElementById('lembreteEmail').addEventListener('click', sendEmailAlert)
