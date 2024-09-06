import React from "react";

const EventList = ({ clubEvent }) => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubEvent.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover border-b-2 border-black p-3"
                src="https://img.freepik.com/free-vector/colleagues-preparing-corporate-party-time-management-deadline-brand-event_335657-3083.jpg?t=st=1725608439~exp=1725612039~hmac=9b1631ce7e53ed534d16da72747e7eee6b3cd7a9720876f279d6ec0a8dabec21&w=996"
                alt={event.title}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  <span className="font-bold">Start From : </span>
                  {event?.startfrom}
                </p>
                <p className="text-gray-600  mt-2">
                  <span className="font-bold">Venue </span>: {event?.venue}
                </p>
                <p className="mt-4 text-gray-700">
                  <span className="font-bold"> Descripiton: </span>
                  {event?.description}
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800">
                    Event Incharge:
                  </h4>
                  <p className="text-gray-600">{event?.eventincharge}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;
