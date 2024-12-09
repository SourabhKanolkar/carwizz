import { Fragment } from "react";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useState } from "react";
import CabDataService from "../services/cab.services"

import { Dialog, Transition } from "@headlessui/react";
import { CarProps } from "@types";
import { generateCarImageUrl } from "@utils";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  const [brand, setBrand] = useState(""); // Unused state, consider removing if not needed
  const [name, setName] = useState("");
  const [cnumber, setCnumber] = useState("");
  const [date, setDate] = useState("");

  // Determine if the "BOOK NOW" button should be disabled
  const isFormValid = name.trim() !== "" && cnumber.trim() !== "" && date.trim() !== "";

  const bookCar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const carDetails = {
      Make: car.make,
      Model: car.model,
      Myear: car.year,
      Fuel: car.fuel_type,
      MpgCity: car.city_mpg,
      Transmission: car.transmission,
      Class: car.class,
      Drive: car.drive,
      Client_name: name,
      Cnumber: cnumber,
      Date: date,
    };
    try {
      await CabDataService.addBookCab(carDetails);
      alert("Cab booked successfully!");
    } catch (err) {
      alert("An error occurred while booking the cab.");
    }
    console.log("Booked car details: ", carDetails);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-out duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    type="button"
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                    onClick={closeModal}
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>

                  <div className="flex-1 flex flex-col gap-3">
                    <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                      <Image
                        src={generateCarImageUrl(car)}
                        alt="car model"
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={generateCarImageUrl(car, "29")}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={generateCarImageUrl(car, "33")}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                        <Image
                          src={generateCarImageUrl(car, "13")}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl capitalize">
                      {car.make} {car.model}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-4">
                      {Object.entries(car).map(([key, value]) => (
                        <div
                          className="flex justify-between gap-5 w-full text-right"
                          key={key}
                        >
                          <h4 className="text-grey capitalize">{key.split("_").join(" ")}</h4>
                          <p className="text-black-100 font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="client-info-area">
                      <h5 className="text-center">FILL THE DETAILS BELOW</h5>
                      <div className="mb-3">
                        <label htmlFor="name">Name: </label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          id="name"
                          placeholder="name"
                          className="form-control"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="cnumber">Contact Number: </label>
                        <input
                          onChange={(e) => setCnumber(e.target.value)}
                          type="number"
                          id="cnumber"
                          placeholder="Contact Number"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="date">Date: </label>
                        <input
                          onChange={(e) => setDate(e.target.value)}
                          type="date"
                          id="date"
                          placeholder="Date"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <button
                      className="btn btn-danger"
                      onClick={bookCar}
                      disabled={!isFormValid} // Button is disabled when form is invalid
                    >
                      BOOK NOW
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
