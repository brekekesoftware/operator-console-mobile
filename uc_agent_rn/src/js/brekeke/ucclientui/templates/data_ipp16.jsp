<%@ page language="java" pageEncoding="UTF-8"%><%@ page import="com.brekeke.chat.*" %><%@ page contentType="application/json;charset=UTF-8" %><%
String ret = null;
String reqHost = request.getHeader("Host");
String reqUserAgent = request.getHeader("User-Agent");
String allowedUserAgent = ChatServer.UC_C_OPTION_A30 != null && !"".equals(ChatServer.UC_C_OPTION_A30) ? ChatServer.UC_C_OPTION_A30 : "ipphone";
if (LicStatus.instance.lc.getOptionCode().indexOf('t') < 0 && !(reqHost != null && reqHost.startsWith("webrtc.brekeke.jp"))) {
    ret = "server error (1701LIC)";
} else if (reqUserAgent == null || reqUserAgent.indexOf(allowedUserAgent) == -1) {
    ret = "client error (1601BRO)";
}
if (ret == null) {
    ChatMethod.TkcServiceMessage serviceMessage = ChatMethod.getTkcServiceHours();
    if (request.getParameter("nextservice") != null) {
        ret = serviceMessage.NextJson != null ? serviceMessage.NextJson : "";
    } else {
        org.json.simple.JSONObject data = new org.json.simple.JSONObject();
        data.put("optional_script", "data.window_options.title=data.window_options.title&&decodeURIComponent(data.window_options.title);");
        data.put("pattern_from", "^\\d{0,12}$");
        data.put("url", "?from=<from>&debug=<debug>&ver=<ver>&udponly=<Boolean(argobj.udponly)>&sipurl=<argobj.sipurl||''>&branchNumber=<branchNumber||''>&register=<Boolean(argobj.register)>&startupRegister=<argobj.startupRegister||''>&registeredTime=<registeredTime||''>&chkRegInt=<argobj.chkRegInt||''>&socketKeepAlive=<argobj.socketKeepAlive||''>&outgoingRoute=<outgoingRoute||''>&ringingMode=<ringingMode||''>&ringingBeep=<ringingBeep||''>&cachebust=<Math.floor(new Date()/60000)>");
        data.put("urlfilelocal", true);
        data.put("server_version", "20191105");
        data.put("window_class", "Chrome_WidgetWin_1");
        org.json.simple.JSONObject window_options = new org.json.simple.JSONObject();
        window_options.put("title", "%E3%81%8A%E6%B0%97%E8%BB%BD%E3%81%AB%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84");
        window_options.put("height", 360);
        data.put("window_options", window_options);
        org.json.simple.JSONObject loadurlopt = new org.json.simple.JSONObject();
        loadurlopt.put("userAgent", "Mozilla/5.0 (<os.type()> <os.release()>) <app.getName()>/<ver> Chrome/58.0.3029.110");
        data.put("loadurlopt", loadurlopt);
        org.json.simple.JSONObject dyncnf = new org.json.simple.JSONObject();
        dyncnf.put("serviceMessageMessage2", serviceMessage.Message2.replace("\n", "<br />"));
        dyncnf.put("serviceMessageMessage", serviceMessage.Message.replace("\n", "<br />"));
        dyncnf.put("ProductInfoVERSION", ProductInfo.VERSION);
        dyncnf.put("beforeLoadTurnScript", ChatServer.UC_C_OPTION_A31 != null && !"".equals(ChatServer.UC_C_OPTION_A31) ? ChatServer.UC_C_OPTION_A31 : "<script>var windowProcessTypeOrg = window.process && window.process.type; if (windowProcessTypeOrg) { window.process.type = 'dummy'; } window.globalThis = window;</script>");
        dyncnf.put("turnScriptSrc", ChatServer.UC_C_OPTION_A24 != null && !"".equals(ChatServer.UC_C_OPTION_A24) ? ChatServer.UC_C_OPTION_A24.replace("&", "&amp;").replace("\"", "&quot;").replace("<", "&lt;").replace(">", "&gt;").replace("'", "&#39;") : "https://cdn.webrtc.ecl.ntt.com/skyway-latest.js");
        dyncnf.put("afterLoadTurnScript", ChatServer.UC_C_OPTION_A32 != null && !"".equals(ChatServer.UC_C_OPTION_A32) ? ChatServer.UC_C_OPTION_A32 : "<script>if (typeof windowProcessTypeOrg !== 'undefined') { window.process.type = windowProcessTypeOrg; }</script>");
        dyncnf.put("targetHeaders", ChatServer.UC_C_OPTION_A29 != null && !"".equals(ChatServer.UC_C_OPTION_A29) ? "'" + ChatServer.UC_C_OPTION_A29.replace("\\", "\\\\").replace("'", "\\'") + "'" : "',ice,tcp,tcp,ivr,ivr,ivr,ivr'");
        dyncnf.put("chkRegInt", ChatServer.UC_C_OPTION_A20 != null && !"".equals(ChatServer.UC_C_OPTION_A20) ? String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A20)) : "60");
        dyncnf.put("socketKeepAlive", ChatServer.UC_C_OPTION_A19 != null && !"".equals(ChatServer.UC_C_OPTION_A19) ? String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A19)) : "600");
        if (ChatServer.UC_C_OPTION_A33 != null && !"".equals(ChatServer.UC_C_OPTION_A33)) { dyncnf.put("volDetectInterval", String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A33))); }
        if (ChatServer.UC_C_OPTION_A34 != null && !"".equals(ChatServer.UC_C_OPTION_A34)) { dyncnf.put("volDetectTimerInterval", String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A34))); }
        if (ChatServer.UC_C_OPTION_A35 != null && !"".equals(ChatServer.UC_C_OPTION_A35)) { dyncnf.put("volDetectExpires", String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A35))); }
        if (ChatServer.UC_C_OPTION_A36 != null && !"".equals(ChatServer.UC_C_OPTION_A36)) { dyncnf.put("clickabilityDelay1", String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A36))); }
        if (ChatServer.UC_C_OPTION_A37 != null && !"".equals(ChatServer.UC_C_OPTION_A37)) { dyncnf.put("clickabilityDelay2", String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A37))); }
        if (ChatServer.UC_C_OPTION_A38 != null && !"".equals(ChatServer.UC_C_OPTION_A38)) { dyncnf.put("historyCapacity", String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A38))); }
        if (ChatServer.UC_C_OPTION_A39 != null && !"".equals(ChatServer.UC_C_OPTION_A39)) { dyncnf.put("volumeAuto", String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A39))); }
        if (ChatServer.UC_C_OPTION_A40 != null && !"".equals(ChatServer.UC_C_OPTION_A40)) { dyncnf.put("uc_c_option_a40", ChatServer.UC_C_OPTION_A40); }
        if (ChatServer.UC_C_OPTION_A41 != null && !"".equals(ChatServer.UC_C_OPTION_A41)) { dyncnf.put("uc_c_option_a41", ChatServer.UC_C_OPTION_A41); }
        if (ChatServer.UC_C_OPTION_A42 != null && !"".equals(ChatServer.UC_C_OPTION_A42)) { dyncnf.put("uc_c_option_a42", ChatServer.UC_C_OPTION_A42); }
        if (ChatServer.UC_C_OPTION_A43 != null && !"".equals(ChatServer.UC_C_OPTION_A43)) { dyncnf.put("uc_c_option_a43", ChatServer.UC_C_OPTION_A43); }
        if (ChatServer.UC_C_OPTION_A44 != null && !"".equals(ChatServer.UC_C_OPTION_A44)) { dyncnf.put("uc_c_option_a44", ChatServer.UC_C_OPTION_A44); }
        if (ChatServer.UC_C_OPTION_A45 != null && !"".equals(ChatServer.UC_C_OPTION_A45)) { dyncnf.put("uc_c_option_a45", ChatServer.UC_C_OPTION_A45); }
        if (ChatServer.UC_C_OPTION_A46 != null && !"".equals(ChatServer.UC_C_OPTION_A46)) { dyncnf.put("uc_c_option_a46", ChatServer.UC_C_OPTION_A46); }
        if (ChatServer.UC_C_OPTION_A47 != null && !"".equals(ChatServer.UC_C_OPTION_A47)) { dyncnf.put("uc_c_option_a47", ChatServer.UC_C_OPTION_A47); }
        if (ChatServer.UC_C_OPTION_A48 != null && !"".equals(ChatServer.UC_C_OPTION_A48)) { dyncnf.put("uc_c_option_a48", ChatServer.UC_C_OPTION_A48); }
        if (ChatServer.UC_C_OPTION_A49 != null && !"".equals(ChatServer.UC_C_OPTION_A49)) { dyncnf.put("uc_c_option_a49", ChatServer.UC_C_OPTION_A49); }
        dyncnf.put("turnApiKey", ChatServer.UC_C_OPTION_A23 != null && !"".equals(ChatServer.UC_C_OPTION_A23) ? "'" + ChatServer.UC_C_OPTION_A23.replace("\\", "\\\\").replace("'", "\\'") + "'" : "''");
        dyncnf.put("turnInitTimeout", ChatServer.UC_C_OPTION_A25 != null && !"".equals(ChatServer.UC_C_OPTION_A25) ? String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A25)) : "10000");
        dyncnf.put("iceCheckInterval", ChatServer.UC_C_OPTION_A26 != null && !"".equals(ChatServer.UC_C_OPTION_A26) ? String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A26)) : "50");
        dyncnf.put("iceTimeout", ChatServer.UC_C_OPTION_A27 != null && !"".equals(ChatServer.UC_C_OPTION_A27) ? String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A27)) : "500");
        dyncnf.put("iceOkDtmf", ChatServer.UC_C_OPTION_A28 != null && !"".equals(ChatServer.UC_C_OPTION_A28) ? "'" + ChatServer.UC_C_OPTION_A28.replace("\\", "\\\\").replace("'", "\\'") + "'" : "',1'");
        dyncnf.put("gatheringTimeout", ChatServer.UC_C_OPTION_A21 != null && !"".equals(ChatServer.UC_C_OPTION_A21) ? String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A21)) : "500");
        dyncnf.put("logXhr", ChatServer.UC_C_OPTION_A22 != null && !"".equals(ChatServer.UC_C_OPTION_A22) ? "'" + ChatServer.UC_C_OPTION_A22.replace("\\", "\\\\").replace("'", "\\'") + "'" : "'error,warn,info'");
        dyncnf.put("branchNumberDigitCount", ChatServer.UC_C_OPTION_A18 != null && !"".equals(ChatServer.UC_C_OPTION_A18) ? String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A18)) : "4");
        dyncnf.put("serviceMessageService", serviceMessage.Service || ChatServer.CIM_C_ALWAYS_ACTIVE);
        dyncnf.put("ringingConfigType", ChatServer.UC_C_OPTION_A17 != null && !"".equals(ChatServer.UC_C_OPTION_A17) ? String.valueOf(Integer.parseInt(ChatServer.UC_C_OPTION_A17)) : "0");
        dyncnf.put("escapedNextJson", serviceMessage.NextJson != null ? "'" + serviceMessage.NextJson.replace("\\", "\\\\").replace("'", "\\'") + "'" : "''");
        dyncnf.put("guestPass", "ZWlvX1EybHI2dHBkQlFZT1RpfnU");
        dyncnf.put("LogDumpServletPw", com.brekeke.chat.servlet.LogDumpServlet.getPw(0));
        data.put("dyncnf", dyncnf);
        ret = data.toJSONString();
    }
}
%><%= ret %>