
const Booking=require("../models/bookingsModel");
const Bus=require("../models/busesModel");


//book a seat
// router.post("/book-seat",authMiddleware,async(req,res)=>{
    const bookSeat=async(req,res)=>{
    try{
        const newBooking=new Booking({
            ...req.body,
            transactionId:"1234",
            user:req.body.userId
            //in the modal i am giving user and bus ie why i have given userId from authmiddleware
            //bus and seats from FE, user and transac id im attaching from BE
        });

        await newBooking.save();
        const bus=await Bus.findById(req.body.bus);
                            // existing and,   new
       bus.seatsBooked=[...bus.seatsBooked, ...req.body.seats];
       await bus.save();
        res.status(200).send({
            message:"booking successful!..",
            data:newBooking,
            success:true,
        })
    }
    catch(err){
        // console.log(err);
        return res.status(500).send({
            success:false,
            data:err,
            message:"Booking Failed!.."
        })   
     }
}
//once the booking is successful i have to add the seats in the bus...
//i have to add selected seats in seats BookedAray,so that other people can not book this...


//get bookings by user id
// router.post("/get-bookings-by-user-id",authMiddleware,async(req,res)=>{
    const getBookingsByUserId=async(req,res)=>{
    try{
        const bookings=await Booking.find({user:req.body.userId}).populate("bus").populate("user");
        //ive given ref in models based on that i have to pull it from buses collection users collection..
       
        res.status(200).send({
            message:"Bookings fetched successfully",
            success:true,
            data:bookings,
        })
    }
    catch(err){
        res.status(500).send({
            success:false,
            message:"Bookings fetch failed!..",
            data:err,
        })

    }
};

//get-all-bookings
const getAllBookings=async(req,res)=>{
    try{
        const bookings=await Booking.find().populate("bus").populate("user");
        return res.status(200).send({
            success:true,
            message:"Bookings fetched successfully..",
            data:bookings,
        })
    }
    catch(err){
        return res.status(500).send({
            success:false,
            message:"Bookings fetch failed..",
            data:err,
        })
    }
}


module.exports={bookSeat,getBookingsByUserId,getAllBookings};