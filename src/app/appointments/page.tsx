"use client";

import { AppointmentConfirmationModal } from "@/components/appointments/AppointmentConfirmationModal";
import BookingConfirmationStep from "@/components/appointments/BookingConfirmationStep";
import ProgressSteps from "@/components/appointments/ProgressSteps";
import TimeSelectionStep from "@/components/appointments/TimeSelectionStep";
import TrainerSelectionStep from "@/components/appointments/TrainerSelectionStep";
import Navbar from "@/components/Navbar";
import {
  useBookAppointment,
  useUserAppointments,
} from "@/hooks/use-appointments";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { APPOINTMENT_TYPES } from "@/lib/utils";

const AppointmentsPage = () => {
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<any>(null);

  const bookAppointmentMutation = useBookAppointment();
  const { data: userAppointments = [] } = useUserAppointments();

  const handleSelectTrainer = (trainerId: string) => {
    setSelectedTrainerId(trainerId);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedType("");
  };

  const handleBookAppointment = async () => {
    if (!selectedTrainerId || !selectedDate || !selectedTime) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const appointmentType = APPOINTMENT_TYPES.find(
      (t) => t.id === selectedType
    );

    bookAppointmentMutation.mutate(
      {
        trainerId: selectedTrainerId,
        date: selectedDate,
        time: selectedTime,
        reason: appointmentType?.name,
      },
      {
        onSuccess: async (appointment) => {
          setBookedAppointment(appointment);

          // try {
          //   const emailResponse = await fetch("/api/send-appointment-email", {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       userEmail: appointment.patientEmail,
          //       trainerName: appointment.trainerName,
          //       appointmentDate: format(
          //         new Date(appointment.date),
          //         "EEEE, MMMM d, yyyy"
          //       ),
          //       appointmentTime: appointment.time,
          //       appointmentType: appointmentType?.name,
          //       duration: appointmentType?.duration,
          //       price: appointmentType?.price,
          //     }),
          //   });

          //   if (!emailResponse.ok)
          //     console.error("Failed to send confirmation email");
          // } catch (error) {
          //   console.error("Error sending confirmation email:", error);
          // }

          setShowConfirmationModal(true);

          setSelectedTrainerId(null);
          setSelectedDate("");
          setSelectedTime("");
          setSelectedType("");
          setCurrentStep(1);
        },
        onError: (error) =>
          toast.error(`Failed to book appointment: ${error.message}`),
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Book an Appointment</h1>
          <p className="text-muted-foreground">
            Find and book with verified trainer in your area
          </p>
        </div>
        <ProgressSteps currentStep={currentStep} />

        {currentStep === 1 && (
          <TrainerSelectionStep
            selectedTrainerId={selectedTrainerId}
            onContinue={() => setCurrentStep(2)}
            onSelectTrainer={handleSelectTrainer}
          />
        )}

        {currentStep === 2 && selectedTrainerId && (
          <TimeSelectionStep
            selectedDentistId={selectedTrainerId}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedType={selectedType}
            onBack={() => setCurrentStep(1)}
            onContinue={() => setCurrentStep(3)}
            onDateChange={setSelectedDate}
            onTimeChange={setSelectedTime}
            onTypeChange={setSelectedType}
          />
        )}

        {currentStep === 3 && selectedTrainerId && (
          <BookingConfirmationStep
            selectedTrainerId={selectedTrainerId}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedType={selectedType}
            isBooking={bookAppointmentMutation.isPending}
            onBack={() => setCurrentStep(2)}
            onModify={() => setCurrentStep(2)}
            onConfirm={handleBookAppointment}
          />
        )}
      </div>

      {bookedAppointment && (
        <AppointmentConfirmationModal
          open={showConfirmationModal}
          onOpenChange={setShowConfirmationModal}
          appointmentDetails={{
            trainerName: bookedAppointment.trainerName,
            appointmentDate: format(
              new Date(bookedAppointment.date),
              "EEEE, MMMM d, yyyy"
            ),
            appointmentTime: bookedAppointment.time,
            userEmail: bookedAppointment.patientEmail,
          }}
        />
      )}

      {userAppointments.length > 0 && (
        <div className="mb-8 max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-xl font-semibold mb-4">
            Your Upcoming Appointments
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-card border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <img
                      src={appointment.trainerImageUrl}
                      alt={appointment.trainerName}
                      className="size-10 rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {appointment.trainerName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {appointment.reason}
                    </p>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    📅 {format(new Date(appointment.date), "MMM d, yyyy")}
                  </p>
                  <p className="text-muted-foreground">🕐 {appointment.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentsPage;
