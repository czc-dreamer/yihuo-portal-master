(function($) {
            var $win = $(window),
                $loginDiv = $('._login_div_quick_'),
                $login = $('#login_button'),
                $errTip = $('#error_tips'),
                $capsLock = $('#caps_lock_tips'),
                // showLogin = function() {
                //     $loginDiv.css({
                //         top: ($win.height() - $loginDiv.height()) / 2 + 'px',
                //         left: ($win.width() - $loginDiv.width()) / 2 + 'px',
                //         display: 'block'
                //     });
                // },
                $accTip = $('#acc_tips'),
                $passTip = $('#pwd_tips'),
                $operateTip = $('#operate_tips'),
                $delAccInput = $('#acc_del'),
                $acc = $('#acc'),
                $p = $('#p'),
                $switch = $('#qrcode_switch_logo'),
                $qrcode = $('#account_qrcode_login_show');
            $account_login = $('#account_login');
            $qrcode_login = $('#qrcode_login');
            // $(loginBtn).click(function() { showLogin(); });
            $win.resize(function() { if ($loginDiv.is(':visible')) { showLogin(); } });
            // $('#close').click(function() { $loginDiv.hide(); });
            $acc.add($p).bind({
                'focus': function() {
                    var $this = $(this),
                        $currTip = $this.attr('id') === 'acc' ? ($operateTip.show(), $accTip) : $passTip;
                    $this.parent().css('background-position-y', '-45px');
                    $currTip.css('color', '#ddd');
                },
                'blur': function() {
                    var $this = $(this),
                        $currTip = $this.attr('id') === 'acc' ? ($operateTip.hide(), $accTip) : $passTip;
                    $this.parent().css('background-position-y', '-1px');
                    $currTip.css('color', '#aaa');
                    if ($currTip === $passTip && $capsLock.is(':visible')) { $capsLock.hide(); }
                },
                'input': function(e) {
                    var $this = $(this),
                        $currTip = $this.attr('id') === 'acc' ? $accTip : $passTip;
                    if ($this.val()) {
                        if ($currTip.is(':visible')) {
                            $currTip.hide();
                            if ($currTip === $accTip) { $delAccInput.show(); }
                        }
                    } else {
                        $currTip.show();
                        if ($currTip === $accTip) { $delAccInput.hide(); }
                    }
                }
            });
            $p.keypress(function(e) {
                if (((e.keyCode >= 65 && e.keyCode <= 90) && !e.shiftKey) || ((e.keyCode >= 97 && e.keyCode <= 122) && e.shiftKey)) { $capsLock.show(); } else { $capsLock.hide(); }
            });
            $delAccInput.click(function() {
                $acc.val('').focus();
                $accTip.show();
                $delAccInput.hide();
            });
            $switch.click(function() {
                if ($switch.attr('class') === 'qrcode-switch-logo') {
                    $switch.attr('class', 'qrcode-switch-logo-qrcode');
                    account_login.style.display = "none";
                    qrcode_login.style.display = "block";
                } else {
                    $switch.attr('class', 'qrcode-switch-logo');
                    // $qrcode.animate({ top: '0px' }, 200);
                    account_login.style.display = "block";
                    qrcode_login.style.display = "none";
                }
            });
            $login.click(function() {
                if (!$acc.val()) {
                    $errTip.find('#err_m').text('请输入正确的用户名/手机/邮箱！').end().show();
                    setTimeout(function() { $errTip.hide(); }, 5000);
                    return false;
                } else if (!$p.val()) {
                    $errTip.find('#err_m').text('您还没有输入密码！').end().show();
                    setTimeout(function() { $errTip.hide(); }, 5000);
                    return false;
                } else {
                    var sName = $acc.val();
                    var sPwd = $p.val();
                    var xhr = new XMLHttpRequest();
                    xhr.open("get", "http://localhost/login/loginPHP/loginCheck.php?flag=login&uname=" + sName + "&upwd=" + sPwd, true);
                    xhr.send();
                    xhr.onreadystatechange = function() {

                        if (xhr.readyState == 4 && xhr.status == 200) {
                            var res = xhr.responseText;
                            if (res == 1) {
                                $('#loading_tips').show();
                                window.location.href = "nb.html";
                            } else if (res == 2) {
                                $errTip.find('#err_m').text('用户名或密码不正确！').end().show();
                                setTimeout(function() { $errTip.hide(); }, 5000);
                            } else {
                                $errTip.find('#err_m').text('用户名或密码不正确！').end().show();
                                setTimeout(function() { $errTip.hide(); }, 5000);
                            }
                        }
                    }   
                }
            });
}(jQuery))