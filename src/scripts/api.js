import {dbPromised, addData, getDataAll, removeData, getDataById} from "./db.js";
const url = `https://api.football-data.org/v2/`;
const attrbt = {
    headers: {
        "X-Auth-Token": "bbd460db9bae4cbc9934e3f1a5073577"
    }
}

const imgResults = {
    "no-internet": `
        <div class="container">
            <div class="row card" >
                <div class="card-content center">
                <img src="./images/no-internet.gif" width="80%" alt="Tidak Ada Koneksi Internet"> <br/>
                <h5>Tidak Ada Koneksi Internet</h5>
                </div>
            </div>
        </div>
    `,
    "no-data": `
        <div class="row">
            <div class="card">
                <div class="card-content center">
                    <img src="./images/empty.gif" width="80%" alt="Tidak Ada Data"> <br/>
                    <h5>Tidak Ada Data</h5>
                </div>
            </div>
        </div>
    `
}

const status = (response) => {
    if(response.status !== 200) {
        console.log(`Error : ${response.status}`);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

const json = (response) => {return response.json()}

const error = (error) => {console.log(`Error : ${error}`)}

const DateFormatIndo = (dateData) => {
    const month = ["Januari","Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
    const myDate = new Date(dateData);
    return `${myDate.getDate()} ${month[myDate.getMonth()]} ${myDate.getFullYear()}`;
}

export const getLeague = (idleague) => {
    const league = {
        "2001": "champion",
        "2002": "jerman",
        "2003": "belanda",
        "2021": "inggris",
        "2014": "spanyol",
        "2015": "prancis"
    }
    if("caches" in window) {
        caches.match(`${url}competitions/${idleague}/standings`).then((response) => {
            if(response) {
                response.json().then((data) => {
                    const teams = data.standings[0].table;
                    let updateDate = data.competition.lastUpdated;
                    updateDate = updateDate.split("T");
                    const leaguedetail = `
                        <div class="card-content">
                            <div class="row">
                                <div class="col s12 m6 l4 center">
                                    <img src="images/${league[idleague]}.png" height="150px" alt="Logo Liga ${league[idleague]}">
                                </div>
                                <div class="col s12 m6 l8">
                                    <h5>${data.competition.name}</h5>
                                    Kode : ${data.competition.code} <br/>
                                    Area : ${data.competition.area.name} <br/>
                                    Waktu : ${DateFormatIndo(data.season.startDate)} s/d ${DateFormatIndo(data.season.endDate)} <br/>
                                    Terakhir Update : ${DateFormatIndo(updateDate[0])}
                                </div>
                            </div>
                        </div>
                    `;
                    
                    let teamshow = `
                        <div class="row">
                            <div class="col card s12">
                                <p>
                                    <b>Keterangan </b><br/>
                                    P : Points,
                                    W : Won,
                                    L : Lost,
                                    D : Draw,
                                    G : Goals 
                                </p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Club</th>
                                            <th>P</th>
                                            <th>W</th>
                                            <th>L</th>
                                            <th>D</th>
                                            <th>G</th>
                                            <th>Posisi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                    `;
                    teams.forEach((team) => {
                        let badgeColor = "blue-grey lighten-5";
                        if(team.position>=1 && team.position<=3) {
                            switch(team.position) {
                                case 1:
                                    badgeColor = "orange accent-1";
                                    break;
                                case 2:
                                    badgeColor = "grey lighten-1";
                                    break;
                                case 3: 
                                    badgeColor = "brown lighten-4";
                                    break;
                            }
                        }
                        teamshow += `
                            <tr>
                                <td>
                                    <a href="?page=team-detail&id=${team.team.id}">${team.team.name}</a>
                                </td>
                                <td>${team.points}</td>
                                <td>${team.won}</td>
                                <td>${team.lost}</td>
                                <td>${team.draw}</td>
                                <td>${team.goalsFor}</td>
                                <td>
                                    <span class="badge ${badgeColor}">${team.position}</span>
                                </td>
                            </tr>
                        `;
                    });
                    teamshow += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                    `;
                    $("#loading").hide();
                    $("#league #league-detail").html(leaguedetail);
                    $("#league #standings").html(teamshow);
                })
            }
        });
    }
    fetch(`${url}competitions/${idleague}/standings`, attrbt)
        .then(status)
        .then(json)
        .then((data) => {
            console.log(data);
            const teams = data.standings[0].table;
            let updateDate = data.competition.lastUpdated;
            updateDate = updateDate.split("T");
            const leaguedetail = `
                <div class="card-content">
                    <div class="row">
                        <div class="col s12 m6 l4 center">
                            <img src="images/${league[idleague]}.png" height="150px">
                        </div>
                        <div class="col s12 m6 l8">
                            <h5>${data.competition.name}</h5>
                            Kode : ${data.competition.code} <br/>
                            Area : ${data.competition.area.name} <br/>
                            Waktu : ${DateFormatIndo(data.season.startDate)} s/d ${DateFormatIndo(data.season.endDate)} <br/>
                            Terakhir Update : ${DateFormatIndo(updateDate[0])}
                        </div>
                    </div>
                </div>
            `;
            
            let teamshow = `
                <div class="row">
                    <div class="col card s12">
                        <p>
                            <b>Keterangan </b><br/>
                            P : Points,
                            W : Won,
                            L : Lost,
                            D : Draw,
                            G : Goals 
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Club</th>
                                    <th>P</th>
                                    <th>W</th>
                                    <th>L</th>
                                    <th>D</th>
                                    <th>G</th>
                                    <th>Posisi</th>
                                </tr>
                            </thead>
                            <tbody>
            `;
            teams.forEach((team) => {
                let badgeColor = "blue-grey lighten-5";
                if(team.position>=1 && team.position<=3) {
                    switch(team.position) {
                        case 1:
                            badgeColor = "orange accent-1";
                            break;
                        case 2:
                            badgeColor = "grey lighten-1";
                            break;
                        case 3: 
                            badgeColor = "brown lighten-4";
                            break;
                    }
                }
                teamshow += `
                    <tr>
                        <td>
                            <a href="?page=team-detail&id=${team.team.id}">${team.team.name}</a>
                        </td>
                        <td>${team.points}</td>
                        <td>${team.won}</td>
                        <td>${team.lost}</td>
                        <td>${team.draw}</td>
                        <td>${team.goalsFor}</td>
                        <td>
                            <span class="badge ${badgeColor}">${team.position}</span>
                        </td>
                    </tr>
                `;
            });
            teamshow += `
                        </tbody>
                    </table>
                </div>
            </div>
            `;
            $("#loading").hide();
            $("#league #league-detail").html(leaguedetail);
            $("#league #standings").html(teamshow);
            
        });
}

export const getTeam = (search) => {
    if("caches" in window) {
        caches.match(`${url}/teams`).then((response) => {
            if(response) {
                response.json().then((data) => {
                    const teams = data.teams;
                    const filter = teams.filter((team) => {
                        return team.name.toUpperCase().includes(search.toUpperCase());
                    });    
                    $("#loading").hide();
                    console.log(filter);
                    let teamshow = ``;
                    filter.forEach((team) => {
                        teamshow += `
                            <div class="row" class="team-show">
                                <div class="card">
                                    <div class="card-content row">
                                        <div class="col s12 m4 image-thumbnail center">
                                            <img src="${team.crestUrl}" height="60%" width="60%" alt="Team Crest" onerror="this.onerror=null;this.src='./images/team-dummy.png';" >
                                        </div>
                                        <div class="col s12 m8">
                                            <p>
                                                <h4>${team.name}</h4>
                                                Club Colors : ${team.clubColors} <br/>
                                                ${team.name} merupakan club yang dibuat pada tahun ${team.founded} dari ${team.area.name}.<br/> <br/>
                                                <a class="waves-effect waves-light btn-small" href="?page=team-detail&id=${team.id}">Selengkapnya</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    $("#team-results").html(teamshow);
                })
            }
        });
    }
    fetch(`${url}/teams`, attrbt)
        .then(status)
        .then(json)
        .then((data) => {
            console.log(data.teams);
            const teams = data.teams;
            const filter = teams.filter((team) => {
                return team.name.toUpperCase().includes(search.toUpperCase());
            });    
            $("#loading").hide();
            console.log(filter);
            let teamshow = ``;
            if(filter.length>0) {
                filter.forEach((team) => {
                    teamshow += `
                        <div class="row" class="team-show">
                            <div class="card">
                                <div class="card-content row">
                                    <div class="col s12 m4 image-thumbnail center">
                                        <img src="${team.crestUrl}" height="60%" width="60%" alt="Team Crest" onerror="this.onerror=null;this.src='./images/team-dummy.png';" >
                                    </div>
                                    <div class="col s12 m8">
                                        <p>
                                            <h4>${team.name}</h4>
                                            Club Colors : ${team.clubColors} <br/>
                                            ${team.name} merupakan club yang dibuat pada tahun ${team.founded} dari ${team.area.name}.<br/> <br/>
                                            <a class="waves-effect waves-light btn-small" href="?page=team-detail&id=${team.id}">Selengkapnya</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                teamshow = imgResults["no-data"];
            }
            $("#team-results").html(teamshow);
        });
}

export const getTeamDetail = (idteam) => {
    if("caches" in window) {
        caches.match(`${url}/teams/${idteam}`).then((response) => {
            if(response) {
                response.json().then((data) => {
                    $("#loading").hide();
                    $("#team-detail").html(`
                        <div class="row">
                            <div class="card">
                                <div class="card-content row">
                                    <div class="col s12 m4 image-thumbnail center">
                                        <img src="${data.crestUrl}" height="100%" width="100%" alt="Team Crest" onerror="this.onerror=null;this.src='./images/team-dummy.png';" >
                                    </div>
                                    <div class="col s12 m8">
                                        <p>
                                            <h4>${data.name}</h4>
                                            Club Colors : ${data.clubColors} <br/>
                                            ${data.name} merupakan club yang dibuat pada tahun ${data.founded} dari ${data.area.name}. <br/> <br/>
                                            <b>Kontak</b> <br/>
                                            Alamat : ${data.address} <br/> 
                                            Telp : ${data.phone} <br/>
                                            E-mail : ${data.email} <br/>
                                            Web : ${data.website}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    `);
                    let members = data.squad;
                    let membershow = ``;
                    members.forEach((member) => {
                        let position = member.position;
                        if(member.role==="COACH") position = member.role
                        membershow += `
                            <tr>
                                <td>${member.name}</td>
                                <td>${member.countryOfBirth}</td>
                                <td>${position}</td>
                            </tr>
                        `;
                    });
                    $("#team-squad").html(`
                        <div class="row">
                            <div class="card">
                                <div class="card-content">
                                    <h5>Anggota Tim</h5>
                                    <table  class="highlight">
                                        <thead>
                                            <tr>
                                                <th>Nama</th>
                                                <th>Kelahiran</th>
                                                <th>Role</th>
                                            </tr>   
                                        </thead>  
                                        <tbody>
                                            ${membershow}
                                        </tbody>    
                                    </table>
                                </div>
                            </div>
                        </div>  
                    `);
                    $("#save-team").click(() => {
                        addData(data);
                    });
                })
            }
        });
    }
    fetch(`${url}/teams/${idteam}`, attrbt)
        .then(status)
        .then(json)
        .then((data) => {
            console.log(data); 
            $("#loading").hide();
            $("#team-detail").html(`
                <div class="row">
                    <div class="card">
                        <div class="card-content row">
                            <div class="col s12 m4 image-thumbnail center">
                                <img src="${data.crestUrl}" height="100%" width="100%" alt="Team Crest" onerror="this.onerror=null;this.src='./images/team-dummy.png';" >
                            </div>
                            <div class="col s12 m8">
                                <p>
                                    <h4>${data.name}</h4>
                                    Club Colors : ${data.clubColors} <br/>
                                    ${data.name} merupakan club yang dibuat pada tahun ${data.founded} dari ${data.area.name}. <br/> <br/>
                                    <b>Kontak</b> <br/>
                                    Alamat : ${data.address} <br/> 
                                    Telp : ${data.phone} <br/>
                                    E-mail : ${data.email} <br/>
                                    Web : ${data.website}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>  
            `);
            let members = data.squad;
            let membershow = ``;
            members.forEach((member) => {
                let position = member.position;
                if(member.role==="COACH") position = member.role
                membershow += `
                    <tr>
                        <td>${member.name}</td>
                        <td>${member.countryOfBirth}</td>
                        <td>${position}</td>
                    </tr>
                `;
            });
            $("#team-squad").html(`
                <div class="row">
                    <div class="card">
                        <div class="card-content">
                            <h5>Anggota Tim</h5>
                            <table  class="highlight">
                                <thead>
                                    <tr>
                                        <th>Nama</th>
                                        <th>Kelahiran</th>
                                        <th>Role</th>
                                    </tr>   
                                </thead>  
                                <tbody>
                                    ${membershow}
                                </tbody>    
                            </table>
                        </div>
                    </div>
                </div>  
            `);
            $("#save-team").click(() => {
                addData(data);
            });
        });
}

export const getTeamFavorite = () => {
    getDataAll().then((teams) => {
        let favoriteShow = ``;
        if(teams.length>0) {
            teams.forEach((team) => {
                favoriteShow += `
                    <div class="row" class="team-show">
                        <div class="card">
                            <div class="card-content row">
                                <div class="col s12 m4 image-thumbnail center">
                                    <img src="${team.crestUrl}" height="60%" width="60%" alt="Team Crest" onerror="this.onerror=null;this.src='./images/team-dummy.png';" >
                                </div>
                                <div class="col s12 m8">
                                    <p>
                                        <h4>${team.name}</h4>
                                        Club Colors : ${team.clubColors} <br/>
                                        ${team.name} merupakan club yang dibuat pada tahun ${team.founded} dari ${team.area.name}.<br/> <br/>
                                        <a class="waves-effect waves-light btn-small" href="?page=team-detail&id=${team.id}&saved=true">Selengkapnya</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            })
        } else {
            favoriteShow = imgResults["no-data"];
        }
        $("#loading").hide();
        $("#favorite-results").html(favoriteShow);
    })
}

export const getFavoriteDetail = (idteam) => {
    getDataById(idteam).then((data) => {
        $("#loading").hide();
        $("#team-detail").html(`
                <div class="row">
                    <div class="card">
                        <div class="card-content row">
                            <div class="col s12 m4 image-thumbnail center">
                                <img src="${data.crestUrl}" height="100%" width="100%" alt="Team Crest" onerror="this.onerror=null;this.src='./images/team-dummy.png';" >
                            </div>
                            <div class="col s12 m8">
                                <p>
                                    <h4>${data.name}</h4>
                                    Club Colors : ${data.clubColors} <br/>
                                    ${data.name} merupakan club yang dibuat pada tahun ${data.founded} dari ${data.area.name}. <br/> <br/>
                                    <b>Kontak</b> <br/>
                                    Alamat : ${data.address} <br/> 
                                    Telp : ${data.phone} <br/>
                                    E-mail : ${data.email} <br/>
                                    Web : ${data.website}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>  
            `);
            let members = data.squad;
            let membershow = ``;
            members.forEach((member) => {
                let position = member.position;
                if(member.role==="COACH") position = member.role
                membershow += `
                    <tr>
                        <td>${member.name}</td>
                        <td>${member.countryOfBirth}</td>
                        <td>${position}</td>
                    </tr>
                `;
            });
            $("#team-squad").html(`
                <div class="row">
                    <div class="card">
                        <div class="card-content">
                            <h5>Anggota Tim</h5>
                            <table  class="highlight">
                                <thead>
                                    <tr>
                                        <th>Nama</th>
                                        <th>Kelahiran</th>
                                        <th>Role</th>
                                    </tr>   
                                </thead>  
                                <tbody>
                                    ${membershow}
                                </tbody>    
                            </table>
                        </div>
                    </div>
                </div>  
            `);
            $("#save-team").click(() => {
                removeData(parseInt(data.id));
            });
            $("#save-team i").text("delete");
    });
}
