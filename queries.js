const getVacations = () => {
    return (`SELECT amirtours.vacations.*, ifnull(numOfFollowers, 0) as numOfFollowers from amirtours.vacations left join 
(SELECT count(*) as numOfFollowers, vacationId FROM amirtours.followers group by vacationId) as F
on vacations.id = F.vacationId;`)
}

const getUsers = () => {
    return 'SELECT * FROM amirtours.users'
}

const getFollowedVacationIds = () => {
    return 'SELECT vacationId FROM amirtours.followers WHERE userId = ?'
}

const followVacation = () => {
    return ('INSERT INTO `amirtours`.`followers` (`userId`,`vacationId`) VALUES (?, ?)')
}

const unfollowVacation = () => {
    return 'DELETE FROM `amirtours`.`followers` WHERE (`vacationId` = ? and userId = ?)';
}

function checkIfUserExists() {
    return "SELECT * FROM amirtours.users where userName=?"
}
function registration() {
    return "INSERT INTO`amirtours`.`users`(`firstName`, `lastName`, `password`,`userName`) VALUES(?, ?, ?, ?)"
}

function login() {
    return " SELECT * FROM amirtours.users WHERE userName=? and password= ?"
}

function addVacation() {
    return "INSERT INTO `amirtours`.`vacations` (`description`, `destination`, `image`, `startDate`, `endDate`, `price`) VALUES (?,?,?,?,?,?)"
}
function deleteVacation() {
    return "DELETE FROM amirtours.vacations WHERE id = ?"
}

function deleteVacationFollowers() {
    return "DELETE FROM amirtours.followers WHERE vacationId = ?";
}
module.exports = { deleteVacation, deleteVacationFollowers, getUsers, addVacation, getFollowedVacationIds, login, registration, checkIfUserExists, getVacations, followVacation, unfollowVacation }
