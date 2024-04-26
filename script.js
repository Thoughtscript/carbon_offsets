"use strict";

window.onload = function () {
    var el = function (elem) {
        return document.getElementById(elem);
    }

    var DATA = JSON.parse(el("carbon-offset-data").innerHTML);
    DATA.sort(function(a, b) {
        var B = b[2];
        var A = a[2];
        if (B > A) return 1;
        return -1;
    })
    var FIRST = DATA[0][0]
    if (FIRST !== "No Certificate Available") el("IFRAME_CARBON_OFFSET").src = `./carbon_offsets/${FIRST}.pdf`;

    var TOTAL_TONS = 0

    var UL = el("carbon-offset-ul-list");

    for (var i = 0; i < DATA.length; i++) {
        var LI = document.createElement("li");
        var S = document.createElement("div");

        TOTAL_TONS += parseFloat(DATA[i][1]);

        var UUID = DATA[i][0];
        S.innerText = UUID;

        var A = document.createElement("a");
        A.innerText = 'Download';

        if (UUID !== "No Certificate Available") {
            S.id = UUID + "-btn";
            A.href = "./carbon_offsets/" + UUID + ".pdf";
            A.rel = "nofollow noopener noreferrer";

            LI.append(S);
            LI.append(A);
            UL.append(LI);

            var BTN = el(`${UUID}-btn`)

            BTN.addEventListener("click", function (e) {
                var ID = e.target.innerText;
                el("IFRAME_CARBON_OFFSET").src = `./carbon_offsets/${ID}.pdf`;
            })
        } else {
            S.className = "no-cert";
            A.className = "no-cert";

            LI.append(S);
            LI.append(A);
            UL.append(LI);
        }
    }

    el("my-total").innerText = ` ${TOTAL_TONS.toPrecision(5)}`;
}