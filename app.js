const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const submitForm = $('#form');
const username = $('#username');
const email = $('#email');
const password = $('#password');
const confirmPass = $('#confirm-password');
const inputForm = $$('input');

function checkEmpty(inputForm){
    var flag = true;
    inputForm.forEach(e => {
        e.value = e.value.trim();
        if(e.value == ''){
            showError(e, `${e.placeholder} Không được để trống`);
            return flag = false;
        }
        else{
            showSuccess(e);
        }
    });
    return flag;
}

function checkPasswordLength(e){
    e.value = e.value.trim();
    if(e.value.length < 6){
        e.closest('.form__body').classList.remove('success');
        showError(e,'Ít nhất 6 ký tự')
        return false;
    }
    return true;
}

function checkConfirm(){
    if(password.value != confirmPass.value){
        showError(confirmPass,'Confirm password không chính xác');
        return false;
    }
    return true;
}

function showError(e, message){
    const formBody = e.closest('.form__body');
    const errorMsg = formBody.querySelector('.message');
    formBody.classList.remove('success');
    formBody.classList.add('error');
    errorMsg.innerText = message;
}

function showSuccess(e, message = 'Thành công'){
    const formBody = e.closest('.form__body');
    const successMsg = formBody.querySelector('.message');
    formBody.classList.remove('error');
    formBody.classList.add('success');
    successMsg.innerText = message;
}

submitForm.addEventListener('submit',()=>{
    if(checkEmpty(inputForm)){
        if(checkPasswordLength(password)){
             if(checkConfirm()){
                alert('Thành Công')
                username.value = '';
                email.value = '';
                password.value = '';
                confirmPass.value = '';
                inputForm .value = '';
                resetForm();
             }
        }
    }
})

function resetForm(){
    const form = $$('.form__body');
    form.forEach(e => {
        e.classList.remove('success');
        e.querySelector('.message').innerText = '';
    })
}
