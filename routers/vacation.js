const db = require('../sql');
const router = require('express').Router();
const Joi = require('@hapi/joi');
const { addVacation, getVacations, followVacation, unfollowVacation, getFollowedVacationIds } = require('../queries');

router.get('/', async (req, res) => {

    const [vacations] = await db.execute(getVacations());

    res.send(vacations);
});

router.get('/me', async (req, res) => {
    const { userId } = req.user;

    const [vacations] = await db.execute(getVacations());
    const [followedVacationPairs] = await db.execute(getFollowedVacationIds(), [userId]);
    const followedVacationIds = followedVacationPairs.map(pair => pair.vacationId);

    const vacationsWithFollowFlag = vacations.map(vacation => {
        const isFollowed = followedVacationIds.includes(vacation.id);
        return {
            ...vacation,
            isFollowed,
        };
    })

    res.send(vacationsWithFollowFlag)

});

router.post('/:vacationId/follow', async (req, res) => {

    const { userId } = req.user;
    const { vacationId } = req.params;

    const vacationSchema = Joi.object({
        userId: Joi.number().required(),
        vacationId: Joi.number().required()
    })

    const validation = vacationSchema.validate({ userId, vacationId });
    if (validation.error) {
        res.status(401).send(validation.error);
        return
    }

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

    const { userId } = req.user;
    const { vacationId } = req.params;

    await db.execute(unfollowVacation(), [vacationId, userId]);

    res.send('you unfollowed');

})

router.post('/addvacation', async (req, res) => {
    const { isAdmin } = req.user
    const { description, destination, image, startDate, endDate, price } = req.body;

    await db.execute(addVacation(), [description, destination, image, startDate, endDate, price]);

    res.send('vacation added successfully');
})


module.exports = router;