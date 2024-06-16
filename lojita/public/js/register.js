document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById("phoneNumber")
    Inputmask({ mask: "(99) 9 9999-9999" }).mask(phoneInput);
})