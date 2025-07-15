import {Router} from 'express';
import ContactRequest from '../models/ContactRequest.model.js';
import authMiddleware, { authorize } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/request',authMiddleware, authorize(['buyer']), async (req,res) => {
    const {farmerId, cropId} = req.body;
    const buyerId = req.user.id;
    try {
        const existing = await ContactRequest.findOne({buyer : buyerId, crop : cropId});
        if(existing && existing.status === 'pending') return res.status(400).json({message : 'Already requested.'});
        const request = new ContactRequest({farmer : farmerId, buyer : buyerId, crop : cropId});
        await request.save();
        res.status(201).json({message : 'Request sent successfully', request});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'error while sending request'});
    }
});

router.put('/respond/:id',authMiddleware,authorize(['farmer']), async (req, res) => {
  const { status } = req.body; // "approved" or "rejected"
  const user = req.user.id;
  const id = req.params.id;
  const request = await ContactRequest.findById(id);
  const farmer = request.farmer.toString();  
  if(user!= farmer){
    return res.json({message : 'unauthorized'})
  }
  try {
    const updated = await ContactRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

router.get('/farmer',async (req,res) => {
    const farmerId = req.user.id;
    try {
        const requests = await ContactRequest.find({farmer : farmerId}).populate('buyer','name').populate('crop','name imageUrl');
        res.status(200).json({message : "Requests found successfully", requests})
    } catch (error) {
        res.status(500).json({ error: 'Update failed' });
    }
})

router.get('/status/:farmerId/:cropId', async (req, res) => {
    const buyerId = req.user.id;
    const {farmerId,cropId} = req.params;
    try {
        const request = await ContactRequest.findOne({ buyer: buyerId, crop: cropId });
        if (!request) return res.json({ status: 'none' });
        res.json({ status: request.status });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch status' });
    }
});

export default router;