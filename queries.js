const getVacations = () => {
    return ('SELECT * FROM amirtours.vacations');
}

const followVacation = () => {
    return ('INSERT INTO `amirtours`.`followers` (`userId`,`vacationId`) VALUES (?, ?)')
}

const unfollowVacation = () => {
    return 'DELETE FROM `amirtours`.`followers` WHERE (`vacationId` = ? and userId = ?)';
}

module.exports = { getVacations, followVacation, unfollowVacation}
