
function $(id) {
    return document.getElementById(id);
}
// 中文、字母、数字、_ - 4-20

var regs = {
    phoneReg: /^[1][3,4,5,7,8][0-9]{9}$/,
    userNameReg: /^(([\u4e00-\u9fa5])|[a-zA-Z0-9-_]){4,20}$/,
    userNameRegNum: /^\d+$/,
    pwdReg: /^[\x21-\x7E]{6,20}$/,
    numReg: /\d/,
    formItemReg: /[a-zA-Z]/,
    tsReg: /[^\u4e00-\u9fa5a-zA-Z0-9]/,
    emailReg: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
}
window.onload = function () {
    // 用户名字母、数字、_、-、中文  \u4e00-\u9fa5  4-20
    // formItem   常规 formItem  出错的时候  formItem error  正确的时候  formItem right
    // tip   常规 tip hide  出错的时候  tip error  默认的时候  tip default
    //定义赋值变量 （input id）
    var userName = $("form-account");
    var pwd = $("form-pwd");
    var pwd2 = $("form-equalTopwd");
    var email = $("form-email");
    var phone = $("form-phone");
    var phoneCode = $("phonecode");
    var getPhoneCode = $("getPhoneCode");
    var btnRegister = $("form-register");
    var btnNext = $("step1-next");
    var pStatus = $("pStatus");
    var pCancel = $("pCancel");
    var uiStatus = $("uiStatus");
    var uiCancel = $("uiCancel");
    var pwdStatus = $("pwdStatus");
    var pwd2Status = $("pwd2Status");
    var eStatus = $("eStatus");
    var userresult;
    var a;


    // empty the input box of phone's content
    // phone.addEventListener("keyup", function () {
    //     if (this.value.length > 0) {
    //         pStatus.style.display = "none";
    //         pCancel.style.display = "block";
    //         pCancel.onmousedown = function () {
    //             phone.value = "";
    //             pCancel.style.display = "none";
    //         }
    //     } else {
    //         pCancel.style.display = "none";
    //     }
    // });

    //empty the input box of userName's content
    userName.addEventListener("keyup", function () {
        if (this.value.length > 0) {
            uiStatus.style.display = "none";
            uiCancel.style.display = "block";
            uiCancel.onmousedown = function () {
                userName.value = "";
                uiCancel.style.display = "none";
            }
        } else {
            uiCancel.style.display = "none";
        }
    });
    //check phone num
    phone.onkeyup = phone.onfocus = phone.onblur = function (evt) {
        var e = evt || window.event;
        checkPhone(e);
    }

    function PhoneExist() {
        var value = phone.value;
        var args = new Array();
        var formItem = phone.parentNode.parentNode;
        var tip = formItem.nextElementSibling;
        var span = tip.lastElementChild;
        args[0] = 2;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://api.yihuo.com/api/user/check/" + value + "/" + args[0], true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log(xhr.responseText)
                if (xhr.responseText == 'false') {
                    alert("手机号码：" + value + "已经被注册，请使用其它号码或与客服申诉")
                    pStatus.style.display = 'none';
                    tip.className = "tip error";
                    span.innerHTML = "该号码已存在！";
                } else {
                    // result = xhr.responseText;
                    console.log('xxx' + xhr.responseText)
                    phoneNull = xhr.responseText;
                }
            }
        }
        xhr.send();
        return phoneNull;
    }

    function checkPhone(_e) {
        var type;
        if (_e) {
            type = _e.type;
        }
        var value = phone.value;
        var formItem = phone.parentNode.parentNode;
        var tip = formItem.nextElementSibling;
        var span = tip.lastElementChild;
        if (type == "focus") {

            if (value == "") {
                formItem.className = "formItem";
                tip.className = "tip default";
                span.innerHTML = "验证完成后，你可以使用该手机登录或找回密码";
                return false;
            }
        }
        if (type == "blur") {
            pCancel.style.display = "none";
            if (value == "") {
                formItem.className = "formItem";
                tip.className = "tip hide";
                return false; //不继续往下走
            } else if (regs.phoneReg.test(value)) {
                pStatus.style.display = 'block';
                tip.className = "tip hide";
                PhoneExist();
                return true;
            } else {
                pStatus.style.display = 'none';
                tip.className = "tip error";
                span.innerHTML = "格式错误";
                return false;
            }
        }
    }



    //check userName
    userName.onkeyup = userName.onfocus = userName.onblur = function (evt) {
        var e = evt || window.event;
        checkUserName(e);
    }

    function checkUserName(_e) {
        var type;
        if (_e) {
            type = _e.type;
        }
        var value = userName.value;
        var formItem = userName.parentNode;
        var tip = formItem.nextElementSibling;
        var span = tip.lastElementChild;
        if (type == "focus") {
            if (value == "") {
                formItem.className = "formItem";
                tip.className = "tip default";
                span.innerHTML = "支持汉字、字母、数字、“-”“_”的组合，4-20个字符";
                return false;
            }
        }
        if (type == "blur") {
            uiCancel.style.display = "none";
            if (value == "") {
                uiStatus.style.display = 'none';
                formItem.className = "formItem";
                tip.className = "tip hide";
                return false; //不继续往下走
            } else {

                if (value.length >= 4) {
                    if (regs.userNameRegNum.test(value)) {
                        uiStatus.style.display = 'none';
                        tip.className = "tip error";
                        span.innerHTML = "用户名不能是纯数字，请重新输入！";
                        return false;
                    } else if (regs.userNameReg.test(value)) {
                        uiStatus.style.display = 'block';
                        tip.className = "tip hide";
                        UsernameExist();
                        return true;
                    } else {
                        uiStatus.style.display = 'none';
                        tip.className = "tip error";
                        span.innerHTML = "仅支持汉字、字母、数字、“-”、“_”的组合";
                        return false;
                    }
                } else {
                    uiStatus.style.display = 'none';
                    tip.className = "tip error";
                    span.innerHTML = "长度只能在4-20个字符之间";
                    return false;
                }

            }
        }
        if (regs.userNameReg.test(value)) {
            return true;
        }

    }



    pwd.onkeyup = pwd.onfocus = pwd.onblur = function (evt) {
        var e = evt || window.event;
        checkPwd(e);
    }

    function checkPwd(_e) {
        var type;
        if (_e) {
            type = _e.type;
        }
        var value = pwd.value;
        var formItem = pwd.parentNode;
        var tip = formItem.nextElementSibling;
        var span = tip.lastElementChild;
        if (type == "focus") {
            if (value == "") {
                formItem.className = "formItem";
                tip.className = "tip default";
                span.innerHTML = "建议使用字母、数字和符号两种以上的组合,6-20个字符";
                return false;
            }
        }
        if (type == "blur") {
            if (value == "") {
                pwdStatus.style.display = 'none';
                formItem.className = "formItem";
                tip.className = "tip hide";
                return false;
            } else if (value.length <= 5) {
                tip.className = "tip error";
                span.innerHTML = "密码长度应在6-20个字符之间";
                return false;
            }
            document.getElementById('capslock1').style.display = 'none';
        }

        if (value != "") {
            if (regs.pwdReg.test(value)) {
                var level = getPwdLevel(value);
                switch (level) {
                    case 1:
                        tip.className = "tip pwdWeak";
                        pwdStatus.style.display = 'none';
                        span.innerHTML = "有被盗风险,建议使用字母、数字和符号两种及以上组合";
                        break;
                    case 2:
                        tip.className = "tip pwdMedium";
                        pwdStatus.style.display = 'block';
                        span.innerHTML = "安全强度适中，可以使用三种以上的组合来提高安全强度";
                        break;
                    case 3:
                        tip.className = "tip pwdStrong";
                        pwdStatus.style.display = 'block';
                        span.innerHTML = "你的密码很安全";
                        break;
                }
                if (type == "blur") {
                    pwdStatus.style.display = 'block';
                    tip.className = "tip hide";
                    return true;
                }
                return true;
                // 弱  中  强
                // 字母、数字、特殊字符
                // level 1弱 2中  3强
                // tip ruo zhong qiang
                // jkj343?
                // tip.className = ""
            }

        }
    }
    pwd2.onkeypress = pwd2.onfocus = pwd2.onblur = function (evt) {
        var e = evt || window.event;
        checkPwd2(e);
        detectCapsLock2(e);
    }

    function checkPwd2(_e) {
        var type;
        if (_e) {
            type = _e.type;
        }
        var value1 = pwd.value;
        var value = pwd2.value;
        var formItem = pwd2.parentNode;
        var tip = formItem.nextElementSibling;
        var span = tip.lastElementChild;
        if (type == "focus") {
            pwd2Status.style.display = 'none';
            if (value == "") {
                formItem.className = "formItem";
                tip.className = "tip default";
                span.innerHTML = "请再次输入密码";
                return false;
            }
        }
        if (type == "blur") {
            if (value != "" && value1 == value) {
                pwd2Status.style.display = 'block';
                tip.className = "tip hide";
                return true;
            }
            if (value != "" && value1 !== value) {
                tip.className = "tip error";
                span.innerHTML = "两次密码不一致";
                return false;
            }

            if (value == "") {
                formItem.className = "formItem";
                tip.className = "tip hide";
                span.innerHTML = "";
                return false;
            }


        }
        if (value1 == value) {
            return true;
        }
    }

    // email.onkeyup = email.onfocus = email.onblur = function(evt) {
    //     var e = evt || window.event;
    //     checkEmail(e);
    // }

    // function checkEmail(_e) {
    //     var type;
    //     if (_e) {
    //         type = _e.type;
    //     }
    //     var value = email.value;
    //     var formItem = email.parentNode;
    //     var tip = formItem.nextElementSibling;
    //     var span = tip.lastElementChild;
    //     if (type == "focus") {
    //         if (value == "") {
    //             formItem.className = "formItem";
    //             tip.className = "tip default";
    //             span.innerHTML = "验证完成后，你可以使用该邮箱登录";
    //             return false;
    //         }
    //         if (regs.emailReg.test(value)) {
    //             eStatus.style.display = 'block';
    //             tip.className = "tip hide";
    //             return true;
    //         }
    //     }
    //     if (type == "blur") {
    //         if (value == "") {
    //             formItem.className = "formItem";
    //             tip.className = "tip hide";
    //             return false;
    //         }
    //         if (regs.emailReg.test(value)) {
    //             eStatus.style.display = 'none';
    //             tip.className = "tip hide";
    //             return true;
    //         } else {
    //             tip.className = "tip error";
    //             span.innerHTML = "格式错误";
    //             return false;
    //         }
    //     }

    //     if (regs.emailReg.test(value)) {
    //         return true;
    //     }
    // }

    pwd.onkeypress = function (evt) {
        var e = evt || window.event;
        detectCapsLock(e);
    }
    //大写开启提示
    function detectCapsLock(event) {
        var e = event || window.event;
        valueCapsLock = e.keyCode ? e.keyCode : e.which; // Caps Lock　是否打开 
        valueShift = e.shiftKey ? e.shiftKey : ((valueCapsLock == 16) ? true : false); // shift键是否按住
        if (((valueCapsLock >= 65 && valueCapsLock <= 90) && !valueShift) // Caps Lock 打开，并且 shift键没有按住 
            ||
            ((valueCapsLock >= 97 && valueCapsLock <= 122) && valueShift)) // Caps Lock 打开，并且按住 shift键 
            document.getElementById('capslock1').style.display = 'block';
        else
            document.getElementById('capslock1').style.display = 'none';
    }

    function detectCapsLock2(e) {

        valueCapsLock = e.keyCode ? e.keyCode : e.which; // Caps Lock　是否打开 
        valueShift = e.shiftKey ? e.shiftKey : ((valueCapsLock == 16) ? true : false); // shift键是否按住
        if (((valueCapsLock >= 65 && valueCapsLock <= 90) && !valueShift) // Caps Lock 打开，并且 shift键没有按住 
            ||
            ((valueCapsLock >= 97 && valueCapsLock <= 122) && valueShift) || valueCapsLock == 20) // Caps Lock 打开，并且按住 shift键 
            document.getElementById('capslock2').style.display = 'block';
        else
            document.getElementById('capslock2').style.display = 'none';
    }

    function checkPhoneCode() {
        var obj = new Array();
        obj[0] = $('form-phone').value;
        obj[1] = $('phoneCode').value;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://api.yihuo.com/api/user/checkCode/" + obj[0] + "/" + obj[1], false);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                result = xhr.responseText;
            }
        }
        xhr.send();
        console.log(result)
        return result;
    }

    btnNext.onclick = function () {
        var key = checkPhoneCode();
        console.log(key)
        var step1Wrap = $("step1-wrap");
        var step2Wrap = $("step2-wrap");
        if (key == 'true') {
            step1Wrap.style.display = "none";
            step2Wrap.style.display = "block";
            var x = document.getElementsByClassName("step-index");
            x[1].style.backgroundPosition = "0 -200px";
            x[1].style.color = "#fff";
            var y = document.getElementsByClassName("person-pro-line");
            y[0].style.backgroundPosition = "0 -130px";
        }


        // if (checkPhone()) {
        //     step1Wrap.style.display = "none";
        //     step2Wrap.style.display = "block";
        // } else {
        //     var value = phone.value;
        //     var formItem = phone.parentNode;
        //     var tip = formItem.nextElementSibling;
        //     var span = tip.lastElementChild;
        //     formItem.className = "formItem error";
        //     tip.className = "tip error";
        //     span.innerHTML = "请输入手机号码";
        //     return false;
        // }
    }


    getPhoneCode.onclick = function () {

        var obj = $('form-phone').value;
        var ajaxObj = new XMLHttpRequest();
        if (phoneNull == 'true') {
            ajaxObj.open("POST", "http://api.yihuo.com/api/user/code");
            ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajaxObj.send("phone=" + obj);
        } else {
            alert("该号码已经被注册")
        }

    }

    function UsernameExist() {
        var value = userName.value;
        var args = new Array();
        var formItem = userName.parentNode;
        var tip = formItem.nextElementSibling;
        var span = tip.lastElementChild;
        args[0] = 1;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://api.yihuo.com/api/user/check/" + value + "/" + args[0], true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log(xhr.responseText)
                if (xhr.responseText == 'false') {
                    // alert("用户名:" + value + "已经被注册，请使用其它用户名或与客服申诉")
                    formItem.className = "formItem error";
                    tip.className = "tip error";
                    span.innerHTML = "用户名已存在";
                } else {
                    // result = xhr.responseText;
                    console.log('yyyy' + xhr.responseText);
                    a = xhr.responseText;

                }
            }
        }
        xhr.send();
        return a;
    }

    btnRegister.onclick = function () {

        if (checkUserName() && checkPwd() && checkPwd2()) {
            var sName = userName.value;
            var sPwd = pwd.value;
            var pnum = $('form-phone').value;
            // var sEmail = email.value;
            var formItem = userName.parentNode;
            var tip = formItem.nextElementSibling;
            var span = tip.lastElementChild;

            if (a == 'true') {
                console.log("现在的手机号：" + $('form-phone').value)
                var xhr = new XMLHttpRequest();
                xhr.open("post", "http://api.yihuo.com/api/user/register/" + sName + "/" + sPwd + "/" + pnum, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function () {

                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var res = xhr.responseText;
                        console.log(res)
                        if (res == 'true') {
                            var step2Wrap = $("step2-wrap")
                            // step1Wrap.style.display = "none";
                            step2Wrap.style.display = "none";
                            var x = document.getElementsByClassName("step-index");
                            x[1].style.backgroundPosition = "0 -200px";
                            x[1].style.color = "#fff";
                            x[2].style.backgroundPosition = "0 -200px";
                            x[2].style.color = "#fff";
                            var y = document.getElementsByClassName("person-pro-line");
                            y[0].style.backgroundPosition = "0 -130px";
                            y[1].style.backgroundPosition = "0 -130px";
                            alert('亲，您已经注册成功，点击跳转到登录页面')
                            window.location.href = "/login.html"
                        } else if (res == 'false') {
                            span.innerHTML = "注册失败";
                        }
                    }
                }
                xhr.send();

            }

        } else {
            if (userName.value == "") {
                var value = userName.value;
                var formItem = userName.parentNode;
                var tip = formItem.nextElementSibling;
                var span = tip.lastElementChild;
                formItem.className = "formItem error";
                tip.className = "tip error";
                span.innerHTML = "用户名不能为空";
                return false;
            } else {
                if (pwd.value == "") {
                    var value = pwd.value;
                    var formItem = pwd.parentNode;
                    var tip = formItem.nextElementSibling;
                    var span = tip.lastElementChild;
                    formItem.className = "formItem error";
                    tip.className = "tip error";
                    span.innerHTML = "密码不能为空";
                    return false;
                } else {
                    if (pwd2.value == "") {
                        var value = userName.value;
                        var formItem = pwd2.parentNode;
                        var tip = formItem.nextElementSibling;
                        var span = tip.lastElementChild;
                        formItem.className = "formItem error";
                        tip.className = "tip error";
                        span.innerHTML = "请再次输入密码";
                        return false;
                    }
                }
            }
        }
    }

}

function getPwdLevel(pwd) {
    var level = 0;
    var numReg = true,
        formItemReg = true,
        tsReg = true;
    for (var i = 0; i < pwd.length; i++) {
        if (numReg && regs.numReg.test(pwd[i])) {
            level++;
            numReg = false;
            continue;
        }
        if (formItemReg && regs.formItemReg.test(pwd[i])) {
            level++;
            formItemReg = false;
            continue;
        }
        if (tsReg && regs.tsReg.test(pwd[i])) {
            level++;
            tsReg = false;
        }
    }
    return level;
}