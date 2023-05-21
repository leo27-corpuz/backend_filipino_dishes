const { VisionMissionGoal } = require('../../models');
const { validateInputProcess } = require('../../middlewares/validationInput/validateInputs')
const asyncHandler = require('express-async-handler')

const store = asyncHandler(async(req, res) => {
    const dataText = {
        VisionTitle: req.body.VisionTitle,
        VisionDescription: req.body.VisionDescription,
        MissionTitle: req.body.MissionTitle,
        MissionDescription: req.body.MissionDescription,
        GoalTitle: req.body.GoalTitle,
        GoalDescription: req.body.GoalDescription,
    }
    if (!validateInputProcess(dataText)) return res.status(400).send('Please select all fields')

    const VisionMissionGoalData = await VisionMissionGoal.findAll();
    if(VisionMissionGoalData.length === 1){
        let updateVisionMissionGoal = await VisionMissionGoal.findOne({
            where:{
                id: VisionMissionGoalData[0].id
            },
        })
        let newVisionMissionGoal = await updateVisionMissionGoal.update(dataText)
        res.send(newVisionMissionGoal)
    }else{
        const NewVisionMissionGoal = await VisionMissionGoal.create(dataText)
        res.status(200).send(NewVisionMissionGoal)
    }
})
const show = asyncHandler(async(req, res) => {
    const data = await VisionMissionGoal.findAll({
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
   });
   res.send(data)
})
module.exports = { store, show }