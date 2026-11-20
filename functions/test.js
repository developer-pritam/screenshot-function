var dislistary = ["Start Delayed Due To Bad Light", "Start Delayed Due To Rain", "Inturruped Due To Rain", "Abandoned Due To Rain", "Drwn Due To Rain", "Innings Break", "Lunch Break", "Inturruped Due To Bad Light", "Inturruped Due To Bad Weather", "Drinks Break"];
var dislist = {
    "Start Delayed Due To Bad Light": "1",
    "Start Delayed Due To Rain": "2",
    "Inturruped Due To Bad Light": "3",
    "Inturruped Due To Bad Weather": "4",
    "Inturruped Due To Rain": "5",
    "Abandoned Due To Rain": "6",
    "Drwn Due To Rain": "7",
    "Lunch Break": "8",
    "Drinks Break": "9",
    "Innings Break": "10"
};
var outslist = {
    "0": "This Ball",
    "1": "Caught",
    "2": "LBW",
    "3": "Bowled",
    "4": "Runout",
    "5": "Runout",
    "6": "Runout",
    "7": "Runout",
    "8": "Stumped",
    "9": "Hit wicket"
};
$(document).ready(function () {
    $(".whole").mouseover(function () {
        $(".addthis").show()
    }), $(".whole").mouseout(function () {
        $(".addthis").hide()
    }), $("#Set_but").click(function () {
        $("#CF_thm_Cnt").html('<img onclick="setSel(this.id)" class="THm_Thumb" src="/cricket/widget/images/gray-45.PNG" id="1" width="90px" style="cursor:pointer;"/> <img onclick="setSel(this.id)" class="THm_Thumb" src="/cricket/widget/images/colour.PNG" id="' + co + '" width="80px" style="cursor:pointer;margin-left: 2px;" />'), $("#CF_Fwindow").show("slow"), setSel($("#model").val())
    }), $("#Cls_but").click(function () {
        $("#CF_Fwindow").hide("slow")
    }), $("#PRV_But").click(function () {
        saID = $("#model").val(), myRef = window.open("http://" + document.domain + "/cricket/widgets/!/Z_W/!/1/2/All/All/All/" + saID + "/w", "mywin", "channelmode=0,left=20,top=20,width=320,height=280,toolbar=0,resizable=0,location=0,scrollbars=1")
    });
    var first = true;
    var timeInterval = 240000;
    var sasas;
    if ((tempsss == "live1" && liveLen > 0)) {
        timeInterval = 120000;
        setInterval(fileload(), 80000);
    } else {
        timeInterval = 360000;
    }
    setTimeout(Adload, 11000)
    adtimer = setInterval(Adload, 3000000);
    $("#Cls_but3").click(function () {
        $(".CF_Fwindow3").hide("slow");
        clearInterval(adtimer);
    });
});

function activateAjax() {
    console.log("activate Ajax call");
    if (tempsss == "live1" && liveLen > 0) {
        fileload();
    }
}

function checkLive() {
    console.log("checking again")
    connectedRef = myDataRef.child(".info/connected");
    connectedRef.once("value", function (snap) {
        if (snap.val() === true) { } else {
            console.log("go Online")
            Firebase.goOnline();
        }
        cricketRef = myDataRef.child("cricwaves")
        cricketRef.once("value", function (snapshot) {
            if (snapshot.child("feed").exists()) {
                setTimeout(checkLive, 5 * 60000)
            } else {
                Firebase.goOffline();
                console.log("going offlinne")
                setTimeout(checkLive, 5 * 60000)
            }
        }, function (errorObject) {
            activateAjax()
        })
    }, function (errorObject) {
        activateAjax()
    });
}

function UpdateHtml(matchdata) {
    data = matchdata;
    dhtml = '';
    mid = $("#Act_tab").val();
    if (!data.LivCal_D) {
        return;
    }
    if (tempsss != "live" || mid != data.mid) {
        return;
    }
    $.each(data.LivCal_D, function (indx, live) {
        dhtml = '<div> <div class="overs"><b>' + live.MATCHDATA.team_name0 + ' ' + live.MATCHDATA.team_score0 + '/' + live.MATCHDATA.team_wickets0 + ' (' + live.MATCHDATA.team_overs0 + ' Ov)</b></div> <div  class="overs2"> ' + live.MATCHDATA.team_name1 + ' ' + live.MATCHDATA.team_score1 + '/' + live.MATCHDATA.team_wickets1 + ' (' + live.MATCHDATA.team_overs1 + ' Ov)</div></div> <span class="smaillnames" style="line-height:20px;">' + live.MATCHDATA.match_dis + ' </span>';
    });
    if (dhtml != "") {
        $("#Dydata_" + data.mid).html(dhtml);
    }
    if (data.sskey != "") {
        $("#Refreshs_" + data.mid).val(data.sskey);
    }
}

function fileload() {
    if (pollstatus == 0) {
        return;
    }
    sskey = $("#Refreshs_" + $("#Act_tab").val()).attr("value");
    $.ajax({
        type: "GET",
        url: "/cricket/widgets/match/" + $("#Act_tab").val() + "/" + afval + "/Z_W?sskey=" + sskey,
        dataType: "json",
        timeout: 5000,
        beforeSend: function () { },
        complete: function () { },
        success: function (data) {
            if (data.value.indexOf("!__:-(__!") != -1) { } else {
                $("#Dydata_" + $("#Act_tab").val()).html(data.value);
                $("#Refreshs_" + $("#Act_tab").val()).attr("value", data.sskey);
            }
        }
    });
}

function buzz(e) {
    $("div[name='Cf_s_tabs']").each(function (e) {
        $(this).removeClass("ACTIVE")
    }), $("div[name='Cf_s_t']").each(function (e) {
        $(this).removeClass("Act")
    }), $("#Act_tab").val(e.substr(4)), $("#" + e).addClass("ACTIVE"), $("#" + e + "s").addClass("Act")
}

function changeUrl(e) {
    window.location.replace(e)
}

function slugifyTxt(e) {
    return e.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
}

function setSel(e) {
    $("img.THm_Thumb").each(function (e) {
        $(this).removeClass("Actv_thm")
    }), $("#" + e).addClass("Actv_thm"), saID = e, SETcode(), $("#model").val(e)
}

function Adload() {
    $(".CF_Fwindow3,.da_timer").show('slow');
    $(".da_timer").html(10).show()
    var x = setInterval(function () {
        distance = parseInt($(".da_timer").html()) - 1
        $(".da_timer").html(distance)
        if (distance < 1) {
            clearInterval(x);
            $(".da_timer").hide()
            $("#Cls_but3").show()
            setTimeout("hideAd();", 5000);
        }
    }, 1000);
}

function hideAd() {
    $(".CF_Fwindow3").hide('slow');
}