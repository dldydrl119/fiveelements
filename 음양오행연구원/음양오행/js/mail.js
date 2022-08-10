(function($){

    $('body').on('click', '#contactgo', function() {
        var agreecheck, req = true;
        if($("#agree").is(":checked") == true) agreecheck = true;

        $('.req').each(function() {
            if (!$(this).val()) {
                req = false;
                return false;
            }
         });

        if(agreecheck) {
            if(req) {
                var form = $('form.forrm')[0];
                var data = new FormData(form);

                if($("#bang_chk").is(":checked") == true){
                    var come = '방문함';
                }
                else if($("#bang_chk").is(":checked") == false) {
                    var come = "방문안함";
                }
                var email = data.get('email');

                var title = "뉴턴트리 애드 문의사항이 도착했습니다";
                var content = '문의사항';
                if(data.getAll('type[]')) {
                    var type = data.getAll('type[]').join(',');
                    content += '\n제작 구분 : '+type;
                }
                if(data.get('company')) {
                    content += '\n회사명 : '+data.get('company');
                }
                if(data.get('manager')) {
                    content += '\n담당자 : '+data.get('manager');
                }
                if(data.get('tel')) {
                    content += '\n연락처 : '+data.get('tel');
                }
                if(data.get('phone')) {
                    content += '\n휴대전화 : '+data.get('phone');
                }
                if(data.get('email')) {
                    content += '\n이메일 : '+data.get('email');
                }
                if(data.get('money')) {
                    content += '\n제작예산 : '+data.get('money')+'만원';
                }
                if(data.get('come')) {
                    content += '\n방문 신청 : '+come;
                }
                content += '\n\n(추가 정보)';
                if(data.get("homepage")) {
                    if(data.get("homepage").indexOf("http") != -1) {
                        var nowsite = data.get("homepage");
                    } else {
                        var nowsite = "http://"+data.get("homepage");
                    }
                    content += '\n현재 사이트 : '+nowsite;
                }
                if(data.get('page')) {
                    content += '\n예상 페이지 수 :'+data.get('page');
                }
                if(data.get("site1")) {
                    if(data.get("site1").indexOf("http") != -1) {
                        var site1 = data.get("site1");
                    } else {
                        var site1 = "http://"+data.get("site1");
                    }
                    content += '\n참고 사이트1 : '+ site1;
                }
                if(data.get("site2")) {
                    if(data.get("site2").indexOf("http") != -1) {
                        var site2 = data.get("site2");
                    } else {
                        var site2 = "http://"+data.get("site2");
                    }
                    content += '\n참고 사이트2 : '+site2;
                }
                if(data.get('file1')) {
                    content += '\n파일 첨부하기 1 : <?=SURL?>assets/uploads/'+data.get('file1');
                }
                if(data.get('file2')) {
                    content += '\n파일 첨부하기 2 : <?=SURL?>assets/uploads/'+data.get('file2');
                }
                if(data.get('question')) {
                    content += '\n기타 문의 사항 : '+data.get('question');
                }

                var result = json('/admin/sendmail/',{'title':title,'text':content,'email':email});
                if(result.result == true) {
                    alert("메일이 전송되었습니다");
                }
            }
            else {
                $(this).next().trigger('click');
            }
        }
        else {
            alert("개인 정보 처리 방침에 동의해주세요");
        }
    });


    jsonreturn = function(url,data) {
            var option = {
                url : 'https://newturntreead.com'+url,
                async:false
            };
            if(data){
                option.data = data;
                option.type = "post";
                option.contentType = false;
                option.processData = false
            }
            $.ajax(
                option
            ).done(function(data){
                result = data;
            });
            return result;
        }

    json = function(url,data) {
        var option = {
            url : 'https://newturntreead.com'+url,
            data : data,
            type : "post",
            async:false
        };
        $.ajax(
            option
        ).done(function(data){
            result = data;
        });
        return result;
    }

    uploadImage = function(form) {
        var image = new FormData();
        for (var I = 0; I < form[0].files.length; I++) {
            image.append('images[]', form[0].files[I]);
        }
        if (form.data('width')) {
            image.append('x', form.data('width'));
            if (form.data('height')) {
                image.append('y', form.data('height'));
            }
        }
        return this.jsonreturn('/admin/uploadimage', image);
    }

    uploadFile = function(form) {
        var file = new FormData();
        for (var I = 0; I < form[0].files.length; I++) {
            file.append('files[]', form[0].files[I]);
        }
        return this.jsonreturn('/admin/uploadfiles', file);
    }
})(jQuery);
