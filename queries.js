const getVacations = () => {
    return ('SELECT * FROM amirtours.vacations');
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

module.exports = { getUsers, addVacation, getFollowedVacationIds, login, registration, checkIfUserExists, getVacations, followVacation, unfollowVacation }
