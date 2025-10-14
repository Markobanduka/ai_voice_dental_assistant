"use client";

import { useState } from "react";
import {
  APPOINTMENT_TYPES,
  getNext5Days,
  getAvailableTimeSlots,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ClockIcon, ChevronLeftIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

const TrainerDashboardClient = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const availableDates = getNext5Days();
  const availableTimeSlots = getAvailableTimeSlots();

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleConfirm = () => {
    if (!selectedType || !selectedDate || !selectedTime) return;
    alert(
      `Trainer booked: ${selectedType} on ${selectedDate} at ${selectedTime}`
    );
    setSelectedType("");
    setSelectedDate("");
    setSelectedTime("");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 space-y-6 pt-24">
        <h2 className="text-2xl font-semibold">Create Your Training Session</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Training Type</h3>
          <div className="space-y-3">
            {APPOINTMENT_TYPES.map((type) => (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all hover:shadow-sm ${
                  selectedType === type.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{type.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {type.duration}
                    </p>
                  </div>
                  <span className="font-semibold text-primary">
                    {type.price}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Select Date</h3>
          <div className="grid grid-cols-2 gap-3">
            {availableDates.map((date) => (
              <Button
                key={date}
                variant={selectedDate === date ? "default" : "outline"}
                onClick={() => handleDateSelect(date)}
                className="h-auto p-3"
              >
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </Button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Select Time</h3>
            <div className="grid grid-cols-3 gap-2">
              {availableTimeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                  size="sm"
                >
                  <ClockIcon className="w-3 h-3 mr-1" />
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        {selectedType && selectedDate && selectedTime && (
          <div className="flex justify-end">
            <Button onClick={handleConfirm}>Confirm Training</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default TrainerDashboardClient;
