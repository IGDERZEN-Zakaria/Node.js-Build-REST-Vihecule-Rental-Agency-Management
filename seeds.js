const { Type } = require("./models/type");
const { Vehicle } = require("./models/Vehicle");
const mongoose = require("mongoose");
const config = require("config");

const data = [
    {
        name: "Cars",
        vehicles: [
            { title: "Audi", numberAvailable: 5, dailyRentalRate: 2 },
            { title: "BMW", numberAvailable: 10, dailyRentalRate: 2 },
            { title: "Mercedes", numberAvailable: 15, dailyRentalRate: 2 }
        ]
    },
    {
        name: "Trucks",
        vehicles: [
            { title: "Man", numberAvailable: 5, dailyRentalRate: 2 },
            { title: "H100", numberAvailable: 10, dailyRentalRate: 2 },
            { title: "SONACOM", numberAvailable: 15, dailyRentalRate: 2 }
        ]
    },
    {
        name: "Motorcycles",
        vehicles: [
            { title: "SUZUKI", numberAvailable: 5, dailyRentalRate: 2 },
            { title: "HARLEY", numberAvailable: 10, dailyRentalRate: 2 },
            { title: "T-MAX", numberAvailable: 15, dailyRentalRate: 2 }
        ]
    },
    {
        name: "Buses",
        vehicles: [
            { title: "YELLOW BUS", numberAvailable: 5, dailyRentalRate: 2 },
            { title: "BOXER", numberAvailable: 10, dailyRentalRate: 2 },
            { title: "STUDENT-BUS", numberAvailable: 15, dailyRentalRate: 2 }
        ]
    }
];

async function seed() {
    try {

        await mongoose.connect(config.get("db"), { useNewUrlParser: true, useUnifiedTopology: true });

        await Vehicle.deleteMany({});
        await Type.deleteMany({});

        for (let type of data) {
            const { _id: typeId } = await new Type({ name: type.name }).save();
            const vehicles = type.vehicles.map(vehicle => ({
                ...vehicle,
                type: { _id: typeId, name: type.name }
            }));
            await Vehicle.insertMany(vehicles);
        }

        mongoose.disconnect();

        console.info("Done!");
    }
    catch (err) {
        console.log(err);
    }
}


seed();