$(document).ready(function() {
    maskField()
    checkSize()
})
$(window).resize(function() {
    checkSize()
})

$("body").on('click', '[href*="#"]', function (e) {
	var fixed_offset = 0;
	$('html,body').stop().animate({
		scrollTop: $(this.hash).offset().top - fixed_offset
	}, 1000);
	e.preventDefault();
});

$(document).on('click', '.checkField', function (el) {
  el.preventDefault();
  checkField(el)
})
function checkField(el) {
    let field = $(el.target).parents('form').find('input, textarea, select'),
        rating = $(el.target).parents('form').find('.rating-mini')

    for (let i = 0; i < field.length; i++) {
        if (!$(field[i]).hasClass('no-r')) {
            if ($(field[i]).val() != null) {
                if ($(field[i]).val() != '') {
                    if ($(field[i]).attr('type') == 'phone' || $(field[i]).hasClass('phone') || $(field[i]).attr('id') == 'phone' || $(field[i]).attr('name') == 'phone') {
                        if ($(field[i]).val().length < 17) {
                            $(field[i]).addClass('error')
                        } else {
                            $(field[i]).removeClass('error')
                        }
                    } else {
                        $(field[i]).removeClass('error')
                    }
                    if ($(field[i]).attr('type') == 'radio') {
                        if (!$(field[i]).hasClass('secondary')) {
                            let inputName = $(field[i]).attr('name'),
                                inputCheckedAll = $(el.target).parents('form').find(`input[name='${inputName}']`),
                                inputChecked = $(el.target).parents('form').find(`input[name='${inputName}']:checked`)
                            if (inputChecked.length == 0) {
                                inputCheckedAll.addClass('error')
                            } else {
                                inputCheckedAll.removeClass('error')
                            }
                        }
                    } else {
                        if (!$(field[i]).hasClass('gocity')) {
                            $(field[i]).removeClass('error')
                        } else {
                            let t=0
                            for (let j=0; j<$(field[i]).parents('.form-group-auto-row').find('.list.list-directions ul li').length; j++) {
                                if (t=0) {
                                    if ($(field).eq(i).val() != $(field).eq(i).parents('.form-group-auto-row').find('.list.list-directions ul li').eq(j).text()) {
                                        $(field).eq(i).addClass('error')
                                    } else {
                                        $(field).eq(i).removeClass('error')
                                        t++
                                    }
                                }                                
                            }
                        }
                    }
                    if ($(field[i]).attr('type') == 'checkbox') {
                        if (!$(field[i]).hasClass('secondary')) {
                            let inputName = $(field[i]).attr('name'),
                                inputCheckedAll = $(el.target).parents('form').find(`input[name='${inputName}']`),
                                inputChecked = $(el.target).parents('form').find(`input[name='${inputName}']:checked`)
                            if (inputChecked.length == 0) {
                                inputCheckedAll.addClass('error')
                            } else {
                                inputCheckedAll.removeClass('error')
                            }
                        }
                    } else {
                        if (!$(field[i]).hasClass('gocity')) {
                            $(field[i]).removeClass('error')
                        } else {
                            let t=0
                            for (let j=0; j<$(field[i]).parents('.form-group-auto-row').find('.list.list-directions ul li').length; j++) {
                                if (t=0) {
                                    if ($(field).eq(i).val() != $(field).eq(i).parents('.form-group-auto-row').find('.list.list-directions ul li').eq(j).text()) {
                                        $(field).eq(i).addClass('error')
                                    } else {
                                        $(field).eq(i).removeClass('error')
                                        t++
                                    }
                                }                                
                            }
                        }
                    }
                    if ($(field[i]).attr('type') == 'email') {
                        if (isValidEmail($(field[i]).val())) {
                            $(field[i]).removeClass('error')
                        } else {
                            $(field[i]).addClass('error')
                        }
                    }
                } else {
                    $(field[i]).addClass('error')
                }
            } else {
                $(field[i]).addClass('error')
            }
        } else {
            if ($(field[i]).attr('type') == 'email' && $(field[i]).val() != '') {
                if (isValidEmail($(field[i]).val())) {
                    $(field[i]).removeClass('error')
                } else {
                    $(field[i]).addClass('error')
                }
            } else {
                if (!$(field[i]).hasClass('gocity')) {
                    $(field[i]).removeClass('error')
                } else {
                    let t=0
                    for (let j=0; j<$(field[i]).parents('.form-group-auto-row').find('.list.list-directions ul li').length; j++) {
                        if (t=0) {
                            if ($(field).eq(i).val() != $(field).eq(i).parents('.form-group-auto-row').find('.list.list-directions ul li').eq(j).text()) {
                                $(field).eq(i).addClass('error')
                            } else {
                                $(field).eq(i).removeClass('error')
                                t++
                            }
                        }                                
                    }
                }
            }
        }
    }
    if ($(el.target).parents('form').hasClass('form-main')) {
        for (let i=0;i<$('form.form-main .accordion .accordion-item').length;i++) {
            if ($('form.form-main .accordion .accordion-item').eq(i).find('.error').length != 0) {
                $('form.form-main .accordion .accordion-item').eq(i).addClass('error-block')
            }
            else {
                $('form.form-main .accordion .accordion-item').eq(i).removeClass('error-block')
            }
        }
    }
    if ($(rating).find('span.active').length == 0) {
        $(rating).addClass('error')
    } else {
        $(rating).removeClass('error')
    }
    if ($(el.target).parents('form').find('.error').length == 0) {
        sendAjax(field, el)
        clearFields()
    }
}

function clearFields() {
    $('input:not([type=checkbox], [type=radio], [name=csrfmiddlewaretoken])').val('')
    $('textarea').val('')
    $('.__select__title').removeClass('error')
    $('input[type=checkbox]').prop('checked', false)
    $('input[type=radio]').prop('checked', false)
    $('form.form-main .accordion-body label img').removeClass('active')
}

function isValidEmail(email) {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function sendAjax(dataForm, el) {
    let obj = {},
        type = $(el.target).attr('data-request'),
        titleText = $('.modal#infoModal .modal-header'),
        bodyText = $('.modal#infoModal .modal-body'),
        link = $(el.target).attr('data-create')

    $.each(dataForm, function (i, el) {
        let name = $(el).attr('name'),
            value = $(el).val();
        if (obj[name] !== undefined) {
            if ($(el).is(':checked')) {
                obj[name] = value;
            }
        } else {
            if (value) {
                obj[name] = value;
            }
        }
    });
    $.ajax({
        url: `/api/${link}/`,
        method: "POST",
        headers: {
            'X-CSRFToken': csrftoken,
        },
        data: JSON.stringify(obj),
        dataType: 'json',
        contentType: 'application/json',
        success: function (response) {
            clearFields()
            if (response.error) {
                $('.message').html(response.message)
            }
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function maskField() {
    $(".mask-phone").click(function(){
      $(this).setCursorPosition(3);
    }).mask("+7(999) 999-9999");
    // $(".mask-phone").mask("+7 (999) 999-99-99");
    $('.mask-date').mask('99.99.9999');
}
$.fn.setCursorPosition = function(pos) {
  if ($(this).get(0).setSelectionRange) {
    $(this).get(0).setSelectionRange(pos, pos);
  } else if ($(this).get(0).createTextRange) {
    var range = $(this).get(0).createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
};

function checkSize() {

}

$(document).on('click', '.open-modal', function (el) {
    el.preventDefault()
    infoOpenModal(el)
})

function infoOpenModal(elem) {
    let type = $(elem.target).attr('data-type-modal'),
        titleText = $('.modal#infoModal .modal-header'),
        bodyText = $('.modal#infoModal .modal-body')
    titleText.html('')
    bodyText.html('')
    if (type === 'type-1') {
        titleText.html(`
            <div class="modal-title center">Чтобы воспользоваться сервисом выполните вход или зарегистрируйтесь на сайте</div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        `)
        bodyText.html(`
        <div class="info-block">
            <div class="item">
                <div class="name">Вход</div>
                <form class="application-block">
                    <label class="field">
                        <span>Номер телефона или email</span>
                        <input name="name_email" type="text">
                    </label>
                    <label class="field">
                        <span>Пароль</span>
                        <input name="password" type="password">
                    </label>
                    <div class="fb">
                        <div class="field-block">
                            <label class="checkbox-block">
                                <div class="checkbox">
                                    <input type="checkbox" id="check" >
                                    <div>
                                        <svg viewBox="0,0,50,50">
                                            <path d="M5 30 L 20 45 L 45 5"></path>
                                        </svg>
                                    </div>
                                </div>
                                <span>Запомнить меня</span>
                            </label>
                            <a href="#" class="recover-pass">Забыли пароль?</a>
                        </div>
                        <div class="btn checkField">Войти</div>
                    </div>
                </form>
            </div>
            <div class="item">
                <div class="name">Регистрация</div>
                <form class="application-block">
                    <label class="field">
                        <span>Имя*</span>
                        <input name="name" type="text">
                    </label>
                    <label class="field">
                        <span>Email</span>
                        <input name="email" type="text">
                    </label>
                    <label class="field">
                        <span>Пароль</span>
                        <input name="password" type="password">
                    </label>
                    <label class="field">
                        <span>Номер телефона*</span>
                        <input name="phone" type="text" class="mask-phone">
                    </label>
                    <div class="fb">
                        <label class="checkbox-block">
                            <div class="checkbox">
                                <input type="checkbox" id="check" checked" name="rules">
                                <div>
                                    <svg viewBox="0,0,50,50">
                                        <path d="M5 30 L 20 45 L 45 5"></path>
                                    </svg>
                                </div>
                            </div>
                            <span>Вы соглашаетесь с правилами</span>
                        </label>
                        <div class="btn white border checkField">Зарегистрироваться</div>
                    </div>
                </form>
            </div>
        </div>
    `)
    }

    maskField()
    $('#infoModal').modal('show')
}


