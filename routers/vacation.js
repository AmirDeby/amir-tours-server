const db = require('../sql');
const router = require('express').Router();
const { getVacations, followVacation, unfollowVacation } = require('../queries');

router.get('/', async (req, res) => {

    const [vacations] = await db.execute(getVacations());

    res.send(vacations);
});



router.post('/:vacationId/follow', async (req, res) => {
    const { userId } = req.body;
    const { vacationId } = req.params;

    try {
        await db.execute(followVacation(), [userId, vacationId])
        res.send('Vacation Followed');

        // prevent duplicate follower from same user 
    } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') {
            res.status(400).send('Vacation is already followed');
        } else {
            res.send(e);
        }
    }
})


router.post('/:vacationId/unfollow', async (req, res) => {

    const { userId } = req.body;
    const { vacationId } = req.params;

    await db.execute(unfollowVacation(), [vacationId, userId]);

    res.send('you unfollowed');

})


module.exports = router;