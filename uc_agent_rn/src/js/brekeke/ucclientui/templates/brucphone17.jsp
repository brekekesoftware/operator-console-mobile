<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.brekeke.chat.*" %>
<%
String errorDocument = null;
String reqHost = request.getHeader("Host");
String reqUserAgent = request.getHeader("User-Agent");
String allowedUserAgent = ChatServer.UC_C_OPTION_A30 != null && !"".equals(ChatServer.UC_C_OPTION_A30) ? ChatServer.UC_C_OPTION_A30 : "ipphone";
if (LicStatus.instance.lc.getOptionCode().indexOf('t') < 0 && !(reqHost != null && reqHost.startsWith("webrtc.brekeke.jp"))) {
    errorDocument = "server error (1701LIC)";
} else if (reqUserAgent == null || reqUserAgent.indexOf(allowedUserAgent) == -1) {
    errorDocument = "client error (1601BRO)";
}
if (errorDocument != null) {
%>
<!DOCTYPE html>
<html>
<head>
<title>ERROR</title>
</head>
<body>
<%= errorDocument %>
<script type="text/javascript">
window.onclick = window.close;
</script>
</body>
</html>
<%
} else {
    ChatMethod.TkcServiceMessage serviceMessage = ChatMethod.getTkcServiceHours();
    if (request.getParameter("nextservice") != null) {
        if (serviceMessage.NextJson != null) {
            out.print(serviceMessage.NextJson);
        }
    } else {
        String escapedNextJson = "''";
        if (serviceMessage.NextJson != null) {
            escapedNextJson = "'" + serviceMessage.NextJson.replace("\\", "\\\\").replace("'", "\\'") + "'";
        }
        String logXhr = "'error,warn,info'";
        String turnApiKey = "''";
        String turnScriptSrc = "https://cdn.webrtc.ecl.ntt.com/skyway-latest.js";
        String beforeLoadTurnScript = "<script>var windowProcessTypeOrg = window.process && window.process.type; if (windowProcessTypeOrg) { window.process.type = 'dummy'; }</script>";
        String afterLoadTurnScript = "<script>if (typeof windowProcessTypeOrg !== 'undefined') { window.process.type = windowProcessTypeOrg; }</script>";
        String turnInitTimeout = "10000";
        String iceCheckInterval = "50";
        String iceTimeout = "500";
        String iceOkDtmf = "',1'";
        String targetHeaders = "',ice,tcp,tcp,ivr,ivr,ivr,ivr'";
        String gatheringTimeout = "500";
        if (ChatServer.UC_C_OPTION_A22 != null && !"".equals(ChatServer.UC_C_OPTION_A22)) {
            logXhr = "'" + ChatServer.UC_C_OPTION_A22.replace("\\", "\\\\").replace("'", "\\'") + "'";
        }
        if (ChatServer.UC_C_OPTION_A23 != null && !"".equals(ChatServer.UC_C_OPTION_A23)) {
            turnApiKey = "'" + ChatServer.UC_C_OPTION_A23.replace("\\", "\\\\").replace("'", "\\'") + "'";
        }
        if (ChatServer.UC_C_OPTION_A24 != null && !"".equals(ChatServer.UC_C_OPTION_A24)) {
            turnScriptSrc = ChatServer.UC_C_OPTION_A24.replace("&", "&amp;").replace("\"", "&quot;").replace("<", "&lt;").replace(">", "&gt;").replace("'", "&#39;");
        }
        if (ChatServer.UC_C_OPTION_A31 != null && !"".equals(ChatServer.UC_C_OPTION_A31)) {
            beforeLoadTurnScript = ChatServer.UC_C_OPTION_A31;
        }
        if (ChatServer.UC_C_OPTION_A32 != null && !"".equals(ChatServer.UC_C_OPTION_A32)) {
            beforeLoadTurnScript = ChatServer.UC_C_OPTION_A32;
        }
        if (ChatServer.UC_C_OPTION_A25 != null && !"".equals(ChatServer.UC_C_OPTION_A25)) {
            try {
                turnInitTimeout = String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A25));
            } catch (NumberFormatException ex) {}
        }
        if (ChatServer.UC_C_OPTION_A26 != null && !"".equals(ChatServer.UC_C_OPTION_A26)) {
            try {
                iceCheckInterval = String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A26));
            } catch (NumberFormatException ex) {}
        }
        if (ChatServer.UC_C_OPTION_A27 != null && !"".equals(ChatServer.UC_C_OPTION_A27)) {
            try {
                iceTimeout = String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A27));
            } catch (NumberFormatException ex) {}
        }
        if (ChatServer.UC_C_OPTION_A28 != null && !"".equals(ChatServer.UC_C_OPTION_A28)) {
            iceOkDtmf = "'" + ChatServer.UC_C_OPTION_A28.replace("\\", "\\\\").replace("'", "\\'") + "'";
        }
        if (ChatServer.UC_C_OPTION_A29 != null && !"".equals(ChatServer.UC_C_OPTION_A29)) {
            targetHeaders = "'" + ChatServer.UC_C_OPTION_A29.replace("\\", "\\\\").replace("'", "\\'") + "'";
        }
        if (ChatServer.UC_C_OPTION_A21 != null && !"".equals(ChatServer.UC_C_OPTION_A21)) {
            try {
                gatheringTimeout = String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A21));
            } catch (NumberFormatException ex) {}
        }
%>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta charset="utf-8">
<title></title>
<style type="text/css">
/* CSS Document */

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

reset

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

/* --HTML-- */
html {
background:#fff;
color:#333;
overflow-y:auto;
}

/* --BODY-- */
body {
margin:0;
padding:0;
}

/* --OTHER TAGS-- */
a img, img {
border:0;
vertical-align: bottom;
}

blockquote, dd, div, dl, dt,
h1, h2, h3, h4, h5, h6,
li, ol, p, pre, span, td, th, ul,menu,nav {
margin:0;
padding:0;
}

abbr, acronym {
border:0;
}
address, caption, cite, code, dfn, em, th, var {
font-style:normal;
font-weight:normal;
}

caption, th {
text-align:left;
}

code, kbd, pre, samp, tt {
font-family:monospace;
line-height:100%;
}
/* for IE7 */
*+html code, kbd, pre, samp, tt {
font-size:108%;
}
h1, h2, h3, h4, h5, h6 {
font-size:100%;
font-weight:bold;
}
menu,nav{display: block;}

q:before, q:after {
content:'';
}
header,footer{ display:block}
/* form */
button, fieldset, form, input, label, legend, select, textarea {
font-family:inherit;
font-size:100%;
font-style:inherit;
font-weight:inherit;
margin:0;
padding:0;
vertical-align:baseline;
}


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

basic

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

body, th, td, input, textarea {
color: #333333;
font: 13px/1.6 "メイリオ", Meiryo, "ＭＳ Ｐゴシック" , "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", Osaka, Tahoma, Verdana, Arial, sans-serif;
}
.clearfix:after {
visibility: hidden;
display: block;
font-size: 0;
content: " ";
clear: both;
height: 0;
}
* html .clearfix { zoom: 1; } /* IE6 */
*:first-child+html .clearfix { zoom: 1; } /* IE7 */


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

master

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

a{
    color: #333;
    text-decoration: underline;
}
a:hover {
    color: #333;
    text-decoration: none;
}
.cmn-btnInnerIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
}
.container {
width: 100%;
margin: 0 auto;
}
.header {
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(99,114,130,0.18);
    height: 50px;
    position: relative;
}
.header_logo {
    width: 108px;
    padding: 9px 0 0 12px;
}
.header_btnClose {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 54px;
    height: 50px;
    border-left: 1px solid #ececec;
}
.header_btnTool {
    position: absolute;
    right: 0;
    top: 0;
    width: 54px;
    height: 50px;
    border-left: 1px solid #ececec;
}
.header_btnTool a ,
.header_btnClose a {
    display: block;
    width: 100%;
    height: 100%;
    transition: background-color 0.16s ease 0s;
}
.header_btnTool a:hover {
    background: #e5e5e5;
}
.header_btnClose a img {
    width: 14px;
    height: 14px;
}
.header_btnClose a:hover {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAIpJREFUKJGF0lEKwjAMANDoWZy6+4tfXkRUGCh6jOfHnNaSrYFCIXm0CQmccMUW0Tg9BhwDN2M8GrjH61N7DuzwLHDXQHdspsQS3tcIEVVBjVNUwwyX6K+FbAglThFiHXmsZu6/SF4rvzc77SU0DSfFSyjr+ZubTTRa6OqVy1CGz2Fc8ksDlXjA4Q38ZGdkJRCWkQAAAABJRU5ErkJggg==) no-repeat 50% 50% #e8364b;
}
.header_btnClose a:hover img {
    visibility: hidden;
}
.header_btnTool img ,
.header_btnClose img {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
.mainContents {
    position: relative;
    padding: 34px 0;
    text-align: center;
}
.mainContents_btnCall {
    text-align: center;
    display: inline-block;
}
.mainContents_btnCall a {
    display: block;
    margin: 0 0 2px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #1092d4;
    position: relative;
    transition: all 0.16s ease 0s;
}
.mainContents_btnCall a:hover {
    background: #36b1f0;
}
.mainContents_btnCall p {
    color: #1092d4;
    letter-spacing: 0.2em;
}
.information {
    background: #f7f7f7;
    padding: 8px 12px;
    font-size: 12px;
    line-height: 1.5;
}
/***************************

talk

****************************/
.talk .mainContents_btnCall {
    visibility: hidden;
}
.talkOverlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 1.0);
}
.talkOverlay_inner {
    padding: 84px 0 0;
    text-align: center;
}
.talkContents_btnCut,
.talkContents_btnPause {
    text-align: center;
    margin: 0 30px;
    display: inline-block;
    vertical-align: middle;
}
.talkContents_btnCut a {
    display: block;
    margin: 0 0 2px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #e8364b;
    position: relative;
    transition: all 0.16s ease 0s;
}
.talkContents_btnCut a:hover {
    background: #fe7585;
}
.talkContents_btnCut p {
    color: #e8364b;
    letter-spacing: 0.2em;
}
.talkContents_btnPause a {
    display: block;
    margin: 0 auto 2px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #8c8c8c;
    position: relative;
    transition: all 0.16s ease 0s;
}
.talkContents_btnPause a:hover {
    background: #bbb;
}
.talkContents_btnPause p {
    color: #8c8c8c;
    letter-spacing: 0.2em;
}
.talkContents_controlWrap {
    margin: 40px 0 0;
}
.talkContents_controlWrap img {
    display: inline-block;
    vertical-align: middle;
    margin: 0 4px;
}
.talkContents_markLeft,
.talkContents_markRight {
    display: inline-block;
    visibility: hidden;
    vertical-align: middle;
    width: 12px;
    height: 10px;
    font: 10pt "ＭＳ ゴシック";
}
/* ====================
BREKEKE
==================== */
.mainContents_btnCall a.disabled {
    filter: grayscale(100%);
    background: #36b1f0;
    cursor: default;
}
.mainContents_btnCall p.disabled {
    filter: grayscale(100%);
    color: #36b1f0;
}
.mainContents {
    padding-top: 29px;
    padding-bottom: 29px;
}
.information {
    padding-top: 5px;
    padding-bottom: 0px;
    height: 75px;
    overflow: hidden;
}
.toolOverlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.5);
}
.toolOverlay_inner {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 50px;
    border: solid 1px #ececec;
    width: 100px;
    height: 60px;
    line-height: 30px;
    text-align: center;
    background-color: #ffffff;
    box-shadow: 2px 2px 4px 0 rgba(99,114,130,0.18);
}
.toolContents {
    cursor: pointer;
}
.toolContents:hover {
    background: #e5e5e5;
    text-decoration: underline;
}
.talkOverlay_test {
    position: absolute;
    left: 10px;
    top: 60px;
}
.test_micLevel {
    width: 80px;
    height: 13px;
}
</style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1 class="header_logo"><img src="data:image/png;base64,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" alt="TKCシステムまいサポート"></h1>
        <div id="header_btnTool" class="header_btnTool"><a href="#" onclick="tool_click();"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAZFJREFUOI2V079L1VEYBvDP/aEWNUqlFBTcDKSGWkMIzYbiUkJD4NJfkEtDQxEtbQ1Fy4WoBg3BySF1ENuMpKEfY2ZQSYY0lQhh2HDOrdPh/qAHXjjPed/zfM95v89bqNVqWuA2ruEbjuNzs8JiKxUMoIBuHEz2d2FfM6EhPMe5NuIH8ArL8QwoVatV2IMXOISL+ITRKNoVaw9jGw9RQSeO4AGUY9F3rMbiTjxu8syBhP/ErfxpmxjEuzbPqmMLI5jNhQh/5HV24D3u4Ql+JfslfEkLy+hFPzpwPskt4nS8LUzgaVwXMImPkS+V8RI9Da5/NxGBGbzFscj7YsBQEXsbiPwv1ouCe+djbCXJK9iZ8LM4mvBHGI5xoowbSXJK8BGcxBuhL924JPSmjnEs1Ek+InMZr2BMMGcpy9Wwv5HQGdzXHtvJR54Jc/eP0E3siOsPuCP4qI41XEBVcDXBOrtzoevYwApO4SouJ/llTAs9G8GS4Luv/J018ZoV/IjRCjMx/iBv9lomsoJ1oS+LrZR/A4f7UEkfW1W4AAAAAElFTkSuQmCC"></a></div>
        <div id="header_btnClose" class="header_btnClose"><a href="#" onclick="close_click();"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAMBJREFUKJGF0VFKw0AQANDXrYdQWqhSlPYYyac9Ye5R8UfiLcQ2ggiKPUY/3C2bbVLna2D27TAzk6ZpXnCLR+xdjjWe8RZwhyVaPPyDWiywDLHTL2axcH8BXeMbm4Adqgy/FnhVoAofIRZ3qAfwKuY9BFfZz+8RtxmeZqhOCIJ+JJw656jLH5YwxWQkH4XlTGML68ES1YYX1oNDqHM+8+nOwfmdykUkfMA84YAn3OBnAOW4yvA24NPffaoRVOIvdEeFBkC1xf5i7AAAAABJRU5ErkJggg=="></a></div>
    </div>
    <div class="mainContents">
        <div class="mainContents_btnCall">
            <a href="#" onclick="makeCall_click();" class="disabled"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAepJREFUWIW9lzFrFEEYhp+7GNA2EE2nyKVJYyURKxWtFZHYWBvRXyHYWAhWFqKoiBAEsRAbBVFRUCzsLBRUsEgIeIWVOcw9Frsrl+V2Z0bnfOHjYG/m3mdv3u/bO1RGakq9pPbVL+pS7f3sVTdfcauG6oX/AbBNve94TRQCtaPeazCfOATlB8doqJ6fBMD7SIAK4nhOgI46AKaJ1wvgUML6VnWBzcQ9P3KZVwCrCesHwOXcAO8SzE8Br3MDPE4wf5TTHAB1Rt0IpP9M7varqgv0gZUAZ0qXJKmjAiwCb1rWfQYWgI3cAN3y9S3wvGXdXuBibnNgy9NwsZx0bVPwaO4M1C/cDoRxXe1NEmBGXQ1AfFLncgF0ayfSB84FTq0HPAN25c7AaF0NfAuqH9X5wB0eU5+qr2x4ijZtnFZfRkB8tzmYp9VfI2uH6tlYANRZi/MOaVO9ou4Y2btUM2+ECIWkZziUlb6py6XBOPOxEDFJXVDXIiFiNSxh/4zikOaBJ8CeLMkv8w+cjAUAmAMeAgcyQnytz4E2rQGHgesZAbanAAD8BJYpfpysZwC48S9jdFa9adGGf6M76lSOeb7fYtql6K7Ff9GoNoytg+oDdRBz59W+lC6I1U7gBHAE2AfsLq9/AK4BtyhaEIDfaf62IYZaRRsAAAAASUVORK5CYII=" class="cmn-btnInnerIcon"></a>
            <p class="disabled">発信</p>
        </div>
    </div>
    <div id="information" class="information">
<%= serviceMessage.Message.replace("\n", "<br />") %>
    </div>
</div><!-- /.container -->

<div id="talkOverlay" style="display: none;" class="talkOverlay">
    <div class="talkOverlay_inner">
        <div class="talkContents_btnCut"><a href="#" onclick="hangUp_click();"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAQCAYAAABk1z2tAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAXZJREFUSInN1btrVFEUxeHvjk9Qg6bQwBTaiBhIxMLCgGhjJWLpvyLYWlnb2IudYCsIamFA1MqooJggipjO+ECGYVwWdwZkmOvcO+MjP9jNYZ2z1znss3eRxBTswEHMYnc/WviMr1jHe3QnTbC1gXYGZ3AKxzGPORRj9vXwAc/wFI9xT3mBsRRjXnA/LuI8TmN7nUNr0MED3MJNvzObZFQsJLmRpJO/z5ck15McHuVleGFvX9z7B8aG6Sa5lmSmyuBikjf/wdgwr5LMp+9rUINH8RD7/lCNTcs6lrA6MHhf+Qkm4Tve4pOy2HdhTz8OYOeE597F2SJJW9mr6vIRt3EHK1jFjwptoeyTx3AOF5SdoQ7BXJHkJJYbGGwr+9okHMJaA/1iS/Xtq/jWUP8rTXNpKWto09JSjrBNy2CwN6E3Rb6NhvpuCy/xruaGZTWHfAUbeFJTu4bXgz54BFewgG0jxB08wmWT/+ABbVzFCWyp0LzAJTz/Ca4LEy/SOE7aAAAAAElFTkSuQmCC" class="cmn-btnInnerIcon"></a><p>切断</p></div>
        <div class="talkContents_btnPause"><a href="#" onclick="hold_click();"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAYAAAC9BQwsAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAFNJREFUOI3tlDEKwDAMA5U+Llv/Dx27pNBHXBcXKkjcD1ggkOFutYAduIERW4sapxhvrkQ0rgHI0zSPcdsC+k2JJZaYieNznwnrHNCBI9qTD2DcA/PylyTivhdTAAAAAElFTkSuQmCC" class="cmn-btnInnerIcon"></a><p id="labelHold">　保留　</p></div>
        <div id="talkContents_controlWrap" class="talkContents_controlWrap">
            <span id="talkContents_markLeft" class="talkContents_markLeft">＊</span>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAYAAAAvf+5AAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAJBJREFUKJHV0TEOAVEUheHPmBUodBqdckLNCqzAAugsQK96K7AAC7AChSWIzgImCr2GwiMSZua1TnKSm5s/557ktkIIEjTJGoAedthXgW0sccIU8h9QgQ1Gn8sc/ThnWMSkr4Ac54ae75Qk/QvYie5ijVsVeI2+YIUhDimnjxhjHgNqO9493zjAtg58qcQMxQNuEhRC/hOlyAAAAABJRU5ErkJggg==">
            <div id="volconarea" style="display: inline-block; vertical-align: middle; margin: 0 12px; width: 216px; height: 16px; text-align: left; cursor: pointer; box-shadow: 0px 0px 0px 6px #ffffff inset; background-color: #1092d4; background-repeat: no-repeat; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAAAQCAYAAAB0m7E0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABLSURBVGhD7dMxAcAwDMCwdPjDuX1GwZ/0GIHP7t4BEt9fIGAwCBkMQgaDkMEgZDAIGQxCBoOQwSBkMAgZDEIGg5DBIGQwCBkMMjMPJIoCw9hptMYAAAAASUVORK5CYII=');">
                <span id="volcon" draggable="true" style="display: inline-block; width: 16px; height: 16px; background-color: #1092d4; border-radius: 50%; cursor: col-resize;"></span>
            </div>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAaNJREFUOI2l1F9ozWEYB/DPfu0CbSWtmWUp7WLjhrgYobjYDXGnNqSUpiEpzdr9JpwkksUNNxO5kG01tRu1RS4UVv6EGzTS/lwtrXFcvO/JOp3f2en41lPPn97v+z7P+zxPRSaT8Z8Yw2ucRBaSEg/uKhK7ixM4l3MsRboOg3ia51+NB1iL27iGXjQXI63EWUxgX4H4ArbFC5ejG19xKY10M57hCqryYgk6I+kBbMQZ/MIF7EVjgvVRGpHBC2xNyWAl+nAHL9GPrvjaAczhYCU+pRAUwjSOC/VsxQ2cxh4MYxy7S/39xXiIDziE9/jmX3e8RXM5pFk8R1O0v6A+6t9RUw4p4cP+pOjz5ZBWYLuQKjRgMuq1mCyH9IjQLQNCCdYIHQMb8DHBqii1Qq/NFyGswU3cx6gwmrMYQTV24EmCmSg/0YMtQmsUwowwacfQgqPCkMyhHcswVCj9CexER3zFYvzGLazAI7zB5Wj34DE+p9U0Gw834V5KfBT7hRG9iDphByy5pX7EtDbl+adwWFgiHTiF83hXCmkOr4rE2nAdV3OOv3xrXAhL5eb/AAAAAElFTkSuQmCC">
            <span id="talkContents_markRight" class="talkContents_markRight">＊</span>
        </div>
    </div>
    <div id="talkOverlay_test" style="display: none;" class="talkOverlay_test">
        テスト通話中<br />
        &#x1f3a4;<progress id="test_micLevel" class="test_micLevel" max="64"></progress>
    </div>
</div><!-- /.talkOverlay -->

<div id="toolOverlay" style="display: none;" class="toolOverlay">
    <div class="toolOverlay_inner">
        <div onclick="test_click();" class="toolContents">通話テスト</div>
        <div onclick="toolCancel_click();" class="toolContents">キャンセル</div>
    </div>
</div>

<audio id="media" autoplay></audio>
<audio id="holdMusic" src="../resources/sounds/hold.wav" loop></audio>
<script type="text/javascript">
// intercept console.log, error, ...
var errorReporter = {};
(function() {
    var orgFuncs = {};
    ['log', 'error', 'warn', 'info', 'debug'].forEach(function(fn) {
        orgFuncs[fn] = console[fn];
        console[fn] = function() {
            if (errorReporter.consoleProc) {
                errorReporter.consoleProc(fn, arguments);
            }
            orgFuncs[fn].apply(console, arguments);
        };
    });
})();
// output jssip log at first access
if (typeof localStorage !== 'undefined') {
    localStorage.setItem('debug', '*');
}
</script>
<script type="text/javascript" src="../../../jssip/jssip-0.7.11-1.js?<%= ProductInfo.VERSION %>"></script>
<script type="text/javascript" src="../../../brekeke/webrtcclient/webrtcclient-1.0.0.13.js?<%= ProductInfo.VERSION %>"></script>
<%= beforeLoadTurnScript %>
<script type="text/javascript" src="<%= turnScriptSrc %>"></script>
<%= afterLoadTurnScript %>
<script type="text/javascript">
window.onload = window_onload;
var dragImage;
var dragImageWidth = 8;
var dragImageHeight = 32;
var volconWidth = 16;
var volconHeight = 16;
var volume = 50;
var changeNextServiceTimer = null;
var from = false;
var makeCallEnabled = false;
var audioContext = window.AudioContext ? new window.AudioContext() : {};
var analyser = null;
var analyserTimer = null;
var phone = new Brekeke.WebrtcClient.Phone({
    logLevel: "debug",
    audioContext: audioContext,
    mediaStreamConverter: phone_mediaStreamConverter
});
var isTestCall = false;
var targetHeaders = <%= targetHeaders %>.split(','); // 1: turnEnabled, 2: usingTurn 4: isTestCall
var doMakeCallTime = 0;
var startWebRTCTime = 0;
var START_WEBRTC_TIMEOUT = 10000;
var amMakeCallArg = {
    outLevelDef: 50,
    inLevelDef: 50
};
var sipurl = '';
var turnEnabled = false;
var turnApiKey = <%= turnApiKey %>;
var turnInitTimeout = <%= turnInitTimeout %>;
var iceCheckTimer = null;
var iceCheckInterval = <%= iceCheckInterval %>;
var iceCheckStartTime = null;
var iceCheckSessionId = null;
var iceTimeout = <%= iceTimeout %>;
var iceOkDtmf = <%= iceOkDtmf %>.split(','); // 1: turnEnabled, 2: usingTurn 4: isTestCall
var iceNgSessionId = null;
var usingTurn = false;
var turnPeer = null;
var gatheringTimeout = <%= gatheringTimeout %>;
var logXhr = <%= logXhr %>.split(',');
phone.addEventListener("phoneStatusChanged", phone_phoneStatusChanged);
phone.addEventListener("sessionCreated", phone_sessionCreated);
phone.addEventListener("sessionStatusChanged", phone_sessionStatusChanged);
phone.addEventListener("rtcErrorOccurred", phone_rtcErrorOccurred);
// gui event
function window_onload() {
    from = getQueryParameters()['from'] || 'anonymous';
    enableMakeCall(<%= serviceMessage.Service || ChatServer.CIM_C_ALWAYS_ACTIVE %>);
    
    var ver = getQueryParameters()['ver'];
    if (ver && ver >= '1.4') {
        if (getQueryParameters()['udponly'] !== 'true') {
            turnEnabled = true;
        }
        sipurl = getQueryParameters()['sipurl'] || 'wss://tkc1.eng-partner.com:443';
        if (sipurl.indexOf('http') === 0) {
            sipurl = 'ws' + sipurl.substr('http'.length);
        }
    } else if (ver && ver >= '1.2') {
    } else {
        document.getElementById('header_btnTool').style.right = '54px';
        document.getElementById('header_btnClose').style.display = 'block';
    }
    
    dragImage = new Image();
    dragImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAgCAYAAAAv8DnQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAtSURBVDhPY3ifq/0fhoGAAYSRxcAC6BLIYqMKRhUgi40qGEoKYILIEggx7f8AOo7bp4NVQu0AAAAASUVORK5CYII=";
    var volconarea = document.getElementById('volconarea');
    var volcon = document.getElementById('volcon');
    var dropzone = document.getElementById('talkOverlay');
    volconarea.addEventListener("click", volconarea_click);
    volcon.addEventListener("dragstart", volcon_dragstart);
    dropzone.addEventListener("dragover", dropzone_dragover);
    dropzone.addEventListener("drop", dropzone_drop);
    
    changeNextService(<%= escapedNextJson %>);
    setInterval(checkNextServiceTimer_tick, 59000);
    
    ipcSend('asynchronous-message-window-load', '', function(event, arg) {
        console.info('[HTML] argv of process: ' + arg);
    });
}
function makeCall_click() {
    if (!makeCallEnabled) {
        return;
    }
    isTestCall = false;
    doMakeCall();
}
function doMakeCall() {
    var phoneStatus = phone.getPhoneStatus();
    if (phoneStatus !== 'stopped') {
        console.warn('[HTML] phoneStatus: ' + phoneStatus);
        return;
    }
    if (0 < doMakeCallTime && doMakeCallTime < +new Date() + START_WEBRTC_TIMEOUT) {
        console.warn('[HTML] doMakeCall processing now');
        return;
    }
    doMakeCallTime = +new Date();
    console.info('[HTML] doMakeCall: ' + from + ' ' + isTestCall);
    ipcSend('asynchronous-message-make-call', JSON.stringify(amMakeCallArg), function(event, arg) {
        console.info('[HTML] returned volume: ' + arg);
        if (typeof arg === 'number') {
            volume = Math.min(100, arg % 1000);
        }
        document.getElementById('volcon').style.marginLeft = (volume * 2) + 'px';
        document.getElementById('volconarea').style.backgroundPositionX = (volume * 2) + 'px';
        startWebRTCTime = +new Date();
        try {
            phone.startWebRTC({
                url: sipurl || ('wss://' + location.hostname + ':10081'),
                user: 'webrtc_guest',
                password: 'eio_Q2lr6tpdBQYOTi~u',
                register: false
            });
        } catch(e) {
            console.warn('[HTML] start webrtc error: ' + e);
            ipcSend('asynchronous-message-session-full', 'サーバに接続できないため、ＩＰ電話の発信ができません。\nインターネット接続環境を確認してください。(4382)');
            phone.stopWebRTC();
            errorReporter.flush && errorReporter.flush();
            ipcSend('asynchronous-message-call-end', '');
            startWebRTCTime = 0;
        }
        doMakeCallTime = 0;
        setTimeout(function() {
            if (startWebRTCTime !== 0 && +new Date() - startWebRTCTime >= START_WEBRTC_TIMEOUT) {
                console.warn('[HTML] start webrtc timeout');
                ipcSend('asynchronous-message-session-full', 'サーバに接続できないため、ＩＰ電話の発信ができません。\nインターネット接続環境を確認してください。(4380)');
                phone.stopWebRTC();
                errorReporter.flush && errorReporter.flush();
                ipcSend('asynchronous-message-call-end', '');
            }
        }, START_WEBRTC_TIMEOUT);
        document.getElementById('holdMusic').load();
    });
}
function hangUp_click() {
    var session = phone.getSession();
    if (session) {
        session.rtcSession.terminate();
    } else if (phone.getPhoneStatus() !== 'stopped') {
        console.warn('[HTML] session to hang up not found');
        forcePhoneStop();
    }
}
function hold_click() {
    var session = phone.getSession();
    if (session && session.rtcSession && session.sessionStatus === 'connected') {
        if (document.getElementById('labelHold').innerHTML !== '保留解除') {
            session.rtcSession.hold();
            document.getElementById('holdMusic').play();
            document.getElementById('labelHold').innerHTML = '保留解除';
        } else {
            document.getElementById('holdMusic').pause();
            document.getElementById('holdMusic').currentTime = 0;
            session.rtcSession.unhold();
            document.getElementById('labelHold').innerHTML = '　保留　';
        }
    }
}
function tool_click() {
    document.getElementById('toolOverlay').style.display = '';
}
function test_click() {
    document.getElementById('toolOverlay').style.display = 'none';
    isTestCall = true;
    doMakeCall();
}
function toolCancel_click() {
    document.getElementById('toolOverlay').style.display = 'none';
}
function close_click() {
    console.warn('[HTML] close_click');
    errorReporter.flush && errorReporter.flush();
    window.close();
}
function volconarea_click(e) {
    volume = Math.max(0, Math.min(100, Math.round((e.pageX - this.getBoundingClientRect().left - window.pageXOffset - volconWidth / 2) / 2)));
    document.getElementById('volcon').style.marginLeft = (volume * 2) + 'px';
    document.getElementById('volconarea').style.backgroundPositionX = (volume * 2) + 'px';
    ipcSend('asynchronous-message-change-volume', JSON.stringify({ outLevel: volume }));
}
function volcon_dragstart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.clientX);
    if (e.dataTransfer.setDragImage) {
        e.dataTransfer.setDragImage(dragImage, e.offsetX + (dragImageWidth - volconWidth) / 2, e.offsetY + (dragImageHeight - volconHeight) / 2);
    }
}
function dropzone_dragover(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}
function dropzone_drop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    var initialMouse = parseInt(e.dataTransfer.getData("text/html"));
    volume = Math.max(0, Math.min(100, volume + Math.round((e.clientX - initialMouse) / 2)));
    document.getElementById('volcon').style.marginLeft = (volume * 2) + 'px';
    document.getElementById('volconarea').style.backgroundPositionX = (volume * 2) + 'px';
    ipcSend('asynchronous-message-change-volume', JSON.stringify({ outLevel: volume }));
}
function analyserTimer_tick() {
    if (analyser) {
        var session = phone.getSession();
        if (session && session.sessionStatus === 'connected') {
            var dataArray = new Uint8Array(analyser.fftSize);
            analyser.getByteTimeDomainData(dataArray);
            var sum = 0;
            for (var i = 0; i < dataArray.length; i++) {
                sum += Math.abs(dataArray[i] - 128);
            }
            var val = Math.round(sum / dataArray.length);
            document.getElementById('test_micLevel').value = val;
        }
    }
}
function iceCheckTimer_tick() {
    var session = phone.getSession(iceCheckSessionId);
    if (iceCheckStartTime + iceTimeout < +new Date()) {
        if (session && session.sessionStatus === 'connected' &&
            session.rtcSession && session.rtcSession.connection && session.rtcSession.connection.ourIceConnectionState === 'checking' &&
            turnEnabled && !usingTurn) {
            console.info('[HTML] ice timeout ourIceConnectionState=checking');
            iceNgSessionId = iceCheckSessionId;
            session.rtcSession.terminate();
        }
        clearInterval(iceCheckTimer);
        iceCheckTimer = null;
    } else if (session && session.sessionStatus === 'connected' &&
        session.rtcSession && session.rtcSession.connection &&
        (session.rtcSession.connection.ourIceConnectionState === 'completed' || session.rtcSession.connection.ourIceConnectionState === 'connected')) {
        var tone = iceOkDtmf[(turnEnabled ? 1 : 0) + (usingTurn ? 2 : 0) + (isTestCall ? 4 : 0)];
        if (tone) {
            try {
                phone.sendDTMF(tone, iceCheckSessionId);
            } catch(e) {
                console.warn('[HTML] send dtmf: ' + e);
            }
        }
        clearInterval(iceCheckTimer);
        iceCheckTimer = null;
    }
}
function checkNextServiceTimer_tick() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', location.protocol + '//' + location.host + '/' + location.pathname + '?nextservice');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            changeNextService(xhr.responseText);
        }
    };
    xhr.send();
}
function changeNextService(jsonText) {
    var next = null;
    try {
        next = JSON.parse(jsonText);
    } catch(e) {}
    if (next && typeof next.Residual === 'number') {
        if (!changeNextServiceTimer) {
            console.info('[HTML] service will be ' + next.Service + ' in ' + next.Residual + ' ms');
            changeNextServiceTimer = setTimeout(function() {
                changeNextServiceTimer = null;
                enableMakeCall(next.Service);
                document.getElementById('information').innerHTML = String(next.Message).replace(/\n/g, '<br />');
            }, next.Residual);
        }
    }
}
function enableMakeCall(enabled) {
    makeCallEnabled = enabled;
    funcDisplay = makeCallEnabled ? function(elm) {
        elm.classList.remove("disabled");
    } : function(elm) {
        elm.classList.add("disabled");
    };
    Array.prototype.forEach.call(document.getElementsByClassName('mainContents_btnCall'), function(elm) {
        Array.prototype.forEach.call(elm.getElementsByTagName('a'), funcDisplay);
        Array.prototype.forEach.call(elm.getElementsByTagName('p'), funcDisplay);
    });
    console.info('[HTML] service is ' + enabled);
}
function forcePhoneStop() {
    // destroy turn
    if (turnPeer) {
        console.warn('[HTML] force turnPeer destroy');
        turnPeer.destroy();
        turnPeer = null;
    }
    if (usingTurn) {
        console.warn('[HTML] force usingTurn destroy');
        usingTurn = false;
        document.getElementById('talkContents_markRight').style.visibility = 'hidden';
    }
    // destroy analyser
    if (analyserTimer) {
        console.warn('[HTML] force analyserTimer destroy');
        clearInterval(analyserTimer);
        analyserTimer = null;
    }
    if (analyser) {
        console.warn('[HTML] force analyser destroy');
        analyser.disconnect();
        analyser = null;
    }
    phone.stopWebRTC();
    errorReporter.flush && errorReporter.flush();
    ipcSend('asynchronous-message-call-end', '');
}
// phone event
function phone_phoneStatusChanged(ev) {
    if (ev.phoneStatus === 'started') {
        if (+new Date() - startWebRTCTime < START_WEBRTC_TIMEOUT) {
            if (from) {
                if (isTestCall && !analyser && audioContext.createAnalyser) {
                    // create analyser
                    analyser = audioContext.createAnalyser();
                    analyserTimer = setInterval(analyserTimer_tick, 100);
                }
                phone.makeCall(targetHeaders[(turnEnabled ? 1 : 0) + (usingTurn ? 2 : 0) + (isTestCall ? 4 : 0)] + from, { pcConfig: { gatheringTimeout: gatheringTimeout } });
            } else {
                console.warn('[HTML] empty target');
                phone.stopWebRTC();
                errorReporter.flush && errorReporter.flush();
                ipcSend('asynchronous-message-call-end', '');
            }
        } else {
            console.warn('[HTML] webrtc started after timeout');
            ipcSend('asynchronous-message-session-full', 'サーバに接続できないため、ＩＰ電話の発信ができません。\nインターネット接続環境を確認してください。(4381)');
            phone.stopWebRTC();
            errorReporter.flush && errorReporter.flush();
            ipcSend('asynchronous-message-call-end', '');
        }
        startWebRTCTime = 0;
    } else if (ev.phoneStatus === 'starting') {
        document.getElementById('test_micLevel').value = 0;
        document.getElementById('talkOverlay_test').style.display = isTestCall ? '' : 'none';
        document.getElementById('talkOverlay').style.display = '';
        document.getElementById('labelHold').innerHTML = '　保留　';
    } else if (ev.phoneStatus === 'stopping') {
    } else {
        if (+new Date() - startWebRTCTime < START_WEBRTC_TIMEOUT) {
            console.warn('[HTML] webrtc not started');
        }
        startWebRTCTime = 0;
        document.getElementById('talkOverlay').style.display = 'none';
    }
}
function phone_sessionCreated(ev) {
}
function phone_sessionStatusChanged(ev) {
    document.getElementById('media').src = ev.remoteStreamUrl;
    if (ev.sessionStatus === 'connected') {
        if (iceCheckSessionId !== ev.sessionId) {
            iceCheckSessionId = ev.sessionId;
            iceCheckStartTime = +new Date();
            iceCheckTimer = setInterval(iceCheckTimer_tick.bind(this), iceCheckInterval);
        }
    } else if (ev.sessionStatus === 'terminated') {
        document.getElementById('holdMusic').pause();
        document.getElementById('holdMusic').currentTime = 0;
        document.getElementById('labelHold').innerHTML = '　保留　';
        
        var errcd = null;
        
        if (turnPeer) {
            turnPeer.destroy();
            turnPeer = null;
        }
        if ((iceNgSessionId === ev.sessionId ||
            iceCheckTimer && ev.rtcSession && ev.rtcSession.connection && ev.rtcSession.connection.ourIceConnectionState === 'failed') &&
            turnEnabled && !usingTurn) {
            if (!turnApiKey) {
                console.warn('[HTML] empty turn api key');
                errcd = 5171;
            } else if (typeof Peer === 'undefined') {
                console.warn('[HTML] undefined turn peer class');
                errcd = 5172;
            } else {
                try {
                    turnPeer = new Peer({ key: turnApiKey });
                    console.info('[HTML] turn peer initializing');
                } catch(e) {
                    console.warn('[HTML] turn peer constructor error: ' + e);
                    errcd = 5180;
                }
            }
        }
        
        iceNgSessionId = null;
        clearInterval(iceCheckTimer);
        iceCheckTimer = null;
        
        if (turnPeer) {
            usingTurn = true;
            document.getElementById('talkContents_markRight').style.visibility = 'visible';
            var turnInitTimer = setTimeout(function() {
                console.warn('[HTML] turn peer open timeout');
                turnInitTimer = null;
                if (phone.getPhoneStatus() !== 'stopped') {
                    ipcSend('asynchronous-message-session-full', 'サーバに接続できないため、ＩＰ電話の発信ができません。\nインターネット接続環境を確認してください。(5190)');
                    forcePhoneStop();
                }
            }, turnInitTimeout);
            turnPeer.on('open', function() {
                clearTimeout(turnInitTimer);
                turnInitTimer = null;
                if (phone.getPhoneStatus() !== 'started') {
                    console.warn('[HTML] turn peer opened but phone ' + phone.getPhoneStatus());
                    forcePhoneStop();
                    return;
                }
                if (!turnPeer || typeof turnPeer._pcConfig === 'undefined') {
                    console.warn('[HTML] turn peer connection configuration not defined');
                    ipcSend('asynchronous-message-session-full', 'サーバに接続できないため、ＩＰ電話の発信ができません。\nインターネット接続環境を確認してください。(5160)');
                    forcePhoneStop();
                    return;
                }
                try {
                    turnPeer._pcConfig.gatheringTimeout = gatheringTimeout;
                    console.info('[HTML] redialing with turn peer connection configuration: ' + JSON.stringify(turnPeer._pcConfig));
                } catch(e) {
                    console.warn('[HTML] stringify turn peer connection configuration error: ' + turnPeer._pcConfig);
                }
                phone.makeCall(targetHeaders[(turnEnabled ? 1 : 0) + (usingTurn ? 2 : 0) + (isTestCall ? 4 : 0)] + from, { pcConfig: turnPeer._pcConfig });
            });
            turnPeer.on('error', function() {
                console.warn('[HTML] turn peer error event occurred: ' + JSON.stringify(arguments));
                if (turnInitTimer) {
                    clearTimeout(turnInitTimer);
                    turnInitTimer = null;
                    ipcSend('asynchronous-message-session-full', 'サーバに接続できないため、ＩＰ電話の発信ができません。\nインターネット接続環境を確認してください。(5100)');
                    forcePhoneStop();
                }
            });
            
            return;
        }
        
        if (ev.incomingMessage) {
            if (ev.rtcSession && ev.rtcSession.connection && ev.rtcSession.connection.ourIceConnectionState !== 'completed') {
                console.warn('[HTML] session terminated ourIceConnectionState=' + ev.rtcSession.connection.ourIceConnectionState + ' method=' + ev.incomingMessage.method + ' code=' + ev.incomingMessage.status_code);
                if (ev.rtcSession.connection.ourIceConnectionState === 'failed') {
                    if (usingTurn) {
                        errcd = 5275;
                    } else {
                        errcd = 5075;
                    }
                }
            }
            
            if (ev.incomingMessage.method === 'BYE' && !ev.incomingMessage.status_code) {
                console.info('[HTML] session successfully terminated by uas');
            } else if (ev.incomingMessage.method === 'INVITE' && ev.incomingMessage.status_code === 200) {
                console.info('[HTML] session successfully terminated by uac');
            } else if (ev.incomingMessage.method === 'INVITE' && ev.incomingMessage.status_code === 403) {
                console.warn('[HTML] session full');
                errcd = 5000;
            } else {
                console.warn('[HTML] session terminated method=' + ev.incomingMessage.method + ' code=' + ev.incomingMessage.status_code);
                if (ev.incomingMessage.status_code >= 400) {
                    errcd = 5000 + ev.incomingMessage.status_code;
                }
            }
        } else {
            console.warn('[HTML] session terminated incomingMessage=null');
            errcd = 5033;
        }
        if (errcd === 5000) {
            ipcSend('asynchronous-message-session-full', 'ただいま、電話が混み合っております。\nしばらく時間をおいてからおかけください。(' + errcd + ')');
        } else if (errcd) {
            ipcSend('asynchronous-message-session-full', 'サーバに接続できないため、ＩＰ電話の発信ができません。\nインターネット接続環境を確認してください。(' + errcd + ')');
        }
        
        usingTurn = false;
        document.getElementById('talkContents_markRight').style.visibility = 'hidden';
        
        // destroy analyser
        if (analyserTimer) {
            clearInterval(analyserTimer);
            analyserTimer = null;
        }
        if (analyser) {
            analyser.disconnect();
            analyser = null;
        }
        
        phone.stopWebRTC();
        errorReporter.flush && errorReporter.flush();
        ipcSend('asynchronous-message-call-end', '');
    }
}
function phone_rtcErrorOccurred(ev) {
    console.warn('[HTML] rtcErrorOccurred: sessionId=' + ev.sessionId + ' target=' + ev.target + ' client=' + ev.client + ' from=' + ev.from + (ev.error && ' error.constraintName=' + ev.error.constraintName + ' error.message=' + ev.error.message + ' error.name=' + ev.error.name));
    if (!phone.getSession()) {
        forcePhoneStop();
        ipcSend('asynchronous-message-session-full', 'マイクを接続してください。(4125)');
    }
}
function phone_mediaStreamConverter(node, sessionId) {
    if (analyser) {
        return node.connect(analyser);
    } else {
        return node;
    }
}
// utilities
errorReporter = (function() {
    var queue = [];
    var output = function() {
        if (queue.length === 0) {
            return;
        }
        var data = queue.join('');
        queue.length = 0;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', location.protocol + '//' + location.host + '/' + location.pathname.split('/')[1] + '/lds');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('pw=' + encodeURIComponent('<%= com.brekeke.chat.servlet.LogDumpServlet.getPw(0) %>') + '&data=' + encodeURIComponent(encodeURIComponent(data)));
    }
    var timer = null;
    return {
        consoleProc: function(fn, args) {
            try {
                var msgIpc = fn[0] + '{';
                if (args && args.length) {
                    for (var i = 0; i < args.length; i++) {
                        if (i !== 0) {
                            msgIpc += ',';
                        }
                        msgIpc += '"' + i + '":';
                        var a = JSON.stringify(args[i]);
                        if (a === '{}' && typeof args[i].toString === 'function') {
                            msgIpc += '"' + args[i].toString() + '"';
                        } else {
                            msgIpc += a;
                        }
                    }
                }
                msgIpc += '}';
                if (getQueryParameters()['debug'] === 'true') {
                    ipcSend('asynchronous-message-console', msgIpc);
                }
                if (logXhr && logXhr.indexOf && logXhr.indexOf(fn) !== -1) {
                    var msgXhr = args && args[1] ? msgIpc : args[0];
                    var now = new Date();
                    queue.push('\r\n(' + ('0' + now.getHours()).slice(-2) + ('0' + now.getMinutes()).slice(-2) + ('0' + now.getSeconds()).slice(-2) + '.' + ('00' + now.getMilliseconds()).slice(-3) + ') ' + msgXhr);
                    if (!timer) {
                        timer = setInterval(output, 1000);
                    }
                }
            } catch(e) {
            }
        },
        flush: function() {
            output();
            clearInterval(timer);
            timer = null;
        }
    };
})();
var ipcSend = (function() {
    var electron = typeof require !== 'undefined' && require('electron');
    var ipc = electron && electron.ipcRenderer;
    return ipc && function(p1, p2, onReply) {
        if (typeof onReply === 'function') {
            ipc.once('async-reply-' + p1, onReply);
        }
        ipc.send(p1, p2);
    } || function(p1, p2, onReply) {
        if (onReply) {
            onReply();
        }
    };
})();
var getQueryParameters = (function() {
    var result = {};
    var queryString = window.location.search;
    if (queryString) {
        var index = queryString.indexOf("?");
        if (index >= 0) {
            queryString = queryString.substr(index + 1);
        }
        var parameters = queryString.split("&");
        for (var i = 0; i < parameters.length; i++) {
            var kv = parameters[i].split("=");
            if (kv.length === 2) {
                var key = decodeURIComponent(kv[0]);
                var value = decodeURIComponent(kv[1]);
                result[key] = value;
            }
        }
    }
    return function() {
        return result;
    };
})();
if (typeof JsSIP !== 'undefined' && JsSIP.debug && JsSIP.debug.useColors) {
    JsSIP.debug.useColors = function() {
        return false;
    };
}
</script>
</body>
</html>
<% }} %>
