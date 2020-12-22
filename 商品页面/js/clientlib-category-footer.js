$(function () {
    $("#goDeclare").on("click",function () {
        var txt="您正在浏览索尼的网页，您知悉并同意索尼对您浏览本网页的行为进行监控以保护索尼及其合作伙伴和客户的权利和资产以及对任何对索尼的网络造成潜在的威胁或进行不当使用的行为进行调查。监控会对您浏览本网页产生的相关信息进行收集、记录和分析。如果您不同意被监控，请停止浏览本网页。";
        $(this).parent().text(txt).css("marginTop","5px");
        $(".footer-btm").addClass('ft-txt-cli')
    });
});
