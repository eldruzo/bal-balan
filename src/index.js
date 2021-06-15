import $ from "jquery";
window.jQuery = window.$ = $;
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.js";
import "./css/web.css";
import {getLeague, getTeam, getTeamDetail, getTeamFavorite, getFavoriteDetail} from "./scripts/api.js";
import {requestPermission, registerServiceWorker} from "./scripts/push.js";

const loadNav = () => {
    const elems = $("body").find(".sidenav");
    M.Sidenav.init(elems);

    $(".sidenav").load("./pages/sidenav.html");
    $.get("./pages/nav.html", (res) => {
        $(".topnav, .sidenav").append(res);
        $(".sidenav a, .topnav a").click(function() {
            const sidenav = $(".sidenav");
            M.Sidenav.getInstance(sidenav).close();
            const page = $(this).attr("href").substr(1);
            window.location = `?page=${page}`; 
        });
    })
}

const loadPage = () => {
    let url = new URLSearchParams(window.location.search);
    let page = url.get("page");

    if(page===null || page==="") {
        page = "home";
    }
    $.get("./pages/"+page+".html", (res) => {
        $(content).html(res);
        if (page==="league") {
            $(".league").click(function() {
                const id = $(this).attr("id");
                window.location = "?page=league-detail&id="+id;
            });
        } else if(page==="team") {
            $("#search-button").click(() => {
                $("#loading").show();
                let searchResult = $("#team-search").val();
                getTeam(searchResult);
            })
        }

        if(page==="team-detail" || page==="league-detail" || page==="favorite") {
            $("#loading").show();
            if(page==="team-detail") {
                let idteam = url.get("id");
                let saved = url.get("saved");
                if(saved==="true") getFavoriteDetail(parseInt(idteam))
                else getTeamDetail(idteam);
            } else if(page==="league-detail") {
                let idliga = url.get("id");
                getLeague(idliga);
            } else if(page==="favorite") {
                getTeamFavorite();
            }
        }
    })  
        .fail((err) => {
            if(err.status===404) {
                $(content).html("<p>Halaman tidak ditemukan.</p>");
            } else {
                $(content).html("<p>Ups.. halaman tidak dapat diakses.</p>");
            }
        })
}

const RegisterWeb = () => {
    if(!('serviceWorker') in navigator) {
        console.log("Service worker tidak didukung browser ini.");
    } else {
        registerServiceWorker();
        requestPermission();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    $("#loading").hide();
    loadNav();
    loadPage();
    RegisterWeb();
});