class RegisterFormValidator {
    constructor() {
        this.form = document.querySelector("#register-form")
        this.events()
    }

    events() {
        this.form.addEventListener('submit', e => this.handleSubmit(e))
    }

    handleSubmit(e) {
        e.preventDefault()

        const fieldsValid = this.isFieldsValid()
        const passwordValid = this.isPasswordValid()

        if(fieldsValid && passwordValid) this.registerUser() 
    }

    registerUser() {
        const name = this.form.querySelector("#name").value
        const email = this.form.querySelector("#email").value;
        const phoneNumber = this.form.querySelector("#phoneNumber").value
        const password = this.form.querySelector("#password").value;
        const confirmPassword = this.form.querySelector("#confirmPassword").value

        const body = { name, email, phoneNumber, password, confirmPassword }
        console.log(body)
        
        fetch("http://localhost:3030/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(response => {
            if(response.status !== 201) {
                response.json().then(data => {
                    const { msg } = data
                    this.createAuthError(msg)
                })
            }

            window.location.pathname = '/login'
        })
    }

    isPasswordValid() {
        let valid = true

        const password = document.querySelector("#password")
        const confirmPassword = document.querySelector("#confirmPassword")

        if(password.value !== confirmPassword.value) {
            valid = false

            console.log(password.value, confirmPassword.value)
            this.createError(password, "As senhas devem ser iguais.")
            this.createError(confirmPassword, "As senhas devem ser iguais.")
        }

        return valid
    }

    isPhoneValid(input) {
        const phoneNumber = input.value

        if(phoneNumber.includes("_") || !phoneNumber) {
            console.log(phoneNumber)
            this.createError(input, "Número de telefone inválido.")
            return false
        }

        return true
    }
 
    isFieldsValid() {
        let valid = true

        for(let errorField of this.form.querySelectorAll(".error-txt")) {
            errorField.remove()
        }

        for(let input of this.form.querySelectorAll(".input")) {
            input.classList.remove('error')

            if(!input.value) {
                this.createError(input, "Campo vazio.")
                valid = false
            }

            if(input.id === "phoneNumber") valid = this.isPhoneValid(input)
        }

        return valid
    }

    createError(input, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg

        input.classList.add("error")
        div.classList.add('error-txt')
        input.parentNode.insertAdjacentElement('afterend', div)
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

const regisValidator = new RegisterFormValidator()