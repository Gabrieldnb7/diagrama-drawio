class LoginFormValidator {
    constructor() {
        this.form = document.querySelector("#login-form")
        this.events()
    }

    events() {
        this.form.addEventListener('submit', e => this.handleSubmit(e))
    }

    handleSubmit(e) {
        e.preventDefault()

        if(this.fieldsIsValid()) this.fetchData()
    }

    fetchData() {
        const email = this.form.querySelector("#email").value;
        const password = this.form.querySelector("#password").value;
        const rememberMe = this.form.querySelector("#remembermeBtn").checked;
        
        fetch("http://localhost:3030/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, rememberMe })
        }).then(response => this.authenticateUser(response))
    }

     authenticateUser(response) {
        const { status } = response;


        this.deletePreviousError()
        if(status !== 200) {
            return response.json()
                .then(body => {
                    const { msg } = body
                    this.createAuthError(msg)
                })
        }

        window.location.pathname = '/'
    }
 
    fieldsIsValid() {
        let valid = true

        for(let errorField of this.form.querySelectorAll(".error")) {
            errorField.classList.remove("error")
        }

        for(let input of this.form.querySelectorAll(".input")) {
            if(!input.value) {
                this.createError(input)
                valid = false
            }
        }

        return valid
    }

    createError(input) {
        input.classList.add("error")
    }

    createAuthError(msg) {
        const div = document.createElement('div')
        div.innerHTML = msg

        div.classList.add('error-txt')
        this.form.insertAdjacentElement('beforebegin', div)
    }

    deletePreviousError() {
        let error = document.querySelector(".error-txt")
        if(error) error.remove()
    }
}

const loginValidator = new LoginFormValidator()