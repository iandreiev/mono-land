let selected = ''
const BASE = "hhttps://monopolylife.ru/api"


async function getFromFields() {
    let name = document.getElementById('form-name').value,
        phone = document.getElementById('form-phone').value,
        email = document.getElementById('form-email').value,
        comment = document.getElementById('form-comment').value;

    let options = {
        method: 'post',
        url: BASE + '/mail/lead',
        header: {
            'Content-type': "application/x-www-form-urlencoded"
        },
        body: {
            name: name,
            phone: phone,
            email: email,
            connect: selected,
            comment: comment
        }
    };


    axios.post(options.url, options.body)
        .then((res) => {
            console.log(options)
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })

}

function radioSelect(option) {
    selected = option
}