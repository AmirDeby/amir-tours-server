const db = require('../sql');
const router = require('express').Router();
const Joi = require('@hapi/joi');
const { updateVacation, deleteVacationFollowers, deleteVacation, addVacation, getVacations, followVacation, unfollowVacation, getFollowedVacationIds } = require('../queries');
const checkAdmin = require('../middleware/checkAdmin');

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

    const vacationSchema = Joi.object({
        userId: Joi.number().required(),
        vacationId: Joi.number().required()
    })

    const validation = vacationSchema.validate({ userId, vacationId });
    if (validation.error) {
        res.status(401).send(validation.error);
        return
    }

    await db.execute(unfollowVacation(), [vacationId, userId]);

    res.send('you unfollowed');

})

router.post('/', checkAdmin, async (req, res) => {

    const { description, destination, image, startDate, endDate, price } = req.body;

    const vacationSchema = Joi.object({
        description: Joi.string().required(),
        destination: Joi.string().required(),
        image: Joi.string(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        price:Joi.number().required()
    })

    const validation = vacationSchema.validate({ description, destination, image, startDate, endDate, price });
    if (validation.error) {
        res.status(401).send(validation.error);
        return
    }

    const [response] = await db.execute(addVacation(), [description, destination, image, startDate, endDate, price]);
    const vacationId = response.insertId;

    res.send({ vacationId });
})

router.delete('/:id', checkAdmin, async (req, res) => {

    const { id } = req.params;

    await db.execute(deleteVacation(), [id]);
    await db.execute(deleteVacationFollowers(), [id]);

    res.send({ id });
})

router.put('/:id', checkAdmin, async (req, res) => {

    const { id } = req.params;
    const { description, destination, image, startDate, endDate, price } = req.body

    await db.execute(updateVacation(), [description, destination, image, startDate, endDate, price, id])

    res.send('vacation update')
})

module.exports = router;