const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const submitForm = $('#form');
const username = $('#username');
const email = $('#email');
const password = $('#password');
const confirmPass = $('#confirm-password');
const inputForm = $$('input');

function check(inputForm){
    var flag = true;
    inputForm.forEach(e => {
        e.value = e.value.trim();
        if(e.value != ''){
            showSuccess(e);
            if(e.id == 'email'){
                if(!validateEmail(e.value)){
                    showError(e,`${e.placeholder} Không hợp lệ`)
                    return flag = false;
                }
            }
            if(e.id == 'password' || e.id == 'confirm-password'){
                checkPasswordLength(e);
                if(checkPasswordLength(e)){
                    if(!checkConfirm()){
                        return flag = false;
                    }
                }
            }
        }
        else{
            showError(e, `${e.placeholder} Không được để trống`);
            return flag = false;
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

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

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

submitForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(check(inputForm)){
        alert('Thành Công')
        resetForm();
    }
})

function resetForm(){
    const form = $$('.form__body');
    form.forEach(e => {
        e.classList.remove('success');
        e.querySelector('.message').innerText = '';
    })
}
